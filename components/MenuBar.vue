<template>
  <div>
    <v-navigation-drawer v-model="drawer" mobile-breakpoint="800" fixed app class="side-bar">
      <div class="side-title"><h4 class="text-gray-800 text-xl font-semibold">{{title}}</h4></div>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <SideBarContents/>
      </v-list>
    </v-navigation-drawer>

    <!-- header   -->
    <v-app-bar fixed app color="#eef2f7" v-if="!drawer">
      <!-- sidebarにタイトルが表示されるため、sidebar表示時にはこっちのタイトルを消す -->
      <v-app-bar-nav-icon v-if="!drawer" @click.stop="drawer = !drawer" />
      <v-toolbar-title v-if="!drawer"><h4 class="text-gray-800 text-xl font-semibold">{{title}}</h4></v-toolbar-title>
      <v-spacer />
    </v-app-bar>
  </div>
</template>

<style scoped>
  .title {
    color: #FFFFFF;
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
  import SideBarContents from "~/components/SideBarContents";

  export default {
    components: {SideBarContents},
    name: "MenuBar",
    data() {
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
      }
    },
  }
</script>

