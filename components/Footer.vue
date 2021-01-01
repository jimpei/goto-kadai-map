<template>
  <div class="footer " absolute app>
    <v-col class="text-center" cols="12">
      <span >&copy; {{ new Date().getFullYear() }} 課題MAPプロジェクト</span>
    </v-col>
  </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>
  .text-center {
    text-align: center;
  }
  .footer {
    font-size: 12px;
    font-weight: bold;
    color: #757575;
    background-color: #eef2f7;
  }
</style>
