import {Parimatch} from "./parimatch";
import io from 'socket.io-client';
import {Match} from "./match";

export const pariParser = () => {
  document.ready(4500).then(() => {
    let mode = '';
    const parimatch = new Parimatch();
    let matchList = [];


    if (document.location.href.includes('live')) {
      mode = 'list'
    } else if (document.location.href.includes('event')) {
      mode = 'match'
    }

    console.log('parimatch');
    const socket = io('https://www.rmbets.site', {
      transports: ['websocket'],
      query: {
        im: 'parimatch',
      }
    });
    socket.on('connect', () => {
      if (mode === 'list') {
        console.log('Авторизуюсь');
        socket.emit('auth', {
          username: 'parimatch'
        });
        if (matchList.length) {
          socket.emit('parimatch_match_list', {
            matchList
          })
        }
      }
    });

    socket.on('open_from_parimatch', src => {
      console.log('OPEN FROM PARI');
      console.log(src);
      chrome.runtime.sendMessage({
        service: 'parimatch',
        mode: 'open',
        src
      })
    });

    /*
    Если мы находимся на главной странице, переходим на страницу Live
    */
    if (document.location.href === 'https://www.parimatch.ru/') {
      document.location.href = 'https://www.parimatch.ru/live'
    }



    console.log(mode);
    if (mode === 'list') {
      window.scrollTo(0, document.querySelector('.sportcolor-bg-CyberSport').getBoundingClientRect().top);
      document.wait(500).then(() => {

        (() => {
          setInterval(() => {

            parimatch.esportListGroup.forEach(elem => {
              if (elem.children[0].innerText.includes('Киберспорт')) {
                parimatch.matchListContainer = elem.children[1].children[0].children[0]
              }
            });
            let tempMatchList = [];
            if (parimatch.matchListContainer) {
              for (let i = 0; i < parimatch.matchListContainer.childElementCount; i++) {
                if (parimatch.matchListContainer.children[i].innerText.includes('Counter-Strike')) {
                  for (let z = 0; z < parimatch.matchListContainer.children[i].children[1].childElementCount; z++) {
                    tempMatchList.push({
                      href: parimatch.matchHref(i, z),
                      teams: {
                        left: parimatch.matchTeamNames(i, z).left,
                        right: parimatch.matchTeamNames(i, z).right
                      }
                    })
                  }
                }
              }
            } else tempMatchList = [];

            if (JSON.stringify(tempMatchList) !== JSON.stringify(matchList)) {
              matchList = tempMatchList;
              console.log(matchList);
              socket.emit('parimatch_match_list', {
                matchList
              })
            }

          }, 1000)
        })();
      });
    }
    else if (mode === 'match') {
      setTimeout(() => {
        document.location.reload()
      }, 300000);
      let matchData = {};

      const match = new Match();
      (() => {
        setInterval(() => {
          let tempMatchData = {
            teams: match.teams(),
            map: match.mapNum(),
            odds: match.odds(),
            src: document.location.href
          }

          if (JSON.stringify(tempMatchData) !== JSON.stringify(matchData)) {
            matchData = tempMatchData;
            console.log(matchData)
            socket.emit('parimatch_single_match', matchData)
          }

        },50)
      })()
    }
  })
};
