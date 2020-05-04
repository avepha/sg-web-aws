<template>
  <div class="container-fluid">
    <app-sensors></app-sensors>
  </div>
</template>

<script>
  const $ = (window.jQuery = require('jquery'))
  import Sensors from './Sensors/Sensors'

  export default {
    components: {
      appSensors: Sensors
    },
    mounted() {
      setTimeout(() => {
        const logo = $('#logo').css('content', 'hello')
      }, 1000)
    }
  }
</script>
