<template>

  <div class="jarviswidget jarviswidget-color-greenDark jarviswidget-sortable">
    <header role="heading" class="ui-sortable-handle">
      <div class="jarviswidget-ctrls" role="menu">
        <a class="button-icon jarviswidget-fullscreen-btn">
          <i class="fa fa-expand "></i>
        </a>
      </div>
      <h2>
        <strong>Graph {{sensor}}</strong>
      </h2>
    </header>
    <div role="content">
      <div class="jarviswidget-editbox">

      </div>
      <div class="widget-body">
        <form class="smart-form">
          <fieldset>
            <div class="row" v-if="showGraph">
              <graph :data="data" :sensor="sensor"></graph>
            </div>

            <section>
              <label>Choose Sensor</label>
              <label class="select" style="margin-bottom: 20px;">
                <select class="input-lg" v-model="sensor">
                  <option value="soil">Soil Moisture</option>
                  <option value="vpd">VPD</option>
                  <option value="temperature">Temperature</option>
                  <option value="humidity">Relative Humidity</option>
                  <option value="co2">CO<sub>2</sub></option>
                  <option value="par">PAR</option>
                  <option value="paracc">PAR Accumulation</option>
                </select>
                <i></i>
              </label>
            </section>
          </fieldset>

          <footer>
            <form :action="link" method="get" target="_blank">
              <input type="hidden" name="date" :value="datevalue"/>
              <input type="hidden" name="token" :value="token"/>
              <button type="submit" class="btn btn-primary">
                <i class="fa fa-save "></i> Export to .xls
              </button>

            </form>
            <button @click.prevent="refresh" type="submit" class="btn btn-default">
              <i class="fa fa-refresh "></i> Refresh
            </button>
          </footer>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
  import moment from 'moment'
  import axios from '../../../axios/axios'
  import Graph from './Graph.vue'

  var hostname = window.location.hostname
  var port = window.location.port
  var serverLink = 'http://' + hostname + ':3000'

  export default {
    data() {
      return {
        link: serverLink + '/logger/gets/date/csv',
        sensor: 'soil',
        data: [],
        record: 0,
        showGraph: false,
        datevalue: '',
        token: ''
        // /logger/finds/date/csv?date=DATE2018-03-24
      }
    },
    methods: {
      refresh() {
        console.log(this.$route.query)
        this.showGraph = false
        this.sensor = this.sensor
        setTimeout(() => {
          this.showGraph = true
        }, 2000)
      }
    },
    components: {
      Graph
    },

    mounted() {
      this.data = []
      if (this.$route.query.date == undefined) {
        this.$router.push({path: '/logger'})
      } else {
        const data = this.$route.query
        const after = moment(data.date).toISOString()
        const before = moment(data.date + ' 23:59:59').toISOString()
        const mid = this.$store.getters.GET_THINGNAME

        axios.get('https://bv5chy8u3c.execute-api.ap-southeast-1.amazonaws.com/dev/sensor-logger', {
          params: {
            mid,
            after,
            before,
            limit: 50
          }
        }).then(({data}) => {
          this.$store.commit('popupShow', 'Records: ' + data.length)
          setTimeout(() => this.$store.commit('popupHide'), 3000)
          if (data.length > 0) {
            this.sensor = 'soil'
            this.data = data
            this.showGraph = true
          } else {
            this.$router.push({path: '/logger'})
          }
        })

        // DynamoDB.fetchLogger(from, to, mid)
        //   .then(logger => {
        //     this.$store.commit("popupShow", "Records: " + logger.Count);
        //     setTimeout(() => this.$store.commit("popupHide"), 3000);
        //     if (logger.Count > 0) {
        //       this.sensor = "soil";
        //       this.data = logger.Items.map(item => item.payload)
        //       this.showGraph = true;
        //     } else {
        //       this.$router.push({ path: "/logger" });
        //     }
        //   })
        //   .catch(err => console.log(err));
        this.datevalue = 'DATE' + data.date
      }
    }
  }
</script>
