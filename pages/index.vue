<template>
  <v-app >
    <MenuBar/>

    <v-main class="background-color">
      <v-container>
        <div>
          <v-row justify="center" align="center">
            <v-col cols="12" sm="12" md="12">
              <div class="w-full xl:w-4/12 px-4">
                <div elevation="2" class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                  <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div class="flex flex-wrap items-center">
                      <div class="relative w-full max-w-full flex-grow flex-1">
                        <h6 class="uppercase text-gray-500 mb-1 text-xs font-semibold" ></h6>
                        <h2 class="text-gray-800 text-xl font-semibold"></h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <div class="w-full xl:w-4/12 px-4">
                <v-sheet elevation="2" class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                  <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div class="flex flex-wrap items-center">
                      <div class="relative w-full max-w-full flex-grow flex-1">
                        <h6 class="uppercase text-gray-500 mb-1 text-xs font-semibold">Performance</h6>
                        <h2 class="text-gray-800 text-xl font-semibold">課題MAP</h2>
                      </div>
                    </div>
                  </div>
                </v-sheet>
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <div class="w-full xl:w-4/12 px-4">
                <v-sheet elevation="2" class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                  <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div class="flex flex-wrap items-center">
                      <div class="relative w-full max-w-full flex-grow flex-1">
                        <h6 class="uppercase text-gray-500 mb-1 text-xs font-semibold">Performance</h6>
                        <h2 class="text-gray-800 text-xl font-semibold">課題MAP</h2>
                      </div>
                    </div>
                  </div>
                  <!--                  <div class="p-4 flex-auto">-->
                  <!--                    <div class="relative">-->
                  <!--                      aaaaaa-->
                  <!--                    </div>-->
                  <!--                  </div>-->
                </v-sheet>
              </div>
            </v-col>




            <v-col cols="12" sm="12" md="12">
              <BarChart :issueList="issueList"/>
              <IssueListTable :issue-list="issueList" @doneAddData="selectDB"/>
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
    background: linear-gradient(180deg, #3cc635 0%, #3cc635 12%, #eef2f7 12%, #eef2f7 100%);
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
          status: "",
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

          this.issueList.push({
            hearingDate: doc.data().hearingDate,
            title: doc.data().title,
            classification: doc.data().classification,
            contents: doc.data().contents,
            solution: doc.data().solution,
            source: doc.data().source,
            status: doc.data().status,
            area: doc.data().area,
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
