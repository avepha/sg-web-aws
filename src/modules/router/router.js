import VueRouter from 'vue-router'
import * as Cognito from '../lib/aws-cognito'

import {
  routes
} from './routes.js'

export const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach( async (to, from, next) => {
  let login = await Cognito.authUser();
  console.log(to.path,login);
  if(login){
    if(to.path == '/pages/login') next();
    else next()
  }
  else{
    if(to.path == '/pages/login') next();
    else  next('/pages/login');
  }
})