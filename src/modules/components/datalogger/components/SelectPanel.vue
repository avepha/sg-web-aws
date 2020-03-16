<template>
  <div class="jarviswidget jarviswidget-color-greenDark jarviswidget-sortable">

    <header role="heading" class="ui-sortable-handle">
      <h2><strong v-lang.logger-data_logger_panel/></h2>
    </header>
    <div role="content">
      <div class="widget-body">
        <form class="smart-form">
          <fieldset>
            <div class="row">
              <section>
                <label v-lang.logger-choose_start_date/>
                <input type="date" name="" id="" class="form-control" v-model="dateStart">
              </section>
              <section>
                <label v-lang.logger-choose_end_date/>
                <input type="date" name="" id="" class="form-control" v-model="dateEnd">
              </section>
              <section>
                <label v-lang.logger-choose_interval />
                <label class="select" style="margin-bottom: 20px;">
                  <select class="input-lg" v-model.number="interval">
                    <option v-if="diffDate < 10" value="1">1 <span v-lang.logger-minute/></option>
                    <option v-if="diffDate < 20" value="3">3 <span v-lang.logger-minute/></option>
                    <option v-if="diffDate < 30" value="5">5 <span v-lang.logger-minute/></option>
                    <option v-if="diffDate < 30" value="10">10 <span v-lang.logger-minute/></option>
                    <option v-if="diffDate < 30" value="15">15 <span v-lang.logger-minute/></option>
                    <option value="30">30 <span v-lang.logger-minute/></option>
                  </select>
                  <i></i>
                </label>
              </section>
            </div>
          </fieldset>
          <footer>
            <button type="button" class="btn btn-primary" @click="fetchData">
              <span v-lang.logger-fetch_data/>
            </button>
          </footer>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  var $ = (window.jQuery = require('jquery'))
  require('../../../../assets/js/plugin/clockpicker/clockpicker.min.js')
  export default {
    data() {
      return {
        dateStart: moment().format('YYYY-MM-DD'),
        dateEnd: moment().format('YYYY-MM-DD'),
        select: 'soil',
        interval: 30
      }
    },
    computed: {
      diffDate() {
        const start = moment(this.dateStart)
        const end = moment(this.dateEnd)
        return Math.abs(end.diff(start, 'days'))
      }
    },
    watch: {
      diffDate(diffStartToEnd) {
        if (diffStartToEnd > 5) this.interval = 30
      }
    },
    methods: {
      fetchData: function () {
        this.$store.dispatch('popupFetching')
        this.$router.push({path: '/logger'})
        setTimeout(() => {
          this.$router.push({
            path: '/logger/graph',
            query: {
              interval: this.interval,
              before: this.dateEnd,
              after: this.dateStart,
            }
          })
        }, 1000)
      }
    }
  }
</script>
