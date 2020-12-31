import Vue from "vue";
import { Bubble, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

Vue.component("bubble-chart", {
  extends: Bubble,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
});
