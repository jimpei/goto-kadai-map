<template>
  <div id="app">
    <v-dialog v-model="dialog" max-width="700px">

      <template v-slot:activator="{ on, attrs }">
        <v-btn v-if="mode === 'register'"
               color="primary" dark v-bind="attrs" v-on="on">
          課題を追加
        </v-btn>
        <v-icon v-if="mode === 'edit'" @click="editDataInit"
                small class="mr-2" v-bind="attrs" v-on="on">
          mdi-pencil
        </v-icon>
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
                  :return-value.sync="hearingDate"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="hearingDate" label="聞き取り日" readonly v-bind="attrs" v-on="on"/>
                  </template>
                  <v-date-picker v-model="hearingDate" locale="jp" type="month" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="calendarMenu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.calendarMenu.save(hearingDate)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="classification" label="分類" hint="分類です"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="title" label="題目" hint="タイトルです"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="contents" label="内容" hint="内容です"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="solution" label="対応案" hint="対応案です"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="source" label="情報源" hint="情報源です"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="area" label="地区" hint="地区です"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="status" label="取り組みステータス" hint="取り組みステータスです"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="relatedPopulation" label="関係人口" hint="1, 1000など"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="urgencyLevel" label="緊急度" hint="0~100"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="difficultyLevel" label="実現難易度" hint="0~100"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">☓ 閉じる</v-btn>
          <v-btn v-if="mode === 'register'" color="blue darken-1" dark @click="insertData" :loading="isLoad">登録</v-btn>
          <v-btn v-if="mode === 'edit'" color="blue darken-1" dark @click="updateData" :loading="isLoad">更新</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
</style>

<script>
  import firebase from '@/plugins/firebase';
  const db = firebase.firestore();

  export default {
    components: {
    },
    props: [
      'mode',
      'editData'
    ],
    data() {
      return {
        dialog: false,
        isLoad: false,
        calendarMenu: false,
        hearingDate: new Date().toISOString().substr(0, 7),
        issueId: '',
        title: '',
        classification: '',
        contents: '',
        solution: '',
        source: '',
        status: '',
        area: '',
        relatedPopulation: '',
        urgencyLevel: '',
        difficultyLevel: '',
      }
    },
    mounted() {
      console.log("mounted");
    },
    methods: {
      editDataInit() {
        console.log(this.editData);
        this.issueId = this.editData.issueId;
        this.hearingDate = this.editData.hearingDate;
        this.title = this.editData.title;
        this.classification = this.editData.classification;
        this.contents = this.editData.contents;
        this.solution = this.editData.solution;
        this.source = this.editData.source;
        this.status = this.editData.status;
        this.area = this.editData.area;
        this.relatedPopulation = this.editData.relatedPopulation;
        this.urgencyLevel = this.editData.urgencyLevel;
        this.difficultyLevel = this.editData.difficultyLevel;
      },
      async insertData() {
        this.isLoad = true;
        console.log("insertData start.");
        console.log(this.issueId);
        console.log(this.hearingDate);
        console.log(this.title);
        console.log(this.classification);
        console.log(this.contents);
        console.log(this.solution);
        console.log(this.source);
        console.log(this.status);
        console.log(this.area);
        console.log(this.relatedPopulation);
        console.log(this.urgencyLevel);
        console.log(this.difficultyLevel);
        try {
          await db.collection("issueList").add({
            hearingDate: this.hearingDate,
            title: this.title,
            classification: this.classification,
            contents: this.contents,
            solution: this.solution,
            source: this.source,
            status: this.status,
            area: this.area,
            relatedPopulation: this.relatedPopulation,
            urgencyLevel: this.urgencyLevel,
            difficultyLevel: this.difficultyLevel,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          })
        } catch (e) {
          // return;
          console.log(e);
          this.isLoad = false;
          return;
        }

        console.log("db insert success.");
        this.isLoad = false;
        this.dialog = false;
        this.issueId = "";
        this.hearingDate = "";
        this.title = "";
        this.classification = "";
        this.contents = "";
        this.solution = "";
        this.source = "";
        this.status = "";
        this.area = "";
        this.relatedPopulation = "";
        this.urgencyLevel = "";
        this.difficultyLevel = "";
        this.$emit('doneAddData');
      },
      async updateData() {
        this.isLoad = true;
        console.log("updateData start.");
        console.log(this.issueId);
        console.log(this.hearingDate);
        console.log(this.title);
        console.log(this.classification);
        console.log(this.contents);
        console.log(this.solution);
        console.log(this.source);
        console.log(this.status);
        console.log(this.area);
        console.log(this.relatedPopulation);
        console.log(this.urgencyLevel);
        console.log(this.difficultyLevel);

        try {
          await db.collection("issueList")
            .doc(this.issueId)
            .update({
              hearingDate: this.hearingDate,
              title: this.title,
              classification: this.classification,
              contents: this.contents,
              solution: this.solution,
              source: this.source,
              status: this.status,
              area: this.area,
              relatedPopulation: this.relatedPopulation,
              urgencyLevel: this.urgencyLevel,
              difficultyLevel: this.difficultyLevel,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
        } catch (e) {
          // return;
          console.log(e);
          this.isLoad = false;
          return;
        }

        console.log("db update success.");
        this.isLoad = false;
        this.dialog = false;
        this.issueId = "";
        this.hearingDate = "";
        this.title = "";
        this.classification = "";
        this.contents = "";
        this.solution = "";
        this.source = "";
        this.status = "";
        this.area = "";
        this.relatedPopulation = "";
        this.urgencyLevel = "";
        this.difficultyLevel = "";
        this.$emit('doneAddData');
      }
    }
  }
</script>
