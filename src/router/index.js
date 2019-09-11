import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import register from '@/components/register'
import login from '@/components/login'
import index from '@/components/index'
import come_back from '@/components/come_back'
import userbind from '@/components/userbind'
import user_center_info from '@/components/user_center_info'
import user_center_pass from '@/components/user_center_pass'
import find_password from '@/components/find_password'
import change_pwd from '@/components/change_pwd'
import user_center_site from '@/components/user_center_site'
import list from '@/components/list'
import detail from '@/components/detail'
import cart from '@/components/cart'
import place_order from '@/components/place_order'
import user_center_order from '@/components/user_center_order'



Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/come_back',
      name: 'come_back',
      component: come_back
    },
    {
      path: '/userbind',
      name: 'userbind',
      component: userbind
    },
    {
      path: '/user_center_info',
      name: 'user_center_info',
      component: user_center_info
    },
    {
      path: '/user_center_pass',
      name: 'user_center_pass',
      component: user_center_pass
    },
    {
      path: '/find_password',
      name: 'find_password',
      component: find_password
    },
    {
      path: '/change_pwd',
      name: 'change_pwd',
      component: change_pwd
    },
    {
      path: '/user_center_site',
      name: 'user_center_site',
      component: user_center_site
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart,
      meta:{
        /*标明需要登录*/
        auth:true
        },
    },
    {
      path: '/place_order',
      name: 'place_order',
      component: place_order,
      meta:{
        /*标明需要登录*/
        auth:true
        },
    },
    {
      path: '/user_center_order',
      name: 'user_center_order',
      component: user_center_order,
      meta:{
        /*标明需要登录*/
        auth:true
        },
    },

 

   
  ]
})
