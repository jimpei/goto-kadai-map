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
              <h2 class="text-gray-800 text-xl font-semibold">Total orders</h2>
            </div>
          </div>
        </div>
        <div class="p-4 flex-auto">
          <!-- Chart -->
          <div class="relative" style="height:350px">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      </v-sheet>
    </div>
  </div>
</template>
<script>
import Chart from "chart.js";
import firebase from '@/plugins/firebase';
const db = firebase.firestore();

export default {
  data: function() {
    return {
      issueList: [],
      issueListSize: 0,
    }
  },
  mounted: function() {
    this.selectDB();
    this.$nextTick(function() {
      let config = {
        type: "bubble",
        data: {
          datasets: [
            {
              data: [{"x":10 ,"y":10, "r":10} ,],
              backgroundColor:[ "rgb(141,63,223)" ],
              label: ["test1"]
            },
            {
              data: [{"x":-20 ,"y":-20, "r":20} ,],
              backgroundColor:[ "rgb(141,29,73)"],
              label: ["test2"]
            },
            {
              data: [{"x":30 ,"y":30, "r":30} ,],
              backgroundColor:["rgb(16,230,73)"],
              label: ["test3"]
            }
          ]
        },
        options: {
          title: {
            display: false,
            text: "Orders Chart"
          },
          scales: {
            // x軸
            xAxes: [{
              ticks: {max: 50, min: -50,stepSize: 10}
            }],
            // x軸
            yAxes: [{
              ticks: {max: 50,min: -50,stepSize: 10}
            }]
          },
          maintainAspectRatio: false,
          responsive: true,
          tooltips: {
            callbacks: {
              label: function(t, d) {
                var rLabel = d.datasets[t.datasetIndex].data[t.index].r;
                return d.datasets[t.datasetIndex].label +
                  ': (x軸:' + t.xLabel + ', y軸:' + t.yLabel + ', 円の大きさ:' + rLabel + ')';
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
        }
      };
      let ctx = document.getElementById("bar-chart").getContext("2d");
      window.myBar = new Chart(ctx, config);
    });
  },
  methods: {
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
        this.issueListSize = this.issueList.length;
      })

    }
  }
};
</script>
