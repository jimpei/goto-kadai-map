<template>
  <div>
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
        <div class="p-4 flex-auto">
          <!-- Chart -->
          <div class="relative chart" style="height:400px">
            <bubble-chart :chart-data="chartData" :options="options"></bubble-chart>
          </div>
        </div>
      </v-sheet>
    </div>
  </div>
</template>

<style scoped>
  .chart {
    margin: 10px;
  }
</style>

<script>
// import firebase from '@/plugins/firebase';
// const db = firebase.firestore();

export default {
  props: ['issueList'],
  data: function() {
    return {
      colorSet: [
        {label: "農業", color: "#62ce81"},
        {label: "自然災害", color: "#ce4343"},
        {label: "林業", color: "#055e1f"},
        {label: "子育て", color: "#e576d2"},
      ],
      chartData: {
        datasets: []
      },
      data: [
        // {
        //   data: [{"x":10 ,"y":10, "r":10}],
        //   backgroundColor:["#d7adad"],
        //   label: ["test1"]
        // },
        // {
        //   data: [{"x":-20 ,"y":-20, "r":20}],
        //   backgroundColor:["rgb(141,29,73)"],
        //   label: ["test2"]
        // },
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
            display: false,
            // labels: {
            //   fontColor: "rgba(0,0,0,.4)"
            // },
            // align: "end",
            // position: "bottom"
          },
        },
    }
  },
  watch: {
    issueList() {
      this.data = [];
      this.issueList.forEach(issue => {
        const color = this.colorSet.find(value => value.label === issue.classification[0]);

        this.data.push(
          {
            data: [{"x": issue.urgencyLevel - 50, "y":issue.difficultyLevel - 50, "r": 10}] ,
            backgroundColor:[color ? color.color : "gray"],
            label: [issue.title]
          }
        );
      });
    },
    data() {
      this.updateChartData();
    }
  },
  methods: {
    getColor(data) {
      const color = this.colorSet.find(value => value.label === data[0]);
      return color ? color.color : 'gray';
    },
    updateChartData() {
      const newChartData = Object.assign({}, this.chartData);
      newChartData.datasets = this.data;
      this.chartData = newChartData;
    },
  }
};
</script>
