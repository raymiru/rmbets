export class Match {
  constructor() {

    /**
     * Табло со счетом
     * @type {Element}
     * @private
     */
    this._scoreboard = document.querySelector('.scoreboard-table').children[1];

    /**
     * Список маркетов на матч
     * @type {NodeListOf<Element>}
     * @private
     */
    this._eventMarkets = document.querySelectorAll('.event-market');
  }

  /**
   * @returns {Element}
   */
  get scoreboard() {
    return this._scoreboard
  }

  get eventMarkets() {
    return this._eventMarkets
  }

  mapNum() {
    return this.scoreboard.children[0].childElementCount - 2
  }

  teams() {
    const elemCount = this.scoreboard.children[0].childElementCount;
    return {
      left: {
        name: this.scoreboard.children[0].children[0].innerText,
        score: this.scoreboard.children[0].children[this.mapNum()].innerText
      },
      right: {
        name: this.scoreboard.children[1].children[0].innerText,
        score: this.scoreboard.children[1].children[this.mapNum()].innerText
      }
    }
  }

  odds() {

    try {
      let odds = {
        winner: {},
        "1": {},
        "2": {},
        "3": {}
      };
      this.eventMarkets.forEach(elem => {



          if (elem.children[0].innerText === (`Победитель. Карта ${this.mapNum()}`)) {

            odds[this.mapNum()].left = elem.children[1].children[1].children[0].children[0].children[1].innerText;
            odds[this.mapNum()].right = elem.children[1].children[1].children[0].children[1].children[1].innerText
          }

          else if (elem.children[0].innerText === (`Результат матча`)) {

            odds['winner'].left = elem.children[1].children[1].children[0].children[0].children[1].innerText;
            odds['winner'].right = elem.children[1].children[1].children[0].children[1].children[1].innerText
          }

      });
      return odds
    } catch (e) {
      console.error(e)
    }
  }
}