import {Bet365} from "./bet365";
import io from "socket.io-client";

export function bet365Parser() {
  console.log('bet365');


  document.ready(2500).then(() => {
    setTimeout(() => {
      document.location.reload()
    }, 300000);

    const socket = io('https://www.rmbets.site', {
      transports: ['websocket'],
      query: {
        im: 'bet365',
      }
    });
    socket.on('connect', () => {

        console.log('Авторизуюсь');
        socket.emit('auth', {
          username: 'bet365'
        });

    });

    const bet365 = new Bet365();

    let matchList = [];

    setInterval(() => {
      let tempMatchList = [];

      bet365.tournamentElements.forEach(async elem => {
        if (elem.innerText.includes('CS:GO')) {
          for (let i = 0; i < elem.children[2].childElementCount; i++) {
            let match = elem.children[2].children[i].children[0];
            let mapNumber = bet365.mapNumber(match)
            tempMatchList.push(bet365.teams(match, mapNumber))
          }
        }
      })

      if (JSON.stringify(tempMatchList) !== JSON.stringify(matchList)) {
        matchList = tempMatchList
        console.log(tempMatchList)
        socket.emit('bet365_match_list', {
          matchList
        })
      }


    },610)
  })
}