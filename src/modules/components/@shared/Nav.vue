<template>
  <aside id="left-panel">
    <div class="login-info">
      <span>
        <a href="javascript:void(0);" id="show-shortcut" data-action="toggleShortcut">
          <img src="/src/assets/img/avatars/man.png" alt="me"/>
          <span>
            SmartGrobot
          </span>
          <i class="fa fa-angle-down"></i>
        </a>
      </span>
    </div>
    <nav>
      <ul>
        <router-link to="/summary" tag="li" active-class="active">
          <a href="#">
            <i class="fa fa-lg fa-fw fa-dashboard txt-color-blue"></i>
            <span class="menu-item-parent" v-lang.menu-dashboard/>
          </a>
        </router-link>


        <router-link to="/status" tag="li" active-class="active">
          <a href="#">
            <i class="fa fa-lg fa-fw fa-desktop txt-color-blue"></i>
            <span class="menu-item-parent" v-lang.menu-mcu_status/>
          </a>
        </router-link>

        <router-link to="/control" tag="li" active-class="active">
          <a href="#">
            <i class="fa fa-lg fa-fw fa-cog txt-color-blue"></i>
            <span class="menu-item-parent" v-lang.menu-mcu_control/>
          </a>
        </router-link>

        <li class="top-menu-invisible">
          <a href="#" @click="show('configuration')">
            <i class="fa fa-lg fa-fw fa-cube txt-color-blue"></i>
            <span class="menu-item-parent" v-lang.menu-configuration/>
            <b class="collapse-sign">
              <em class="fa fa-plus-square-o" v-if="!collapse.configuration"></em>
              <em class="fa fa-minus-square-o" v-else></em>
            </b>
          </a>
          <ul :style="{display: (collapse.configuration)?'block':'none'}">
            <router-link to="/setting/datetime" tag="li" active-class="active">
              <a><span v-lang.menu-date_time/></a>
            </router-link>
          </ul>
        </li>
        <router-link to="/logger" tag="li" active-class="active">
          <a>
            <i class="fa fa-lg fa-fw fa-cube txt-color-blue"></i>
            <span class="menu-item-parent" v-lang.menu-data_logger/>
          </a>
        </router-link>

      </ul>
    </nav>
  </aside>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        collapse: {
          configuration: false
        }
      }
    },
    methods: {
      show(key) {
        this.collapse[key] = !this.collapse[key]
      }
    },
    computed: {
      ...mapGetters(['getUid', 'getUserInfo'])
    }
  }
</script>
