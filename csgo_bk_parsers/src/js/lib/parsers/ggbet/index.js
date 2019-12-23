import {Matches} from './matches'
import io from "socket.io-client";

export function ggbetParser() {

  /*
  Начать работу контент скрипта после 6 секунд с времени начала открытия документа
   */
  document.ready(6000).then(() => {
    let mode = null;

    /*
    Установка режима работы парсера
     */
    (() => {
      if (document.location.href === 'https://gg19.bet/en/betting') document.location.href = 'https://gg19.bet/ru/betting';
      else if (document.location.href === "https://gg19.bet/ru/betting?matchStatuses[]=LIVE") mode = 'list';
      else mode = 'match';
      console.log('MODE: ' + mode);
    })();

    /**
     * Экземпляр класса Matches
     * @type {Matches}
     */
    const matches = new Matches();
    let matchList = [];


    if (mode === 'list') {
      const socket = io('https://www.rmbets.site', {
        transports: ['websocket'],
        query: {
          im: 'ggbet',
        }
      });
      socket.on('connect', () => {
        if (mode === 'list') {
          console.log('Авторизуюсь');
          socket.emit('auth', {
            username: 'ggbet'
          });
          if (matchList.length) {
            socket.emit('ggbet_match_list', {
              matchList
            })
          }
        }
      });

      socket.on('open_from_ggbet', src => {
        console.log('OPEN FROM GGBET');
        console.log(src);
        chrome.runtime.sendMessage({
          service: 'ggbet',
          mode: 'open',
          src
        })
      });

      matches.liveButton.click();
      document.wait(200).then(() => {


        /*
        Проверка на изменение
         */
        setInterval(() => {
          let tempMatchList = [];
          matches.sportEvents.forEach(match => {
                tempMatchList.push(matches.teams(match));
          });

          if (JSON.stringify(tempMatchList) !== JSON.stringify(matchList)) {
            matchList = tempMatchList;
            console.log(matchList)
            socket.emit('ggbet_match_list', {
              matchList
            })
          }
        },1000)
      });

    } else if (mode === 'match') {
      setTimeout(() => {
        document.location.reload()
      }, 300000);

      const socket = io('https://www.rmbets.site', {
        transports: ['websocket'],
        query: {
          im: 'ggbet',
        }
      });

      let matchData = null;

      function parseMatch() {
        let parsedMatch = {};
        if (matches.marketsAreOpen()) {
          parsedMatch.teams = matches.getTeamNames();
          parsedMatch.odds = matches.getOdds();
          parsedMatch.src = document.location.href;
        }
        return parsedMatch
      }

      /**
       * Отслеживание изменений
       */
      (() => {
        setInterval(() => {

          let teamMatchData = parseMatch();
          if (JSON.stringify(teamMatchData) !== JSON.stringify(matchData)) {

            matchData = teamMatchData;
            console.log(matchData);

            socket.emit('ggbet_single_match', matchData)
          }
        }, 50)
      })()

    }
  });
}
