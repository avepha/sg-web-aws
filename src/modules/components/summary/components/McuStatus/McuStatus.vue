<template>
  <div class="container">
    <div class="col-xs-12 col-lg-8 col-lg-offset-2">
      <div class="jarviswidget jarviswidget-color-greenDark jarviswidget-sortable" id="wid-id-3">

        <header role="heading" class="ui-sortable-handle">
          <div class="jarviswidget-ctrls" role="menu">
            <a class="button-icon jarviswidget-fullscreen-btn">
              <i class="fa fa-expand "></i>
            </a>
          </div>
          <h2>
            <strong v-lang.mcu_status-mcu_status/>
          </h2>

        </header>
        <div role="content">
          <div class="widget-body">
            <form class="smart-form">
              <header v-lang.mcu_status-channel_output/>
              <fieldset>
                <div class="table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th style="padding: 10px;" v-lang.mcu_status-channel/>
                        <th style="padding: 10px;" v-lang.mcu_status-output/>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(value,ind) in GET_GPIO" :key="value + ' ' + ind">
                        <td style="padding: 5px; font-size: 16px;"><span v-lang.mcu_status-channel/> : {{ind + 1}}</td>
                        <td style="padding: 5px;">
                          <button-status :value="value"></button-status>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </fieldset>

              <footer>
                <button type="button" class="btn btn-default" v-lang.mcu_status-refresh/>
              </footer>
            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
  import { mapGetters } from "vuex";
  import ButtonStatus from "./components/ButtonStatus";
  import ParProgress from "./components/ParProgress.vue";
  export default {
    components: {
      ButtonStatus,
      ParProgress
    },
    data() {
      return {
        chName: [
          "LED",
          "CO2 valve",
          "EC Pump",
          "pH Pump",
          "Water Pump",
          "Water Valve"
        ]
      };
    },
    computed: {
      ...mapGetters([
        "GET_GPIO",
        "GetWater",
        "GetCO2",
        "GetEC",
        "GetPH",
        "GetControl",
        "GET_SENSORS"
      ]),
      setpointCo2() {
        if (this.GetControl) return this.GetControl[1].setbound.lower;
        else return 0;
      },
      setpointEC() {
        if (this.GetControl) return this.GetControl[2].setpoint.setpoint;
        else return 0;
      },
      setpointPH() {
        if (this.GetControl) return this.GetControl[3].setpoint.setpoint;
        else return 0;
      }
    }
  };
</script>


<style scoped>
  th,
  td {
    padding: 1px;
    text-align: center;
  }
</style>
