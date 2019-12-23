export class Bet365 {
  constructor() {
    this.tournamentElements = document.querySelectorAll('.ipo-Competition-open');
  }

  mapNumber(match) {
    return match.children[0].children[0].children[2].childElementCount + 1
  }


  odds(match, mapNumber) {
    let leftOdds = null;
    let rightOdds = null;
    let title = match.children[1].children[0];
    if (title.innerText.trim() !== `Map ${mapNumber} - Winner 2-Way` && mapNumber != "3") {
      title.click();
      document.wait(350).then(() => {
        const popup = document.querySelector('.ipo-MarketSwitcherContainer');
        let found = false;
        for (let i = 0; i < popup.childElementCount; i++) {
          if (popup.children[i].innerText === `Map ${mapNumber} - Winner 2-Way`) {
            found = true
            popup.children[i].click();
            return
          }
          document.wait(50).then(() => {
            if (!found) {
              document.querySelector('body').click();
              return
            }
          })

        }

      });

    } else {
      return {
        left: match.children[1].children[1].children[0].children[1].innerText.trim(),
        right: match.children[1].children[1].children[1].children[1].innerText.trim()
      }
    }
  }


  teams(match, mapNumber) {
    return {
      id: match.children[0].children[0].children[1].children[0].innerText.trim() + match.children[0].children[0].children[1].children[1].innerText.trim(),
      teams: {
        left: {
          name: match.children[0].children[0].children[1].children[0].innerText.trim(),
          score: match.children[0].children[0].children[3].children[0].children[0].innerText.trim(),

        },
        right: {
          name: match.children[0].children[0].children[1].children[1].innerText.trim(),
          score: match.children[0].children[0].children[3].children[0].children[1].innerText.trim(),
        },
        odds: this.odds(match, mapNumber)
      }
    }
  }
}