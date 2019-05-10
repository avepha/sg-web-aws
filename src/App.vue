<template>
  <router-view></router-view>
</template>

<script>
  import moment from 'moment'
  export default {
    computed: {
      auth() {
        return this.$store.getters.currentUser;
      }
    },
    created(){
      this.$store.dispatch('IS_AUTH');
    }
  };

</script>

<style>


</style>
