import {Matches} from "./matches";
import io from 'socket.io-client'



setTimeout(() => {
  document.location.reload();
}, 600000);

const socket = io('https://www.rmbets.site', {
  transports: ['websocket'],
  query: {
    im: 'watcher',
    game: 'csgo'
  }
});
socket.on('connect', () => {
  console.log('connect success')
});

let liveIdTemp = {};


export function betsNetParser() {

  let game = null;
  let exportedNowMatches, exportedNextMatches = [];
  
  if (document.location.hostname.includes('betscsgo')) game = 'csgo';
  else if (document.location.hostname.includes('betsdota2')) game = 'dota2';
  else if (document.location.hostname.includes('betslol')) game = 'lol';
  else if (document.location.hostname === 'chromewebdata') document.location.href = 'https://betscsgo.me';

  console.info(`------BETS WATCHER----${game}------`);

  /**
   * Парсинг данных всех текущих матчей
   * @returns {[]}
   */
  function parseNowMatches() {
    const nowMatches = new Matches('now');
    let exportedMatchesArray = [];
    if (nowMatches.list.innerText !== 'Нет активных матчей') {
      for (let i = 0; i < nowMatches.count; i++) {
        exportedMatchesArray.push({
          dataId: nowMatches.getDataId(i),
          tournament: nowMatches.getTournament(i),
          statusBuilder: nowMatches.getStatusBuilder(nowMatches.getMatchStatus(i)),
          bo: nowMatches.getBO(i),
          mapNumber: nowMatches.getMapNumber(i),
          teams: {
            left: nowMatches.getTeamInfo(i, 0),
            right: nowMatches.getTeamInfo(i, 2)
          },
          live: nowMatches.getLiveStatus(i),
          liveDataId: nowMatches.getLiveDataId(i),
          status: nowMatches.getLiveStatusString(i),
          statusString: nowMatches.getMatchStatus(i),
          // addEvents: nowMatches.getAdditionalEvents(i),
        })
      }
    } else {
      console.log('Нет активных матчей');
      exportedMatchesArray = null
    }
    return exportedMatchesArray
  }

  /**
   * Парсинг данных всех будущих матчей
   * @returns {[]}
   */
  function parseNextMatches() {
    let nextMatches = new Matches('next');
    let exportedMatchesArray = [];

    for (let i = 0; i < nextMatches.count; i++) {
      exportedMatchesArray.push({
        dataId: nextMatches.getDataId(i),
        tournament: nextMatches.getTournament(i),
        startTime: nextMatches.getStartTime(i),
        timeToStart: nextMatches.getTimeToStart(i),
        bo: nextMatches.getBO(i),
        teams: {
          leftTeam: nextMatches.getTeamInfo(i, 0),
          rightTeam: nextMatches.getTeamInfo(i, 2),
        },
        addEvents: nextMatches.getAdditionalEvents(i),
      })
    }

    return exportedMatchesArray
  }

  /**
   * Отслеживание изменений
   */
  (() => {
    setInterval(() => {
      let tempNowMatches = parseNowMatches();
      // let tempNextMatches = parseNextMatches();

      if (JSON.stringify(tempNowMatches) !== JSON.stringify(exportedNowMatches)) {
        exportedNowMatches = tempNowMatches;
        console.log(exportedNowMatches);

        socket.emit('match_list_now', exportedNowMatches);
      }

      // if (JSON.stringify(tempNextMatches) !== JSON.stringify(exportedNextMatches)) {
      //   exportedNextMatches = tempNextMatches;
      //   console.log(exportedNextMatches);
      //
      //   chrome.runtime.sendMessage({
      //     app: 'bets' + game,
      //     game,
      //     message: {
      //       type: 'next',
      //       data: exportedNextMatches
      //     }
      //   });
      // }
    },250)
  })();
}

