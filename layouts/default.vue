<template>
  <v-app >
    <!-- sidebar   -->
    <v-navigation-drawer v-model="drawer" :clipped="clipped" mobile-breakpoint="800" fixed app class="side-bar">
      <div class="side-title">{{title}}</div>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- header   -->
    <v-app-bar :clipped-left="clipped" flat fixed app color="#eef2f7">
      <!-- sidebarにタイトルが表示されるため、sidebar表示時にはこっちのタイトルを消す -->

      <v-app-bar-nav-icon v-if="!drawer" @click.stop="drawer = !drawer" />

      <v-btn v-if="!drawer" icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>

      <v-toolbar-title v-if="!drawer" v-text="title" />

      <v-spacer />
    </v-app-bar>

    <!-- main   -->
    <v-main class="background-color">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <!-- footer   -->
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<style scoped>
  .background-color {
    background-color: #eef2f7;
  }
  .side-title {
    margin: 30px 30px 0px 20px;
  }
  .side-bar {
    box-shadow: 1px -1px 19px 0px rgba(0,0,0,.1), 0 10px 10px -5px rgba(0,0,0,.04);
  }
  .v-navigation-drawer__border{
    width: 0;
  }
</style>

<script>
export default {
  data () {
    return {
      myCityName: process.env.MY_CITY_NAME_JP,
      title: process.env.MY_CITY_NAME_JP + '課題MAP',
      clipped: false,
      drawer: false,
      fixed: false,
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
