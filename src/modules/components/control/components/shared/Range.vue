<template>
  <div>
    <input type="text" :id="id" value="" name="range"/>
  </div>
</template>

<script>
  const $ = (window.jQuery = require('jquery'))
  require('../../../../../assets/js/ion-rangeSlider/ion.rangeSlider.min.js')

  export default {
    props: ['sliderobj', 'id', 'value'],
    data() {
      return {
        range: ``,
      }
    },
    watch: {
      sliderobj: function () {
        const slider = $(`#${this.id}`).data('ionRangeSlider')
        slider.update(this.sliderobj)
      }
    },
    mounted() {
      this.range = $(`#${this.id}`)
      this.range.ionRangeSlider(this.sliderobj)
      this.range.on('change', ({target}) => {
        this.$emit('input', target.value)
      })
    }
  }

</script>
