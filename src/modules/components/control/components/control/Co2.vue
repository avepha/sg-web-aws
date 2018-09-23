<template>
  <div class="jarviswidget">

    <header class="ui-sortable-handle">
      <div class="jarviswidget-ctrls">
        <a class="button-icon jarviswidget-fullscreen-btn">
          <i class="fa fa-expand "></i>
        </a>
      </div>
      <h2>
        <strong>Carbon dioxide</strong>
        <i>panel</i>
      </h2>

    </header>

    <div role="content">
      <!-- {{control}} -->
      <div class="jarviswidget-editbox">
      </div>
      <div class="widget-body">
        <form class="smart-form">
          <header> Setting </header>
          <div class="row" style="margin: 20px;">
            <div class="col-xs-6">
              <label class="toggle">
                <input type="checkbox" name="checkbox-toggle" v-model="activation">
                <i data-swchon-text="ON" data-swchoff-text="OFF"></i> Activation
              </label>
            </div>
          </div>

          <div v-show="activation">
              <header style="margin-bottom: 20px;">Set Bound</header>
              <app-range :sliderobj="rangeObj" v-model="value" id="setbound" style="margin-bottom: 20px;"></app-range>
          </div>
          
          <footer>
            <button type="button" @click="submit" class="btn btn-primary">
              Submit
            </button>
            <button type="button" class="btn btn-default" onclick="window.history.back();">
              Set default
            </button>
          </footer>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import Range from "../shared/Range.vue";
  import RangeData from "../models/DoubleRange.js";
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        rangeObj: RangeData['co2'],
        activation: false,
        value: 0,
        control: {}
      }
    },
    components: {
      appRange: Range
    },
    methods: {
      update: function () {
        this.control = JSON.parse(JSON.stringify(this.GET_CONTROL[1]));
        this.activation = this.control.mode ? 3 : 0;
        this.rangeObj.from = this.control.setbound.lower;
        this.rangeObj.to = this.control.setbound.upper;
      },
      submit: function () {
        this.GET_CONTROL[1].setbound.lower = this.control.setbound.lower;
        this.GET_CONTROL[1].setbound.upper = this.control.setbound.upper;
        this.GET_CONTROL[1].mode = this.activation?3:0;
        this.$store.dispatch('UPDATE_CONTROL');
        this.$store.dispatch('popupUpdateModal');
      }
    },
    computed: {
      ...mapGetters(["GET_CONTROL"]),
    },
    watch: {
      value: function () {
        let arr = this.value.split(";");
        this.control.setbound.lower = parseInt(arr[0]);
        this.control.setbound.upper = parseInt(arr[1]);
      },
      ch: function () {
        this.update();
      },
      activation: function (data) {
        var mode = data ? 3 : 0;
        this.control.mode = mode;
      }
    },
    beforeMount() {
      this.update();
    },
  };

</script>