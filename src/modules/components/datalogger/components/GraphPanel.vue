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
  import axios from '../../../axios/axios'
  import Graph from './Graph.vue'

  var hostname = window.location.hostname
  var port = window.location.port
  var serverLink = 'http://' + hostname + ':3000'
  import moment from 'moment'

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
        this.showGraph = false
        this.sensor = this.sensor
        setTimeout(() => {
          this.showGraph = true
        }, 2000)
      },
      filterDataByInterval(data, interval) {
        if(data.length === 0) return []

        let skipCount = 1
        return data.filter( () => {
          skipCount = (skipCount < interval) ? skipCount + 1 : 1
          return (skipCount >= interval)
        })
      }
    },
    components: {
      Graph
    },
    mounted() {
      this.data = []
      const {before, after, interval} = this.$route.query
      if (before === undefined || after === undefined) {
        return this.$router.push({path: '/logger'})
      }

      axios.get('https://bv5chy8u3c.execute-api.ap-southeast-1.amazonaws.com/dev/sensor-logger', {
        params: {
          mid: this.$store.getters.GET_THINGNAME,
          before: moment(before).add(1439, 'minute').toISOString(),
          after: moment(after).toISOString(),
          limit: Number.MAX_SAFE_INTEGER
        }
      }).then(response => {
        const {data: body} = response
        this.data = this.filterDataByInterval(body, interval)
        this.datevalue = 'DATE'
        this.sensor = 'soil'

        this.$store.commit('popupShow', 'Records: ' + this.data.length)
        setTimeout(() => this.$store.commit('popupHide'), 3000)

        if (this.data.length === 0)
          return this.$router.push({path: '/logger'})

        this.showGraph = true
      })
    }
  }
</script>
