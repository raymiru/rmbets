import {Gorilla} from "./gorilla";

export function gorillaParser() {

  console.log('gorillaParser11');


  document.ready(4000).then(() => {
    let mode = null;

    if (document.location.href.includes('bets')) {
      mode = 'match'
    } else mode = 'list';

    const gorilla = new Gorilla();

    if (mode === 'list') {
      (async () => {
        gorilla.csgoButton.click();
        await document.wait(500);
        gorilla.liveButton.click();
        await document.wait(2000);

        gorilla.matchListContainer = true;
        console.log(gorilla.matchListContainer.childElementCount);

        let currentList = [];
        let src = null;
        setInterval(() => {
          for (let i = 0; i < gorilla.matchListContainer.childElementCount; i++) {
            src = gorilla.getMatchLink(i);

            chrome.runtime.sendMessage({
              service: 'gorilla_parser',
              mode: 'list',
              data: {
                src,
                // id: src.replace(/[^0-9]/g,'')
              }
            })
          }
        }, 2000)
      })()
    }
    else if (mode === 'match') {
      let exportedMatchData = {};

      console.log('MATCH');

      function parseOdds() {
        let odds = {};
        gorilla.oddsContainer.forEach(elem => {
          if (elem.children[0].innerText.trim() === 'РЕЗУЛЬТАТ МАТЧА') {
            odds.winner = {
              title: 'winner',
              left: elem.children[1].children[0].children[0].children[1].innerText,
              right: elem.children[1].children[0].children[1].children[1].innerText
            }
          }
          else if (elem.children[0].innerText.trim() === 'ПОБЕДИТЕЛЬ. КАРТА 1') {
            odds.map1 = {
              title: 'map1',
              left: elem.children[1].children[0].children[0].children[1].innerText,
              right: elem.children[1].children[0].children[1].children[1].innerText
            }
          }
          else if (elem.children[0].innerText.trim() === 'ПОБЕДИТЕЛЬ. КАРТА 2') {
            odds.map2 = {
              title: 'map2',
              left: elem.children[1].children[0].children[0].children[1].innerText,
              right: elem.children[1].children[0].children[1].children[1].innerText
            }
          }
          else if (elem.children[0].innerText.trim() === 'ПОБЕДИТЕЛЬ. КАРТА 3') {
            odds.map3 = {
              title: 'map3',
              left: elem.children[1].children[0].children[0].children[1].innerText,
              right: elem.children[1].children[0].children[1].children[1].innerText
            }
          }
          else if (elem.children[0].innerText.trim() === 'ПОБЕДИТЕЛЬ. КАРТА 4') {
            odds.map4 = {
              title: 'map4',
              left: elem.children[1].children[0].children[0].children[1].innerText,
              right: elem.children[1].children[0].children[1].children[1].innerText
            }
          }
          else if (elem.children[0].innerText.trim() === 'ПОБЕДИТЕЛЬ. КАРТА 5') {
            odds.map5 = {
              title: 'map5',
              left: elem.children[1].children[0].children[0].children[1].innerText,
              right: elem.children[1].children[0].children[1].children[1].innerText
            }
          }
        });
        return odds
      }

      let tempScore = null;

      function parseScore() {
        if (gorilla.score.children[0] && gorilla.score.children[1]) {
          tempScore = {
            left: gorilla.score.children[0].innerText,
            right: gorilla.score.children[1].innerText
          };
          return {
            left: gorilla.score.children[0].innerText,
            right: gorilla.score.children[1].innerText
          }
        } else return tempScore
      }

      function parseData() {
        try {
          if (gorilla.oddsContainer) {
            return {
              stream: gorilla.streamName,
              teams: {
                left: gorilla.teamNames[0].innerText,
                right: gorilla.teamNames[1].innerText,
              },
              odds: parseOdds(),
              score: parseScore()
            }
          }
        } catch (e) {
          console.error(e)
        }
      }

      (() => {
        setInterval(() => {
          let tempMatchData = parseData();
          if (JSON.stringify(tempMatchData) !== JSON.stringify(exportedMatchData)) {
            exportedMatchData = tempMatchData;
            console.log(exportedMatchData);
            chrome.runtime.sendMessage({
              service: 'gorilla_parser',
              mode,
              match: exportedMatchData,
              match_id: gorilla.getMatchId()
            })
          }
        }, 50)
      }) ();
    }
  })

}