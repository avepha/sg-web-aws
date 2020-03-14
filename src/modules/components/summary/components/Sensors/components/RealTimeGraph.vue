<template>
  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
    <div class="row">
      <real-time-chart id="sum-chart" :dataObj="currentSensorInfoData" :sensor="selectedSensor"></real-time-chart>
    </div>
    <form class="smart-form">
      <fieldset>
        <label class="select" style="margin-bottom: 20px;">
          <select class="input-lg" v-model='selectedSensor'>
            <option value="temperature" v-lang.select_chart/>
            <option value="temperature" v-lang.temperature/>
            <option value="humidity" v-lang.humidity/>
            <option value="vpd" v-lang.full_vpd/>
            <option value="soil_temperature" v-lang.soil_temperature/>
            <option value="soil" v-lang.full_soil/>
            <option value="soil_potential" v-lang.soil_potential/>
            <option value="co2" v-lang.co2/>
            <option value="par" v-lang.par />
            <option value="paracc" v-lang.par_acc/>
          </select>
        </label>
      </fieldset>
    </form>
  </div>
</template>

<script>
  import RealTimeChart from '../../../../@shared/RealTimeChart.vue'
  import {mapGetters} from 'vuex'
  import axios from '../../../../../axios/axios'
  import moment from 'moment'

  export default {
    data() {
      return {
        selectedSensor: 'temperature',
        currentSensorInfoData: {},
        logger: []
      }
    },
    methods: {
      update: function () {
        this.currentSensorInfoData = {
          title: `${this.translate('real_time_graph')} ${this.translate(this.selectedSensor)}`,
          label: this.translate(this.selectedSensor),
          data: []
        }
        this.logger.forEach(logger => {
          let data = {
            x: moment(logger['created_time']).toDate(),
            y: logger['sensors'][this.selectedSensor]
          }
          this.currentSensorInfoData.data.push(data)
        })
      }
    },
    computed: {
      ...mapGetters(['GetDateTime'])
    },
    watch: {
      logger: function () {
        this.update()
      },
      selectedSensor: function () {
        this.update()
      }
    },
    mounted() {

      setTimeout(() => {
        const mid = this.$store.getters.GET_THINGNAME
        axios.get('/dev/sensor-logger', {
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
