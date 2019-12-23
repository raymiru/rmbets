<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <v-flex @click="listVMs">
    <v-layout row wrap style="margin-top: 20px">
      <v-flex class="ma-2">
        <v-data-table
          :headers="headers"
          :items="VMs"
          :footer="VMs"
          class="elevation-1"
          :rows-per-page-items="[20, 30, 50, 100]"
        >
          <template v-slot:items="props"
          >
            <td>{{props.item.name}}</td>
            <td>{{ props.item.description }}</td>
            <td>{{ props.item.networkInterfaces[0].primaryV4Address.oneToOneNat.address }}</td>


            <td v-if="props.item.status === 'RUNNING'" style="background-color: #3f803e">{{ props.item.status }}</td>
            <td v-else style="background-color: #ff464d">{{ props.item.status }}</td>


            <td v-if="props.item.status === 'STOPPED'">
              <v-btn v-on:click="start(props.item.id)">Start</v-btn>
            </td>
            <td v-else-if="props.item.status === 'RUNNING'">
              <v-btn v-on:click="stop(props.item.id)">Stop</v-btn>
            </td>
          </template>
        </v-data-table>
      </v-flex>

    </v-layout>
  </v-flex>

</template>

<script>


  export default {
    name: 'VMs',
    asyncData() {
      return {
        headers: [
          { text: 'VM NAME', value: 'name' },
          { text: 'DESCRIPTION', value: 'description' },
          { text: 'IP', value: 'IP'},
          { text: 'STATUS', value: 'status' },
          { text: 'CONTROL', value: '' },
        ],

        VMs: []

      }

    },

    methods: {
      start(instanceId) {
        this.$axios.$post('https://www.rmbets.site/api/start', {
          id: instanceId
        })
          .then(response => {
          })
          .catch((e) => {
            console.error(e)
          })
      },

      stop(instanceId) {
        this.$axios.$post('https://www.rmbets.site/api/stop', {
          id: instanceId
        })
          .then(response => {
          })
          .catch((e) => {
            console.error(e)
          })
      },

      listVMs() {
        this.$axios.$get('https://www.rmbets.site/api/vms')

          .then(response => {
            this.VMs = response

            //   response.forEach((vm, index, array) => {
            //     this.$store.state.players.forEach(player => {
            //       if (player.username === vm.name) {
            //         array[index]['playerStatus'] = player.status
            //       }
            //     })
            //     this.VMs = response
            //
            // })
          })
      }

    },

    created() {
      this.listVMs()
      this.$router.afterEach((to, from) => {
        if (to.path === '/vms') {
          this.listVMs()
        }
      })
    },


  }


</script>

<style>

</style>
