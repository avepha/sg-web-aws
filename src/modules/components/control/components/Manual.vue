<template>
  <div class="jarviswidget jarviswidget-color-greenDark jarviswidget-sortable" id="wid-id-3"
       data-widget-colorbutton="false"
       data-widget-editbutton="false" data-widget-togglebutton="false" data-widget-deletebutton="false" role="widget">

    <header role="heading" class="ui-sortable-handle">
      <div class="jarviswidget-ctrls" role="menu">
        <a class="button-icon jarviswidget-fullscreen-btn">
          <i class="fa fa-expand "></i>
        </a>
      </div>
      <h2>
        <strong v-lang.control-manual/>
      </h2>

    </header>
    <div role="content">
      <div class="jarviswidget-editbox">

      </div>
      <div class="widget-body">
        <form class="smart-form">
          <fieldset>
            <div class="row">
              <section class="col col-5">
                <label class="toggle">
                  <input type="checkbox" name="checkbox-toggle" v-model="select">
                  <i data-swchon-text="ON" data-swchoff-text="OFF"></i><span v-lang.control-channel_status/>
                </label>
              </section>
            </div>
          </fieldset>

          <footer>
            <button type="button" class="btn btn-primary" @click="submit">
              <span v-lang.control-submit/>
            </button>
            <button type="button" class="btn btn-default">
              <span v-lang.control-set_default/>
            </button>
          </footer>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters(['control']),
      ch: function () {
        return this.$route.params.ch
      }
    },
    data() {
      return {
        select: false
      }
    },
    methods: {
      update: function () {
        this.select = this.control[this.ch - 1].manual.status == 0 ? false : true
      },
      submit: function () {
        this.$store.dispatch('popupUpdateModal')
        this.control[this.ch - 1].mode = 0
        // this.$store.dispatch('UPDATE_CONTROL');
        this.$store.dispatch('UPDATE_CONTROL_CH', this.ch - 1)
      }
    },
    watch: {
      select: function (value) {
        this.control[this.ch - 1].manual.status = this.select ? 1 : 0
      },
      ch: function () {
        this.update()
      }
    },
    beforeMount() {
      this.update()
    }
  }
</script>
