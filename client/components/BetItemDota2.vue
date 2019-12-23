<template>
  <v-card :tabindex="index" :id="idWhenLive" :data-id="dataIdWhenLive" class="match-wrapper" :class="{ live: isLive }" @click="eventStart">
    <!--STEAM API DIALOG-->
    <v-dialog v-model="steamApiDialog" max-width="700px" min-height="600px">
      <v-card>
        <v-card-title>STEAM API DATA</v-card-title>
        <v-layout>
          <v-flex md1>
            <v-card-text>ID</v-card-text>
          </v-flex>
          <v-flex md4>
            <v-card-text>Radiant</v-card-text>
          </v-flex>
          <v-flex md4>
            <v-card-text>Dire</v-card-text>
          </v-flex>
          <v-flex md2>
            <v-card-text>Match ID</v-card-text>
          </v-flex>
          <v-flex md2>
            <v-card-text>Attach</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout
          style="border-top: gray 2px groove"
          v-for="(data, index) in $store.state.steamApiData"
          :key="data.match_id"
        >
          <v-flex md1>
            <v-card-text>{{ index + 1 }}</v-card-text>
          </v-flex>
          <v-flex md4>
            <v-card-text
            >{{ data.team_name_radiant || 'No Data' }}
            </v-card-text>
          </v-flex>
          <v-flex md4>
            <v-card-text>{{ data.team_name_dire || 'No Data' }}</v-card-text>
          </v-flex>
          <v-flex md2>
            <v-card-text>{{ data.match_id || 'No Data' }}</v-card-text>
          </v-flex>
          <v-flex md2>
            <v-btn @click="chooseSteamApiMatch(data.match_id)">Choose</v-btn>
          </v-flex>
        </v-layout>
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
                           @click="singleBet(data.username, 3, bet.right[data.username], 'full') " fab>R
                    </v-btn>
                    <v-btn v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]"
                           :class="{disable_events: data.now_bets[dataId][statusBuilder].STATUS === 'timeout' || !bet.left[data.username] || teamA.LOCK} "
                           @click="singleBet(data.username, 1, bet.left[data.username], 'full')" fab>L
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
                  <v-card-text v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]">
                    {{data.now_bets[dataId][statusBuilder].LEFT_BET.TOTAL_PWIN}}
                  </v-card-text>
                </v-flex>

                <v-flex md3>
                  <v-card-text v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]">
                    {{data.now_bets[dataId][statusBuilder].LEFT_BET.TOTAL_BET}}
                  </v-card-text>
                </v-flex>
                <v-flex md3>
                  <v-card-text v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]">x{{
                    ((parseFloat(data.now_bets[dataId][statusBuilder].LEFT_BET.TOTAL_BET) +
                    parseFloat(data.now_bets[dataId][statusBuilder].LEFT_BET.TOTAL_PWIN)) /
                    parseFloat(data.now_bets[dataId][statusBuilder].LEFT_BET.TOTAL_BET)).toFixed(2) }}
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
          <v-flex md2 class="stat_layout" @click="eventStart">
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
                <v-layout column fill-height :class="{active_team_card: winSide === 1}" @click="chooseWinner(1)">
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
                      <v-card-text v-if="$store.state.playersBets[dataId]">
                        <div
                          :class="{vilka: (1/((rightTotalBet + rightTotalPWin)/rightTotalBet)) + (1/(odds.live.team_A.odd / 100)) < 1 }"
                          class="odds">x{{ odds.live.team_A.odd / 100 }}
                        </div>
                        <v-layout>
                          <div style="margin-left: 30px" class="max">
                            {{ odds.live.team_A.max / 100 }}
                          </div>
                          <div style="margin-left: 5px" class="max" v-if="$store.state.playersBets[dataId]">
                            {{ (odds.live.team_A.max / 100) * readyPlayersCount }}
                          </div>
                        </v-layout>
                      </v-card-text>

                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>

                  <v-layout>
                    <v-flex>
                      <v-card-text v-if="$store.state.playersBets[dataId]" class="main_stat_item">TB: {{leftTotalBet}}</v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>

                  <v-layout>
                    <v-flex>
                      <v-card-text v-if="$store.state.playersBets[dataId] && leftTotalPWin" class="main_stat_item">PW: {{leftTotalPWin.toFixed(1)}}</v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>

                  <v-layout>
                    <v-flex>
                      <v-card-text v-if="$store.state.playersBets[dataId]" class="main_stat_item">x{{((leftTotalBet + leftTotalPWin)/leftTotalBet).toFixed(2)}}
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex >
          <v-flex md2 v-else-if="reverse">
            <v-layout>
              <v-flex md6 class="team_card" :class="{disable_events: teamB.LOCK || status !=='live'}">
                <v-layout column fill-height :class="{active_team_card: winSide === 3}" @click="chooseWinner(3)">
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
                      <v-card-text v-if="$store.state.playersBets[dataId]">
                        <div
                          :class="{vilka: (1/((leftTotalBet + leftTotalPWin)/leftTotalBet)) + (1/(odds.live.team_B.odd / 100)) < 1 }"
                          class="odds">x{{ odds.live.team_B.odd / 100 }}
                        </div>
                        <v-layout>
                          <div style="margin-left: 30px" class="max">
                            {{ odds.live.team_B.max / 100 }}
                          </div>
                          <div style="margin-left: 5px" class="max" v-if="$store.state.playersBets[dataId]">
                            {{ (odds.live.team_B.max / 100) * readyPlayersCount }}
                          </div>
                        </v-layout>
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>

                  <v-layout>
                    <v-flex>
                      <v-card-text v-if="$store.state.playersBets[dataId]" class="main_stat_item">TB: {{rightTotalBet}}</v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>

                  <v-layout>
                    <v-flex>
                      <v-card-text v-if="$store.state.playersBets[dataId] && rightTotalPWin" class="main_stat_item">PW: {{rightTotalPWin.toFixed(1)}}</v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>

                  <v-layout>
                    <v-flex>
                      <v-card-text v-if="$store.state.playersBets[dataId]" class="main_stat_item">x{{((rightTotalBet +
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
            <v-layout column fill-height class="stat_layout" v-if="$store.state.playersBets[dataId]">
              <v-flex class="pa-2">
                <v-layout>
                  <v-flex md2 style="margin-left: 15px; margin-right: 15px; margin-top: 5px">
                    <div>{{betPower}}</div>
                    <div style="color: yellow;">{{pWinNow}}</div>
                  </v-flex>

                  <v-flex md10 style="margin-top: 5px" >
                    <v-slider  @click="focus" tabindex="-1" height="10px" v-if="winSide === 1"
                              v-model="betPower"
                              :max="readyPlayersCount * (odds.live.team_A.max / 100)"
                              :min="0"
                              :step="10"
                               :color="sliderColor"
                               :thumb-size="24"
                               thumb-label="always"
                    >
                    </v-slider>
                    <v-slider @click="focus" tabindex="-1" height="10px" v-else-if="winSide === 3"
                              v-model="betPower"
                              :max="readyPlayersCount * (odds.live.team_B.max / 100)"
                              :min="0"
                              :step="10"
                              :color="sliderColor"
                              :thumb-size="24"
                              thumb-label="always"
                    >
                    </v-slider>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex pa-3 style="border-top: grey 2px groove; border-bottom: grey 2px groove">
                <v-layout v-if="!reverse" text-md-center style="font-size: 15px; ">
                  <v-flex md2
                          :class="{TP_Plus: (leftTotalPWin - rightTotalBet) > 0, TP_Minus: (leftTotalPWin - rightTotalBet) < 0 }">
                    {{(leftTotalPWin - rightTotalBet).toFixed(2)}}
                  </v-flex>
                  <v-flex md8 :class="{emptyAP: !readyPlayersCount}"
                          style="margin-right: 25px; color: yellow">AP: {{readyPlayersCount}} / {{totalPlayersCount}}
                  </v-flex>
                  <!--<v-flex md3 style="color: yellow">BP: {{betPower}}</v-flex>-->

                  <v-flex md2
                          :class="{TP_Plus: (rightTotalPWin - leftTotalBet) > 0, TP_Minus: (rightTotalPWin - leftTotalBet) < 0 }">
                    {{(rightTotalPWin - leftTotalBet).toFixed(2)}}
                  </v-flex>
                </v-layout>
                <v-layout v-if="reverse" text-md-center style="font-size: 15px; ">
                  <v-flex md2
                          :class="{TP_Plus: (rightTotalPWin - leftTotalBet) > 0, TP_Minus: (rightTotalPWin - leftTotalBet) < 0 }">
                    {{(rightTotalPWin - leftTotalBet).toFixed(2)}}
                  </v-flex>

                  <v-flex md8 :class="{emptyAP: !readyPlayersCount}"
                          style="margin-right: 25px; color:yellow">AP: {{readyPlayersCount}} / {{totalPlayersCount}}</v-flex>

                  <v-flex md2
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
                <v-btn tabindex="-1" :class="{disable_events: !readyPlayersCount} " @click="func1">
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
                      <v-card-text v-if="$store.state.playersBets[dataId]">
                        <div
                          :class="{vilka: (1/((leftTotalBet + leftTotalPWin)/leftTotalBet)) + (1/(odds.live.team_B.odd / 100)) < 1 }"
                          class="odds">x{{ odds.live.team_B.odd / 100 }}
                        </div>
                        <v-layout>
                          <div style="margin-left: 30px" class="max" v-if="$store.state.playersBets[dataId]">
                            {{ (odds.live.team_B.max / 100) * readyPlayersCount }}
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
                      <v-card-text v-if="$store.state.playersBets[dataId]" class="main_stat_item">TB: {{rightTotalBet}}</v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>

                  <v-layout>
                    <v-flex>
                      <v-card-text v-if="$store.state.playersBets[dataId]" class="main_stat_item">PW: {{rightTotalPWin.toFixed(2)}}</v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>

                  <v-layout>
                    <v-flex>
                      <v-card-text v-if="$store.state.playersBets[dataId]" class="main_stat_item">x{{((rightTotalBet +
                        rightTotalPWin)/rightTotalBet).toFixed(2)}}
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                </v-layout>
              </v-flex>
              <v-flex md6 class="team_card" :class="{disable_events: teamB.LOCK || status !=='live'}">
                <v-layout column fill-height :class="{active_team_card: winSide === 3}" @click="chooseWinner(3)">
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
                      <v-card-text v-if="$store.state.playersBets[dataId]">
                        <div
                          :class="{vilka: (1/((rightTotalBet + rightTotalPWin)/rightTotalBet)) + (1/(odds.live.team_A.odd / 100)) < 1 }"
                          class="odds">x{{ odds.live.team_A.odd / 100 }}
                        </div>
                        <v-layout>
                          <div style="margin-left: 30px" class="max"  v-if="$store.state.playersBets[dataId]">
                            {{ (odds.live.team_A.max / 100) * readyPlayersCount }}
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
                      <v-card-text v-if="$store.state.playersBets[dataId]" class="main_stat_item">TB: {{leftTotalBet}}</v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>

                  <v-layout>
                    <v-flex>
                      <v-card-text v-if="$store.state.playersBets[dataId]" class="main_stat_item">PW: {{leftTotalPWin.toFixed(2)}}</v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>

                  <v-layout>
                    <v-flex>
                      <v-card-text v-if="$store.state.playersBets[dataId]" class="main_stat_item">x{{((leftTotalBet + leftTotalPWin)/leftTotalBet).toFixed(2)}}
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                </v-layout>
              </v-flex>
              <v-flex md6 class="team_card" :class="{disable_events: teamA.LOCK || status !=='live'}">
                <v-layout column fill-height :class="{active_team_card: winSide === 1}" @click="chooseWinner(1)">
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
          <v-flex @click="heroesIcons" :class="randomClass" md4>
            <v-layout v-if="matchIndex !== null" fill-height>
              <v-flex md1 v-if="filteredPlayers">
                <v-layout class="stat_layout"
                          v-for="value in filteredPlayers.radiant_team"

                >
                  <v-flex class="hero_img"
                  >
                    <v-img :src="value.imgSrc || 'NO DATA'"></v-img
                    >
                  </v-flex>
                </v-layout>
              </v-flex>

              <v-flex md5>
                <v-layout column class="stat_layout" fill-height>
                  <v-layout>
                    <v-flex
                      pa-1
                      class="score_title"
                      v-if="$store.state.steamApiData[matchIndex].team_name_radiant" md6>
                      <v-card-media
                      >{{$store.state.steamApiData[matchIndex].team_name_radiant}}
                      </v-card-media>
                    </v-flex>
                    <v-flex pa-1 class="score_title" v-else md6>
                      <v-card-media>Radiant</v-card-media>
                    </v-flex>

                    <v-flex
                      pa-1
                      class="score_title"
                      v-if="$store.state.steamApiData[matchIndex].team_name_dire"
                      md6
                    >
                      <v-card-media
                      >{{
                        $store.state.steamApiData[matchIndex].team_name_dire
                        }}
                      </v-card-media>
                    </v-flex>
                    <v-flex pa-1 class="score_title" v-else md6>
                      <v-card-media>Dire</v-card-media>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>
                  <v-layout pa-1>
                    <v-flex md6
                    >
                      <v-card-media style="color: greenyellow">{{
                        $store.state.steamApiData[matchIndex].game_time | gameTime
                        }}
                      </v-card-media>
                    </v-flex
                    >
                    <v-flex md6 v-if="this.radiant_win === true"
                    >
                      <v-card-media>Radiant Win</v-card-media>
                    </v-flex
                    >
                    <v-flex md6 v-else-if="this.radiant_win === false"
                    >
                      <v-card-media>Dire Win</v-card-media>
                    </v-flex
                    >
                    <v-flex class="live_map_text" md6 v-else>
                      <v-card-media>{{statusString}}</v-card-media>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>
                  <v-layout pa-1>
                    <v-flex md5>
                      <v-card-media class="gold_lead"
                      >{{
                        $store.state.steamApiData[matchIndex].radiant_lead
                        | goldRadiantFilter
                        }}
                      </v-card-media>
                    </v-flex>
                    <v-flex md2>
                      <v-card-media>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="20"
                          height="20"
                          viewBox="0 0 172 172"
                          style=" fill:#000000;"
                        >
                          <g
                            fill="none"
                            fill-rule="nonzero"
                            stroke="none"
                            stroke-width="1"
                            stroke-linecap="butt"
                            stroke-linejoin="miter"
                            stroke-miterlimit="10"
                            stroke-dasharray=""
                            stroke-dashoffset="0"
                            font-family="none"
                            font-weight="none"
                            font-size="none"
                            text-anchor="none"
                            style="mix-blend-mode: normal"
                          >
                            <path d="M0,172v-172h172v172z" fill="none"></path>
                            <g fill="#ffffff">
                              <path
                                d="M57.33333,17.2c-8.84564,0 -16.9336,2.08198 -23.22448,5.85651c-6.29088,3.77453 -11.17552,9.74507 -11.17552,17.07682c0,2.62056 0.64645,5.0552 1.73568,7.28984c-1.12645,1.09562 -1.7539,2.60553 -1.73568,4.17682v11.46667c0,2.6208 0.64648,5.05519 1.73568,7.28984c-1.12645,1.09562 -1.7539,2.60554 -1.73568,4.17683v11.46667c0,2.6208 0.64648,5.05519 1.73568,7.28984c-1.12645,1.09562 -1.7539,2.60554 -1.73568,4.17683v11.46667c0,2.6208 0.64648,5.05519 1.73568,7.28984c-1.12645,1.09562 -1.7539,2.60554 -1.73568,4.17683v11.46667c0,7.33243 4.8844,13.3025 11.17552,17.07683c6.29112,3.77432 14.38001,5.85651 23.22448,5.85651c8.84446,0 16.93337,-2.08219 23.22448,-5.85651c2.00298,-1.20168 3.83664,-2.64647 5.44219,-4.26641c1.60555,1.61994 3.43921,3.06473 5.44219,4.26641c6.29111,3.77432 14.38001,5.85651 23.22448,5.85651c8.84446,0 16.93337,-2.08219 23.22448,-5.85651c6.29112,-3.77432 11.17552,-9.7444 11.17552,-17.07683v-11.46667c0.0213,-1.57516 -0.60638,-3.08971 -1.73567,-4.18802c1.0864,-2.23215 1.73567,-4.66148 1.73567,-7.27864v-11.46667c0.0213,-1.57516 -0.60638,-3.08971 -1.73567,-4.18802c1.08643,-2.23213 1.73567,-4.66172 1.73567,-7.27864c0,-7.33175 -4.88464,-13.30229 -11.17552,-17.07683c-6.29088,-3.77453 -14.37884,-5.85651 -23.22448,-5.85651c-8.84564,0 -16.93359,2.08198 -23.22448,5.85651c-0.43643,0.26186 -0.79884,0.61312 -1.22058,0.89583c0.93606,-2.09026 1.51172,-4.33649 1.51172,-6.75234v-11.46667c0.0213,-1.57516 -0.60638,-3.08971 -1.73567,-4.18802c1.08643,-2.23213 1.73567,-4.66172 1.73567,-7.27865c0,-7.33175 -4.88464,-13.30229 -11.17552,-17.07682c-6.29088,-3.77453 -14.37884,-5.85651 -23.22448,-5.85651zM57.33333,28.66667c6.98653,0 13.23877,1.77097 17.32317,4.22161c4.08441,2.45065 5.61016,5.07751 5.61016,7.24505c0,2.16755 -1.52575,4.79441 -5.61016,7.24505c-4.08441,2.45065 -10.33665,4.22161 -17.32317,4.22161c-6.98652,0 -13.23877,-1.77097 -17.32318,-4.22161c-4.08441,-2.45065 -5.61016,-5.07751 -5.61016,-7.24505c0,-2.16755 1.52575,-4.79441 5.61016,-7.24505c4.08441,-2.45065 10.33665,-4.22161 17.32318,-4.22161zM34.4,57.35573c6.25093,3.67165 14.21558,5.71094 22.93333,5.71094c8.71776,0 16.6824,-2.03929 22.93333,-5.71094v5.71094c0,2.1677 -1.52537,4.79441 -5.61016,7.24505c-4.08478,2.45064 -10.33791,4.22161 -17.32317,4.22161c-6.98527,0 -13.23839,-1.77097 -17.32318,-4.22161c-4.08478,-2.45064 -5.61016,-5.07735 -5.61016,-7.24505zM114.66667,74.53333c6.98653,0 13.23877,1.77097 17.32317,4.22161c4.08441,2.45064 5.61016,5.07751 5.61016,7.24505c0,2.16754 -1.52575,4.79441 -5.61016,7.24505c-4.08441,2.45064 -10.33665,4.22161 -17.32317,4.22161c-6.98653,0 -13.23877,-1.77097 -17.32317,-4.22161c-4.08441,-2.45064 -5.61016,-5.07751 -5.61016,-7.24505c0,-2.16754 1.52575,-4.79441 5.61016,-7.24505c4.08441,-2.45064 10.33665,-4.22161 17.32317,-4.22161zM34.4,80.28906c6.25118,3.67145 14.21673,5.71094 22.93333,5.71094c8.7166,0 16.68216,-2.03948 22.93333,-5.71094v5.71094c0,2.1677 -1.52537,4.79441 -5.61016,7.24505c-4.08478,2.45064 -10.33791,4.22161 -17.32317,4.22161c-6.98527,0 -13.23839,-1.77097 -17.32318,-4.22161c-4.08478,-2.45064 -5.61016,-5.07735 -5.61016,-7.24505zM34.4,103.22239c6.25118,3.67145 14.21673,5.71094 22.93333,5.71094c8.7166,0 16.68216,-2.03948 22.93333,-5.71094v5.71094c0,2.1677 -1.52537,4.79441 -5.61016,7.24505c-4.08478,2.45064 -10.33791,4.22161 -17.32317,4.22161c-6.98527,0 -13.23839,-1.77097 -17.32318,-4.22161c-4.08478,-2.45064 -5.61016,-5.07735 -5.61016,-7.24505zM91.73333,103.22239c6.25093,3.67165 14.21558,5.71094 22.93333,5.71094c8.71776,0 16.6824,-2.03929 22.93333,-5.71094v5.71094c0,2.1677 -1.52537,4.79441 -5.61016,7.24505c-4.08478,2.45064 -10.33791,4.22161 -17.32317,4.22161c-6.98527,0 -13.23839,-1.77097 -17.32317,-4.22161c-4.08479,-2.45064 -5.61016,-5.07735 -5.61016,-7.24505zM34.4,126.15573c6.25118,3.67145 14.21673,5.71094 22.93333,5.71094c8.7166,0 16.68216,-2.03948 22.93333,-5.71094v5.71094c0,2.1677 -1.52537,4.79441 -5.61016,7.24505c-4.08478,2.45064 -10.33791,4.22161 -17.32317,4.22161c-6.98527,0 -13.23839,-1.77097 -17.32318,-4.22161c-4.08478,-2.45064 -5.61016,-5.07735 -5.61016,-7.24505zM91.73333,126.15573c6.25117,3.67145 14.21673,5.71094 22.93333,5.71094c8.7166,0 16.68216,-2.03948 22.93333,-5.71094v5.71094c0,2.1677 -1.52537,4.79441 -5.61016,7.24505c-4.08478,2.45064 -10.33791,4.22161 -17.32317,4.22161c-6.98527,0 -13.23839,-1.77097 -17.32317,-4.22161c-4.08479,-2.45064 -5.61016,-5.07735 -5.61016,-7.24505z"
                              ></path>
                            </g>
                          </g>
                        </svg>
                      </v-card-media>
                    </v-flex>
                    <v-flex md5>
                      <v-card-media class="gold_lead"
                      >{{
                        $store.state.steamApiData[matchIndex].radiant_lead
                        | goldDireFilter
                        }}
                      </v-card-media>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>
                  <v-layout pa-1>
                    <v-flex class="text-md-right kills">
                      <v-card-media>{{
                        $store.state.steamApiData[matchIndex].radiant_score
                        }}
                      </v-card-media>
                    </v-flex>
                    <v-flex>
                      -
                    </v-flex>
                    <v-flex class="text-md-left kills">
                      <v-card-media>{{
                        $store.state.steamApiData[matchIndex].dire_score
                        }}
                      </v-card-media>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>
                  <v-layout pa-1>
                    <v-flex class="text-md-right kills_change">{{
                      this.team_radiant_kills_change
                      }}
                    </v-flex>
                    <v-flex
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="20"
                        height="20"
                        viewBox="0 0 172 172"
                        style=" fill:#000000;"
                      >
                        <g
                          fill="none"
                          fill-rule="nonzero"
                          stroke="none"
                          stroke-width="1"
                          stroke-linecap="butt"
                          stroke-linejoin="miter"
                          stroke-miterlimit="10"
                          stroke-dasharray=""
                          stroke-dashoffset="0"
                          font-family="none"
                          font-weight="none"
                          font-size="none"
                          text-anchor="none"
                          style="mix-blend-mode: normal"
                        >
                          <path d="M0,172v-172h172v172z" fill="none"></path>
                          <g fill="#ffffff">
                            <g id="surface1">
                              <path
                                d="M168.4525,0c-0.30906,0.01344 -0.65844,0.1075 -0.9675,0.215l-38.1625,12.685c-0.55094,0.18813 -1.11531,0.5375 -1.505,0.9675l-78.1525,85.6775l11.9325,8.385c0.98094,0.68531 1.86781,1.58563 2.58,2.58l8.2775,11.825l85.6775,-78.1525c0.43,-0.38969 0.77938,-0.95406 0.9675,-1.505l12.685,-38.1625c0.41656,-1.23625 0.17469,-2.62031 -0.7525,-3.5475c-0.68531,-0.68531 -1.63937,-1.00781 -2.58,-0.9675zM25.585,92.02c-0.76594,0.05375 -1.55875,0.30906 -2.15,0.86l-6.1275,5.6975c-0.68531,0.63156 -1.16906,1.54531 -1.1825,2.4725c-0.01344,0.94063 0.41656,1.81406 1.075,2.4725l51.2775,51.2775c0.645,0.645 1.45125,1.075 2.365,1.075c0.01344,0 0.09406,0 0.1075,0c0.92719,-0.01344 1.72,-0.41656 2.365,-1.075l5.805,-6.02c1.14219,-1.1825 1.26313,-3.06375 0.3225,-4.4075l-20.9625,-29.885c-0.22844,-0.3225 -0.5375,-0.63156 -0.86,-0.86l-29.885,-20.9625c-0.65844,-0.47031 -1.38406,-0.69875 -2.15,-0.645zM28.165,124.27l-13.4375,16.985c8.30438,1.16906 14.84844,7.71313 16.0175,16.0175l16.985,-13.4375zM12.04,147.92c-6.65156,0 -12.04,5.38844 -12.04,12.04c0,6.65156 5.38844,12.04 12.04,12.04c6.65156,0 12.04,-5.38844 12.04,-12.04c0,-6.65156 -5.38844,-12.04 -12.04,-12.04z"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </svg
                      >
                    </v-flex>
                    <v-flex class="text-md-left kills_change">{{
                      this.team_dire_kills_change
                      }}
                    </v-flex>
                  </v-layout>
                </v-layout>
              </v-flex>
              <v-flex v-if="filteredPlayers" md1>
                <v-layout class="stat_layout"
                          v-for="value in filteredPlayers.dire_team"

                >
                  <v-flex class="hero_img"
                  >
                    <v-img :src="value.imgSrc || 'NO DATA'"></v-img
                    >
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex md5 class="stat_layout">
                <v-layout style="margin-left: 12px">
                  <canvas
                    :id="this.randomClass"
                    width="170"
                    height="170"
                  ></canvas>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
    <!--ПЕРЕВЕРНУТАЯ ПОЛНАЯ ВЕРСИЯ МАТЧА-->

    <!--СВЕРНУТАЯ ВЕРСИЯ-->
    <v-container v-if="hide"
                 @click="eventStart"
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
  import { Dota2Map } from './Dota2Map'


  const chance = new Chance()

  export default {
    name: 'BetItemDota2',

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
        sliderColor: 'orange darken-3',
        allowed: true,
        alreadyListen: false,
        randomClass: String,
        dota2Map: null,
        audio: null,
        steamApiDialog: false,
        playersDialog: false,
        steamApiMatch: 0,
        betPower: 0,
        winSide: 0,
        bet: {
          left: {},
          right: {},
          type: 'full',
          playersInGame: {
            active: 0,
            inactive: 0
          }
        },
        bd: 0,
        bdChange: 0,
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
              max: 1000
            },
            team_B: {
              odd: 0,
              max: 1000
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
      totalPlayersCount() {
        return this.$store.state.players.length
      },

      readyPlayersCount() {
        return this.$store.state.playersBets[this.dataId].list.length
      },


      leftTotalBet() {
        return this.$store.state.playersBets[this.dataId].leftTotalBet
      },

      rightTotalBet() {
        return this.$store.state.playersBets[this.dataId].rightTotalBet
      },

      leftTotalPWin() {
        return this.$store.state.playersBets[this.dataId].leftTotalPWin
      },

      rightTotalPWin() {
        return this.$store.state.playersBets[this.dataId].rightTotalPWin
      },

      dataIdWhenLive() {
        if (this.status === 'live') {
          return this.dataId
        }
      },

      idWhenLive() {
        if (this.status === 'live') {
          return this.index
        }
      },

      pWinNow() {
        let result = 0
        if (this.winSide === 1) {
          result = (this.betPower * (this.odds.live.team_A.odd / 100)) - this.betPower
        } else if (this.winSide === 3) {
          result = (this.betPower * (this.odds.live.team_B.odd / 100)) - this.betPower
        }
        return result.toFixed(1)
      },

      checkReverse() {
        return this.reverse
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
      bd: function(newVal, oldVal) {
        this.bdChange = newVal - oldVal
      },

      'teamA.LOCK': function(newVal) {

        if (newVal) {
          if (this.winSide === 1) {
            this.winSide = null
          }
        }
      },
      'teamB.LOCK': function(newVal) {

        if (newVal) {
          if (this.winSide === 3) {
            this.winSide = null
          }
        }
      },
      //
      // 'bet.right.data.username': function(newVal, oldVal) {
      //   if (newVal > (odds.live.team_B.odd / 100) ) {
      //     this.bet.right.data.username = odds.live.team_B.odd / 100
      //   }
      // },

      radiant_win: function(val) {
        if (val !== null) {
          this.someThing(sound4)
        }

      },

      deactivate_time: function() {
        this.$socket.emit('check_winner', {
          data_id: this.dataId,
          match_id: this.steamApiMatch
        })
      },


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
      // this.eventStart()

      // this.$router.afterEach(to => {
      //   if (to.path === '/dota2') {
      //     this.eventStart()
      //   }
      // })
    },


    created() {
      this.randomClass = this.$chance.string({ length: 10, pool: 'abcdeghreq' })
      this.$store.subscribe((mutation, state) => {
        if (this.matchIndex !== null) {
          state.steamApiData.forEach((data, index) => {
            if (data.match_id === this.steamApiMatch) {
              if (
                this.team_radiant_kills === data.radiant_score &&
                this.team_dire_kills === data.dire_score
              ) {
                this.bd = data.building_state_string
                this.buildingStateStringChange =
                  data.building_state_string - this.buildingStateString
                this.buildingStateString = data.building_state_string
                this.radiant_lead = data.radiant_lead
                this.buildingState = data.building_state
                this.dota2Map.changeState(this.buildingState)
                this.deactivate_time = data.deactivate_time


              } else {
                this.buildingStateStringChange =
                  data.building_state_string - this.buildingStateString
                this.buildingStateString = data.building_state_string
                this.team_radiant_kills_change =
                  data.radiant_score - this.team_radiant_kills
                this.team_radiant_kills = data.radiant_score
                this.team_dire_kills_change =
                  data.dire_score - this.team_dire_kills
                this.team_dire_kills = data.dire_score
                this.radiant_lead = data.radiant_lead
                this.buildingState = data.building_state
                this.dota2Map.changeState(this.buildingState)
                this.deactivate_time = data.deactivate_time


              }
            }
          })
        }
      })


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

      eventStart() {
        if (!this.alreadyListen) {
          if (document.querySelector(`[data-id="${this.dataId.toString()}"]`)) {
            this.alreadyListen = true
            document.querySelector(`[data-id="${this.dataId.toString()}"]`).addEventListener('keydown', e => {
              if (document.activeElement.getAttribute('data-id') === this.dataId.toString()) {

                if (e.repeat !== undefined) {
                  this.allowed = !e.repeat
                }
                if (!this.allowed) return
                this.allowed = false


                if (!this.reverse) {
                  if (e.key === 'ArrowLeft' && !this.teamA.LOCK) {
                    this.winSide = 1
                  } else if (e.key === 'ArrowRight' && !this.teamB.LOCK) {
                    this.winSide = 3
                  }
                } else if (this.reverse) {
                  if (e.key === 'ArrowLeft' && !this.teamB.LOCK) {
                    this.winSide = 3
                  } else if (e.key === 'ArrowRight' && !this.teamA.LOCK) {
                    this.winSide = 1
                  }
                }
                if (this.winSide === 1) {
                  if (e.key === 'a' || e.key === 'ф') this.betPower = this.betPower - (this.odds.live.team_A.max / 100)
                  if (e.key === 'd' || e.key === 'в') this.betPower = this.betPower + (this.odds.live.team_A.max / 100)
                  if (e.key === 'q' || e.key === 'й') this.betPower = (this.readyPlayersCount * (this.odds.live.team_A.max / 100)) * 0.33
                  if (e.key === 'w' || e.key === 'ц') this.betPower = (this.readyPlayersCount * (this.odds.live.team_A.max / 100)) * 0.5
                  if (e.key === 'e' || e.key === 'у') this.betPower = (this.readyPlayersCount * (this.odds.live.team_A.max / 100)) * 0.66
                  if (e.key === 'r' || e.key === 'к') this.betPower = this.readyPlayersCount * (this.odds.live.team_A.max / 100)
                  if (e.key === '1') this.betPower = this.odds.live.team_A.max / 100
                  if (e.key === '2') this.betPower = (this.readyPlayersCount * (this.odds.live.team_A.max / 100)) * 0.3
                  if (e.key === '3') this.betPower = (this.readyPlayersCount * (this.odds.live.team_A.max / 100)) * 0.45
                  if (e.key === '4') this.betPower = (this.readyPlayersCount * (this.odds.live.team_A.max / 100)) * 0.6
                  if (e.key === '5') this.betPower = (this.readyPlayersCount * (this.odds.live.team_A.max / 100)) * 0.75
                  if (e.key === '6') this.betPower = (this.readyPlayersCount * (this.odds.live.team_A.max / 100)) * 0.9
                } else if (this.winSide === 3) {
                  if (e.key === 'a' || e.key === 'ф') this.betPower = this.betPower - (this.odds.live.team_B.max / 100)
                  if (e.key === 'd' || e.key === 'в') this.betPower = this.betPower + (this.odds.live.team_B.max / 100)
                  if (e.key === 'q' || e.key === 'й') this.betPower = (this.readyPlayersCount * (this.odds.live.team_B.max / 100)) * 0.33
                  if (e.key === 'w' || e.key === 'ц') this.betPower = (this.readyPlayersCount * (this.odds.live.team_B.max / 100)) * 0.5
                  if (e.key === 'e' || e.key === 'у') this.betPower = (this.readyPlayersCount * (this.odds.live.team_B.max / 100)) * 0.66
                  if (e.key === 'r' || e.key === 'к') this.betPower = this.readyPlayersCount * (this.odds.live.team_B.max / 100)
                  if (e.key === '1') this.betPower = this.odds.live.team_B.max / 100
                  if (e.key === '2') this.betPower = (this.readyPlayersCount * (this.odds.live.team_B.max / 100)) * 0.3
                  if (e.key === '3') this.betPower = (this.readyPlayersCount * (this.odds.live.team_B.max / 100)) * 0.45
                  if (e.key === '4') this.betPower = (this.readyPlayersCount * (this.odds.live.team_B.max / 100)) * 0.6
                  if (e.key === '5') this.betPower = (this.readyPlayersCount * (this.odds.live.team_B.max / 100)) * 0.75
                  if (e.key === '6') this.betPower = (this.readyPlayersCount * (this.odds.live.team_B.max / 100)) * 0.9
                }


                if (e.key === 'v' || e.key === 'м') {
                  this.func1('normal')
                }
                // if (e.key === ' ') {
                //   this.func1('force')
                // }
                if (e.key === 'x' || e.key === 'ч') {
                  this.hideAndMap()
                }
                if (e.key === 'z' || e.key === 'я') {
                  this.reverse = !this.reverse
                }


                document.querySelector(`[data-id="${this.dataId.toString()}"]`).addEventListener('keyup', e => {
                  if (document.activeElement.getAttribute('data-id') === this.dataId.toString()) {
                    this.allowed = true
                  }
                })
              }
            })
          } else {

          }
        } else {

        }
      },


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
        this.$socket.emit('single_bet', {
          dataId: this.dataId,
          statusBuilder: this.statusBuilder,
          username,
          winSide,
          betSize,
          betSpeed: 'normal'
        })
        this.bet.left[username] = ''
        this.bet.right[username] = ''
      },


      placeBet: function() {
        this.$socket.emit('place_bet', {
          dataId: this.dataId,
          winSide: this.winSide
        })
      },

      choosePlayer: function(dataId, index) {
        this.$store.commit('playersMatchSync', {
          dataId,
          index
        })
      },

      heroesIcons: function() {
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

          this.dota2Map = new Dota2Map(canvasElement)
          this.dota2Map.changeState(this.buildingState)
        }, 0)
        this.eventStart()
      },

      func1(speed) {
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

        if (this.winSide === 1) {
          maxBet = this.odds.live.team_A.max / 100
        } else if (this.winSide === 3) {
          maxBet = this.odds.live.team_B.max / 100
        }



        if (this.$store.state.playersBets[this.dataId].list.length !== 0 && maxBet !== 0 && this.betPower !== 0 && this.winSide !== 0) {
          let multiBetArr = multiBet(this.$store.state.playersBets[this.dataId].list, maxBet, this.betPower, this.bet.type)
          this.$socket.emit('multi_bet_dota2', {
            dataId: this.dataId,
            statusBuilder: this.statusBuilder,
            betArr: multiBetArr,
            winSide: this.winSide,
            betSpeed: speed
          })
        }

      },


      playSound(sound) {
        let audio = new Audio(sound)

        audio.volume = 0.5
        audio.play()
      },

      dynamicClass(data) {
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
          if (this.winSide === 1) {
            this.betPower = this.$store.state.playersBets[this.dataId].list.length * (this.odds.live.team_A.max / 100)
          } else if (this.winSide === 3) {
            this.betPower = this.$store.state.playersBets[this.dataId].list.length * (this.odds.live.team_B.max / 100)
          }
        } else if (power === 'min') {
          this.betPower = 10
        } else if (power === 'f1') {
          if (this.winSide === 1) {
            this.betPower = this.odds.live.team_A.max / 100
          } else if (this.winSide === 3) {
            this.betPower = this.odds.live.team_B.max / 100
          }
        }

      },
      chooseWinner(winner) {
        this.winSide = winner
      },
      async chooseSteamApiMatch(data) {
        this.steamApiDialog = !this.steamApiDialog

        this.radiant_win = null
        this.steamApiMatch = data
        this.$socket.emit('check_winner', {
          data_id: this.dataId,
          match_id: this.steamApiMatch
        })
        await (new Promise((resolve, reject) => {
          setTimeout(() => {
            this.buildingState = this.$store.state.steamApiData[this.matchIndex].building_state
            resolve()
          }, 100)
        }))

        await (new Promise((resolve, reject) => {
          setTimeout(() => {
            const canvasElement = document.getElementById(this.randomClass)
            this.dota2Map = new Dota2Map(canvasElement)
            this.dota2Map.changeState(this.buildingState)
            resolve()
          }, 100)
        }))

        // this.playSound(sound3)
        this.heroesIcons()

      }
    },

    sockets: {
      updatematch_dota: function(data) {
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
    background-color: darkslategray;
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
    background-color: whitesmoke !important;
    color: black;
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
    box-shadow: inset 0px 0px 0px 15px whitesmoke !important;
    /*border: blue 10px groove;*/
  }
</style>
