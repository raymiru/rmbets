export class Gorilla {
  constructor() {
    this._menuContainer = document.querySelector("#app > div.site-wrapper > main > div > div.col_center.col_center--main > section > aside > nav");
    this._matchListContainer = null;
    this._matchBodyContainer = document.querySelector("#app > div.site-wrapper > main > div > div.col_center > section");
    this._liveButton = document.querySelector("#app > div.site-wrapper > main > div > div.col_center.col_center--main > section > div > div.lobby__board > div > div.board__head > div.board__nav > span:nth-child(2) > a");
    this._streamLink = document.querySelector('.button__video-picker_current');
    this._oddsContainer = document.querySelectorAll('.game-event__market');
    this._teamNames = document.querySelectorAll('.stats-competitor__name');
    this._score = document.querySelector('.stats-score-box__score');
  }

  /**
   * Кнопка csgo в списке меню
   * @returns {Element}
   */
  get csgoButton() {
    return this._menuContainer.children[9]
  }

  get liveButton() {
    return this._liveButton
  }
  get matchListContainer() {
    return this._matchListContainer
  }

  get teamNames() {
    return this._teamNames
  }

  /**
   *
   * @returns {Element}
   */
  get score() {
    return this._score
  }

  get streamName() {
    return this._streamLink.innerText
  }

  get oddsContainer() {
    return this._oddsContainer
  }

  set matchListContainer(ready) {
    if (ready) this._matchListContainer = document.querySelector("#app > div.site-wrapper > main > div > div.col_center.col_center--main > section > div > div.lobby__board > div > div.board__line.board__line_live > div")
  }

  getMatchLink(i) {
    return this._matchListContainer.children[i].children[1].children[0].children[0].href
  }

  getMatchId() {
    return document.location.href.replace(/[^0-9]/g,'')
  }
}

