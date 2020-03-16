<template>
  <div class="jarviswidget jarviswidget-color-greenDark jarviswidget-sortable" id="wid-id-3">

    <header role="heading">
      <h2><strong v-lang.control-setbound_timing/></h2>
    </header>
    <div role="content">
      <div class="jarviswidget-editbox">

      </div>
      <div class="widget-body">
        <form class="smart-form">
          <header v-lang.control-timer/>
          <fieldset>
            <div class="row">
              <div class="col col-5">
                <label class="toggle">
                  <input type="checkbox" name="checkbox-toggle" v-model="control[ch-1].advsbt.timer_flag">
                  <i data-swchon-text="ON" data-swchoff-text="OFF"></i><span v-lang.control-timer_condition/>
                </label>
                <br>
              </div>
            </div>
            <section v-show="control[ch-1].advsbt.timer_flag">
              <section class="col-xs-5">
                <label class="input">
                  <input type="text" :placeholder="this.translate('control-start_time')" id="starttime" readonly>
                </label>
              </section>
              <section class="col-xs-1">

              </section>
              <section class="col-xs-5">
                <label class="input">
                  <input type="text" :placeholder="this.translate('control-stop_time')" id="stoptime" readonly>
                </label>
              </section>
              <button type="button" class="btn btn-primary btn-lg btn-block" @click="addTimer">
                <i class="fa fa-plus"></i> <span v-lang.control-add_time/>
              </button>

              <header v-lang.control-timer_list/>
              <div class="dd" id="nestable2">
                <ol class="dd-list">
                  <li class="dd-item" data-id="13" v-for="(time,index) in timerList" :key="time[0]+index">
                    <div class="dd-handle text-center">
                      <span style="color:rgb(255, 127, 127); font-size: 18px;">{{time[0] | minToTime}}</span>
                      -
                      <span style="color:rgb(68, 177, 68); font-size: 18px;">{{time[1] | minToTime}}</span>
                      <a @click="deleteTimer(index)" class="pull-right badge bg-color-red padding-5" rel="tooltip"
                         title="" data-placement="left" data-original-title="Warning Icon Text">
                        <i class="fa fa-trash-o fa-lg txt-color-white"></i>
                      </a>
                    </div>
                  </li>
                </ol>
              </div>
            </section>
          </fieldset>

          <header v-lang.control-sensor/>
          <fieldset>
            <div class="row">
              <div class="col col-5">
                <label class="toggle">
                  <input type="checkbox" name="checkbox-toggle" v-model="control[ch-1].advsbt.sensor_flag">
                  <i data-swchon-text="ON" data-swchoff-text="OFF"></i> <span v-lang.control-sensor_condition/>
                </label>
                <br>
              </div>
            </div>

            <section v-show="control[ch - 1].advsbt.sensor_flag">
              <app-range :sliderobj="conditionObj" id="conditionslider"
                         v-model.number="control[ch-1].advsbt.sensor_setpoint"
                         style="margin-bottom: 20px;"></app-range>
              <label class="select" style="margin-bottom: 20px;">
                <span v-lang.control-select_sensor/>
                <app-select-sensor v-model="sensorCondition"></app-select-sensor>
              </label>

              <label class="select" style="margin-bottom: 20px;"> <span v-lang.control-select_condition/>
                <select class="input-lg" v-model='control[ch-1].advsbt.sensor_direction'
                        style="background-color: #9de57e">
                  <option value="1" v-lang.control-greater_than/>
                  <option value="0" v-lang.control-less_than/>
                </select>
              </label>
            </section>
          </fieldset>

          <span v-lang.control-setbound_timing/>
          <fieldset>
            <app-range :sliderobj="setboundObj" id="setpointslider" v-model="setboundValue"
                       style="margin-bottom: 20px;"></app-range>

            <section>
              <label class="label" v-lang.control-working_time/>
              <label class="input">
                <input type="number" class="input-md" v-model.number="control[ch-1].advsbt.working">
              </label>
            </section>
            <section>
              <label class="label" v-lang.control-detecting_time/>
              <label class="input">
                <input type="number" class="input-md" v-model.number="control[ch-1].advsbt.detecting">
              </label>
            </section>
            <label class="select" style="margin-bottom: 20px;"><span v-lang.control-select_sensor/>
              <app-select-sensor v-model="sensor"></app-select-sensor>
            </label>

            <label class="select" style="margin-bottom: 20px;"><span v-lang.control-select_condition />
              <select class="input-lg" v-model='control[ch-1].advsbt.direction' style="background-color: #9de57e">
                <option value="1" v-lang.control-greater_than/>
                <option value="0" v-lang.control-less_than/>
              </select>
            </label>
          </fieldset>

          <footer>
            <button @click="submit" type="button" class="btn btn-primary">
              <span v-lang.control-submit/>
            </button>
          </footer>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  // "advsbt": {
  //         "timer_list": [],
  //         "timer_size": 0,
  //         "timer_flag": false,
  //         "sensor_condition": 3,
  //         "sensor_setpoint": 30,
  //         "sensor_flag": false,
  //         "sensor": 5,
  //         "setpoint": 600,
  //         "working": 15,
  //         "detecting": 30
  //     }
  import {mapGetters} from 'vuex'
  import Range from './shared/Range.vue'
  import RangeData from './models/Range.js'
  import DoubleRangeData from './models/DoubleRange.js'
  import SelectSensor from './shared/selectSensor'

  var $ = (window.jQuery = require('jquery'))
  require('../../../../assets/js/plugin/clockpicker/clockpicker.min.js')
  export default {
    data() {
      return {
        timerFlag: false,
        sensorFlag: false,
        sensor: 5,
        sensorCondition: 3,
        setboundObj: {},
        conditionObj: {},
        timerList: [],
        setboundValue: 0
      }
    },
    computed: {
      ...mapGetters(['control', 'getSensorName']),
      ch: function () {
        return this.$route.params.ch
      }
    },
    watch: {
      setboundValue: function (data) {
        var arr = data.split(';')
        this.control[this.ch - 1].advsbt.lower = parseInt(arr[0])
        this.control[this.ch - 1].advsbt.upper = parseInt(arr[1])
      },
      sensor: function (data) {
        this.control[this.ch - 1].advsbt.sensor = parseInt(this.sensor)
        var sensor = this.getSensorName[data]
        var objData = DoubleRangeData[sensor]
        this.setboundObj = objData
      },
      sensorCondition: function (data) {
        this.control[this.ch - 1].advsbt.sensor_condition = parseInt(
          this.sensorCondition
        )
        var sensor = this.getSensorName[this.sensorCondition]
        var objData = RangeData[sensor]
        this.conditionObj = objData
      },
      timerFlag: function (data) {
        this.control[this.ch - 1].advsbt.timer_flag = data ? 1 : 0
      },
      sensorFlag: function (data) {
        this.control[this.ch - 1].advsbt.sensor_flag = data ? 1 : 0
      }
    },
    methods: {
      submit: function () {
        this.$store.dispatch('popupUpdateModal')
        this.control[this.ch - 1].mode = 8
        this.$store.dispatch('UPDATE_CONTROL_CH', this.ch - 1)
      },
      update: function () {
        this.control[this.ch - 1].advsbt.sensor = this.sensor
        var sensor = this.getSensorName[this.sensor]
        var objData = DoubleRangeData[sensor]
        objData.from = this.control[this.ch - 1].advsbt.lower
        objData.to = this.control[this.ch - 1].advsbt.upper
        this.setboundObj = objData

        this.control[this.ch - 1].advsbt.sensor_condition = this.sensorCondition
        var sensorCondition = this.getSensorName[this.sensorCondition]
        var objDataCondition = RangeData[sensorCondition]
        objDataCondition.from = this.control[this.ch - 1].advsbt.sensor_setpoint
        this.conditionObj = objDataCondition
      },

      addTimer: function () {
        this.showAlert = false
        var start = $('#starttime').val()
        var stop = $('#stoptime').val()

        let starr = start.split(':')
        let stmin = parseInt(starr[0]) * 60 + parseInt(starr[1])

        console.log(stmin)

        let sparr = stop.split(':')
        let spmin = parseInt(sparr[0]) * 60 + parseInt(sparr[1])

        if (stmin > spmin || start == '' || stop == '') {
          this.showAlert = true
          return
        }
        let t = [stmin, spmin]

        if (this.control[this.ch - 1].advsbt.timer_list.length < 3) {
          this.control[this.ch - 1].advsbt.timer_list.push(t)
        }
      },
      deleteTimer: function (index) {
        this.control[this.ch - 1].advsbt.timer_list.splice(index, 1)
      }
    },
    components: {
      appRange: Range,
      appSelectSensor: SelectSensor
    },
    mounted() {
      $('#starttime').clockpicker({
        placement: 'top',
        donetext: 'Done'
      })

      $('#stoptime').clockpicker({
        placement: 'top',
        donetext: 'Done'
      })
      this.sensor = this.control[this.$route.params.ch - 1].advsbt.sensor
      this.sensorCondition = this.control[
      this.$route.params.ch - 1
        ].advsbt.sensor_condition
      this.timerList = this.control[this.$route.params.ch - 1].advsbt.timer_list
      this.update()
    }
  }
</script>
