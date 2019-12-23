<template>
  <v-card>
    <v-dialog v-model="playersDialog" max-width="1200px" min-height="600px">
      <v-card>
        <v-flex>
          <v-card-title>Players List</v-card-title>
        </v-flex>
        <v-layout style="font-size: 13px">
          <v-flex md3>
            <v-layout>
              <v-flex md4>
                <v-card-text>PLAYER</v-card-text>
              </v-flex>
              <v-flex md4>
                <v-card-text>BANK</v-card-text>
              </v-flex>
              <v-flex md4>
                <v-card-text>TEAM</v-card-text>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex offset-md1 md8>
            <v-layout>
              <v-flex md6>
                <v-layout>
                  <v-flex md4>
                    <v-card-text>ODDS</v-card-text>
                  </v-flex>
                  <v-flex md4>
                    <v-card-text>TOTAL BET</v-card-text>
                  </v-flex>
                  <v-flex md4>
                    <v-card-text>TOTAL P.WIN</v-card-text>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex offset-md1 md5>
                <v-card-text>CONTROL</v-card-text>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <div
          style="border-top: gray 2px groove"
          v-for="(data, index) in $store.state.players"
          :key="data.match_id">
          <v-layout
            v-if="data.next_bets !== null && data.status === 'ready'"
          >

            <v-flex md3>
              <v-layout>
                <v-flex md4>
                  <v-card-text>{{data.username}}</v-card-text>
                </v-flex>
                <v-flex md4>
                  <v-card-text>{{data.bank}}</v-card-text>
                </v-flex>
                <v-flex v-if="bet.winSide === 1" md4>
                  <v-card-text>{{teamA.NAME}}</v-card-text>
                </v-flex>
                <v-flex v-else-if="bet.winSide === 3" md4>
                  <v-card-text>{{teamB.NAME}}</v-card-text>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex offset-md1 md8 v-if="bet.winSide === 1">
              <v-layout>
                <v-flex md6>
                  <v-layout>
                    <v-flex md4>
                      <v-card-text>{{teamA.ODDS}}</v-card-text>
                    </v-flex>
                    <v-flex md4 v-if="data.next_bets !== null">
                      <v-card-text>{{data.next_bets[dataId].LEFT_BET.TOTAL_BET}}</v-card-text>
                    </v-flex>
                    <v-flex md4 v-if="data.next_bets !== null">
                      <v-card-text>{{(parseFloat(data.next_bets[dataId].LEFT_BET.TOTAL_BET) * parseFloat(teamA.ODDS) - parseFloat(data.next_bets[dataId].LEFT_BET.TOTAL_BET)).toFixed(2)}}
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex v-if="data.next_bets[dataId].LEFT_BET.TOTAL_BET == '0' && data.next_bets[dataId].RIGHT_BET.TOTAL_BET == '0'" offset-md1 md5>
                  <v-layout>
                    <v-flex md6>
                      <v-text-field v-model="bet.left[data.username]" label="BET SIZE"></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-btn :class="{disable_events: !Number.isInteger(parseFloat(bet.left[data.username]))}" @click="placeBet(data.username, dataId, bet.winSide, bet.left[data.username])">BET</v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex v-else-if="data.next_bets[dataId].LEFT_BET.TOTAL_BET != '0'" offset-md1 md5>
                  <v-layout>
                    <v-flex md4>
                      <v-btn @click="cancelBet(data.username, dataId, bet.winSide)">CANCEL</v-btn>
                    </v-flex>
                    <v-flex md4>
                      <v-text-field v-model="bet.left[data.username]" label="BET SIZE"></v-text-field>
                    </v-flex>
                    <v-flex md4>
                      <v-btn :class="{disable_events: !Number.isInteger(parseFloat(bet.left[data.username]))}" @click="placeReBet(data.username, dataId, bet.winSide, bet.left[data.username])">REBET</v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex offset-md1 md8 v-else-if="bet.winSide === 3">
              <v-layout>
                <v-flex md6>
                  <v-layout>
                    <v-flex md4>
                      <v-card-text>{{teamB.ODDS}}</v-card-text>
                    </v-flex>
                    <v-flex md4 v-if="data.next_bets !== null">
                      <v-card-text>{{data.next_bets[dataId].RIGHT_BET.TOTAL_BET}}</v-card-text>
                    </v-flex>
                    <v-flex md4 v-if="data.next_bets !== null">
                      <v-card-text>{{(parseFloat(data.next_bets[dataId].RIGHT_BET.TOTAL_BET) * parseFloat(teamB.ODDS) - parseFloat(data.next_bets[dataId].RIGHT_BET.TOTAL_BET)).toFixed(2)}}
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex v-if="data.next_bets[dataId].LEFT_BET.TOTAL_BET == '0' && data.next_bets[dataId].RIGHT_BET.TOTAL_BET == '0'" offset-md1 md5>
                  <v-layout>
                    <v-flex md6>
                      <v-text-field v-model="bet.right[data.username]" label="BET SIZE"></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-btn :class="{disable_events: !Number.isInteger(parseFloat(bet.right[data.username]))}" @click="placeBet(data.username, dataId, bet.winSide, bet.right[data.username])">BET</v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex v-else-if="data.next_bets[dataId].RIGHT_BET.TOTAL_BET != '0'" offset-md1 md5>
                  <v-layout>
                    <v-flex md4>
                      <v-btn @click="cancelBet(data.username, dataId, bet.winSide)">CANCEL</v-btn>
                    </v-flex>
                    <v-flex md4>
                      <v-text-field v-model="bet.right[data.username]" label="BET SIZE"></v-text-field>
                    </v-flex>
                    <v-flex md4>
                      <v-btn :class="{disable_events: !Number.isInteger(parseFloat(bet.right[data.username]))}" @click="placeReBet(data.username, dataId, bet.winSide, bet.right[data.username])">REBET</v-btn>
                    </v-flex>
                  </v-layout>

                </v-flex>
              </v-layout>
            </v-flex>



          </v-layout>
        </div>
      </v-card>
    </v-dialog>
    <v-container
      text-md-center
      justify-center
    >
      <v-card>
        <v-layout align-center style="border: gray 2px groove">
          <v-flex md2>
            <v-img :src="tournamentLogo"></v-img>
          </v-flex>
          <!--<v-flex md1>-->
          <!--<v-btn round @click="playersDialog = !playersDialog">-->
          <!--<v-icon>reorder</v-icon>-->
          <!--</v-btn>-->
          <!--</v-flex>-->
          <v-flex pa-1 offset-md1 md2 v-bind:class="{active_team_card: leftTotalBet !== 0}" class="team_card" @click="chooseWinner(1)">
            <v-layout align-center>
              <v-flex md3>
                <v-img :src="teamA.LOGO"></v-img>
              </v-flex>
              <v-flex md9>
                <v-card-text>{{ teamA.NAME }}</v-card-text>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex md1 class="odds_left">
            <v-layout align-center>
              <v-flex md6>x{{teamA.ODDS}}</v-flex>
              <v-flex md6>
                <v-flex>{{leftTotalBet}}</v-flex>
                <v-flex class="PWin">{{leftTotalPWin}}</v-flex>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex pa-2 md2 class="info_text">
            {{statusString}}
          </v-flex>

          <v-flex md1 class="odds_right">
            <v-layout align-center>
              <v-flex md6>
                <v-flex>{{rightTotalBet}}</v-flex>
                <v-flex class="PWin">{{rightTotalPWin}}</v-flex>
              </v-flex>
              <v-flex md6>x{{teamB.ODDS}}</v-flex>
            </v-layout>
          </v-flex>

          <v-flex pa-1 md2 v-bind:class="{active_team_card: rightTotalBet !== 0}" class="team_card" @click="chooseWinner(3)">
            <v-layout align-center>

              <v-flex md9>
                <v-card-text>{{ teamB.NAME }}</v-card-text>
              </v-flex>
              <v-flex md3>
                <v-img :src="teamB.LOGO"></v-img>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>

    </v-container>
  </v-card>
</template>

<script>
  import PlayersDialogNext from '~/components/PlayersDialogNext.vue'


  export default {
    name: 'BetItemCSGONext',
    data() {
      return {
        playersDialog: false,
        hide: true,
        bet: {
          left: {},
          right: {},
          leftBet: 0,
          leftPWin: 0,
          rightBet: 0,
          rightPWin: 0,
          winSide: null
        }
      }
    },

    computed: {
      leftTotalBet() {
        let totalBet = 0


        this.$store.state.players.forEach(player => {
          if (player.next_bets !== null && player.next_bets[this.dataId]) {
            totalBet += parseFloat(player.next_bets[this.dataId].LEFT_BET.TOTAL_BET)
          }
        })
        return totalBet
      },

      leftTotalPWin() {
        return (this.leftTotalBet * parseFloat(this.teamA.ODDS) - this.leftTotalBet).toFixed(2)
      },

      rightTotalBet() {
        let totalBet = 0
        this.$store.state.players.forEach(player => {
          if (player.next_bets !== null && player.next_bets[this.dataId]) {
            totalBet += parseFloat(player.next_bets[this.dataId].RIGHT_BET.TOTAL_BET)
          }
        })
        return totalBet
      },

      rightTotalPWin() {
        return (this.rightTotalBet * parseFloat(this.teamB.ODDS) - this.rightTotalBet).toFixed(2)
      }
    },


    methods: {
      placeBet(username, dataId, side, singleBet) {
        console.log('PLACE BET NEXT')
        console.log(username)
        console.log(dataId)
        console.log(side)
        console.log(singleBet)
        this.$socket.emit('place_bet_next', {
          username,
          dataId,
          side,
          singleBet
        })
      },

      placeReBet(username, dataId, side, singleBet) {
        console.log('PLACE REBET NEXT')
        console.log(username)
        console.log(dataId)
        console.log(side)
        console.log(singleBet)
        this.$socket.emit('place_rebet_next', {
          username,
          dataId,
          side,
          singleBet
        })
      },

      cancelBet(username, dataId, side) {
        console.log('CANCEL BET NEXT')
        console.log(username)
        console.log(dataId)
        console.log(side)
        this.$socket.emit('cancel_bet_next', {
          username,
          dataId,
          side
        })
      },

      chooseWinner(winner) {
        this.bet.winSide = winner
        this.playersDialog = !this.playersDialog
      }
    },
    components: {},
    props: {
      additionalEvents: Array,
      title: { type: String, default: 'string' },
      dataId: String,
      tournamentLogo: String,
      statusString: String,
      teamA: Object,
      teamB: Object
    }
  }
</script>

<style scoped>
  .container {
    padding: 14px;
    border: gray 1px groove;
  }

  .container.add {
    padding: 6px;
  }

  /*.active_team_card {*/
  /*background-color: #d99b58;*/
  /*!* IE9, iOS 3.2+ *!*/
  /*background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxIDEiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxsaW5lYXJHcmFkaWVudCBpZD0idnNnZyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIHN0b3AtY29sb3I9IiNjYTUyNTIiIHN0b3Atb3BhY2l0eT0iMSIgb2Zmc2V0PSIwIi8+PHN0b3Agc3RvcC1jb2xvcj0iI2U3ZTQ1ZSIgc3RvcC1vcGFjaXR5PSIxIiBvZmZzZXQ9IjEiLz48L2xpbmVhckdyYWRpZW50PjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InVybCgjdnNnZykiIC8+PC9zdmc+);*/
  /*background-image: -webkit-gradient(linear, 0% 0%, 100% 100%, color-stop(0, rgb(202, 82, 82)), color-stop(1, rgb(231, 228, 94)));*/
  /*!* Android 2.3 *!*/
  /*background-image: -webkit-repeating-linear-gradient(top left, rgb(202, 81, 82) -0.8%, rgb(231, 228, 94) 100%);*/
  /*!* IE10+ *!*/
  /*background-image: repeating-linear-gradient(to bottom right, rgb(202, 81, 82) -0.8%, rgb(231, 228, 94) 100%);*/
  /*background-image: -ms-repeating-linear-gradient(top left, rgb(202, 81, 82) -0.8%, rgb(231, 228, 94) 100%);*/
  /*}*/

  .active_team_card {
    background-color: #000088!important;
  }

  .team_card {
    cursor: pointer;
    border: wheat 1px groove;
    background-color: darkslategray;
  }

  .odds_left {
    margin-left: 5px;
    border: wheat 1px groove;
  }

  .info_text {
    margin-left: 5px;
    margin-right: 5px;
    border: wheat 1px groove;
  }

  .odds_right {
    margin-right: 5px;
    border: wheat 1px groove;
  }

  .PWin {
    color: greenyellow;
  }

  .disable_events {
    pointer-events: none;
    opacity: 0.6;
  }
</style>
