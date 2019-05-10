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
            <option value="soil" v-lang.FullSoil></option>
            <option value="vpd" v-lang.FullVPD> VPD</option>
            <option value="par" v-lang.Par> PAR</option>
            <option value="paracc" v-lang.ParAcc> PAR Accumulation</option>
            <option value="temperature" v-lang.Temperature> temperature</option>
            <option value="humidity" v-lang.Humidity> humidity</option>
            <option value="co2"> CO<sub>2</sub></option>
          </select>
        </label>
      </fieldset>
    </form>
  </div>
</template>

<script>
  import RealTimeChart from '../../../../@shared/RealTimeChart.vue'
  import {realTimeChartObj} from '../../../../../models/RealTimeChart.js'
  import {mapGetters} from 'vuex'
  import axios from '../../../../../axios/axios'
  import moment from 'moment'

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
        this.dataObj = realTimeChartObj[this.select]
        this.dataObj.data = []
        this.logger.forEach(logger => {
          let data = {
            x: moment(logger['created_time']).toDate(),
            y: logger['sensors'][this.select]
          }
          this.dataObj.data.push(data)
        })
      }
    },
    computed: {
      ...mapGetters(['GetDateTime'])
    },
    watch: {
      logger: function (data) {
        this.update()
      },
      select: function (data) {
        this.update()
      }
    },
    mounted() {

      setTimeout(() => {
        const mid = this.$store.getters.GET_THINGNAME
        axios.get('https://bv5chy8u3c.execute-api.ap-southeast-1.amazonaws.com/dev/sensor-logger', {
          params: {
            mid,
            limit: 50
          }
        })
          .then(res => {
            this.logger = res.data
          })
          .catch(err => console.log(err))
      }, 5000)
    },
    components: {
      RealTimeChart
    }
  }
</script>
