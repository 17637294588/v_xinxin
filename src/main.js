// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'



//  配置axios
import axios from 'axios'
Vue.prototype.axios = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


//全局守卫，记录登录状态
router.beforeEach((to,from,next)=>{
    //需求登录判断
    if(to.meta.auth){
      //未登录
      var token = localStorage.token;
      console.log(token)
      if(token){
        next();//跳转到目标页面
      }else{
        next('login');//跳转到登录页面
      }
    }
    else{
    next();
    }
  })