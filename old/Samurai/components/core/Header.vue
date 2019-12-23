<template>
  <div class="phantom_header_wrapper">
    <nuxt-link to="/">PLAY</nuxt-link>
    <nuxt-link to="/now">Now</nuxt-link>
    <nuxt-link to="/next">Next</nuxt-link>
    <nuxt-link to="/vms">Virtual Machines</nuxt-link>
    <nuxt-link to="/accounts">Accounts</nuxt-link>
    <nuxt-link to="/parsers">Parsers</nuxt-link>
  </div>
</template>

<script>
  export default {
    name: "Header"
  }
</script>

<style scoped>
  .phantom_header_wrapper {
    display: inline-flex;
    align-items: center;
    background-color: black;
    height: 50px;
    font-size: large;
  }

  .phantom_header_wrapper > a {
    margin: 0 1% 0 1%;
    text-decoration: none;
    color: white;
  }

  .phantom_header_wrapper > a:focus {
    color: red;
  }

  .phantom_header_wrapper :first-child {
    margin-left: 8%;
  }

</style>
