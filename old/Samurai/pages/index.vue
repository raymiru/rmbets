<template>
  <div class="match-list_wrapper">
    <div class="match_wrapper">
      <div class="tournament-logo_wrapper"><span>logo tournament</span></div>
      <div class="left-team-button_wrapper">Left button</div>
      <div class="betting-items_wrapper">Center</div>
      <div class="right-team-button_wrapper">Right Button</div>
      <div class="additional-items_wrapper"><span>add. items</span></div>
    </div>
    <div class="match_wrapper">
      <div class="tournament-logo_wrapper"><span>logo tournament</span></div>
      <div class="left-team-button_wrapper">Left button</div>
      <div class="betting-items_wrapper"><v-slider></v-slider></div>
      <div class="right-team-button_wrapper">Right Button</div>
      <div class="additional-items_wrapper"><span>add. items</span></div>
    </div>

  </div>
</template>

<script>

export default {

}
</script>

<style scoped>

  .match-list_wrapper {
    max-height: 92vh;
    overflow: hidden;
  }

  .match-list_wrapper > :not(:last-child) {
    margin: 0 0 20px 0;
  }

  .match_wrapper {
    height: 29.5vh;
    max-height: 33vh;
    display: flex;
    text-align: center;
    background-color: orangered;
  }

  .match_wrapper div {
    background-color: #0b3228;
    border: 2px solid black;
  }

  .tournament-logo_wrapper {
    width: 14%;
  }

  .left-team-button_wrapper {
    width: 12%;
  }

  .betting-items_wrapper {
    width: 40%;
  }

  .right-team-button_wrapper {
    width: 12%;
  }

  .additional-items_wrapper {
    width: 22%;
  }

</style>
