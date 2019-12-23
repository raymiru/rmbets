export class Matches {
  constructor() {
    this.tournamentEvents = document.querySelectorAll('.sportEventRowNew__container___1iQKC');

    this.sportEvents = document.querySelectorAll('.sportEventRowNew__container___1iQKC');
    this.liveButton = document.querySelector('.__app-Categorizer-container').children[0];

    this._matchContainer = document.querySelector("#betting__container").children[0].children[1].children[0].children[0]
        .children[0].children[0];

    this._topMatchBlock = this._matchContainer.children[0];
    this._oddsMatchBlock = this._matchContainer.children[2];
  }




  teams(match) {
    return {
      src: match.children[1].children[2].children[0].children[1].children[0].href,
      teams: {
        left: match.children[1].children[2].children[0].children[1].children[0].innerText.trim(),
        right: match.children[1].children[2].children[2].children[0].children[0].innerText.trim()
      }
    }
  }

  getMatchId() {
    return document.location.href.replace(/[^0-9]/g,'')
  }


  /**
   * Возвращает элемент матч контейнер
   * @returns {Element}
   */
  get matchContainer() {
    return this._matchContainer
  }

  // checkStreamBlock() {
  //   return !!document.querySelector("#betting__container").children[0].children[1].children[0].children[0].children[0];
  // }

  /**
   * Возвращает топ блок матча с названиями команд и турнироа
   * @returns {Element}
   */
  get topMatchBlock() {
      return this.matchContainer.children[0]
  }

  /**
   * Возвращает true если есть доступные маркеты
   * @returns {boolean}
   */
  marketsAreOpen() {
    return this.matchContainer.children[1].innerText !== 'Нет доступных маркетов'
  }

  /**
   * Блок с коэфициентами
   * @returns {Element}
   */
  get oddsMatchBlock() {
    return this.matchContainer.children[2]
  }


  /**
   * Возвращает названия команд
   * @returns {{left: string, right: string}}
   */
  getTeamNames() {
    try {
      return {
        left: this.topMatchBlock.children[0].children[0].children[0].children[0].children[0].children[0].innerText.split('vs')[0].trim(),
        right: this.topMatchBlock.children[0].children[0].children[0].children[0].children[0].children[0].innerText.split('vs')[1].trim(),
      }
    } catch (e) {
      console.error(e)
    }
  }


  getGameNameAndStatus() {
    let str = this.topMatchBlock.children[2].children[0].children[1].innerText.split(',');
    return {
      game: str[0].trim(),
      status: str[1].trim()
    }
  }

  /**
   * Возвращает название стрима
   * @returns {string|*}
   */
  getStreamChannel() {
    try {
      let src = null
      if (this.checkStreamBlock() &&
          document.querySelector("#betting__container").children[0].children[1].children[0].children[0].children[0]
              .children[0].children[0].children[1].children[0].children[0].children[0]) {
        src = document.querySelector("#betting__container").children[0].children[1].children[0].children[0].children[0]
            .children[0].children[0].children[1].children[0].children[0].children[0].children[0].src;
      }

      if (src) {
        let start_pos = src.indexOf('=') + 1
        let end_pos = src.indexOf('&', start_pos);
        return src.substring(start_pos, end_pos);
      } else return null
    } catch (e) {
      console.error(e)
    }
  }

  getOdds() {
    try {

      if (this.oddsMatchBlock) {
        let odds = {};

        for (let i = 0; i < this.oddsMatchBlock.childElementCount; i++) {
          let title = this.oddsMatchBlock.children[i].children[0].children[0].innerText;
          let oddsBlock = this.oddsMatchBlock.children[i];

          if (title === 'WINNER') {

              odds.winner = {
                title: 'winner',
                left: oddsBlock.children[1].children[0].innerText,
                right: oddsBlock.children[1].children[1].innerText
              }

          }

          // else if (title === 'TOTAL MAPS') {
          //   oddsArr.push({
          //     totalMaps: {
          //       title: 'total maps',
          //       total: oddsBlock.children[1].children[0].innerText,
          //       over: oddsBlock.children[1].children[1].innerText,
          //       under: oddsBlock.children[1].children[2].innerText
          //     }
          //   })
          // }

          else if (title === '1 MAP - WINNER (INCL. OVERTIME)') {
              odds["1"] = {
                title: '1 map winner (incl. overtime)',
                left: oddsBlock.children[1].children[0].innerText,
                right: oddsBlock.children[1].children[1].innerText
              }
          }

          else if (title === '2 MAP - WINNER (INCL. OVERTIME)') {
              odds["2"] = {
                title: '2 map winner (incl. overtime)',
                left: oddsBlock.children[1].children[0].innerText,
                right: oddsBlock.children[1].children[1].innerText
              }
          }

          else if (title === '3 MAP - WINNER (INCL. OVERTIME)') {
              odds["3"] = {
                title: '3 map winner (incl. overtime)',
                left: oddsBlock.children[1].children[0].innerText,
                right: oddsBlock.children[1].children[1].innerText
              }
          }

        //   else if (title === 'MAP 3 - PISTOL ROUND WINNER') {
        //     if (oddsBlock.childElementCount === 2) {
        //       oddsArr.push({
        //         map3PistolRoundWinner: {
        //           title: 'map 3 pistol round winner',
        //           secondHalf: {
        //             left: oddsBlock.children[1].children[1].innerText,
        //             right: oddsBlock.children[1].children[2].innerText
        //           }
        //         }
        //       })
        //     } else if (oddsBlock.childElementCount === 3) {
        //       oddsArr.push({
        //         map3PistolRoundWinner: {
        //           title: 'map 3 pistol round winner',
        //           firstHalf: {
        //             left: oddsBlock.children[1].children[1].innerText,
        //             right: oddsBlock.children[1].children[2].innerText
        //           },
        //           secondHalf: {
        //             left: oddsBlock.children[2].children[1].innerText,
        //             right: oddsBlock.children[2].children[2].innerText
        //           }
        //         }
        //       })
        //     }
        //   }
        //
        //   else if (title === 'MAP 2 - PISTOL ROUND WINNER') {
        //     if (oddsBlock.childElementCount === 2) {
        //       oddsArr.push({
        //         map2PistolRoundWinner: {
        //           title: 'map 2 pistol round winner',
        //           secondHalf: {
        //             left: oddsBlock.children[1].children[1].innerText,
        //             right: oddsBlock.children[1].children[2].innerText
        //           }
        //         }
        //       })
        //     } else if (oddsBlock.childElementCount === 3) {
        //       oddsArr.push({
        //         map2PistolRoundWinner: {
        //           title: 'map 2 pistol round winner',
        //           firstHalf: {
        //             left: oddsBlock.children[1].children[1].innerText,
        //             right: oddsBlock.children[1].children[2].innerText
        //           },
        //           secondHalf: {
        //             left: oddsBlock.children[2].children[1].innerText,
        //             right: oddsBlock.children[2].children[2].innerText
        //           }
        //         }
        //       })
        //     }
        //   }
        //
        //   else if (title === 'MAP 1 - PISTOL ROUND WINNER') {
        //     if (oddsBlock.childElementCount === 2) {
        //       oddsArr.push({
        //         map1PistolRoundWinner: {
        //           title: 'map 1 pistol round winner',
        //           secondHalf: {
        //             left: oddsBlock.children[1].children[1].innerText,
        //             right: oddsBlock.children[1].children[2].innerText
        //           }
        //         }
        //       })
        //     } else if (oddsBlock.childElementCount === 3) {
        //       oddsArr.push({
        //         map1PistolRoundWinner: {
        //           title: 'map 1 pistol round winner',
        //           firstHalf: {
        //             left: oddsBlock.children[1].children[1].innerText,
        //             right: oddsBlock.children[1].children[2].innerText
        //           },
        //           secondHalf: {
        //             left: oddsBlock.children[2].children[1].innerText,
        //             right: oddsBlock.children[2].children[2].innerText
        //           }
        //         }
        //       })
        //     }
        //   }
        //
        //   else if (title === '1 MAP - TOTAL ROUNDS (INCL. OVERTIME)') {
        //     for (let i = 1; i < oddsBlock.childElementCount; i++) {
        //       if (oddsBlock.children[i].children[0].innerText == "26.5") {
        //         oddsArr.push({
        //           map1Total_26_5: {
        //             left: oddsBlock.children[i].children[1].innerText,
        //             right: oddsBlock.children[i].children[2].innerText
        //           }
        //         })
        //       }
        //     }
        //   }
        //
        //   else if (title === '2 MAP - TOTAL ROUNDS (INCL. OVERTIME)') {
        //     for (let i = 1; i < oddsBlock.childElementCount; i++) {
        //       if (oddsBlock.children[i].children[0].innerText == "26.5") {
        //         oddsArr.push({
        //           map2Total_26_5: {
        //             left: oddsBlock.children[i].children[1].innerText,
        //             right: oddsBlock.children[i].children[2].innerText
        //           }
        //         })
        //       }
        //     }
        //   }
        //
        //   else if (title === '3 MAP - TOTAL ROUNDS (INCL. OVERTIME)') {
        //     for (let i = 1; i < oddsBlock.childElementCount; i++) {
        //       if (oddsBlock.children[i].children[0].innerText == "26.5") {
        //         oddsArr.push({
        //           map3Total_26_5: {
        //             left: oddsBlock.children[i].children[1].innerText,
        //             right: oddsBlock.children[i].children[2].innerText
        //           }
        //         })
        //       }
        //     }
        //   }
        }
        return odds
      } else {
        return null
      }
    } catch (e) {
      console.error(e)
    }
  }

}