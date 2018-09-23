<template>
  <div class="jarviswidget">

    <header class="ui-sortable-handle">
      <div class="jarviswidget-ctrls">
        <a class="button-icon jarviswidget-fullscreen-btn">
          <i class="fa fa-expand "></i>
        </a>
      </div>
      <h2>
        <strong>Acidity</strong>
        <i>panel</i>
      </h2>
    </header>
    <div role="content">
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

          <!-- {{control}} -->
          <div v-show="activation">

            <header>
              Timing
            </header>
            <fieldset>
              <section>
                <label class="label">Working time</label>
                <label class="input">
                  <input type="number" class="input-md" v-model="working">
                </label>
              </section>
              <section>
                <label class="label">Detecting time</label>
                <label class="input">
                  <input type="number" class="input-md" v-model="detecting">
                </label>
              </section>

            </fieldset>


            <header style="margin-bottom: 20px;">Set Point</header>
            <!-- <app-range :sliderobj="rangeObj" id="setpointslider" style="margin-bottom: 20px;"></app-range> -->
            <app-range v-model="value" :sliderobj="rangeObj" id="setpointslider" style="margin-bottom: 20px;"></app-range>


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
    import RangeData from "../models/Range.js";
    import { mapGetters } from "vuex";

    export default {
        data() {
            return {
                rangeObj: RangeData["ph"],
                activation: false,
                value: 0,
                control: {},
                working: 0,
                detecting: 0
            };
        },
        components: {
            appRange: Range
        },
        methods: {
            update: function () {
                console.log('update');
                this.control = JSON.parse(JSON.stringify(this.GET_CONTROL[3]));
                this.activation = this.control.mode ? 2 : 0;
                this.rangeObj.from = this.control.setpoint.setpoint;
                this.value = this.control.setpoint.setpoint;
                this.working = this.control.setpoint.working;
                this.detecting = this.control.setpoint.detecting;
            },
            submit: function () {
                this.GET_CONTROL[3].setpoint.setpoint = this.value;
                this.GET_CONTROL[3].setpoint.working = this.working;
                this.GET_CONTROL[3].setpoint.detecting = this.detecting;
                this.GET_CONTROL[3].mode = this.activation?2:0;
                this.$store.dispatch("UPDATE_CONTROL");
                this.$store.dispatch("popupUpdateModal");
            }
        },
        computed: {
            ...mapGetters(["GET_CONTROL"])
        },
        watch: {
            value: function () {
                this.control.setpoint.setpoint = parseFloat(this.value);
            },
            working() {
                this.control.setpoint.working = this.working;
            },
            detecting() {
                this.control.setpoint.detecting = this.detecting;
            },
            activation: function (data) {
                var mode = data ? 2 : 0;
                this.control.mode = mode;
            }
        },
        beforeMount() {
          console.log('before mount');  
          this.update();
        },
    };
</script>