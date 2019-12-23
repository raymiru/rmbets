module.exports =  class Esea {
  constructor() {
    this._ongoingMatches = 'https://play.esea.net/api/league_overview'
  }

  get ongoingMatches() {
    return this._ongoingMatches
  }

  getMatchLink(id) {
    return 'https://play.esea.net/match/' + id
  }

}