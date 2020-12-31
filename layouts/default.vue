<template>
  <div>
    <nuxt/>
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  data () {
    return {
      myCityName: process.env.MY_CITY_NAME_JP,
      title: process.env.MY_CITY_NAME_JP + '課題MAP',
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspireaa',
          to: '/inspire'
        }
      ],
      // miniVariant: false,
      // right: true,
      // rightDrawer: false,
    }
  }
}
</script>
