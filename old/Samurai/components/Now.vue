<template>
    <div class="match_wrapper" :class="{live: live }">
      <div class="tournament_wrapper">{{ tournament.title }}</div>
      <div class="team-left_wrapper">{{ teams.left.title }}</div>
      <div class="info_wrapper">
        <div class="start-time_wrapper">{{ startTime }}</div>
        <div class="bo_wrapper">bo: {{ bo }}</div>
        <div class="match-status_wrapper">{{ matchStatus }}</div>
      </div>
      <div class="team-right-wrapper">{{ teams.right.title }}</div>
      <div class="event_wrapper"><v-btn @click="addToPlay">Play</v-btn></div>
    </div>
</template>

<script>
  export default {
    name: "Now",
    props: {
      dataId: String,
      tournament: Object,
      startTime: String,
      bo: Number,
      teams: Object,
      matchStatus: String,
      live: Boolean
    },
    methods: {
      addToPlay: function() {
        console.log('PLAY');
        this.$socket.emit('play_matches', this.dataId)
      }
    }
  }
</script>

<style scoped>
  .match_wrapper {
    text-align: center;
    margin: 0 10% 0 10%;
    display: flex;
    flex-direction: row;
    border: 2px solid #c7b8b8;
  }

  .match_wrapper > div {
    margin: 17px 0 17px 0;
  }

  .match_wrapper > :not(:last-child) {
    border-right: 2px solid #c7b8b8;
  }

  .tournament_wrapper {
    width: 25%;
  }

  .team-left_wrapper {
    width: 18%;
  }

  .info_wrapper {
    display: flex;
    flex-direction: row;
    width: 28%;
  }

  .start-time_wrapper {
    width: 25%;
  }

  .bo_wrapper {
    width: 25%;
  }

  .match-status_wrapper {
    width: 50%;
  }

  .team-right-wrapper {
    width: 18%;
  }

  .event_wrapper {
    width: 11%;
  }

  .live {
    background-color: #0b3228;
  }


</style>
