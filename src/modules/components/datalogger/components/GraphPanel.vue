<template>

  <div class="jarviswidget jarviswidget-color-greenDark jarviswidget-sortable">
    <header role="heading" class="ui-sortable-handle">
      <div class="jarviswidget-ctrls" role="menu">
        <a class="button-icon jarviswidget-fullscreen-btn">
          <i class="fa fa-expand "></i>
        </a>
      </div>
      <h2>
        <strong>{{translate(sensor)}}</strong>
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
              <label v-lang.logger-choose_sensor/>
              <label class="select" style="margin-bottom: 20px;">
                <select class="input-lg" v-model="sensor">
                  <option value="temperature" v-lang.temperature/>
                  <option value="humidity" v-lang.humidity/>
                  <option value="vpd" v-lang.full_vpd/>
                  <option value="soil_temperature" v-lang.soil_temperature/>
                  <option value="soil" v-lang.full_soil/>
                  <option value="soil_potential" v-lang.soil_potential/>
                  <option value="co2" v-lang.co2/>
                  <option value="par" v-lang.par/>
                  <option value="paracc" v-lang.paracc/>
                </select>
                <i></i>
              </label>
            </section>
          </fieldset>

          <footer>
            <form :action="link" method="get" target="_blank">
              <input type="hidden" name="mid" :value="mid"/>
              <input type="hidden" name="after" :value="after"/>
              <input type="hidden" name="before" :value="before"/>
              <input type="hidden" name="limit" :value="limit"/>
              <button type="submit" class="btn btn-primary">
                <i class="fa fa-save "></i> <span v-lang.logger-export_to_xls/>
              </button>

            </form>
            <button @click.prevent="refresh" type="submit" class="btn btn-default">
              <i class="fa fa-refresh "></i> <span v-lang.logger-refresh/>
            </button>
          </footer>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
  import axios, {baseURL} from '../../../axios/axios'
  import Graph from './Graph.vue'
  import moment from 'moment'

  export default {
    data() {
      return {
        link: `${baseURL}/dev/sensor-logger-csv`,
        sensor: 'soil',
        data: [],
        record: 0,
        showGraph: false,
        datevalue: '',
        token: '',
        mid: '',
        after: '',
        before: '',
        limit: 0
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
        if (data.length === 0) return []

        let skipCount = 1
        return data.filter(() => {
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

      this.mid = this.$store.getters.GET_THINGNAME
      this.after = moment.utc(after).toISOString()
      this.before = moment.utc(before).add(1439, 'minute').toISOString()
      this.limit = Number.MAX_SAFE_INTEGER
      axios.get('/dev/sensor-logger', {
        params: {
          mid: this.mid,
          before: this.before,
          after: this.after,
          limit: this.limit
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
