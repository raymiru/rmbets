<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-flex>
    <v-layout>
      <v-flex>
        <v-btn @click="all">all</v-btn>
        <v-btn @click="admin">admin</v-btn>
        <v-btn @click="watcher">watcher</v-btn>
        <v-btn @click="players">players</v-btn>
        <v-btn @click="playersArray">pl-Array</v-btn>

        <v-btn @click="testBet">TestBet</v-btn>
        <v-btn @click="testMove">TestMove</v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <v-data-table :headers="headers" :items="$store.state.players" :rows-per-page-items="[50, 100, 200, 500]">
          <template class="playerItem" v-slot:items="props">
            <td class="td">{{props.item.username}}</td>
            <td class="td">{{props.item.space}}</td>
            <td class="td">{{props.item.bank}}</td>
            <td class="td">{{props.item.auth_time}} {{props.item.info.location}}</td>
            <td class="td">{{props.item.info.screen.width}} x {{props.item.info.screen.height}}</td>
            <td class="td">{{props.item.info.os}} / {{props.item.info.browser}}</td>


            <td class="td">
              <v-btn-toggle :class="{disable_events: props.item.status !== 'ready'}" :value="props.item.chat_status">
                <v-btn fab @click="chatControl('standard', props.item.username)" value="standard">STD</v-btn>
                <v-btn fab @click="chatControl('hide', props.item.username)" value="hide">HIDE</v-btn>
                <v-btn fab @click="chatControl('bottom', props.item.username)" value="bottom">BOT</v-btn>
              </v-btn-toggle>
            </td>

            <td class="td">
              <v-btn-toggle :value="props.item.game">
                <v-btn fab value="dota2" @click="setGame('dota2', props.item.username)">DOTA2</v-btn>
                <v-btn fab value="csgo" @click="setGame('csgo', props.item.username)">CSGO</v-btn>
              </v-btn-toggle>
            </td>
            <td class="td">{{props.item.status}}</td>
            <td class="td">
              <v-btn-toggle  :value="props.item.status">
                <v-btn fab @click="setStatus('ready', props.item.username)" value="ready">RDY</v-btn>
                <v-btn fab @click="setStatus('moving', props.item.username)" value="moving">MOVE</v-btn>
                <v-btn fab @click="setStatus('2window', props.item.username)" value="2window">2WIN</v-btn>
                <v-btn fab @click="setStatus('nextMoving', props.item.username)" value="nextMoving">NMOVE</v-btn>
                <v-btn fab @click="setStatus('manualControl', props.item.username)" value="manualControl">MNL</v-btn>
                <v-btn fab @click="setStatus('exit', props.item.username)" value="exit">EXIT</v-btn>
              </v-btn-toggle>
            </td>
          </template>
          <template v-slot:footer>
            <td></td>
            <td></td>
            <td>{{totalBank}}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
  export default {
    name: 'Players',
    data() {
      return {
        headers: [{ text: 'USER', value: 'username' }, { text: 'VM', value: 'space'}, { text: 'BANK' , value: 'bank' }, { text: 'AUTH TIME', value: 'auth_time' }, { text: 'SCREEN', value: 'info.screen' }, { text: 'OS/BROWSER' },  { text: 'CHAT CONTROL' }, { text: 'SET GAME' }, { text: 'STATUS', value: 'status' }, { text: 'STATUS CONTROL' }]
      }
    },

    computed: {
      totalBank() {

        let total = 0

        this.$store.state.players.forEach(player => {
          total+= parseFloat(player.bank)
        })

        return (total * 0.945).toFixed(2)
      },
    },

    methods: {
      chatControl(type, username) {
        this.$socket.emit('chat_control', {
          type,
          username
        })
      },


      setGame(game, username) {
        this.$socket.emit('set_game', {
          game,
          username
        })
      },

      setStatus(status, username) {
        this.$socket.emit('set_status', {
          status,
          username
        })
      },

      testMove() {
        this.$socket.emit('test_move')
      },

      testBet() {
        this.$socket.emit('test_bet')
      },

      all() {
        this.$socket.emit('all')
      },
      admin() {
        this.$socket.emit('admin')
      },
      watcher() {
        this.$socket.emit('watcher')
      },
      players() {
        this.$socket.emit('players')
      },
      playersArray() {
        this.$socket.emit('players-array')
      },
      enterBetsPage() {
        this.$socket.emit('enter-bets-site')
      }
    }
  }
</script>

<style scoped>
  .td {
    font-size: 13px;
  }

  .playerItem {
    background-color: red !important;
  }

  .disable_events {
    pointer-events: none;
    opacity: 0.5;
  }
</style>
