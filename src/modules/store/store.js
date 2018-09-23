import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import auth from './modules/auth'
import iot from './modules/iot'
import device from './modules/device'
import sensors from './modules/sensors'
import ui from './modules/ui-status'
import control from './modules/control'
export const store = new Vuex.Store({
    modules: {
        auth,
        iot,
        device,
        sensors,
        ui,
        control
    }
})