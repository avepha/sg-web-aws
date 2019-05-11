<template>
  <router-view></router-view>
</template>

<script>
  export default {
    computed: {
      auth() {
        return this.$store.getters.currentUser;
      }
    },
    created(){
      console.log(this.$store.getters.getVersion)
      this.$store.dispatch('IS_AUTH');
    }
  };

</script>

<style>


</style>
