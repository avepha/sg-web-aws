import Vue from 'vue'
import VueRouter from 'vue-router'
import MultiLanguage from 'vue-multilanguage'
import { store } from './modules/store/store.js'
import { router } from './modules/router/router.js';
import './filters.js';

import language from './lang/language'
Vue.use(MultiLanguage, language)

Vue.use(VueRouter);

import App from './App.vue'
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
