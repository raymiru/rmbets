<template>
    <v-app class="app">
      <Header></Header>
      <div class="page_wrapper">
        <nuxt/>
      </div>
      <div class="footer_wrapper">ready: 15</div>
    </v-app>
</template>

<script>
  import Header from "../components/core/Header";

export default {
  components: {
    Header
  },
  data () {
    return {

    }
  },

  methods: {

  },

  sockets: {
    now_matches(matches) {
      this.$store.commit('updateBetsNowMatches', matches);
      console.log(matches)
    }
  }

}
</script>

<style scoped>

  .page_wrapper {
    border: 2px #c7b8b8 solid;
    height: 100%;
    margin: 0 6% 0 6%
  }

  .footer_wrapper {
    background-color: black;
  }
</style>
