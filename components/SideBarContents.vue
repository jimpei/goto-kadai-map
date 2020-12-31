<template>
  <v-list-item>
    <AddData/>
    <Login/>
  </v-list-item>
</template>

<script>
  import Login from '~/components/ModalLogin.vue'
  import AddData from '~/components/ModalAddData.vue'

  export default {
    components: {
      Login,
      AddData,
    }
  }
</script>
