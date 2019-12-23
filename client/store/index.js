import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const initialState = () => {
  return {
    errorMessage: '',

    matches: {
      mode: 'now',
      status: 'all',
      DOTA2: {
        now: [],
        next: []
      },
      CSGO: {
        now: [],
        next: []
      }
    },
    steamApiData: [],
    parimatchData: [],
    ggbetData: [],
    bet365Data: [],
    eseaData: [],
    players: [],
    playersBets: {},
    listReadyToBetPlayers: {}
  }
}


// noinspection JSValidateTypes
const store = () =>
  new Vuex.Store({
    state: initialState,
    mutations: {
      resetState(state) {
        state.matches.DOTA2.now = []
        state.matches.CSGO.now = []
        state.matches.DOTA2.next = []
        state.matches.CSGO.next = []
        state.players = []
        state.playersBets = {}
        state.steamApiData = []
      },


      errorMessageThrow(state, payload) {
        state.errorMessage = payload
      },

      setMatchMode(state, payload) {
        state.matches.mode = payload
      },

      setMatchStatus(state, payload) {
        state.matches.status = payload
      },

      parimatchMatchList(state, payload) {
        state.parimatchData = payload
      },

      ggbetMatchList(state, payload) {
        state.ggbetData = payload
      },

      bet365MatchList(state, payload) {
        state.bet365Data = payload
      },

      eseaMatchList(state, payload) {
        state.eseaData = payload
      },

      clearComponent(state, id) {
        state.matches.CSGO.now.forEach((match, index, array) => {
          if(match.DATA_ID === id) {
            array.splice(index, 1)
          }
        })
      },

      matchesSyncDOTA2Now(state, payload) {
        state.matches.DOTA2.now = initialState().matches.DOTA2.now
        state.matches.DOTA2.now = payload
      },

      matchesSyncDOTA2Next(state, payload) {
        state.matches.DOTA2.next = initialState().matches.DOTA2.next
        state.matches.DOTA2.next = payload
      },

      matchesSyncCSGONow(state, payload) {
        state.matches.CSGO.now = payload
      },

      matchesSyncCSGONext(state, payload) {
        state.matches.CSGO.next = payload
      },

      steamApiDataSync(state, payload) {

        state.steamApiData = payload
      },

      playersBetsSync(state, payload) {
        state.playersBets = null
        state.playersBets = payload
      },

      playersSync(state, payload) {
        state.players = null
        state.players = payload
      },
      playersMatchSync(state, payload) {
        state.players[payload.index].match = payload.dataId
      }
    }
  })

export default store
