import Vue from 'vue'
import VueRouter from 'vue-router'
import MultiLanguage from 'vue-multilanguage'
import socketio from 'socket.io-client';
import VueSocketio from 'vue-socket.io';
import { store } from './modules/store/store.js'
import { router } from './modules/router/router.js';
import './filters.js';

import language from './modules/lang/language'
Vue.use(MultiLanguage, language)

Vue.use(VueRouter);

import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAWgCegC8hnqGKIJWtTdZB2cTM9U4gBHzU',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
 
  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,
 
  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
})
import App from './App.vue'
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
