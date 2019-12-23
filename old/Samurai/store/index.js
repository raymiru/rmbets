import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = () => new Vuex.Store({

  state: {
    bets: {
      now: []
    },

    play: {
      list: []
    }
  },
  mutations: {
    updateBetsNowMatches (state, payload) {
      state.bets.now = payload
    }
  }
});

export default store
