<template>
  <div class="jarviswidget jarviswidget-color-greenDark jarviswidget-sortable" id="wid-id-3" data-widget-colorbutton="false"
    data-widget-editbutton="false" data-widget-togglebutton="false" data-widget-deletebutton="false" role="widget">

    <header><span v-lang.control-timer/></header>
    <div role="content">
      <div class="widget-body">
        <form class="smart-form">
          <header><span v-lang.control-timer/></header>
          <fieldset>
            <div class="row">
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


              <div class="alert alert-danger fade in" style="margin-top: 10px;" v-if="showAlert">
                <button class="close" data-dismiss="alert"> × </button>
                <i class="fa-fw fa fa-times"></i>
                <strong>Error!</strong> Start time must be before stop time!!.
              </div>
            </div>
          </fieldset>
        <fieldset>
          <header><span v-lang.control-timer_list/></header>
          <div class="dd" id="nestable2">
            <ol class="dd-list">
              <li class="dd-item" data-id="13" v-for="(time,index) in timerList" :key="time[0]+index">
                <div class="dd-handle text-center">
                  <span style="color:rgb(255, 127, 127); font-size: 18px;">{{time[0] | minToTime}}</span>
                  -
                  <span style="color:rgb(68, 177, 68); font-size: 18px;">{{time[1] | minToTime}}</span>
                  <a @click="deleteTimer(index)" class="pull-right badge bg-color-red padding-5" rel="tooltip" title="" data-placement="left" data-original-title="Warning Icon Text">
                    <i class="fa fa-trash-o fa-lg txt-color-white"></i>
                  </a>
                </div>
              </li>
            </ol>
          </div>

        </fieldset>

          <footer>
            <button @click="submit" type="button" class="btn btn-primary">
              <span v-lang.control-submit/>
            </button>
            <button type="button" class="btn btn-default" onclick="window.history.back();">
              <span v-lang.control-set_default/>
            </button>
          </footer>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from "vuex";
  var $ = (window.jQuery = require("jquery"));
  require("../../../../assets/js/plugin/clockpicker/clockpicker.min.js");

  export default {
    data() {
      return {
        timerList: [],
        showAlert: false
      };
    },
    methods: {
      addTimer: function () {
        this.showAlert = false;
        var start = $("#starttime").val();
        var stop = $("#stoptime").val();


        let starr = start.split(":");
        let stmin = parseInt(starr[0]) * 60 + parseInt(starr[1]);

        let sparr = stop.split(":");
        let spmin = parseInt(sparr[0]) * 60 + parseInt(sparr[1]);

        if (stmin > spmin || (start === '') || (stop === '') ) {
          this.showAlert = true
          return;
        }
        let t = [stmin, spmin];
        this.control[this.ch-1].timer.list.push(t)
      },
      deleteTimer: function(index){
        this.control[this.ch-1].timer.list.splice(index,1);
      },
      update: function(){
        this.timerList = this.control[this.ch-1].timer.list;
      },
      submit: function(){
        this.$store.dispatch('popupUpdateModal');
        this.control[this.ch-1].mode = 1;
        this.$store.dispatch('UPDATE_CONTROL_CH', this.ch - 1);
      }
    },
    computed: {
      ...mapGetters(["control"]),
      ch: function () {
        return this.$route.params.ch;
      }

    },
    watch: {
      ch: function(){
        this.update();
      },
      starttime: function (data) {
        console.log(this.starttime, this.stoptime);
      },
      stoptime: function (data) {
        console.log(this.starttime, this.stoptime);
      }
    },
    mounted() {
      $("#starttime").clockpicker({
        placement: "top",
        donetext: "Done"
      });

      $("#stoptime").clockpicker({
        placement: "top",
        donetext: "Done"
      });

      this.update();
    }
  };

</script>


<style scoped>
  .red-text {}

  .green-text {
    color: rgb(68, 177, 68);
  }

</style>
