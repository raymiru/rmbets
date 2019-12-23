<template>
  <div class="vm_wrapper">
    <div class="page_name_wrapper"><span>Virtual Machines</span></div>
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
  </div>
</template>

<script>
  export default {
    name: "vms"
  }
</script>

<style scoped>

  .page_name_wrapper {
    display: flex;
    justify-content: center;
    margin: 12px 12px 12px 12px;
  }

  .page_name_wrapper span {
    width: 180px;
  }

</style>
