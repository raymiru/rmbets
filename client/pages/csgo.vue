<template>
  <div id="csgo_wrapper">
    <div :class="{hide: $store.state.matches.mode === 'next'}">
      <div v-if="$store.state.matches.CSGO.now !== null">
        <BetItemCSGO
          v-for="(match, index) in $store.state.matches.CSGO.now"
          :class="{hide: match.STATUS !== $store.state.matches.status && $store.state.matches.status !== 'all'}"
          :index="match.LIVE_INDEX"
          :liveDataIds="match.LIVE_DATA_IDS"
          :key="match.DATA_ID"
          :dataId="match.DATA_ID"
          :tournamentLogo="match.TOURNAMENT_LOGO"
          :status="match.STATUS"
          :statusString="match.STATUS_STRING"
          :statusBuilder="match.STATUS_BUILDER"
          :teamA="match.TEAM_A"
          :teamB="match.TEAM_B"
        ></BetItemCSGO>
      </div>
      <div v-else>
        <v-card-text>{{ $store.state.errorMessage }}</v-card-text>
      </div>
    </div>
    <div :class="{hide: $store.state.matches.mode === 'now'}">
      <div v-if="$store.state.matches.CSGO.next !== null">
        <BetItemCSGONext
          v-for="match in $store.state.matches.CSGO.next"
          :key="match.DATA_ID"
          :additionalEvents="match.ADDITIONAL_EVENTS"
          :dataId="match.DATA_ID"
          :tournamentLogo="match.TOURNAMENT_LOGO"
          :statusString="match.STATUS_STRING"
          :teamA="match.TEAM_A"
          :teamB="match.TEAM_B"
        ></BetItemCSGONext>
      </div>
    </div>
  </div>
</template>

<script>
  import BetItemCSGO from '~/components/BetItemCSGO.vue'
  import BetItemCSGONext from '~/components/BetItemCSGONext.vue'

  import Chance from 'chance'


  const chance = new Chance()

  export default {
    name: 'Index',
    components: {
      BetItemCSGO,
      BetItemCSGONext
    },
    data() {
      return {
        oddsIds: {},
        matchNowIndex: null
      }
    },

    mounted() {
      let elem = document.querySelector('body');
      const findStartItem = () => {
        if (document.getElementById('0')) {
          document.getElementById('0').focus()
        }
      }

      const listener = (e) => {
        if (e.key === 'ArrowDown') {
          if (document.activeElement.id !== '') {
            this.matchNowIndex = parseInt(document.activeElement.id)
            if (document.getElementById(`${this.matchNowIndex + 1}`) && document.getElementById(`${this.matchNowIndex + 1}`).id) {
              document.getElementById(`${this.matchNowIndex + 1}`).focus()
              this.matchNowIndex = parseInt(document.activeElement.id)
            }
          } else {
            findStartItem()
          }
        } else if (e.key === 'ArrowUp') {
          if (document.activeElement.id !== '') {
            this.matchNowIndex = parseInt(document.activeElement.id)
            if (document.getElementById(`${this.matchNowIndex -1}`) && document.getElementById(`${this.matchNowIndex - 1}`).id) {
              document.getElementById(`${this.matchNowIndex - 1}`).focus()
              this.matchNowIndex = parseInt(document.activeElement.id)
            }
          } else {
            findStartItem()
          }
        }
      }

      elem.addEventListener('keydown', e => {
        if (this.$router.history.current.path === '/csgo') {
          listener(e)
        }
      })
    },


    methods: {
      rand() {
        return chance.integer()
      }
    }
  }
</script>

<style scoped>
  .hide {
    display: none;
  }
</style>
