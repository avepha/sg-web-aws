<template>

  <div class="jarviswidget jarviswidget-color-greenDark jarviswidget-sortable">

    <header class="ui-sortable-handle">
      <h2>
        <strong> <span v-lang.control-channel/> {{ch}} </strong>
      </h2>
    </header>
    <div role="content">

      <div class="widget-body">
        <h2 class="alert alert-success" v-lang.control-select_channel_first/>
        <form class="smart-form">
          <section>
            <label class="select">
              <select class="input-lg" v-model="select">
                <option value="-1" key="c0" v-lang.control-choose_channel/>
                <option v-for="({mode},ind) in control" :key="ind" :value="ind+1">
                  <span v-lang.control-channel/>  {{ind+1}}: {{getControlNameAndTranslateByIndex(mode)}}
                </option>
              </select>
              <i></i>
            </label>
          </section>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import ctrlMap from 'src/constants/controlMap'

  export default {
    computed: {
      ...mapGetters(['control']),
      ch: function () {
        return this.$route.params.ch
      }
    },
    data() {
      return {
        select: -1,
        controlName: ['Manual', 'Timer', 'Setpoint', 'Setbound', 'Hybrid', 'Irrigation', 'Advance Setpoint']
      }
    },
    watch: {
      ch: function (data) {
        if (!data) {
          this.select = -1
        }
      },
      select: function (selectedChannel) {
        if (selectedChannel !== -1) {
          const controlCode = this.control[selectedChannel - 1].mode
          if (!ctrlMap[`${controlCode}`]) {
            return alert(`No control code: ${controlCode}`)
          }

          this.$router.replace({name: 'control', params: {ch: selectedChannel}})
          setTimeout(() => {
            this.$router.replace({
              name: ctrlMap[`${controlCode}`],
              params: {
                ch: selectedChannel
              }
            })
          }, 500)
        } else {
          this.$router.replace({
            name: 'control'
          })
        }
      }
    },
    methods: {
      getControlNameAndTranslateByIndex: function(index) {
        const controlMap = ['manual', 'timer', 'setpoint', 'setbound', 'setbound_timing', 'advance_irrigation', 'setpoint', 'setbound', 'setbound_timing']
        return this.translate(`control-${controlMap[index]}`)
      }
    }
  }
</script>

<style scoped>
</style>
