<template>
    <div>
            <div class="header_con">
                    <div class="header">
                        <div class="welcome fl">欢迎来到美多商城!</div>
                        <div class="fr">
                           
                           
                            <div class="login_btn fl" v-show="is_login_show">
                                <router-link to="/login">登录</router-link>
                                <span>|</span>
                                <router-link to="/register">注册</router-link>
                            </div>
                            <div class="user_link fl" v-show="user_info_show">
                                    <span>|</span>
                                欢迎您：<em>{{username}}</em>
                                <a @click="take_out" class="quit">退出</a>
    
                                <span>|</span>
                                <router-link to="/user_center_info">用户中心</router-link>
                                <span>|</span>
                                <router-link to="/cart" class="cart_name fl">我的购物车</router-link>
                                <span>|</span>
                                <router-link to="/user_center_order" class="cart_name fl">我的订单</router-link>
                                
                            </div>
                        </div>
                    </div>		
                </div>
    
        
    </div>
</template>
<style>
        @import "../../static/css/reset.css";
        @import "../../static/css/main.css";
</style>
<script>
export default {
    data:function(){
        return{
            username:"",
            is_login_show:false,
            user_info_show:false,
        }
    },
    
      // 钩子函数通过验证 token 显示登录框或用户框
      mounted() {
    var r = this.$router
    
    let token = localStorage.token
    var zipFormData = new FormData();
    zipFormData.append('token',token);
    this.axios({
        url:"http://127.0.0.1:8000/api/verify/",
        method: "post",
        data:zipFormData
    }).then(res=>{   
        let username =  localStorage.username
        this.username = username
        this.user_info_show = true
        this.is_login_show = false

    }).catch(error=>{
        console.log(error)
        localStorage.clear() // 清空本地存储区域
        this.is_login_show = true
        this.user_info_show = false
    })

  },
  methods: {
    // 退出
    take_out:function(){
        localStorage.clear()
        this.$router.push({'path':'/login'})
    // r.push({'path':"/"})
  }
  },

}
</script>