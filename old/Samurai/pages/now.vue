<template>
    <div class="now-page_wrapper">
      <div v-if="matches" class="now-list_wrapper">
        <Now
          v-for="match in matches"
          :dataId="match.dataId"
          :tournament="match.tournament"
          :teams="match.teams"
          :bo="match.bo"
          :startTime="match.startTime"
          :matchStatus="match.matchStatus"
          :live="match.live"
        ></Now>
      </div>
    </div>
</template>


<script>

  import Now from '../components/Now'
  export default {
    name: "now",
    components: {
      Now
    },
    computed: {
      matches() {
        return this.$store.state.bets.now
      }
    }
  }
</script>

<style scoped>

</style>
