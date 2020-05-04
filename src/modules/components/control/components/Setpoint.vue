<template>
  <div class="jarviswidget jarviswidget-color-greenDark jarviswidget-sortable" id="wid-id-3">

    <header role="heading" class="ui-sortable-handle">
      <div class="jarviswidget-ctrls" role="menu">
        <a class="button-icon jarviswidget-fullscreen-btn">
          <i class="fa fa-expand "></i>
        </a>
      </div>
      <header role="heading">
        <h2><strong v-lang.control-setpoint/></h2>
      </header>

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
                  <input type="checkbox" name="checkbox-toggle" v-model="control[ch-1].setpoint.timer_flag">
                  <i data-swchon-text="ON" data-swchoff-text="OFF"></i> <span v-lang.control-timer_condition/>
                </label>
                <br>
              </div>
            </div>
            <section v-show="control[ch-1].setpoint.timer_flag">
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
                <i class="fa fa-plus"></i> ADD TIME
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
                  <input type="checkbox" name="checkbox-toggle" v-model="control[ch-1].setpoint.sensor_flag">
                  <i data-swchon-text="ON" data-swchoff-text="OFF"></i> <span v-lang.control-sensor_condition/>
                </label>
                <br>
              </div>
            </div>

            <section v-show="control[ch - 1].setpoint.sensor_flag">
              <app-range :sliderobj="conditionObj" id="conditionslider"
                         v-model.number="control[ch-1].setpoint.sensor_setpoint"
                         style="margin-bottom: 20px;"></app-range>
              <label class="select" style="margin-bottom: 20px;">
                <span v-lang.control-select_sensor/>
                <app-select-sensor v-model="sensorCondition"></app-select-sensor>
              </label>

              <label class="select" style="margin-bottom: 20px;"><span v-lang.control-select_condition />
                <select class="input-lg" v-model='control[ch-1].setpoint.sensor_direction'
                        style="background-color: #9de57e">
                  <!-- // 0:vpd, 1:soil, 2:par, 3:temp, 4:humi, 5:co2 -->
                  <option value="1" v-lang.control-greater_than/>
                  <option value="0" v-lang.control-less_than/>
                </select>
              </label>
            </section>
          </fieldset>

          <header v-lang.setpoint/>
          <fieldset>
            <section>
              <label class="label" v-lang.control-working_time/>
              <label class="input">
                <input type="number" class="input-md" v-model.number="control[ch-1].setpoint.working">
              </label>
            </section>
            <section>
              <label class="label" v-lang.control-detecting_time/>
              <label class="input">
                <input type="number" class="input-md" v-model.number="control[ch-1].setpoint.detecting">
              </label>
            </section>

            <app-range :sliderobj="setpointObj" id="setpointslider" v-model.number="control[ch-1].setpoint.setpoint"
                       style="margin-bottom: 20px;"></app-range>
            <label class="select" style="margin-bottom: 20px;"> <span v-lang.control-select_sensor/>
              <app-select-sensor v-model="sensor"></app-select-sensor>
            </label>

            <label class="select" style="margin-bottom: 20px;"><span v-lang.control-select_condition />
              <select class="input-lg" v-model='control[ch-1].setpoint.direction' style="background-color: #9de57e">
                <option value="1" v-lang.control-greater_than />
                <option value="0" v-lang.control-less_than />
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
  // "setpoint": {
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
        setpointObj: {},
        conditionObj: {},
        timerList: []
      }
    },
    computed: {
      ...mapGetters(['control', 'getSensorName']),
      ch: function () {
        return this.$route.params.ch
      }
    },
    watch: {
      sensor: function (data) {
        this.control[this.ch - 1].setpoint.sensor = parseInt(this.sensor)
        var sensor = this.getSensorName[data]
        var objData = RangeData[sensor]
        this.setpointObj = objData
      },
      sensorCondition: function (data) {
        this.control[this.ch - 1].setpoint.sensor_condition = parseInt(this.sensorCondition)
        var sensor = this.getSensorName[this.sensorCondition]
        var objData = RangeData[sensor]
        this.conditionObj = objData
      },
      timerFlag: function (data) {
        this.control[this.ch - 1].setpoint.timer_flag = (data) ? 1 : 0
      },
      sensorFlag: function (data) {
        this.control[this.ch - 1].setpoint.sensor_flag = (data) ? 1 : 0
      }
    },
    methods: {
      submit: function () {
        this.$store.dispatch('popupUpdateModal')
        this.control[this.ch - 1].mode = 6
        this.$store.dispatch('UPDATE_CONTROL_CH', this.ch - 1)
      },
      update: function () {
        this.control[this.ch - 1].setpoint.sensor = this.sensor
        var sensor = this.getSensorName[this.sensor]
        var objData = RangeData[sensor]
        objData.from = this.control[this.ch - 1].setpoint.setpoint
        this.setpointObj = objData


        this.control[this.ch - 1].setpoint.sensor_condition = this.sensorCondition
        var sensorCondition = this.getSensorName[this.sensorCondition]
        var objDataCondition = RangeData[sensorCondition]
        objDataCondition.from = this.control[this.ch - 1].setpoint.sensor_setpoint
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

        if (stmin > spmin || (start == '') || (stop == '')) {
          this.showAlert = true
          return
        }
        let t = [stmin, spmin]

        if (this.control[this.ch - 1].setpoint.timer_list.length < 3) {
          this.control[this.ch - 1].setpoint.timer_list.push(t)
        }
      },
      deleteTimer: function (index) {
        this.control[this.ch - 1].setpoint.timer_list.splice(index, 1)
      }
    },
    components: {
      appRange: Range,
      appSelectSensor: SelectSensor,
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
      this.sensor = this.control[this.$route.params.ch - 1].setpoint.sensor
      this.sensorCondition = this.control[this.$route.params.ch - 1].setpoint.sensor_condition
      this.timerList = this.control[this.$route.params.ch - 1].setpoint.timer_list
      this.update()
    }
  }

</script>
