export class Parimatch {
  constructor() {
    /**
     * dom элемент - список лайв матчей по киберспорту
     * @type {Element}
     * @private
     */
    this._esportLiveGroup = document.querySelectorAll('.live-group');
    this._matchListContainer = null

  }

  get esportListGroup() {
    return this._esportLiveGroup
  }

  set matchListContainer(elem) {
    this._matchListContainer = elem
  }

  /**
   * Геттер matchListContainer
   * @type {Element}
   */
  get matchListContainer() {
      return this._matchListContainer
  }

  /**
   * Возвращает названия команд элемента списка матчей
   * @param i номер турнира
   * @param z номер матча
   * @returns {{left: string, right: string}}
   */
  matchTeamNames(i, z) {
    return {
      left: this.matchListContainer.children[i].children[1].children[z].children[0].children[0].children[1].children[0].children[0].innerText.split('-')[0].trim(),
      right: this.matchListContainer.children[i].children[1].children[z].children[0].children[0].children[1].children[0].children[0].innerText.split('-')[1].trim()
    }
  }

  /**
   * Возвращает ссылку на матч
   * @returns {{href: *}}
   */
  matchHref(i, z) {
    return this.matchListContainer.children[i].children[1].children[z].children[0].children[0].children[1].children[0].children[0].href

  }

}