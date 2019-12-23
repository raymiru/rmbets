<template>
  <v-card :tabindex="index" :id="index + 100" :data-id="dataId" class="match-wrapper" :class="{ live: isLive }">
    <!--STEAM API DIALOG-->
    <v-dialog v-model="steamApiDialog" max-width="700px" min-height="600px">
      <v-card>
        NULL
      </v-card>
    </v-dialog>

    <!--PLAYERS DIALOG-->

    <v-dialog v-model="playersDialog" max-width="1500px" min-height="600px">
      <v-card v-if="status === 'live'">

        <v-layout style="font-size: 13px">
          <v-flex md3>
            <v-layout>
              <v-flex md5>
                <v-card-text>PLAYER</v-card-text>
              </v-flex>
              <v-flex md4>
                <v-card-text>BANK</v-card-text>
              </v-flex>
              <v-flex md4>
                <v-card-text>STATUS</v-card-text>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex v-if="!reverse" offset-md1 md4>
            <v-layout>
              <v-flex md4>
                <v-card-text class="teamDialog">{{teamA.NAME}}</v-card-text>
              </v-flex>
              <v-flex md3>
                <v-card-text class="oddsDialog">x{{ odds.live.team_A.odd / 100 }}</v-card-text>
              </v-flex>
              <v-flex md3>
                <v-card-text>TOTAL BET</v-card-text>
              </v-flex>
              <v-flex md3>
                <v-card-text>TOTAL PWIN</v-card-text>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex v-else-if="reverse" offset-md1 md4>
            <v-layout>
              <v-flex md4>
                <v-card-text class="teamDialog">{{teamB.NAME}}</v-card-text>
              </v-flex>
              <v-flex md3>
                <v-card-text class="oddsDialog">x{{ odds.live.team_B.odd / 100 }}</v-card-text>
              </v-flex>
              <v-flex md3>
                <v-card-text>TOTAL BET</v-card-text>
              </v-flex>
              <v-flex md3>
                <v-card-text>TOTAL PWIN</v-card-text>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex md3 text-md-center>
            <v-card-text>CONTROL</v-card-text>
          </v-flex>
          <v-flex v-if="!reverse" md4>
            <v-layout>
              <v-flex md3>
                <v-card-text>TOTAL PWIN</v-card-text>
              </v-flex>
              <v-flex md3>
                <v-card-text>TOTAL BET</v-card-text>
              </v-flex>
              <v-flex md3>
                <v-card-text class="oddsDialog">x{{ odds.live.team_B.odd / 100 }}</v-card-text>
              </v-flex>
              <v-flex md4>
                <v-card-text class="teamDialog">{{teamB.NAME}}</v-card-text>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex v-else-if="reverse" md4>
            <v-layout>
              <v-flex md3>
                <v-card-text>TOTAL PWIN</v-card-text>
              </v-flex>
              <v-flex md3>
                <v-card-text>TOTAL BET</v-card-text>
              </v-flex>
              <v-flex md3>
                <v-card-text class="oddsDialog">x{{ odds.live.team_A.odd / 100 }}</v-card-text>
              </v-flex>
              <v-flex md4>
                <v-card-text class="teamDialog">{{teamA.NAME}}</v-card-text>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <div
          style="border-top: gray 2px groove"
          v-for="(data, index) in $store.state.players"
          :key="data.match_id">
          <v-layout
            v-if="data.now_bets !== null && data.status === 'ready' || data.status ==='moving' || data.status ==='2window'">
            <v-flex md3>
              <v-layout>
                <v-flex md5>
                  <v-card-text>{{data.username}}</v-card-text>
                </v-flex>
                <v-flex md4>
                  <v-card-text>{{data.bank}}</v-card-text>
                </v-flex>
                <v-flex md4>
                  <v-card-text v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]">
                    {{data.now_bets[dataId][statusBuilder].STATUS}}
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex offset-md1 md4 v-if="!reverse">
              <v-layout>
                <v-flex md4>
                  <v-card-text></v-card-text>
                </v-flex>
                <v-flex md3>
                  <v-card-text v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]">x{{
                    ((parseFloat(data.now_bets[dataId][statusBuilder].LEFT_BET.TOTAL_BET) +
                    parseFloat(data.now_bets[dataId][statusBuilder].LEFT_BET.TOTAL_PWIN)) /
                    parseFloat(data.now_bets[dataId][statusBuilder].LEFT_BET.TOTAL_BET)).toFixed(2) }}
                  </v-card-text>
                </v-flex>
                <v-flex md3>
                  <v-card-text v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]">
                    {{data.now_bets[dataId][statusBuilder].LEFT_BET.TOTAL_BET}}
                  </v-card-text>
                </v-flex>
                <v-flex md3>
                  <v-card-text v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]">
                    {{data.now_bets[dataId][statusBuilder].LEFT_BET.TOTAL_PWIN}}
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex v-else-if="reverse" offset-md1 md4>
              <v-layout>
                <v-flex md4>
                  <v-card-text></v-card-text>
                </v-flex>
                <v-flex md3>
                  <v-card-text v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]">x{{
                    ((parseFloat(data.now_bets[dataId][statusBuilder].RIGHT_BET.TOTAL_BET) +
                    parseFloat(data.now_bets[dataId][statusBuilder].RIGHT_BET.TOTAL_PWIN)) /
                    parseFloat(data.now_bets[dataId][statusBuilder].RIGHT_BET.TOTAL_BET)).toFixed(2) }}
                  </v-card-text>
                </v-flex>
                <v-flex md3>
                  <v-card-text v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]">
                    {{data.now_bets[dataId][statusBuilder].RIGHT_BET.TOTAL_BET}}
                  </v-card-text>
                </v-flex>
                <v-flex md3>
                  <v-card-text v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]">
                    {{data.now_bets[dataId][statusBuilder].RIGHT_BET.TOTAL_PWIN}}
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex md3 v-if="!reverse" text-md-center>
              <v-layout>
                <v-flex md3>
                  <v-text-field mask="###" v-model="bet.left[data.username]"
                                label='BET SIZE'></v-text-field>
                </v-flex>
                <v-flex md6>
                  <v-layout>
                    <v-btn v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]"
                           :class="{disable_events: data.now_bets[dataId][statusBuilder].STATUS === 'timeout' || !bet.left[data.username] || teamA.LOCK} "
                           @click="singleBet(data.username, 1, bet.left[data.username])" fab>L
                    </v-btn>
                    <v-btn v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]"
                           :class="{disable_events: data.now_bets[dataId][statusBuilder].STATUS === 'timeout' || !bet.right[data.username] || teamB.LOCK} "
                           @click="singleBet(data.username, 3, bet.right[data.username]) " fab>R
                    </v-btn>
                  </v-layout>
                </v-flex>
                <v-flex md3>
                  <v-text-field mask="###" v-model="bet.right[data.username]"
                                label='BET SIZE'></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex md3 v-else-if="reverse" text-md-center>
              <v-layout>
                <v-flex md3>
                  <v-text-field mask="###" v-model="bet.right[data.username]"
                                label='BET SIZE'></v-text-field>
                </v-flex>

                <v-flex md6>
                  <v-layout>
                    <v-btn v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]"
                           :class="{disable_events: data.now_bets[dataId][statusBuilder].STATUS === 'timeout' || !bet.right[data.username] || teamB.LOCK} "
                           @click="singleBet(data.username, 3, bet.right[data.username]) " fab>R
                    </v-btn>
                    <v-btn v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]"
                           :class="{disable_events: data.now_bets[dataId][statusBuilder].STATUS === 'timeout' || !bet.left[data.username] || teamA.LOCK} "
                           @click="singleBet(data.username, 1, bet.left[data.username])" fab>L
                    </v-btn>

                  </v-layout>
                </v-flex>
                <v-flex md3>
                  <v-text-field mask="###" v-model="bet.left[data.username]"
                                label='BET SIZE'></v-text-field>
                </v-flex>

              </v-layout>
            </v-flex>


            <v-flex md4 v-if="!reverse">
              <v-layout>
                <v-flex md3>
                  <v-card-text v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]">
                    {{data.now_bets[dataId][statusBuilder].RIGHT_BET.TOTAL_PWIN}}
                  </v-card-text>
                </v-flex>
                <v-flex md3>
                  <v-card-text v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]">
                    {{data.now_bets[dataId][statusBuilder].RIGHT_BET.TOTAL_BET}}
                  </v-card-text>
                </v-flex>
                <v-flex md3>
                  <v-card-text v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]">x{{
                    ((parseFloat(data.now_bets[dataId][statusBuilder].RIGHT_BET.TOTAL_BET) +
                    parseFloat(data.now_bets[dataId][statusBuilder].RIGHT_BET.TOTAL_PWIN)) /
                    parseFloat(data.now_bets[dataId][statusBuilder].RIGHT_BET.TOTAL_BET)).toFixed(2) }}
                  </v-card-text>
                </v-flex>
                <v-flex md4>
                  <v-card-text></v-card-text>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex md4 v-else-if="reverse">
              <v-layout>
                <v-flex md3>
                  <v-card-text v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]">x{{
                    ((parseFloat(data.now_bets[dataId][statusBuilder].LEFT_BET.TOTAL_BET) +
                    parseFloat(data.now_bets[dataId][statusBuilder].LEFT_BET.TOTAL_PWIN)) /
                    parseFloat(data.now_bets[dataId][statusBuilder].LEFT_BET.TOTAL_BET)).toFixed(2) }}
                  </v-card-text>
                </v-flex>
                <v-flex md3>
                  <v-card-text v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]">
                    {{data.now_bets[dataId][statusBuilder].LEFT_BET.TOTAL_BET}}
                  </v-card-text>
                </v-flex>
                <v-flex md3>
                  <v-card-text v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]">
                    {{data.now_bets[dataId][statusBuilder].LEFT_BET.TOTAL_PWIN}}
                  </v-card-text>
                </v-flex>
                <v-flex md4>
                  <v-card-text></v-card-text>
                </v-flex>
              </v-layout>
            </v-flex>


          </v-layout>
        </div>
      </v-card>
      <v-card v-else>
        <v-flex text-md-center>
          <v-card-text>NO LIVE</v-card-text>
        </v-flex>
      </v-card>
    </v-dialog>
    <!--ПОЛНАЯ ВЕРСИЯ МАТЧА-->
    <v-container v-if="!hide"
    >
      <v-card>
        <v-layout text-md-center style="border: grey 2px groove">
          <!--ЛОГО ТУРНИРА И КНОПКИ-->
          <v-flex md2 class="stat_layout">
            <v-img :src="tournamentLogo || 'NO DATA'"></v-img>
            <v-layout pa-1 align-center row justify-center>
              <v-btn v-if="reverse" light @click="reverseMethod" tabindex="-1">
                <v-icon>repeat</v-icon>
              </v-btn>
              <v-btn v-else-if="!reverse" @click="reverseMethod" tabindex="-1">
                <v-icon>repeat</v-icon>
              </v-btn>
              <v-btn @click="hide = !hide" tabindex="-1">
                <v-icon>minimize</v-icon>
              </v-btn>
            </v-layout>
            <v-layout row justify-center>
              <v-btn @click="steamApiDialogMethod" tabindex="-1">
                <v-icon>data_usage</v-icon>
              </v-btn>
              <v-btn @click="playersDialog = !playersDialog" tabindex="-1">
                <v-icon>fingerprint</v-icon>
              </v-btn>
            </v-layout>
          </v-flex>
          <!--КНОПКА ЛЕВОЙ КОМАНДЫ И КОЭФЦИЕНТЫ-->
          <v-flex md2 v-if="!reverse">
            <v-layout class="justify-space-between text-md-center">
              <v-flex md6 class="team_card" :class="{disable_events: teamA.LOCK || status !=='live'}">
                <v-layout column fill-height :class="{active_team_card: bet.winSide === 1}" @click="chooseWinner(1)">
                  <v-flex pa-2>
                    {{ teamA.NAME }}
                  </v-flex>
                  <v-flex pa-1>
                    <v-img :src="teamA.LOGO || 'NO DATA'"></v-img>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex md6>
                <v-layout column class="stat_layout" fill-height>
                  <v-layout>
                    <v-flex>
                      <v-card-text>
                        <div
                          :class="{vilka: (1/((rightTotalBet + rightTotalPWin)/rightTotalBet)) + (1/(odds.live.team_A.odd / 100)) < 1 }"
                          class="odds">x{{ odds.live.team_A.odd / 100 }}
                        </div>
                        <v-layout>
                          <div style="margin-left: 30px" class="max">
                            {{ odds.live.team_A.max / 100 }}
                          </div>
                          <div style="margin-left: 5px" class="max">
                            {{ (odds.live.team_A.max / 100) * listReadyPlayers.length }}
                          </div>
                        </v-layout>
                      </v-card-text>

                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>

                  <v-layout>
                    <v-flex>
                      <v-card-text class="main_stat_item">TB: {{leftTotalBet}}</v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>

                  <v-layout>
                    <v-flex>
                      <v-card-text class="main_stat_item">PW: {{leftTotalPWin.toFixed(2)}}</v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>

                  <v-layout>
                    <v-flex>
                      <v-card-text class="main_stat_item">x{{((leftTotalBet + leftTotalPWin)/leftTotalBet).toFixed(2)}}
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex md2 v-else-if="reverse">
            <v-layout>
              <v-flex md6 class="team_card" :class="{disable_events: teamB.LOCK || status !=='live'}">
                <v-layout column fill-height :class="{active_team_card: bet.winSide === 3}" @click="chooseWinner(3)">
                  <v-flex pa-2>
                    {{ teamB.NAME }}
                  </v-flex>
                  <v-flex class="pa-1">
                    <v-img :src="teamB.LOGO || 'NO DATA'"></v-img>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex md6>
                <v-layout column fill-height class="stat_layout">
                  <v-layout>
                    <v-flex>
                      <v-card-text>
                        <div
                          :class="{vilka: (1/((leftTotalBet + leftTotalPWin)/leftTotalBet)) + (1/(odds.live.team_B.odd / 100)) < 1 }"
                          class="odds">x{{ odds.live.team_B.odd / 100 }}
                        </div>
                        <v-layout>
                          <div style="margin-left: 30px" class="max">
                            {{ odds.live.team_B.max / 100 }}
                          </div>
                          <div style="margin-left: 5px" class="max">
                            {{ (odds.live.team_B.max / 100) * listReadyPlayers.length }}
                          </div>
                        </v-layout>
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>

                  <v-layout>
                    <v-flex>
                      <v-card-text class="main_stat_item">TB: {{rightTotalBet}}</v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>

                  <v-layout>
                    <v-flex>
                      <v-card-text class="main_stat_item">PW: {{rightTotalPWin.toFixed(2)}}</v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>

                  <v-layout>
                    <v-flex>
                      <v-card-text class="main_stat_item">x{{((rightTotalBet +
                        rightTotalPWin)/rightTotalBet).toFixed(2)}}
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <!--ФУНКЦИОНАЛ СТАВОК-->
          <v-flex md3>
            <v-layout column fill-height class="stat_layout">
              <v-flex class="pa-2">
                <v-layout>
                  <v-flex md2 style="margin: 15px 15px 15px 15px">
                    <div >{{pWinNow}}</div>
                  </v-flex>

                  <v-flex md10 style="margin-top: 5px">
                    <v-slider @click="focus" tabindex="-1" height="10px" v-if="bet.winSide === 1"
                              v-model="bet.power"
                              :max="listReadyPlayers.length * (odds.live.team_A.max / 100)"
                              :min="5"
                              :step="5"
                    >
                    </v-slider>
                    <v-slider @click="focus" tabindex="-1" height="10px" v-else-if="bet.winSide === 3"
                              v-model="bet.power"
                              :max="listReadyPlayers.length * (odds.live.team_B.max / 100)"
                              :min="5"
                              :step="5"
                    >
                    </v-slider>
                  </v-flex>

                </v-layout>
              </v-flex>
              <v-flex pa-3 style="border-top: grey 2px groove; border-bottom: grey 2px groove">
                <v-layout v-if="!reverse" text-md-center style="font-size: 15px; ">
                  <v-flex md3
                          :class="{TP_Plus: (leftTotalPWin - rightTotalBet) > 0, TP_Minus: (leftTotalPWin - rightTotalBet) < 0 }">
                    {{(leftTotalPWin - rightTotalBet).toFixed(2)}}
                  </v-flex>
                  <v-flex md3 :class="{emptyAP: !listReadyPlayers.length}"
                          style="margin-right: 25px; color: orange;">AP: {{listReadyPlayers.length}}
                  </v-flex>
                  <v-flex md3 style="color: yellow">BP: {{bet.power}}</v-flex>

                  <v-flex md3
                          :class="{TP_Plus: (rightTotalPWin - leftTotalBet) > 0, TP_Minus: (rightTotalPWin - leftTotalBet) < 0 }">
                    {{(rightTotalPWin - leftTotalBet).toFixed(2)}}
                  </v-flex>
                </v-layout>
                <v-layout v-if="reverse" text-md-center style="font-size: 15px; ">
                  <v-flex md3
                          :class="{TP_Plus: (rightTotalPWin - leftTotalBet) > 0, TP_Minus: (rightTotalPWin - leftTotalBet) < 0 }">
                    {{(rightTotalPWin - leftTotalBet).toFixed(2)}}
                  </v-flex>

                  <v-flex md3 :class="{emptyAP: !listReadyPlayers.length}"
                          style="margin-right: 25px; color: orange;">AP: {{listReadyPlayers.length}}
                  </v-flex>
                  <v-flex md3 style="color: yellow">BP: {{bet.power}}</v-flex>

                  <v-flex md3
                          :class="{TP_Plus: (leftTotalPWin - rightTotalBet) > 0, TP_Minus: (leftTotalPWin - rightTotalBet) < 0 }">
                    {{(leftTotalPWin - rightTotalBet).toFixed(2)}}
                  </v-flex>

                </v-layout>
              </v-flex>
              <v-flex>
                <v-btn-toggle tabindex="-1" v-model="bet.type">
                  <v-btn tabindex="-1" value="random" @click="bet.type = 'random'">Random</v-btn>
                  <v-btn tabindex="-1" value="full" @click="bet.type = 'full'">Full</v-btn>
                </v-btn-toggle>
                <v-btn @click="placeBet">
                  FORCE
                </v-btn>
                <v-btn tabindex="-1" :class="{disable_events: !listReadyPlayers.length} " @click="func1">
                  NORMAL
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
          <!--КНОПКА ПРАВОЙ КОМАНДЫ И КОЭФИЦИЕНЫ-->
          <v-flex md2 v-if="!reverse">
            <v-layout>
              <v-flex md6>
                <v-layout column fill-height class="stat_layout">
                  <v-layout>
                    <v-flex>
                      <v-card-text>
                        <div
                          :class="{vilka: (1/((leftTotalBet + leftTotalPWin)/leftTotalBet)) + (1/(odds.live.team_B.odd / 100)) < 1 }"
                          class="odds">x{{ odds.live.team_B.odd / 100 }}
                        </div>
                        <v-layout>
                          <div style="margin-left: 30px" class="max">
                            {{ (odds.live.team_B.max / 100) * listReadyPlayers.length }}
                          </div>
                          <div style="margin-left: 5px" class="max">
                            {{ odds.live.team_B.max / 100 }}
                          </div>

                        </v-layout>
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>

                  <v-layout>
                    <v-flex>
                      <v-card-text class="main_stat_item">TB: {{rightTotalBet}}</v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>

                  <v-layout>
                    <v-flex>
                      <v-card-text class="main_stat_item">PW: {{rightTotalPWin.toFixed(2)}}</v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>

                  <v-layout>
                    <v-flex>
                      <v-card-text class="main_stat_item">x{{((rightTotalBet +
                        rightTotalPWin)/rightTotalBet).toFixed(2)}}
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                </v-layout>
              </v-flex>
              <v-flex md6 class="team_card" :class="{disable_events: teamB.LOCK || status !=='live'}">
                <v-layout column fill-height :class="{active_team_card: bet.winSide === 3}" @click="chooseWinner(3)">
                  <v-flex pa-2>
                    {{ teamB.NAME }}
                  </v-flex>
                  <v-flex class="pa-1">
                    <v-img :src="teamB.LOGO || 'NO DATA'"></v-img>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex md2 v-if="reverse">
            <v-layout class="justify-space-between text-md-center">
              <v-flex md6>
                <v-layout column class="stat_layout" fill-height>
                  <v-layout>
                    <v-flex>
                      <v-card-text>
                        <div
                          :class="{vilka: (1/((rightTotalBet + rightTotalPWin)/rightTotalBet)) + (1/(odds.live.team_A.odd / 100)) < 1 }"
                          class="odds">x{{ odds.live.team_A.odd / 100 }}
                        </div>
                        <v-layout>
                          <div style="margin-left: 30px" class="max">
                            {{ (odds.live.team_A.max / 100) * listReadyPlayers.length }}
                          </div>
                          <div style="margin-left: 5px" class="max">
                            {{ odds.live.team_A.max / 100 }}
                          </div>
                        </v-layout>
                      </v-card-text>

                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>

                  <v-layout>
                    <v-flex>
                      <v-card-text class="main_stat_item">TB: {{leftTotalBet}}</v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>

                  <v-layout>
                    <v-flex>
                      <v-card-text class="main_stat_item">PW: {{leftTotalPWin.toFixed(2)}}</v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>

                  <v-layout>
                    <v-flex>
                      <v-card-text class="main_stat_item">x{{((leftTotalBet + leftTotalPWin)/leftTotalBet).toFixed(2)}}
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                </v-layout>
              </v-flex>
              <v-flex md6 class="team_card" :class="{disable_events: teamA.LOCK || status !=='live'}">
                <v-layout column fill-height :class="{active_team_card: bet.winSide === 1}" @click="chooseWinner(1)">
                  <v-flex pa-2>
                    {{ teamA.NAME }}
                  </v-flex>
                  <v-flex pa-1>
                    <v-img :src="teamA.LOGO || 'NO DATA'"></v-img>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <!--СТАТИСТИКА МАТЧА-->
          <v-flex md4></v-flex>
        </v-layout>
      </v-card>
    </v-container>
    <!--ПЕРЕВЕРНУТАЯ ПОЛНАЯ ВЕРСИЯ МАТЧА-->

    <!--СВЕРНУТАЯ ВЕРСИЯ-->
    <v-container v-if="hide"

                 text-md-center
                 justify-center
    >
      <v-card>
        <v-layout align-center style="border: gray 2px groove">
          <v-flex md2>
            <v-img :src="tournamentLogo"></v-img>
          </v-flex>
          <v-flex md1>
            <v-btn tabindex="-1" @click="hideAndMap">
              <v-icon>reorder</v-icon>
            </v-btn>
          </v-flex>
          <v-flex pa-1 md2 class="team_card_mini">
            <v-layout align-center>
              <v-flex md3>
                <v-img :src="teamA.LOGO"></v-img>
              </v-flex>
              <v-flex md7>
                <v-card-text>{{ teamA.NAME }}</v-card-text>
              </v-flex>
              <v-flex md2>x{{ odds.live.team_A.odd / 100 }}</v-flex>
            </v-layout>
          </v-flex>
          <v-flex md1 class="odds_left">
            <v-layout align-center>

              <v-flex pa-1 md12 class="stats_mini">
                <v-layout>
                  <v-flex md6 v-if="$store.state.steamApiData[matchIndex]">{{
                    $store.state.steamApiData[matchIndex].radiant_score
                    }}
                  </v-flex>
                  <v-flex md6 v-else>N/A</v-flex>
                  <v-flex v-if="$store.state.steamApiData[matchIndex]" class="gold_lead_mini_left" md6>{{
                    $store.state.steamApiData[matchIndex].radiant_lead
                    | goldRadiantFilter
                    }}
                  </v-flex>
                  <v-flex md6 v-else>N/A</v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex pa-1 md1 class="info_text">
            {{statusString}}
          </v-flex>

          <v-flex md1 class="odds_right">
            <v-layout align-center>
              <v-flex pa-1 md12 class="stats_mini">
                <v-layout>
                  <v-flex v-if="$store.state.steamApiData[matchIndex]" class="gold_lead_mini_right" md6>{{
                    $store.state.steamApiData[matchIndex].radiant_lead
                    | goldDireFilter
                    }}
                  </v-flex>
                  <v-flex md6 v-else>N/A</v-flex>
                  <v-flex md6 v-if="$store.state.steamApiData[matchIndex]">{{
                    $store.state.steamApiData[matchIndex].dire_score
                    }}
                  </v-flex>
                  <v-flex md6 v-else>N/A</v-flex>
                </v-layout>
              </v-flex>

            </v-layout>
          </v-flex>

          <v-flex pa-1 md2 class="team_card_mini">
            <v-layout align-center>
              <v-flex md2>x{{ odds.live.team_B.odd / 100 }}</v-flex>
              <v-flex md7>
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
  import sound from '@/assets/arpeggio.mp3'
  import sound2 from '@/assets/sound2.mp3'
  import sound3 from '@/assets/naruto_flute.mp3'
  import sound4 from '@/assets/in_the_end.mp3'
  import Chance from 'chance'



  const chance = new Chance()

  export default {
    name: 'BetItemCSGO',

    filters: {

      moreThenMaxLeft(value) {
        if (value > odds.live.team_A.odd / 100) {
          return odds.live.team_A.odd / 100
        }
      },

      moreThenMaxRight(value) {
        if (value > odds.live.team_B.odd / 100) {
          return odds.live.team_B.odd / 100
        }
      },

      to8num: function to8num(value) {
        // Аргументы: строка, система счисления
        return value.toString(8)
      },
      gameTime: function(value) {
        let sec_num = parseInt(value, 10) // don't forget the second param
        let hours = Math.floor(sec_num / 3600)
        let minutes = Math.floor((sec_num - hours * 3600) / 60)
        let seconds = sec_num - hours * 3600 - minutes * 60

        if (hours < 10) {
          hours = '0' + hours
        }
        if (minutes < 10) {
          minutes = '0' + minutes
        }
        if (seconds < 10) {
          seconds = '0' + seconds
        }
        return hours + ':' + minutes + ':' + seconds
      },

      substr: function(value) {
        if (!value) return
        value = value.substr(0, 10)
        return value
      },
      goldRadiantFilter: function(value) {
        if (!value) return
        if (value > 0) return value
      },
      goldDireFilter: function(value) {
        if (!value) return
        if (value < 0) return value * -1
      }
    },

    props: {
      title: { type: String, default: 'string' },
      index: Number,
      dataId: String,
      tournamentLogo: String,
      status: String,
      statusString: String,
      statusBuilder: String,
      teamA: Object,
      teamB: Object
    },

    data() {
      return {
        randomClass: String,
        audio: null,
        steamApiDialog: false,
        playersDialog: false,
        steamApiMatch: 0,
        bet: {
          left: {},
          right: {},
          power: 5,
          type: 'random',
          winSide: false,
          playersInGame: {
            active: 0,
            inactive: 0
          }
        },
        filteredPlayers: [],
        deactivate_time: 0,
        buildingStateString: 0,
        buildingStateStringChange: 0,
        buildingState: {
          team1: {
            top: '00000',
            mid: '00001',
            bot: '11111',
            t4: '11'
          },
          team2: {
            top: '11111',
            mid: '11111',
            bot: '11111',
            t4: '11'
          }
        },
        testData: 0,
        radiant_win: null,
        team_radiant_kills: 0,
        team_dire_kills: 0,
        team_radiant_kills_change: 0,
        team_dire_kills_change: 0,
        radiant_lead: 0,
        score: {
          radiant_lead: 0,
          team_A: {
            name: 'Team A',
            kill: 0
          },
          team_B: {
            name: 'Team B',
            kill: 0
          }
        },
        odds: {
          locked: Number,
          live: {
            team_A: {
              odd: 0,
              max: 5000
            },
            team_B: {
              odd: 0,
              max: 5000
            }
          },
          soon: {
            team_A: {
              odd: 0,
              max: 'Free'
            },
            team_B: {
              odd: 0,
              max: 'Free'
            }
          }
        },
        reverse: false,
        hide: true
      }
    },

    computed: {
      csgoIndex () {
        return `csgo_${this.index}`
      },

      pWinNow () {
        let result = 0
        if (this.bet.winSide === 1) {
          result = (this.bet.power * (this.odds.live.team_A.odd / 100)) - this.bet.power
        } else  if (this.bet.winSide === 3) {
          result = (this.bet.power * (this.odds.live.team_B.odd / 100)) - this.bet.power
        }
        return result.toFixed(1)
      },

      checkReverse() {
        return this.reverse
      },

      leftPWinProfit() {
        let totalProfit = 0


        this.$store.state.players.forEach(player => {
          if (player.now_bets && player.now_bets[this.dataId] && player.now_bets[this.dataId][this.statusBuilder]) {
            totalProfit = parseFloat(player.now_bets[this.dataId][this.statusBuilder].LEFT_BET.TOTAL_PWIN) - parseFloat(player.now_bets[this.dataId][this.statusBuilder].RIGHT_BET.TOTAL_BET)
          }
        })
        return totalProfit
      },

      rightPWinProfit() {
        let totalProfit = 0


        this.$store.state.players.forEach(player => {
          if (player.now_bets && player.now_bets[this.dataId] && player.now_bets[this.dataId][this.statusBuilder]) {
            totalProfit = parseFloat(player.now_bets[this.dataId][this.statusBuilder].RIGHT_BET.TOTAL_PWIN) - parseFloat(player.now_bets[this.dataId][this.statusBuilder].LEFT_BET.TOTAL_BET)
          }
        })
        return totalProfit
      },

      listReadyPlayers() {
        let readyPlayers = []
        this.$store.state.players.forEach(player => {
          if (player.now_bets && player.now_bets[this.dataId] && player.now_bets[this.dataId][this.statusBuilder]) {
            if ((player.status === 'ready' || player.status === 'moving' || player.status === '2window') && player.now_bets[this.dataId][this.statusBuilder].STATUS === 'ready') {
              readyPlayers.push(player.username)
            }

          }
        })
        return readyPlayers
      },


      leftTotalBet() {
        let totalBet = 0


        this.$store.state.players.forEach(player => {
          if (player.now_bets && player.now_bets[this.dataId] && player.now_bets[this.dataId][this.statusBuilder]) {
            totalBet += parseFloat(player.now_bets[this.dataId][this.statusBuilder].LEFT_BET.TOTAL_BET)
          }
        })
        return totalBet
      },

      rightTotalBet() {
        let totalBet = 0
        this.$store.state.players.forEach(player => {
          if (player.now_bets && player.now_bets[this.dataId] && player.now_bets[this.dataId][this.statusBuilder]) {
            totalBet += parseFloat(player.now_bets[this.dataId][this.statusBuilder].RIGHT_BET.TOTAL_BET)
          }
        })
        return totalBet
      },

      leftTotalPWin() {
        let totalBet = 0


        this.$store.state.players.forEach(player => {
          if (player.now_bets && player.now_bets[this.dataId] && player.now_bets[this.dataId][this.statusBuilder]) {
            totalBet += parseFloat(player.now_bets[this.dataId][this.statusBuilder].LEFT_BET.TOTAL_PWIN)
          }
        })
        return totalBet
      },

      rightTotalPWin() {
        let totalBet = 0
        this.$store.state.players.forEach(player => {
          if (player.now_bets && player.now_bets[this.dataId] && player.now_bets[this.dataId][this.statusBuilder]) {
            totalBet += parseFloat(player.now_bets[this.dataId][this.statusBuilder].RIGHT_BET.TOTAL_PWIN)
          }
        })
        return totalBet
      },

      isLive: function() {
        return this.status === 'live'
      },
      matchIndex: function() {
        let steamIndex = null
        this.$store.state.steamApiData.forEach((data, index) => {
          if (data.match_id === this.steamApiMatch) {
            steamIndex = index
          }
        })
        return steamIndex
      }
    },

    watch: {
      'teamA.LOCK': function(newVal) {
        console.log('WATCH')
        console.log(newVal)
        if (newVal) {
          if (this.bet.winSide === 1) {
            this.bet.winSide = null
          }
        }
      },
      'teamB.LOCK': function(newVal) {
        console.log('WATCH')
        console.log(newVal)
        if (newVal) {
          if (this.bet.winSide === 3) {
            this.bet.winSide = null
          }
        }
      },
      //
      // 'bet.right.data.username': function(newVal, oldVal) {
      //   if (newVal > (odds.live.team_B.odd / 100) ) {
      //     this.bet.right.data.username = odds.live.team_B.odd / 100
      //   }
      // },

      radiant_win: function() {
        this.someThing(sound4)
      },

      deactivate_time: function() {
        this.$socket.emit('check_winner', {
          data_id: this.dataId,
          match_id: this.steamApiMatch
        })
      },

      testData: function() {
        console.log('CHANGE testData')
      },
      // kills: function(val, oldVal) {
      //   console.log('change')
      //   console.log(val);
      //   console.log(oldVal)
      // },

      team_radiant_kills: function() {
        this.someThing(sound)
      },
      team_dire_kills: function() {
        this.someThing(sound)
      },

      buildingStateString: function() {
        this.someThing(sound2)
      }
    },
    mounted() {
      let allowed = true
      document.querySelector(`[data-id="${this.dataId.toString()}"]`).addEventListener('keydown', e => {
        // if (document.activeElement.getAttribute('data-id') == this.dataId) {
        if (document.activeElement.getAttribute('data-id') === this.dataId.toString()) {

          if (e.repeat !== undefined) {
            allowed = !e.repeat
          }
          if (!allowed) return
          allowed = false

          try {

            console.info('Data ID: ' + this.dataId)
            if (!this.reverse) {
              if (e.key === 'ArrowLeft' && !this.teamA.LOCK) {
                this.bet.winSide = 1
              } else if (e.key === 'ArrowRight' && !this.teamB.LOCK) {
                this.bet.winSide = 3
              }
            } else if (this.reverse) {
              if (e.key === 'ArrowLeft' && !this.teamB.LOCK) {
                this.bet.winSide = 3
              } else if (e.key === 'ArrowRight' && !this.teamA.LOCK) {
                this.bet.winSide = 1
              }
            }
            if (this.bet.winSide === 1) {
              if (e.key === 'a' || e.key === 'ф') this.bet.power = this.bet.power - (this.odds.live.team_A.max / 100) / 2
              if (e.key === 'd' || e.key === 'в') this.bet.power = this.bet.power + (this.odds.live.team_A.max / 100) / 2
              if (e.key === 'q' || e.key === 'й') this.bet.power = this.odds.live.team_A.max / 100
              if (e.key === 'e' || e.key === 'у') this.bet.power = this.listReadyPlayers.length * (this.odds.live.team_A.max / 100)
              if (e.key === 'w' || e.key === 'ц') this.bet.power = (this.listReadyPlayers.length * (this.odds.live.team_A.max / 100)) * 0.5
              if (e.key === '1') this.bet.power = (this.listReadyPlayers.length * (this.odds.live.team_A.max / 100)) * 0.15
              if (e.key === '2') this.bet.power = (this.listReadyPlayers.length * (this.odds.live.team_A.max / 100)) * 0.3
              if (e.key === '3') this.bet.power = (this.listReadyPlayers.length * (this.odds.live.team_A.max / 100)) * 0.45
              if (e.key === '4') this.bet.power = (this.listReadyPlayers.length * (this.odds.live.team_A.max / 100)) * 0.6
              if (e.key === '5') this.bet.power = (this.listReadyPlayers.length * (this.odds.live.team_A.max / 100)) * 0.75
              if (e.key === '6') this.bet.power = (this.listReadyPlayers.length * (this.odds.live.team_A.max / 100)) * 0.9
            } else if (this.bet.winSide === 3) {
              if (e.key === 'a' || e.key === 'ф') this.bet.power = this.bet.power - (this.odds.live.team_B.max / 100) / 2
              if (e.key === 'd' || e.key === 'в') this.bet.power = this.bet.power + (this.odds.live.team_B.max / 100) / 2
              if (e.key === 'q' || e.key === 'й') this.bet.power = this.odds.live.team_B.max / 100
              if (e.key === 'e' || e.key === 'у') this.bet.power = this.listReadyPlayers.length * (this.odds.live.team_B.max / 100)
              if (e.key === 'w' || e.key === 'ц') this.bet.power = (this.listReadyPlayers.length * (this.odds.live.team_B.max / 100)) * 0.5
              if (e.key === '1') this.bet.power = (this.listReadyPlayers.length * (this.odds.live.team_B.max / 100)) * 0.15
              if (e.key === '2') this.bet.power = (this.listReadyPlayers.length * (this.odds.live.team_B.max / 100)) * 0.3
              if (e.key === '3') this.bet.power = (this.listReadyPlayers.length * (this.odds.live.team_B.max / 100)) * 0.45
              if (e.key === '4') this.bet.power = (this.listReadyPlayers.length * (this.odds.live.team_B.max / 100)) * 0.6
              if (e.key === '5') this.bet.power = (this.listReadyPlayers.length * (this.odds.live.team_B.max / 100)) * 0.75
              if (e.key === '6') this.bet.power = (this.listReadyPlayers.length * (this.odds.live.team_B.max / 100)) * 0.9
            }


            if (e.key === ' ' || e.key === 'v' || e.key === 'м') {
              this.func1()
            }
            if (e.key === 'x' || e.key === 'ч') {
              this.hideAndMap()
            }
            if (e.key === 'z' || e.key === 'я') {
              this.reverse = !this.reverse
            }
            console.log('WINSIDE: ' + this.bet.winSide)

          } catch (e) {
            console.error(e)
          }


          document.querySelector(`[data-id="${this.dataId.toString()}"]`).addEventListener('keyup', e => {
            if (document.activeElement.getAttribute('data-id') === this.dataId.toString()) {
              allowed = true
            }
          })
        }

      })

    },


    created() {
      this.randomClass = this.$chance.string({ length: 10, pool: 'abcdeghreq' })
      console.log(this.randomClass)


      this.$socket.on(`${this.dataId}`, data => {
        if (data.radiant_win !== undefined) {
          this.radiant_win = data.radiant_win
        } else {
          const json = JSON.parse(data)
          if (json.m_koef_live_a) {
            this.odds.live.team_A.odd = json.m_koef_live_a
          }
          if (json.m_koef_live_b) {
            this.odds.live.team_B.odd = json.m_koef_live_b
          }
          if (json.locked) {
            this.odds.locked = json.locked
          }
          if (json.live_restriction_RUB) {
            this.odds.live.team_A.max = json.live_restriction_RUB[0]
            this.odds.live.team_B.max = json.live_restriction_RUB[1]
          }

          if (json.m_koef_a) {
            this.odds.soon.team_A.odd = json.m_koef_a
          }
          if (json.m_koef_b) {
            this.odds.soon.team_B.odd = json.m_koef_b
          }
        }
      })
    },

    methods: {
      changeStyle() {
        if (this.randomClass) {
          document.querySelector(`.${this.randomClass}`).style.background = '#424242'
        }
      },

      focus() {
        if (this.index) {
          document.getElementById(this.index).focus()
        }

      },

      steamApiDialogMethod() {
        this.steamApiDialog = !this.steamApiDialog
      },


      reverseMethod() {
        this.reverse = !this.reverse

      },


      clearValLeft(username) {
        if (this.bet.left[username]) {
          this.bet.left[username] = ''
        }
      },

      clearValRight(username) {
        if (this.bet.right[username]) {
          this.bet.right[username] = ''
        }

      },


      singleBet(username, winSide, betSize) {
        console.log({
          username,
          winSide,
          betSize
        })
        this.$socket.emit('single_bet', {
          dataId: this.dataId,
          statusBuilder: this.statusBuilder,
          username,
          winSide,
          betSize
        })
        this.bet.left[username] = ''
        this.bet.right[username] = ''
      },

      placeBetFast() {
        console.log('PLACE BET FAST')
        this.$socket.emit()
      },

      placeBet: function() {
        console.log(this.dataId)
        this.$socket.emit('place_bet', {
          dataId: this.dataId,
          winSide: this.bet.winSide
        })
      },

      choosePlayer: function(dataId, index) {
        this.$store.commit('playersMatchSync', {
          dataId,
          index
        })
        console.log(dataId)
        console.log(index)
      },

      heroesIcons: function() {
        console.log('HEROES')
        this.$axios.$post('https://www.rmbets.site/api/heroes', {
          match_id: this.steamApiMatch
        }).then(result => {
          this.filteredPlayers = result
        })
        this.changeStyle()
      },

      hideAndMap: function() {
        this.hide = !this.hide
        setTimeout(() => {
          const canvasElement = document.getElementById(
            this.randomClass
          )
        }, 0)
      },

      func1() {
        const multiBet = (readyPlayers, maxBet, needSum, betType) => {
          let finishBetArray = []


          const randomFromReadyPlayersList = (currentReadyPlayers) => {
            try {
              if (currentReadyPlayers.length >= 1) {
                let random = chance.integer({ min: 0, max: currentReadyPlayers.length - 1 })

                let randomPlayer = currentReadyPlayers[random]
                currentReadyPlayers.splice(random, 1)

                return randomPlayer
              }
            } catch (e) {
              console.error(e)
            }
          }

          const randomSingleBet = (maxBet) => {
            try {
              if (maxBet) {
                let item = maxBet / 10
                if (chance.integer({ min: 0, max: 10 }) > 4) {
                  return maxBet
                } else {
                  return 10 * (chance.integer({ min: 1, max: item }))
                }
              }
            } catch (e) {
              console.error(e)
            }
          }

          const fullBet = () => {
            let currentReadyPlayers = [...readyPlayers]
            let currentNeedSumm = needSum
            while (currentNeedSumm > 0) {


              if (currentNeedSumm >= maxBet) {
                finishBetArray.push({
                  player: randomFromReadyPlayersList(currentReadyPlayers),
                  bet: maxBet
                })
                currentNeedSumm -= maxBet

              } else if (currentNeedSumm < maxBet) {
                finishBetArray.push({
                  player: randomFromReadyPlayersList(currentReadyPlayers),
                  bet: currentNeedSumm
                })
                currentNeedSumm -= currentNeedSumm
              }

            }
          }

          const randomBet = () => {
            let currentReadyPlayers = [...readyPlayers]
            let currentNeedSumm = needSum
            let startLength = readyPlayers.length
            let tempCount = 0
            while (currentNeedSumm > 0) {
              let currentBet = 0
              if (currentNeedSumm > maxBet) {
                tempCount++


                currentBet = randomSingleBet(maxBet)
                finishBetArray.push({
                  player: randomFromReadyPlayersList(currentReadyPlayers),
                  bet: currentBet
                })

                currentNeedSumm -= currentBet
              } else if (currentNeedSumm <= maxBet) {
                tempCount++


                finishBetArray.push({
                  player: randomFromReadyPlayersList(currentReadyPlayers),
                  bet: currentNeedSumm
                })

                currentNeedSumm -= currentNeedSumm
              }

              if (tempCount > startLength) {
                currentNeedSumm = 0
                currentReadyPlayers = [...readyPlayers]
                finishBetArray = []

                fullBet()
              }

            }
          }

          try {
            if (betType === 'full') {
              fullBet()

            } else if (betType === 'random') {
              randomBet()
            }
          } catch (e) {
            console.error(e)
          }

          return finishBetArray

        }


        let maxBet = 0

        if (this.bet.winSide === 1) {
          maxBet = this.odds.live.team_A.max / 100
        } else if (this.bet.winSide === 3) {
          maxBet = this.odds.live.team_B.max / 100
        }


        console.log(maxBet)

        if (this.listReadyPlayers.length !== 0 && maxBet !== 0 && this.bet.power !== 0 && this.bet.winSide) {
          console.log('multiBet')
          let multiBetArr = multiBet(this.listReadyPlayers, maxBet, this.bet.power, this.bet.type)
          this.$socket.emit('multi_bet_csgo', {
            dataId: this.dataId,
            statusBuilder: this.statusBuilder,
            betArr: multiBetArr,
            winSide: this.bet.winSide

          })
        }

      },


      playSound(sound) {
        let audio = new Audio(sound)

        audio.volume = 0.5
        audio.play()
      },

      dynamicClass(data) {
        console.log('DYNAMIC')
        return data
      },

      someThing(audio) {
        const className = this.randomClass

        try {
          this.playSound(audio)
          document.querySelector(`.${className}`).style.background = 'blue'
          setTimeout(() => {
            document.querySelector(`.${className}`).style.background = '#424242'
            setTimeout(() => {
              document.querySelector(`.${className}`).style.background = 'blue'
              setTimeout(() => {
                document.querySelector(`.${className}`).style.background =
                  '#424242'
                setTimeout(() => {
                  document.querySelector(`.${className}`).style.background =
                    'blue'
                  setTimeout(() => {
                    document.querySelector(`.${className}`).style.background =
                      '#424242'
                    setTimeout(() => {
                      document.querySelector(`.${className}`).style.background =
                        'blue'
                      setTimeout(() => {
                        document.querySelector(`.${className}`).style.background =
                          '#424242'
                        setTimeout(() => {
                          document.querySelector(
                            `.${className}`
                          ).style.background = 'blue'
                          setTimeout(() => {
                            document.querySelector(
                              `.${className}`
                            ).style.background = '#424242'
                          }, 500)
                        }, 500)
                      }, 500)
                    }, 500)
                  }, 500)
                }, 500)
              }, 500)
            }, 500)
          }, 500)
        } catch (e) {
          console.log(e)
        }
      },

      changeBetPower(power) {
        if (power === 'max') {
          if (this.bet.winSide === 1) {
            this.bet.power = this.listReadyPlayers.length * (this.odds.live.team_A.max / 100)
          } else if (this.bet.winSide === 3) {
            this.bet.power = this.listReadyPlayers.length * (this.odds.live.team_B.max / 100)
          }
        } else if (power === 'min') {
          this.bet.power = 10
        } else if (power === 'f1') {
          if (this.bet.winSide === 1) {
            this.bet.power = this.odds.live.team_A.max / 100
          } else if (this.bet.winSide === 3) {
            this.bet.power = this.odds.live.team_B.max / 100
          }
        }

      },
      chooseWinner(winner) {
        this.bet.winSide = winner
      },
    },

    sockets: {
      updatematch_dota: function(data) {
        console.log(data)
      }
    }
  }
</script>

<style scoped>
  .container {
    padding: 14px;
    border: gray 1px groove;
  }

  .live {
    background-color: #2c8034;
  }

  .dire {
    background-color: brown;
  }

  .odds {
    font-size: 15px;
  }

  .max {
    font-size: 11px;
  }

  .team_card {
    cursor: pointer;
    border: grey 2px groove;
    background-color: darkslategray;
  }

  .team_card_mini {
    border: wheat 1px groove;
    background-color: darkslategray;
  }

  .active_team_card {
    background-color: #2f3cfc !important;
  }

  .left_icon {
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 12px;
  }

  .center_kills {
    padding-top: 6px;
    padding-bottom: 6px;
    padding-right: 6px;
    color: orangered;
    background-color: whitesmoke;
  }

  .center_gold {
    padding-top: 6px;
    padding-bottom: 6px;
    padding-right: 6px;
    color: gold;
  }

  .right_kills {
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 6px;
    color: orangered;
    background-color: whitesmoke;
  }

  .right_gold {
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 6px;
    color: gold;
  }

  .left_razmen {
    padding-left: 40px;
  }

  .right_razmen {
    padding-right: 60px;
  }

  .kills_change {
    color: coral;
    font-size: 14px;
  }

  .gold_lead {
    font-size: 14px;
    color: gold;
  }

  .kills {
    font-size: 14px;
  }

  .score_title {
    font-size: 12px;
  }

  .hero_img {
    padding-top: 6px;
    padding-bottom: 6.1px;
  }

  .live_map_text {
    font-size: 12px;
  }

  .gold_lead_mini_left {
    color: gold;

  }

  .gold_lead_mini_right {
    color: gold;

  }

  .stats_mini {
    border: wheat 1px groove;
  }

  .disable_events {
    pointer-events: none;
    opacity: 0.5;
  }

  .oddsDialog {
    font-size: 16px;
  }

  .teamDialog {
    font-size: 18px;
    font-weight: normal;
    color: greenyellow;
  }

  .main_stat_item {
    padding-top: 7px;
    padding-bottom: 7px;
  }

  .vilka {
    color: greenyellow;
  }

  .emptyAP {
    color: whitesmoke !important;;
  }

  .stat_layout {
    border: grey 2px groove;
  }

  .TP_Plus {
    color: greenyellow;
  }

  .TP_Minus {
    color: #ff4850;
  }

  .match-wrapper:focus {
    box-shadow: inset 0px 0px 0px 5px yellow !important;
  }
</style>
