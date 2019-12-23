<template>
    <v-card v-if="wantThisGame" :tabindex="index" :id="liveIndex" :data-id="dataIdWhenLive" class="matchWrap"
            :class="{ live: isLive }" @click="eventStart">
        <!--PARIMATCH DIALOG-->
        <v-dialog v-model="parimatchDialog" max-width="700px" min-height="600px">
            <v-card>
                <v-card-title>Parimatch data</v-card-title>
                <v-layout>
                    <v-flex md5>
                        <v-card-text>Left Team</v-card-text>
                    </v-flex>
                    <v-flex md5>
                        <v-card-text>Right Team</v-card-text>
                    </v-flex>
                </v-layout>
                <v-layout v-if="parimatchData"
                          style="border-top: gray 2px groove"
                          v-for="data in parimatchData"
                          :key="data.href"
                >
                    <v-flex md5>
                        <v-card-text>{{ data.teams.left }}</v-card-text>
                    </v-flex>
                    <v-flex md5>
                        <v-card-text>{{ data.teams.right }}</v-card-text>
                    </v-flex>
                    <v-flex md2>
                        <v-btn @click="chooseFromParimatch(data.href)">Choose</v-btn>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-dialog>

        <!--GGBET DIALOG-->
        <v-dialog v-model="ggbetDialog" max-width="700px" min-height="600px">
            <v-card>
                <v-card-title>GGbet data</v-card-title>
                <v-layout>
                    <v-flex md5>
                        <v-card-text>Left Team</v-card-text>
                    </v-flex>
                    <v-flex md5>
                        <v-card-text>Right Team</v-card-text>
                    </v-flex>
                </v-layout>
                <v-layout v-if="ggbetData"
                          style="border-top: gray 2px groove"
                          v-for="data in ggbetData"
                          :key="data.href"
                >
                    <v-flex md5>
                        <v-card-text>{{ data.teams.left }}</v-card-text>
                    </v-flex>
                    <v-flex md5>
                        <v-card-text>{{ data.teams.right }}</v-card-text>
                    </v-flex>
                    <v-flex md2>
                        <v-btn @click="chooseFromGGbet(data.src)">Choose</v-btn>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-dialog>

        <!--BET365 DIALOG-->
        <v-dialog v-model="bet365Dialog" max-width="700px" min-height="600px">
            <v-card>
                <v-card-title>Bet365 data</v-card-title>
                <v-layout>
                    <v-flex md5>
                        <v-card-text>Left Team</v-card-text>
                    </v-flex>
                    <v-flex md5>
                        <v-card-text>Right Team</v-card-text>
                    </v-flex>
                </v-layout>
                <v-layout v-if="bet365Data"
                          style="border-top: gray 2px groove"
                          v-for="data in bet365Data"
                          :key="data.id"
                >
                    <v-flex md5>
                        <v-card-text>{{ data.teams.left }}</v-card-text>
                    </v-flex>
                    <v-flex md5>
                        <v-card-text>{{ data.teams.right }}</v-card-text>
                    </v-flex>
                    <v-flex md2>
                        <v-btn @click="chooseFromBet365(data.id)">Choose</v-btn>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-dialog>

        <!--ESEA DIALOG-->
        <v-dialog v-model="eseaDialog" max-width="700px" min-height="600px">
            <v-card>
                <v-card-title>ESEA data</v-card-title>
                <v-layout>
                    <v-flex md5>
                        <v-card-text>Left Team</v-card-text>
                    </v-flex>
                    <v-flex md5>
                        <v-card-text>Right Team</v-card-text>
                    </v-flex>
                </v-layout>
                <v-layout v-if="eseaData"
                          style="border-top: gray 2px groove"
                          v-for="data in eseaData"
                          :key="data.id"
                >

                    <v-flex md5>
                        <v-card-text>{{ data.home_team.name }} : {{data.home_team.score}}</v-card-text>
                    </v-flex>
                    <v-flex md5>
                        <v-card-text>{{ data.away_team.name }} : {{data.away_team.score}}</v-card-text>
                    </v-flex>
                    <v-flex md2>
                        <v-btn @click="chooseFromEsea(data.id)">Choose</v-btn>
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
                                    <v-card-text
                                            v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]">
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
                                    <v-card-text
                                            v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]">
                                        x{{
                                        ((parseFloat(data.now_bets[dataId][statusBuilder].LEFT_BET.TOTAL_BET) +
                                        parseFloat(data.now_bets[dataId][statusBuilder].LEFT_BET.TOTAL_PWIN)) /
                                        parseFloat(data.now_bets[dataId][statusBuilder].LEFT_BET.TOTAL_BET)).toFixed(2)
                                        }}
                                    </v-card-text>
                                </v-flex>
                                <v-flex md3>
                                    <v-card-text
                                            v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]">
                                        {{data.now_bets[dataId][statusBuilder].LEFT_BET.TOTAL_BET}}
                                    </v-card-text>
                                </v-flex>
                                <v-flex md3>
                                    <v-card-text
                                            v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]">
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
                                    <v-card-text
                                            v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]">
                                        x{{
                                        ((parseFloat(data.now_bets[dataId][statusBuilder].RIGHT_BET.TOTAL_BET) +
                                        parseFloat(data.now_bets[dataId][statusBuilder].RIGHT_BET.TOTAL_PWIN)) /
                                        parseFloat(data.now_bets[dataId][statusBuilder].RIGHT_BET.TOTAL_BET)).toFixed(2)
                                        }}
                                    </v-card-text>
                                </v-flex>
                                <v-flex md3>
                                    <v-card-text
                                            v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]">
                                        {{data.now_bets[dataId][statusBuilder].RIGHT_BET.TOTAL_BET}}
                                    </v-card-text>
                                </v-flex>
                                <v-flex md3>
                                    <v-card-text
                                            v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]">
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
                                               @click="singleBet(data.username, 3, bet.right[data.username], 'full') "
                                               fab>R
                                        </v-btn>
                                        <v-btn v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]"
                                               :class="{disable_events: data.now_bets[dataId][statusBuilder].STATUS === 'timeout' || !bet.left[data.username] || teamA.LOCK} "
                                               @click="singleBet(data.username, 1, bet.left[data.username], 'full')"
                                               fab>L
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
                                    <v-card-text
                                            v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]">
                                        {{data.now_bets[dataId][statusBuilder].RIGHT_BET.TOTAL_PWIN}}
                                    </v-card-text>
                                </v-flex>
                                <v-flex md3>
                                    <v-card-text
                                            v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]">
                                        {{data.now_bets[dataId][statusBuilder].RIGHT_BET.TOTAL_BET}}
                                    </v-card-text>
                                </v-flex>
                                <v-flex md3>
                                    <v-card-text
                                            v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]">
                                        x{{
                                        ((parseFloat(data.now_bets[dataId][statusBuilder].RIGHT_BET.TOTAL_BET) +
                                        parseFloat(data.now_bets[dataId][statusBuilder].RIGHT_BET.TOTAL_PWIN)) /
                                        parseFloat(data.now_bets[dataId][statusBuilder].RIGHT_BET.TOTAL_BET)).toFixed(2)
                                        }}
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
                                    <v-card-text
                                            v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]">
                                        {{data.now_bets[dataId][statusBuilder].LEFT_BET.TOTAL_PWIN}}
                                    </v-card-text>
                                </v-flex>

                                <v-flex md3>
                                    <v-card-text
                                            v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]">
                                        {{data.now_bets[dataId][statusBuilder].LEFT_BET.TOTAL_BET}}
                                    </v-card-text>
                                </v-flex>
                                <v-flex md3>
                                    <v-card-text
                                            v-if="data.now_bets && data.now_bets[dataId] && data.now_bets[dataId][statusBuilder]">
                                        x{{
                                        ((parseFloat(data.now_bets[dataId][statusBuilder].LEFT_BET.TOTAL_BET) +
                                        parseFloat(data.now_bets[dataId][statusBuilder].LEFT_BET.TOTAL_PWIN)) /
                                        parseFloat(data.now_bets[dataId][statusBuilder].LEFT_BET.TOTAL_BET)).toFixed(2)
                                        }}
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
                    <v-flex md1 class="stat_layout" @click="eventStart">
                        <v-img :src="tournamentLogo || 'NO DATA'"></v-img>
                        <v-layout pa-1 align-center row justify-center>
                            <v-btn v-if="reverse" light @click="reverseMethod" tabindex="-1">
                                <v-icon>repeat</v-icon>
                            </v-btn>
                            <v-btn class="min-btn" v-else-if="!reverse" @click="reverseMethod" tabindex="-1">
                                <v-icon>repeat</v-icon>
                            </v-btn>
                            <v-btn class="min-btn" @click="hide = !hide" tabindex="-1">
                                <v-icon>minimize</v-icon>
                            </v-btn>

                        </v-layout>
                        <v-layout row justify-center>
                            <v-btn class="min-btn" @click="parimatchDialogMethod" tabindex="-1">
                                <v-icon>data_usage</v-icon>
                            </v-btn>
                            <v-btn class="min-btn" @click="playersDialog = !playersDialog" tabindex="-1">
                                <v-icon>fingerprint</v-icon>
                            </v-btn>
                        </v-layout>
                        <v-layout>
                            <v-text-field style="margin-left: 10px; margin-right: 10px; max-height: 30px"
                                          v-model="liveIndex"></v-text-field>
                        </v-layout>
                    </v-flex>
                    <!--КНОПКА ЛЕВОЙ КОМАНДЫ И КОЭФЦИЕНТЫ-->
                    <v-flex md3 v-if="!reverse">
                        <v-layout class="justify-space-between text-md-center">
                            <v-flex style="height: 192px" md4 class="team_card"
                                    :class="{disable_events: teamA.LOCK || status !=='live'}">
                                <v-layout column fill-height :class="{active_team_card: winSide === 1}"
                                          @click="chooseWinner(1)">
                                    <v-flex pa-2>
                                        {{ teamA.NAME }}
                                    </v-flex>
                                    <v-flex pa-1>
                                        <v-img :src="teamA.LOGO || 'NO DATA'"></v-img>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex md4>
                                <v-layout column class="stat_layout" fill-height>
                                    <v-layout>
                                        <v-flex>
                                            <v-card-text>
                                                <div style="margin-bottom: 8px; margin-top: 9px">Block</div>
                                            </v-card-text>

                                        </v-flex>
                                    </v-layout>
                                    <v-divider></v-divider>

                                    <v-layout>
                                        <v-flex @click="pariReverse = !pariReverse" v-if="!pariReverse">
                                            <v-card-text
                                                    v-if="parsers.data.parimatch && parsers.data.parimatch.odds && parsers.data.parimatch.odds[mapNumber]  && parsers.data.parimatch.odds[mapNumber].left"
                                                    class="main_stat_item">{{parsers.data.parimatch.odds[mapNumber].left}}
                                            </v-card-text>
                                            <v-card-text v-else class="main_stat_item">Block</v-card-text>
                                        </v-flex>
                                        <v-flex @click="pariReverse = !pariReverse" v-else-if="pariReverse">
                                            <v-card-text
                                                    v-if="parsers.data.parimatch && parsers.data.parimatch.odds && parsers.data.parimatch.odds[mapNumber]  && parsers.data.parimatch.odds[mapNumber].right"
                                                    class="main_stat_item">{{parsers.data.parimatch.odds[mapNumber].right}}
                                            </v-card-text>
                                            <v-card-text v-else class="main_stat_item">Block</v-card-text>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider></v-divider>

                                    <v-layout>
                                        <v-flex v-if="!ggbetReverse" @click="ggbetReverse = !ggbetReverse">
                                            <v-card-text
                                                    v-if="mapNumber && parsers.data.ggbet && parsers.data.ggbet.odds && parsers.data.ggbet.odds[mapNumber] && parsers.data.ggbet.odds[mapNumber].left"
                                                    class="main_stat_item">{{parsers.data.ggbet.odds[mapNumber].left}}
                                            </v-card-text>
                                            <v-card-text v-else class="main_stat_item">Block</v-card-text>
                                        </v-flex>
                                        <v-flex v-else-if="ggbetReverse" @click="ggbetReverse = !ggbetReverse">
                                            <v-card-text
                                                    v-if="mapNumber && parsers.data.ggbet && parsers.data.ggbet.odds && parsers.data.ggbet.odds[mapNumber] && parsers.data.ggbet.odds[mapNumber].right"
                                                    class="main_stat_item">{{parsers.data.ggbet.odds[mapNumber].right}}
                                            </v-card-text>
                                            <v-card-text v-else class="main_stat_item">Block</v-card-text>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider></v-divider>

                                    <v-layout>
                                        <v-flex v-if="!bet365Reverse" @click="bet365Reverse = !bet365Reverse">
                                            <v-card-text
                                                    v-if="parsers.data.bet365 && parsers.data.bet365.teams.odds && parsers.data.bet365.teams.odds.left"
                                                    class="main_stat_item">{{parsers.data.bet365.teams.odds.left}}
                                            </v-card-text>
                                            <v-card-text v-else class="main_stat_item">Block</v-card-text>
                                        </v-flex>
                                        <v-flex v-else-if="bet365Reverse" @click="bet365Reverse = !bet365Reverse">
                                            <v-card-text
                                                    v-if="parsers.data.bet365 && parsers.data.bet365.teams.odds && parsers.data.bet365.teams.odds.right"
                                                    class="main_stat_item">{{parsers.data.bet365.teams.odds.right}}
                                            </v-card-text>
                                            <v-card-text v-else class="main_stat_item">Block</v-card-text>
                                        </v-flex>
                                    </v-layout>
                                </v-layout>
                            </v-flex>
                            <v-flex md4>
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
                                                    <div style="margin-left: 5px" class="max"
                                                         v-if="$store.state.playersBets[dataId]">
                                                        {{ (odds.live.team_A.max / 100) * readyPlayersCount }}
                                                    </div>
                                                </v-layout>
                                            </v-card-text>

                                        </v-flex>
                                    </v-layout>
                                    <v-divider></v-divider>

                                    <v-layout>
                                        <v-flex>
                                            <v-card-text v-if="$store.state.playersBets[dataId]" class="main_stat_item">
                                                TB: {{leftTotalBet}}
                                            </v-card-text>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider></v-divider>

                                    <v-layout>
                                        <v-flex>
                                            <v-card-text v-if="$store.state.playersBets[dataId]" class="main_stat_item">
                                                PW: {{leftTotalPWin.toFixed(2)}}
                                            </v-card-text>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider></v-divider>

                                    <v-layout>
                                        <v-flex>
                                            <v-card-text v-if="$store.state.playersBets[dataId]" class="main_stat_item">
                                                x{{((leftTotalBet + leftTotalPWin)/leftTotalBet).toFixed(2)}}
                                            </v-card-text>
                                        </v-flex>
                                    </v-layout>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex md3 v-else-if="reverse">
                        <v-layout>
                            <v-flex md6 class="team_card" :class="{disable_events: teamB.LOCK || status !=='live'}">
                                <v-layout column fill-height :class="{active_team_card: winSide === 3}"
                                          @click="chooseWinner(3)">
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
                                                    <div style="margin-left: 5px" class="max"
                                                         v-if="$store.state.playersBets[dataId]">
                                                        {{ (odds.live.team_B.max / 100) * readyPlayersCount }}
                                                    </div>
                                                </v-layout>
                                            </v-card-text>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider></v-divider>

                                    <v-layout>
                                        <v-flex>
                                            <v-card-text v-if="$store.state.playersBets[dataId]" class="main_stat_item">
                                                TB: {{rightTotalBet}}
                                            </v-card-text>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider></v-divider>

                                    <v-layout>
                                        <v-flex>
                                            <v-card-text v-if="$store.state.playersBets[dataId]" class="main_stat_item">
                                                PW: {{rightTotalPWin.toFixed(2)}}
                                            </v-card-text>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider></v-divider>

                                    <v-layout>
                                        <v-flex>
                                            <v-card-text v-if="$store.state.playersBets[dataId]" class="main_stat_item">
                                                x{{((rightTotalBet +
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
                            <v-flex class="pa-3">
                                <v-layout>
                                    <v-flex md2 style="margin-left: 15px; margin-right: 15px; margin-top: 5px">
                                        <div>{{betPower}}</div>
                                        <div style="color: yellow;">{{pWinNow}}</div>
                                    </v-flex>

                                    <v-flex md10 style="margin-top: 5px">
                                        <v-slider @click="focus" tabindex="-1" height="10px" v-if="winSide === 1"
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
                            <v-flex pa-2 style="border-top: grey 2px groove; border-bottom: grey 2px groove;">
                                <v-layout v-if="!reverse" text-md-center style="font-size: 15px; ">
                                    <v-flex md2
                                            :class="{TP_Plus: (leftTotalPWin - rightTotalBet) > 0, TP_Minus: (leftTotalPWin - rightTotalBet) < 0 }">
                                        {{(leftTotalPWin - rightTotalBet).toFixed(2)}}
                                    </v-flex>
                                    <v-flex md8 :class="{emptyAP: !readyPlayersCount}"
                                            style="margin-right: 25px; color: yellow">AP: {{readyPlayersCount}} /
                                        {{totalPlayersCount}}
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
                                            style="margin-right: 25px; color:yellow">AP: {{readyPlayersCount}} /
                                        {{totalPlayersCount}}
                                    </v-flex>

                                    <v-flex md2
                                            :class="{TP_Plus: (leftTotalPWin - rightTotalBet) > 0, TP_Minus: (leftTotalPWin - rightTotalBet) < 0 }">
                                        {{(leftTotalPWin - rightTotalBet).toFixed(2)}}
                                    </v-flex>

                                </v-layout>
                            </v-flex>
                            <v-flex pa-2>
                                <v-layout  class="csgo_scoreboard">
                                    <v-flex @click="pariReverse = !pariReverse" v-if="!pariReverse" >PM: <span v-if="parsers.data.parimatch" style="font-size: 20px; color: yellow; margin-left: 10px">{{parsers.data.parimatch.teams.left.score}} : {{ parsers.data.parimatch.teams.right.score }}</span></v-flex>
                                    <v-flex @click="pariReverse = !pariReverse" v-else-if="pariReverse">PM: <span v-if="parsers.data.parimatch" style="font-size: 20px; color: yellow; margin-left: 10px">{{parsers.data.parimatch.teams.right.score}} : {{ parsers.data.parimatch.teams.left.score }}</span></v-flex>
                                    <v-flex @click="eseaReverse = !eseaReverse" v-if="!eseaReverse" >ESEA: <span v-if="parsers.data.esea" style="font-size: 20px; color: yellow; margin-left: 10px">{{parsers.data.esea.away_team.score}} : {{ parsers.data.esea.home_team.score }}</span></v-flex>
                                    <v-flex @click="eseaReverse = !eseaReverse" v-else-if="eseaReverse" >ESEA: <span v-if="parsers.data.esea" style="font-size: 20px; color: yellow; margin-left: 10px">{{parsers.data.esea.home_team.score}} : {{ parsers.data.esea.away_team.score }}</span></v-flex>
                                    <v-flex @click="bet365Reverse = !bet365Reverse" v-if="!bet365Reverse">B3: <span v-if="parsers.data.bet365" style="font-size: 20px; font-weight: bold; color: #c7a585; margin-left: 10px">{{parsers.data.bet365.teams.left.score}} : {{ parsers.data.bet365.teams.right.score }}</span></v-flex>
                                    <v-flex @click="bet365Reverse = !bet365Reverse" v-else-if="bet365Reverse">B3: <span v-if="parsers.data.bet365" style="font-size: 20px; font-weight: bold; color: #c7a585; margin-left: 10px">{{parsers.data.bet365.teams.right.score}} : {{ parsers.data.bet365.teams.left.score }}</span></v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <!--КНОПКА ПРАВОЙ КОМАНДЫ И КОЭФИЦИЕНЫ-->
                    <v-flex md3 v-if="!reverse">
                        <v-layout>
                            <v-flex md4 style="height: 192px">
                                <v-layout column fill-height class="stat_layout">
                                    <v-layout>
                                        <v-flex>
                                            <v-card-text v-if="$store.state.playersBets[dataId]">
                                                <div
                                                        :class="{vilka: (1/((leftTotalBet + leftTotalPWin)/leftTotalBet)) + (1/(odds.live.team_B.odd / 100)) < 1 }"
                                                        class="odds">x{{ odds.live.team_B.odd / 100 }}
                                                </div>
                                                <v-layout>
                                                    <div style="margin-left: 30px" class="max"
                                                         v-if="$store.state.playersBets[dataId]">
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
                                            <v-card-text v-if="$store.state.playersBets[dataId]" class="main_stat_item">
                                                TB: {{rightTotalBet}}
                                            </v-card-text>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider></v-divider>

                                    <v-layout>
                                        <v-flex>
                                            <v-card-text v-if="$store.state.playersBets[dataId]" class="main_stat_item">
                                                PW: {{rightTotalPWin.toFixed(2)}}
                                            </v-card-text>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider></v-divider>

                                    <v-layout>
                                        <v-flex>
                                            <v-card-text v-if="$store.state.playersBets[dataId]" class="main_stat_item">
                                                x{{((rightTotalBet +
                                                rightTotalPWin)/rightTotalBet).toFixed(2)}}
                                            </v-card-text>
                                        </v-flex>
                                    </v-layout>
                                </v-layout>
                            </v-flex>
                            <v-flex md4>
                                <v-layout column class="stat_layout" fill-height>
                                    <v-layout>
                                        <v-flex>
                                            <v-card-text>
                                                <div style="margin-bottom: 8px; margin-top: 9px">Block</div>
                                            </v-card-text>

                                        </v-flex>
                                    </v-layout>
                                    <v-divider></v-divider>

                                    <v-layout>
                                        <v-flex v-if="!pariReverse" @click="pariReverse = !pariReverse">
                                            <v-card-text
                                                    v-if="parsers.data.parimatch && parsers.data.parimatch.odds && parsers.data.parimatch.odds[mapNumber]  && parsers.data.parimatch.odds[mapNumber].right"
                                                    class="main_stat_item">{{parsers.data.parimatch.odds[mapNumber].right}}
                                            </v-card-text>
                                            <v-card-text v-else class="main_stat_item">Block</v-card-text>
                                        </v-flex>
                                        <v-flex v-else-if="pariReverse" @click="pariReverse = !pariReverse">
                                            <v-card-text
                                                    v-if="parsers.data.parimatch && parsers.data.parimatch.odds && parsers.data.parimatch.odds[mapNumber]  && parsers.data.parimatch.odds[mapNumber].left"
                                                    class="main_stat_item">{{parsers.data.parimatch.odds[mapNumber].left}}
                                            </v-card-text>
                                            <v-card-text v-else class="main_stat_item">Block</v-card-text>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider></v-divider>

                                    <v-layout>
                                        <v-flex v-if="!ggbetReverse" @click="ggbetReverse = !ggbetReverse">
                                            <v-card-text
                                                    v-if="mapNumber && parsers.data.ggbet && parsers.data.ggbet.odds && parsers.data.ggbet.odds[mapNumber] && parsers.data.ggbet.odds[mapNumber].right"
                                                    class="main_stat_item">{{parsers.data.ggbet.odds[mapNumber].right}}
                                            </v-card-text>
                                            <v-card-text v-else class="main_stat_item">Block</v-card-text>
                                        </v-flex>
                                        <v-flex v-else-if="ggbetReverse" @click="ggbetReverse = !ggbetReverse">
                                            <v-card-text
                                                    v-if="mapNumber && parsers.data.ggbet && parsers.data.ggbet.odds && parsers.data.ggbet.odds[mapNumber] && parsers.data.ggbet.odds[mapNumber].left"
                                                    class="main_stat_item">{{parsers.data.ggbet.odds[mapNumber].left}}
                                            </v-card-text>
                                            <v-card-text v-else class="main_stat_item">Block</v-card-text>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider></v-divider>

                                    <v-layout>
                                        <v-flex v-if="!bet365Reverse" @click="bet365Reverse = !bet365Reverse">
                                            <v-card-text
                                                    v-if="parsers.data.bet365 && parsers.data.bet365.teams.odds && parsers.data.bet365.teams.odds.right"
                                                    class="main_stat_item">{{parsers.data.bet365.teams.odds.right}}
                                            </v-card-text>
                                            <v-card-text v-else class="main_stat_item">Block</v-card-text>
                                        </v-flex>
                                        <v-flex v-else-if="bet365Reverse" @click="bet365Reverse = !bet365Reverse">
                                            <v-card-text
                                                    v-if="parsers.data.bet365 && parsers.data.bet365.teams.odds && parsers.data.bet365.teams.odds.left"
                                                    class="main_stat_item">{{parsers.data.bet365.teams.odds.left}}
                                            </v-card-text>
                                            <v-card-text v-else class="main_stat_item">Block</v-card-text>
                                        </v-flex>
                                    </v-layout>
                                </v-layout>
                            </v-flex>
                            <v-flex md4 class="team_card" :class="{disable_events: teamB.LOCK || status !=='live'}">
                                <v-layout column fill-height :class="{active_team_card: winSide === 3}"
                                          @click="chooseWinner(3)">
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
                    <v-flex md3 v-if="reverse">
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
                                                    <div style="margin-left: 30px" class="max"
                                                         v-if="$store.state.playersBets[dataId]">
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
                                            <v-card-text v-if="$store.state.playersBets[dataId]" class="main_stat_item">
                                                TB: {{leftTotalBet}}
                                            </v-card-text>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider></v-divider>

                                    <v-layout>
                                        <v-flex>
                                            <v-card-text v-if="$store.state.playersBets[dataId]" class="main_stat_item">
                                                PW: {{leftTotalPWin.toFixed(2)}}
                                            </v-card-text>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider></v-divider>

                                    <v-layout>
                                        <v-flex>
                                            <v-card-text v-if="$store.state.playersBets[dataId]" class="main_stat_item">
                                                x{{((leftTotalBet + leftTotalPWin)/leftTotalBet).toFixed(2)}}
                                            </v-card-text>
                                        </v-flex>
                                    </v-layout>
                                </v-layout>
                            </v-flex>
                            <v-flex md6 class="team_card" :class="{disable_events: teamA.LOCK || status !=='live'}">
                                <v-layout column fill-height :class="{active_team_card: winSide === 1}"
                                          @click="chooseWinner(1)">
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
                    <v-flex md1>
                        <v-layout>
                            <v-flex md3>
                                <v-layout column>
                                    <v-btn class="min-btn" @click="parimatchDialogMethod" tabindex="-1">
                                        PM
                                    </v-btn>

                                    <v-btn class="min-btn" @click="ggbetDialogMethod" tabindex="-1">
                                        GG
                                    </v-btn>

                                    <v-btn class="min-btn" @click="bet365DialogMethod" tabindex="-1">
                                        B3
                                    </v-btn>

                                    <v-btn class="min-btn" @click="eseaDialogMethod" tabindex="-1">
                                        ESEA
                                    </v-btn>
                                </v-layout>
                            </v-flex>
                            <v-flex md9>
                                <v-layout column>
                                    <v-btn @click="oddsListen" style="margin-left: 50px; min-height: 60px">ODDS</v-btn>
                                    <v-btn @click="clearComponent" style="margin-left: 50px; min-height: 60px">Clear</v-btn>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-flex>

                </v-layout>
            </v-card>
        </v-container>
        <!--ПЕРЕВЕРНУТАЯ ПОЛНАЯ ВЕРСИЯ МАТЧА-->

        <!--СВЕРНУТАЯ ВЕРСИЯ-->
        <v-container v-if="hide && $store.state.matches.status === 'all'"
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
                                    <v-flex v-if="$store.state.steamApiData[matchIndex]" class="gold_lead_mini_left"
                                            md6>{{
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
                                    <v-flex v-if="$store.state.steamApiData[matchIndex]" class="gold_lead_mini_right"
                                            md6>{{
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
                    <v-text-field style="margin-left: 10px; margin-right: 10px" v-model="liveIndex"></v-text-field>
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
  import VueTwitchPlayer from 'vue-twitch-player'
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
      substr: function(value) {
        if (!value) return
        value = value.substr(0, 10)
        return value
      }
    },
    props: {
      title: { type: String, default: 'string' },
      liveDataIds: Array,
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
        pariReverse: false,
        ggbetReverse: false,
        bet365Reverse: false,
        eseaReverse: false,
        parsers: {
          individualId: {
            parimatch: null,
            ggbet: null,
            bet365: null,
            esea: null
          },
          data: {
            parimatch: null,
            ggbet: null,
            bet365: null,
            esea: null
          }
        },
        liveIndex: null,
        wantThisGame: true,
        sliderColor: 'orange darken-3',
        allowed: true,
        alreadyListen: false,
        randomClass: String,
        audio: null,
        parimatchDialog: false,
        ggbetDialog: false,
        bet365Dialog: false,
        eseaDialog: false,
        playersDialog: false,
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
    components: {
      VueTwitchPlayer
    },
    computed: {
      eseaData() {

        if (this.$store.state.eseaData) {
          this.$store.state.eseaData.forEach(match => {
            if (match.id === this.parsers.individualId.esea) {
              return match
            }
          })
        }
      },


      mapNumber() {
        if (this.statusString.includes('LIVE на карту') && this.statusString.substr(-1) !== '3') {
          return this.statusString.substr(-1)
        } else if (this.statusString.includes('LIVE на матч') || this.statusString.substr(-1) === '3') {
          return 'winner'
        }
      },
      parimatchData() {
        if (this.$store.state.parimatchData) {
          return this.$store.state.parimatchData.matchList
        }
      },
      ggbetData() {
        if (this.$store.state.ggbetData) {
          return this.$store.state.ggbetData.matchList
        }
      },
      bet365Data() {
        if (this.$store.state.bet365Data) {
          return this.$store.state.bet365Data.matchList
        }
      },

      eseaData() {
        if (this.$store.state.eseaData) {
          return this.$store.state.eseaData
        }
      },

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
          if (data.match_id === this.parsers.individualId.parimatch) {
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
    created() {
      const listenOdds = (id) => {
        this.$socket.on(`${id}`, data => {
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
              // if (json.live_restriction_RUB[0] <= 20000) {
              this.odds.live.team_A.max = json.live_restriction_RUB[0]
              // } else return
              // if (json.live_restriction_RUB[1] <= 20000) {
              this.odds.live.team_B.max = json.live_restriction_RUB[1]
              // } else return
            }
            if (json.m_koef_a) {
              this.odds.soon.team_A.odd = json.m_koef_a
            }
            if (json.m_koef_b) {
              this.odds.soon.team_B.odd = json.m_koef_b
            }
          }
        })
      }

      listenOdds(`${this.dataId}`)


      if (this.liveDataIds) {
        this.liveDataIds.forEach(id => {
          listenOdds(id)
        })
      }


      this.$socket.on('parimatch_single_match', data => {
        if (data.src === this.parsers.individualId.parimatch) {
          this.parsers.data.parimatch = data
        }
      })
      this.$socket.on('ggbet_single_match', data => {
        if (data.src === this.parsers.individualId.ggbet) {
          this.parsers.data.ggbet = data
        }
      })
      this.$socket.on('bet365_match_list', list => {
        if (list) {
          list.matchList.forEach(data => {
            if (data.id === this.parsers.individualId.bet365) {
              this.parsers.data.bet365 = data
            }
          })
        }
      })
      this.$socket.on('esea_match_list', list => {
        console.log('esea')
        console.log(list)
        list.forEach(data => {
          if (data.id === this.parsers.individualId.esea) {
            this.parsers.data.esea = data
          }
        })
      })

    },
    methods: {
      clearComponent() {
        this.$store.commit('clearComponent', this.dataId)
        this.updateWatcher('csgo')
      },

      updateWatcher(game) {
        this.$socket.emit('update_watcher', game)
      },

      oddsListen() {
        const listenOdds = (id) => {
          this.$socket.on(`${id}`, data => {
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
                // if (json.live_restriction_RUB[0] <= 20000) {
                this.odds.live.team_A.max = json.live_restriction_RUB[0]
                // } else return
                // if (json.live_restriction_RUB[1] <= 20000) {
                this.odds.live.team_B.max = json.live_restriction_RUB[1]
                // } else return
              }
              if (json.m_koef_a) {
                this.odds.soon.team_A.odd = json.m_koef_a
              }
              if (json.m_koef_b) {
                this.odds.soon.team_B.odd = json.m_koef_b
              }
            }
          })
        }

        listenOdds(`${this.dataId}`)


        this.liveDataIds.forEach(id => {
          listenOdds(id)
        })
      },


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
                  this.func1('force')
                }
                if (e.key === ' ') {
                  this.func1('force')
                }
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
      parimatchDialogMethod() {
        this.parimatchDialog = !this.parimatchDialog
      },
      ggbetDialogMethod() {
        this.ggbetDialog = !this.ggbetDialog
      },
      bet365DialogMethod() {
        this.bet365Dialog = !this.bet365Dialog
      },

      eseaDialogMethod() {
        this.eseaDialog = !this.eseaDialog
      },

      reverseMethod() {
        this.reverse = !this.reverse
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
      hideAndMap: function() {
        this.hide = !this.hide
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
          this.$socket.emit('multi_bet_csgo', {
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
      chooseFromParimatch:  function(data) {
        this.parimatchDialog = !this.parimatchDialog
        this.parsers.individualId.parimatch = data
        this.$socket.emit('open_from_parimatch', data)
      },
      chooseFromGGbet:  function(data) {
        this.ggbetDialog = !this.ggbetDialog
        this.parsers.individualId.ggbet = data
        this.$socket.emit('open_from_ggbet', data)
      },
      chooseFromBet365:  function(data) {
        this.bet365Dialog = !this.bet365Dialog
        this.parsers.individualId.bet365 = data
      },

      chooseFromEsea:  function(data) {
        this.eseaDialog = !this.eseaDialog
        this.parsers.individualId.esea = data
        this.$store.state.eseaData.forEach(match => {
          if (match.id === this.parsers.individualId.esea) {
            this.parsers.data.esea = match
          }
        })
      }
    },


    sockets: {}
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
    .matchWrap:focus {
        box-shadow: inset 0px 0px 0px 15px whitesmoke !important;
        /*border: blue 10px groove;*/
    }
    .min-btn {
        min-width: 35px;
        width: 50px;
        margin-right: 4px;
    }
</style>