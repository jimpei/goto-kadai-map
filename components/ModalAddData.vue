<template>
  <div id="app">
    <v-dialog v-model="dialog" max-width="700px">

      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          課題を追加
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="headline">課題を追加</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-menu
                  ref="calendarMenu"
                  v-model="calendarMenu"
                  :close-on-content-click="false"
                  :return-value.sync="calendarDate"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="calendarDate" label="聞き取り日" readonly v-bind="attrs" v-on="on"/>
                  </template>
                  <v-date-picker v-model="calendarDate" locale="jp" type="month" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="calendarMenu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.calendarMenu.save(calendarDate)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="分類" hint="分類です"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="題目" hint="タイトルです"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="内容" hint="内容です"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="対応案" hint="対応案です"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="情報源" hint="情報源です"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="地区" hint="地区です"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="取り組みステータス" hint="取り組みステータスです"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="関係人口" hint="1, 1000など"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="緊急度" hint="0~100"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="実現難易度" hint="0~100"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
</style>

<script>
  export default {
    components: {
    },
    data() {
      return {
        dialog: false,
        calendarDate: new Date().toISOString().substr(0, 7),
        calendarMenu: false,
      }
    }
  }
</script>
