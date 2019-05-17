<template>
  <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 sensor-panel">
    <!-- {{GET_SENSORS}} -->
  <div class="pull-left" style="margin-top: 5px;">
    <vue-pie-chart :id="id" :value="GET_SENSORS[id]"></vue-pie-chart>
  </div>
    <span class="easy-pie-title" style="margin-top: 25px;">
      <slot name="sensor-name"></slot>
    </span>

    <ul class="smaller-stat hidden-sm pull-right" style="margin-top: 15px;">
      <li>
        <span class="label bg-color-greenLight">
          <i class="fa fa-caret-up"></i> -- </span>
      </li>
      <li>
        <span class="label bg-color-blueLight">
          <i class="fa fa-caret-down"></i> -- </span>
      </li>
    </ul>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

import PieData from "../../../../../models/PieChart.js";
import PieChart from "../../../../@shared/PieChart.vue";
import VuePieChart from "../../../../@shared/VuePieChart.vue";
export default {
  props: ["id"],
  data() {
    return {
      chartData: PieData
    };
  },
  components: {
    PieChart,
    VuePieChart,
  },
  computed: {
    ...mapGetters(["GET_SENSORS"])
  }
};
</script>
