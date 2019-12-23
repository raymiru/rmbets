<template>
  <div>
    <ul class="accounts_header">
      <li v-for="title in titles">
        {{title}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "accounts",
    data() {
      return {
        titles: ['username', 'thread', 'space', 'ip', 'bank']
      }
    }
  }
</script>

<style scoped>
  .accounts_header {
    display: flex;
    flex-direction: row;
  }

  .accounts_header > li {
    list-style-type: none;
    margin: 5px 20px 5px 20px;
  }
</style>
