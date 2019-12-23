export class Matches {
  /**
   * Тип матча - now или next
   * @param type {string}
   */
  constructor(type) {
    /**
     * Тип матча
     * @type {string}
     */
    this._type = 'timerange_' + type;
    /**
     * Общий div для определленого типа матчей
     * @type {Element}
     */
    this._list = document.querySelector(`.${this._type} >:nth-child(2) >:nth-child(1)`);

  }

  get list() {
    return this._list
  }

  /**
   * Количество матчей данного типа
   * @type {number}
   */
  get count() {
    try {
      return this._list.childElementCount
    } catch (e) {
      throw e
    }
  }

  /**
   * Возвращает матч
   * @param num
   * @returns {Element}
   */
  getMatch(num) {
    try {
      return this._list.children[num]
    } catch (e) {
      throw e
    }
  }

  /**
   * Возвращает div элемента матча
   * @param matchNum номер матча
   * @param side номер блока, 0 - левый, 1 - средний, 2 - правый
   * @returns {Element}
   */
  getInfoBlock(matchNum, side) {
    try {
      return this.getMatch(matchNum).children[0].children[0].children[3].children[side]
    } catch (e) {
      throw e
    }
  }

  /**
   * Возвращает div дополнительных событий матча
   * @param matchNum
   * @returns {Element}
   */
  getAdditionalEventsBlock(matchNum) {
    try {
      return this.getMatch(matchNum).children[1].children[0];
    } catch (e) {
      throw e
    }
  }

  /**
   * Получить объект с ссылкой на картинку и названием турнира
   * @param matchNum
   * @returns {{src: string, title: string}}
   */
  getTournament(matchNum) {
    try {
      return {
        src: this.getMatch(matchNum).children[0].children[0].children[0].children[0].children[0].children[0].src,
        title: this.getMatch(matchNum).children[0].children[0].children[0].children[0].children[0].children[1].innerText
      }
    } catch (e) {
      return {
        src: this.getMatch(matchNum).children[0].children[0].children[0].children[0].children[0].src,
        title: this.getMatch(matchNum).children[0].children[0].children[0].children[0].children[1].innerText
      }
    }
  }

  /**
   * Получить объект  с информацией о команде
   * @param matchNum номер матча
   * @param side номер блока
   * @returns {{src: string, title: string}}
   */
  getTeamInfo(matchNum, side) {
    try {
      const betButtonOpen = () => {
        if (side === 0) return !this.getMatch(matchNum).classList.contains('bet-live-left-lock');
        else if (side === 2) return !this.getMatch(matchNum).classList.contains('bet-live-right-lock');
      };
      let logic = null;
      let money = null;
      let odds = null;
      if (side === 0) {
        logic = 2;
        money = this.getInfoBlock(matchNum, 1).children[0].children[0].children[0].children[1].innerText.trim();
        odds = this.getInfoBlock(matchNum, 1).children[0].children[0].children[0].children[2].children[0].innerText.trim()
      }
      else if (side === 2) {
        logic = 0;
        money = this.getInfoBlock(matchNum, 1).children[2].children[0].children[0].children[1].innerText.trim();
        odds = this.getInfoBlock(matchNum, 1).children[2].children[0].children[0].children[2].children[0].innerText.trim()
      }
      return {
        src: this.getInfoBlock(matchNum, side).children[2].children[0].src,
        title: this.getInfoBlock(matchNum, side).children[1].childNodes[logic].textContent.trim(),
        open: this.getLiveStatus(matchNum) && betButtonOpen(),
        money,
        odds
      }
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * Возращает true если матч в лайве, иначе возвращает false
   * @param matchNum номер матча
   * @returns {boolean}
   */
  getLiveStatus(matchNum) {
    try {
      return this.getMatch(matchNum).classList.contains('bet-live')
    } catch (e) {
      throw e
    }
  }

  getLiveStatusString(matchNum) {
    try {
      if (this.getMatch(matchNum).classList.contains('bet-live')) {
        return 'live'
      }
    } catch (e) {
      throw e
    }
  }

  /**
   * Возвращает data-id матча
   * @param matchNum
   * @returns {string}
   */
  getDataId(matchNum) {
    try {
      return this.getMatch(matchNum).getAttribute('data-id')
    } catch (e) {
      throw e
    }
  }

  getStatusBuilder(str) {
    return str.replace(/[^LIVElive\d]/g, '')
  }

  /**
   * Возвращает массив дополнинельных событий
   * @param matchNum номер матча
   * @returns {[]}
   */
  getAdditionalEvents(matchNum) {
    try {
      let additionalEvents = [];

      const topBlock = this.getAdditionalEventsBlock(matchNum).children[0];
      const botBlock = this.getAdditionalEventsBlock(matchNum).children[1];
      const open = side => {
        return window.getComputedStyle(side).pointerEvents !== 'none'
      };

      if (topBlock) {

        for (let i = 0; i < topBlock.childElementCount; i++) {
          const left = topBlock.children[i].children[0].children[3];
          const right = topBlock.children[i].children[0].children[5];

          additionalEvents.push({
            dataId: topBlock.children[i].children[0].getAttribute('data-id'),
            title: topBlock.children[i].children[0].children[4].innerText.trim(),
            // money: {
            //   left: {
            //     sum: left.innerText.trim().replace(/\s/g, ''),
            //     open: open(left)
            //   },
            //   right: {
            //     sum: right.innerText.trim().replace(/\s/g, ''),
            //     open: open(right)
            //   }
            // }
          });
        }
      }

      if (botBlock) {
        for (let i = 0; i < botBlock.childElementCount; i++) {
          const left = botBlock.children[i].children[0].children[3];
          const right = botBlock.children[i].children[0].children[5];

          additionalEvents.push({
            dataId: botBlock.children[i].children[0].getAttribute('data-id'),
            title: botBlock.children[i].children[0].children[4].innerText.trim(),
            // money: {
            //   left: {
            //     sum: left.innerText.trim().replace(/\s/g, ''),
            //     open: open(left)
            //   },
            //   right: {
            //     sum: right.innerText.trim().replace(/\s/g, ''),
            //     open: open(right)
            //   }
            // }
          })
        }
      }

      return additionalEvents
    } catch (e) {
      document.location.reload()
    }
  }

  /**
   * Возвращает текущий статус матча
   * @param matchNum
   * @returns {string}
   */
  getMatchStatus(matchNum) {
    try {
      if (this.getLiveStatus(matchNum)) {
        return this.getInfoBlock(matchNum, 1).children[1].innerText.trim()
      } else {
        return 'current'
      }
    } catch (e) {
      throw e
    }
  }

  /**
   * Возвращает время начала матча
   * @param matchNum
   * @returns {string}
   */
  getStartTime(matchNum) {
    try {
      return this.getInfoBlock(matchNum, 1).children[1].children[0].children[0].innerText.trim()
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * Возвращает время до начала матча
   * @param matchNum
   * @returns {string}
   */
  getTimeToStart(matchNum) {
    try {
      return this.getInfoBlock(matchNum, 1).children[1].children[0].children[1].innerText.trim()
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * Возвращает количество карт
   * @param matchNum
   * @returns {number}
   */
  getBO(matchNum) {
    try {
      return parseInt(this.getInfoBlock(matchNum, 1).children[1].children[0].children[3].innerText.trim().substr(-1))
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * Возвращает номер текущей карты
   * @param matchNum
   * @returns {number|string|null}
   */
  getMapNumber(matchNum) {
    try {
      if (this.getMatchStatus(matchNum).includes('LIVE на карту')) {
        return this.getMatchStatus(matchNum).substr(-1)
      } else if (this.getMatchStatus(matchNum).includes('LIVE на матч')) {
        return "1"
      } else return null
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * Возвращает data-id на live
   * @param matchNum
   * @returns {string}
   */
  getLiveDataId(matchNum) {
    try {
      let mapNumber = this.getMapNumber(matchNum);
      let liveDataId = null;
      if (this.getMatchStatus(matchNum) === 'LIVE на матч') {
        liveDataId = this.getDataId(matchNum)
      } else {
        if (mapNumber) {
          this.getAdditionalEvents(matchNum).forEach(elem => {
            if (elem.title === `[Карта #${mapNumber}] Победа на карте`) {
              liveDataId = elem.dataId
            }
          })
        }
      }

      return liveDataId
    } catch (e) {
      console.error(e)
    }
  }
}
