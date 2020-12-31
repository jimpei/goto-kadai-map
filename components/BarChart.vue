<template>
  <div>
    <div class="w-full xl:w-4/12 px-4">
    <!--    {{issueListSize}}-->
    <!--    {{issueList}}-->
      <v-sheet elevation="2" class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full max-w-full flex-grow flex-1">
              <h6 class="uppercase text-gray-500 mb-1 text-xs font-semibold">Performance</h6>
              <h2 class="text-gray-800 text-xl font-semibold">課題MAP</h2>
            </div>
          </div>
        </div>
        <div class="p-4 flex-auto">
          <!-- Chart -->
          <div class="relative" style="height:400px">
            <bubble-chart :chart-data="chartData" :options="options"></bubble-chart>
          </div>
        </div>
      </v-sheet>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>
import firebase from '@/plugins/firebase';
const db = firebase.firestore();

export default {
  data: function() {
    return {
      issueList: [],
      issueListSize: 0,
      colorSet: [
        {label: "農業", color: "#62ce81"},
        {label: "自然災害", color: "#ce4343"},
        {label: "林業", color: "#055e1f"},
        {label: "子育て", color: "#e576d2"},
      ],
      chartData: {
        datasets: [
          {
            data: [{"x":10 ,"y":10, "r":10}],
            backgroundColor:["#d7adad"],
            label: ["test1"]
          },
          {
            data: [{"x":-20 ,"y":-20, "r":20}],
            backgroundColor:["rgb(141,29,73)"],
            label: ["test2"]
          },
          {
            data: [{"x":30 ,"y":30, "r":30}],
            backgroundColor:["rgb(16,230,73)"],
            label: ["test3"]
          }
        ]
      },
      data: [
        {
          data: [{"x":10 ,"y":10, "r":10}],
          backgroundColor:["#d7adad"],
          label: ["test1"]
        },
        {
          data: [{"x":-20 ,"y":-20, "r":20}],
          backgroundColor:["rgb(141,29,73)"],
          label: ["test2"]
        },
        {
          data: [{"x":30 ,"y":30, "r":30}],
          backgroundColor:["rgb(16,230,73)"],
          label: ["test3"]
        }
      ],
      options: {
          title: {
            display: false,
            text: "Orders Chart"
          },
          scales: {
            // x軸
            xAxes: [{
              ticks: {max: 50, min: -50,stepSize: 10},
              scaleLabel: {
                display: true,
                labelString: '緊急度'
              },
            }],
            // y軸
            yAxes: [{
              ticks: {max: 50,min: -50,stepSize: 10},
              scaleLabel: {
                display: true,
                labelString: '実現難易度'
              },
            }]
          },
          maintainAspectRatio: false,
          responsive: true,
          tooltips: {
            callbacks: {
              label: function(t, d) {
                let rLabel = d.datasets[t.datasetIndex].data[t.index].r;
                return d.datasets[t.datasetIndex].label +
                  ': (x:' + t.xLabel + ', y:' + t.yLabel + ', r:' + rLabel + ')';
              }
            }
          },
          hover: {
            mode: "nearest",
            intersect: true
          },
          legend: {
            labels: {
              fontColor: "rgba(0,0,0,.4)"
            },
            align: "end",
            position: "bottom"
          },
        },
    }
  },
  watch: {
    data() {
      this.updateChartData();
    }
  },
  mounted: function() {
    this.selectDB();
  },
  methods: {
    updateChartData() {
      const newChartData = Object.assign({}, this.chartData);
      newChartData.datasets = this.data;
      this.chartData = newChartData;
    },
    async selectDB() {
      console.log("select db start.");
      const querySnapshot = await db.collection('issueList').get();
      console.log(querySnapshot)

      function dateFormat(d) {
        return d.getFullYear() + "/"
          + (d.getMonth() + 1).toString().padStart(2, '0') + "/"
          + d.getDate().toString().padStart(2, '0') + " "
          + d.getHours().toString().padStart(2, '0') + ":"
          + d.getMinutes().toString().padStart(2, '0')
      }

      this.data = [];
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

        const color = this.colorSet.find(value => value.label === doc.data().classification[0]);
        this.data.push(
          {
            data: [{"x": doc.data().urgencyLevel - 50, "y":doc.data().difficultyLevel - 50, "r": 10}] ,
            backgroundColor:[color.color],
            label: [doc.data().title]
          }
        );

        this.issueListSize = this.issueList.length;
      })

    }
  }
};
</script>
