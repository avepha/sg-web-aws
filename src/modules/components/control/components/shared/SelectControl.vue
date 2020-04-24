<template>
  <div class="jarviswidget jarviswidget-color-greenDark jarviswidget-sortable" id="wid-id-3" data-widget-colorbutton="false"
    data-widget-editbutton="false" data-widget-togglebutton="false" data-widget-deletebutton="false" role="widget">

    <header role="heading">
      <h2><strong v-lang.control-control_panel/></h2>
    </header>
    <div role="content">

      <div class="widget-body">
        <form class="smart-form">
          <fieldset>
            <div class="row">
              <section class="col col-12">
                <label class="toggle">
                  <input type="radio" name="radio-toggle" value="0" v-model="select">
                  <i data-swchon-text="ON" data-swchoff-text="OFF"/><span v-lang.control-manual/>
                </label>
                <label class="toggle">
                  <input type="radio" name="radio-toggle" value="1" v-model="select">
                  <i data-swchon-text="ON" data-swchoff-text="OFF"/><span v-lang.control-timer/>
                </label>
                <label class="toggle">
                  <input type="radio" name="radio-toggle" value="6" v-model="select">
                  <i data-swchon-text="ON" data-swchoff-text="OFF"/><span v-lang.control-setpoint/>
                </label>
                <label class="toggle">
                  <input type="radio" name="radio-toggle" value="7" v-model="select">
                  <i data-swchon-text="ON" data-swchoff-text="OFF"/><span v-lang.control-setbound/>
                </label>
                <label class="toggle">
                  <input type="radio" name="radio-toggle" value="8" v-model="select">
                  <i data-swchon-text="ON" data-swchoff-text="OFF"/><span v-lang.control-setbound_timing/>
                </label>
                <label class="toggle">
                  <input type="radio" name="radio-toggle" value="5" v-model="select">
                  <i data-swchon-text="ON" data-swchoff-text="OFF"/><span v-lang.control-advance_irrigation/>
                </label>
              </section>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters} from 'vuex';
var controlName = ['manual', 'timer', 'setpoint', 'setbound', 'hybrid', 'irrigation', 'advancecondition', 'advancesetbound', 'advancetimingsetbound']
export default {
  computed:{
    ...mapGetters(['control','getControlName']),
    ch: function(){
      return this.$route.params.ch;
    }
  },
  data(){
    return{
      select: 0
    }
  },
  watch:{
    select:function(data){
     this.$router.replace({
       name: controlName[data]
     })
    },
    ch: function(data){
      this.select = this.control[this.$route.params.ch-1].mode;
    }
  },
  mounted(){
    this.select = this.control[this.$route.params.ch-1].mode;
  }
};
</script>
