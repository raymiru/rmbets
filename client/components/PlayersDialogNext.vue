<template>
  <v-dialog v-model="playersDialog" max-width="700px" min-height="600px">
    <v-card>
      <v-card-title>Players List</v-card-title>
      <v-layout>
        <v-flex md1>
          <v-card-text>USER</v-card-text>
        </v-flex>
        <v-flex md1>
          <v-card-text>BANK</v-card-text>
        </v-flex>
      </v-layout>
      <v-layout
        style="border-top: gray 2px groove"
        v-for="(data, index) in $store.state.players"
        :key="data.match_id"
      >
        <v-flex md1>
          <v-card-text
          >{{ data.username|| 'No Data' }}
          </v-card-text>
        </v-flex>
        <v-flex md1>
          <v-card-text>{{ data.bank || 'No Data' }}</v-card-text>
        </v-flex>

      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'PlayersDialogNext',
    props: {
      playersDialog: Boolean
    }
  }
</script>

<style scoped>

</style>
