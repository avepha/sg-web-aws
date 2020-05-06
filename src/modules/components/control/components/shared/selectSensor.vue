<template>
  <select class="input-lg" v-model='model' style="background-color: #9de57e">
    <option value="-1" v-lang.control-select_sensor/>
    <option value="0" v-lang.temperature/>
    <option value="1" v-lang.humidity/>
    <option value="2" v-lang.vpd/>
    <option value="3" v-lang.soil_temperature/>
    <option value="4" v-lang.full_soil/>
    <option value="5" v-lang.soil_potential/>
    <option value="6" v-lang.co2/>
    <option value="8" v-lang.par/>
  </select>
</template>

<script>
  export default {
    props: ['value'],
    data() {
      return {
        model: this.value
      }
    },
    watch: {
      model: function (value) {
        this.$emit('input', value)
      },
      value: function(v) {
        this.model = v
      }
    },
  }
</script>
