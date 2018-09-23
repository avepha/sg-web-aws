<template>
  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
    <div class="row">
        <real-time-chart id="sum-chart" :dataObj="dataObj" :sensor="selectedSensor"></real-time-chart>
    </div>
    <form class="smart-form">
      <fieldset>
        <label class="select" style="margin-bottom: 20px;">
          <select class="input-lg" v-model='select'>
            <option value="temperature">Select Chart</option>
            <option value="ec"> Conductivity</option>
            <option value="ph"> Acidity</option>
            <option value="water"> Water</option>
            <option value="temperature"> temperature</option>
            <option value="humidity"> humidity</option>
            <option value="co2"> CO<sub>2</sub></option>
          </select>
        </label>
      </fieldset>
    </form>
  </div>
</template>

<script>
  import RealTimeChart from '../../../../@shared/RealTimeChart.vue'
  import {
    realTimeChartObj
  } from '../../../../../models/RealTimeChart.js'
  import {
    mapGetters
  } from 'vuex'
  
  export default {
    data() {
      return {
        select: 'temperature',
        dataObj: [],
        selectedSensor: {},
        logger: []
      }
    },
    methods: {
      update: function () {
        this.dataObj = realTimeChartObj[this.select];
        this.dataObj.data = []
        this.logger.forEach(logger => {
          let data = {
            x: moment(logger.datetime).toDate(),
            y: logger[this.select]
          }
          this.dataObj.data.push(data);
        })
      }
    },
    computed: {
      ...mapGetters(["GetDateTime"])
    },
    watch: {
      logger: function (data) {
        this.update();
      },
      select: function (data) {
        this.update();
      }
    },
    created(){
     
    },
    components: {
      RealTimeChart
    }
  };

</script>
