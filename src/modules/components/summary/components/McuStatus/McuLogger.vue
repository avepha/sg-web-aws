<template>
  <form class="smart-form margin-top-10">
    <strong><span v-lang.mcu_status-channel_log/></strong>
    <form id="div-log" style="margin: 10px">
      <div>
        <input class="form-control" type="date" v-model="datetime" />
      </div>
      <div>
        <select class="form-control" v-model.number="channel">
          <option value="0"><span v-lang.control-channel-all/></option>
          <option value="1"><span v-lang.control-channel/>: 1</option>
          <option value="2"><span v-lang.control-channel/>: 2</option>
          <option value="3"><span v-lang.control-channel/>: 3</option>
          <option value="4"><span v-lang.control-channel/>: 4</option>
        </select>
      </div>
      <div>
        <button class="btn btn-sm btn-default" @click.prevent="search"><span v-lang.mcu_status-search/></button>
      </div>
    </form>
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
        <tr>
          <th style="padding: 10px;" v-lang.date_time-time/>
          <th style="padding: 10px;" v-lang.mcu_status-channel/>
          <th style="padding: 10px;" v-lang.mcu_status-output/>
        </tr>
        </thead>
        <tbody>
        <tr v-for="({datetime, channel, status}, index) in loggers" :key="index">
          <td style="padding: 5px; font-size: 12px;">{{moment.utc(datetime).format('MMM DD, HH:mm:ss')}}</td>
          <td style="padding: 5px; font-size: 12px;">{{channel}}</td>
          <td style="padding: 5px;">
            <span :style="{color: status ? 'green' : 'red', fontSize: '15px'}">{{status ? 'ON' : 'OFF'}}</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </form>
</template>

<script>
  import moment from 'moment'
  import ButtonStatus from './components/ButtonStatus'
  import axios from '../../../../axios/axios'

  export default {
    data: () => {
      return {
        moment,
        loggers: [],
        datetime: moment().format('YYYY-MM-DD'),
        channel: 0,
      }
    },
    components: {
      ButtonStatus,
    },
    methods: {
      async search() {
        const after = moment.utc(this.datetime)
        const before = moment.utc(this.datetime).add(1439,'minutes')
        const mid = this.$store.getters.GET_THINGNAME
        let url
        if (this.channel === 0) {
          url = `dev/channel-logger?mid=${mid}&after=${after.toISOString()}&before=${before.toISOString()}`
        }
        else {
          url = `dev/channel-logger?mid=${mid}&channel=${this.channel}&after=${after.toISOString()}&before=${before.toISOString()}`
        }

        this.loggers = await axios.get(url)
          .then(({data}) => data)
          .catch(() => [])
      }
    },
    async mounted() {
      const after = moment.utc(moment().format('YYYY-MM-DD'))
      const before = moment.utc(moment().add(1439,'minutes').format('YYYY-MM-DD'))
      const mid = this.$store.getters.GET_THINGNAME
      this.loggers = await axios.get(`dev/channel-logger?mid=${mid}&after=${after.toISOString()}&before=${before.toISOString()}`)
        .then(({data}) => data)
        .catch(() => [])
    }
  }
</script>

<style>
  #div-log {
    display: flex;
    justify-content: space-evenly;
  }

  th {
    text-align: center !important;
  }

  td {
    text-align: center !important;
  }
</style>
