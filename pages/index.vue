<template>
  <v-app >
    <MenuBar/>

    <v-main class="background-color">
      <v-container>
        <div>
          <v-row justify="center" align="center">
            <v-col cols="12" sm="12" md="12">
              <BarChart :issueList="issueList"/>
              <IssueListTable :issue-list="issueList"/>
            </v-col>
            <v-col cols="12" sm="8" md="6">
              <div class="text-center">
              </div>
              <v-card>
                <v-card-title class="headline">Welcome to the Vuetify + Nuxt.js template</v-card-title>
                <v-card-text>
                  <p>Vuetify is a progressive Material Design component framework for Vue.js. It was designed to empower developers to create amazing applications.</p>
                  <p>Thank you for developing with Vuetify and I look forward to bringing more exciting features in the future.</p>
                  <hr class="my-3">
                  <a href="https://nuxtjs.org/" target="_blank" rel="noopener noreferrer">Nuxt Documentation</a>
                  <br>
                  <a href="https://github.com/nuxt/nuxt.js" target="_blank" rel="noopener noreferrer">Nuxt GitHub</a>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn color="primary" nuxt to="/inspire">Continue</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-main>

    <Footer/>
  </v-app>
</template>
<style scoped>
  .background-color {
    background-color: #eef2f7;
  }
</style>

<script>
  import MenuBar from '~/components/MenuBar.vue'
  import Footer from '~/components/Footer.vue'
  import BarChart from '~/components/BarChart.vue'
  import IssueListTable from '~/components/IssueListTable.vue'

  import firebase from '@/plugins/firebase';
  const db = firebase.firestore();

  export default {
    components: {
      MenuBar,
      Footer,
      BarChart,
      IssueListTable,
    },
    data: function () {
      return {
        issueList: [{
          hearingDate: "",
          title: "",
          classification: "",
          contents: "",
          solution: "",
          source: "",
          relatedPopulation: "",
          urgencyLevel: "",
          difficultyLevel: "",
          createdAt: "",
          updatedAt: "",
        }],
      }
    },
    mounted: function() {
      this.selectDB();
    },
    methods: {
      async selectDB() {
        console.log("select db start.");
        const querySnapshot = await db.collection('issueList').get();
        console.log(querySnapshot)

        function dateFormat(d) {
          return d.getFullYear() + "/"
            + (d.getMonth() + 1).toString().padStart(2, '0');
          // + "/"
          // + d.getDate().toString().padStart(2, '0') + " "
          // + d.getHours().toString().padStart(2, '0') + ":"
          // + d.getMinutes().toString().padStart(2, '0')
        }

        this.issueList = [];
        querySnapshot.docs.map(doc => {
          console.log(doc.data());
          const createdAt = new Date(doc.data().createdAt.seconds * 1000);
          const updatedAt = new Date(doc.data().updatedAt.seconds * 1000);
          const hearingDate = new Date(doc.data().hearingDate.seconds * 1000);

          this.issueList.push({
            hearingDate: dateFormat(hearingDate),
            title: doc.data().title,
            classification: doc.data().classification,
            contents: doc.data().contents,
            solution: doc.data().solution,
            source: doc.data().source,
            relatedPopulation: doc.data().relatedPopulation,
            urgencyLevel: doc.data().urgencyLevel,
            difficultyLevel: doc.data().difficultyLevel,
            createdAt: dateFormat(createdAt),
            updatedAt: dateFormat(updatedAt),
          });

        })
      }
    }

  }
</script>
