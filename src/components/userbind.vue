<template>
<div class="register_con">
    <div class="l_con fl">
    <a class="reg_logo">
        <img src="../../static/images/logo.png">
    </a>
    <div class="reg_slogan">商品美 · 种类多 · 欢迎光临</div>
    <div class="reg_banner"></div>
    </div>

    <div class="r_con fr">
    <div class="reg_title clearfix">
        <h1>用户绑定</h1>
        <router-link to="/login">登录</router-link>
    </div>
    <div class="reg_form clearfix" id="app" v-cloak>
        <form @submit.prevent="on_submit">
        <ul>
            <li>
            <label>用户名:</label>
            
            <input
                type="text"
                @blur="check_user_code"
                v-model="user_name"
                
                name="user_name"
                id="user_name"
            >
            <span v-show="user_name_code" v-model="username_ture" class="error_tip">{{user_name_message}}</span>
            </li>
            <li>
            <label>密码:</label>
            
            <input 
                type="password" name="pwd" id="pwd"
                @blur="check_user_pwd"
                v-model="user_pwd"
            >
            <span v-show="user_password" v-model="pwd_ture" class="error_tip">{{user_pwd_mes}}</span>
            </li>
            <li>
            <label>确认密码:</label>
            
            <input 
                type="password" name="cpwd" id="cpwd"
                @blur="check_pwd_again"
                v-model="user_pwd_again"
            >
            <span v-show="user_password_again" v-model="pwd_again_ture" class="error_tip">{{user_pwd_mes_again}}</span>
            </li>
           

            </li>
            <li class="reg_sub">
            <input type="submit" value="提交" name>
            </li>
        </ul>
        </form>
    </div>
    </div>
</div>
</template>

<style>
@import "../../static/css/reset.css";
@import "../../static/css/main.css";
</style>
<script>
import "../../static/js/vue-2.5.16.js";
import "../../static/js/axios-0.18.0.min.js";
import "../../static/js/hosts.js";
import "../../static/js/jquery-1.12.4.min.js";
// document.title = "绑定页面";
export default {
    data:function(){
        return{
            user_name:"",         // 绑定用户名
            user_name_code:true,
            user_name_message:"输入至少6位，开头必须是英文" ,
            user_pwd:"" ,        //绑定的密码
            user_password:true,
            user_pwd_mes:"至少6位",
            user_pwd_again:"" ,    //绑定确认密码
            user_password_again:false,
            user_pwd_mes_again:"",
            username_ture:false,    // 判断用户名是否是正确状态
            pwd_ture:false,         // 判断用户密码是否正确状态
            pwd_again_ture:false,   // 判断确认密码是否正确状态
        }
    },
    methods: {
        // 验证用户
        check_user_code:function(){
            var zipFormData = new FormData();
            zipFormData.append('username',this.user_name);
            this.axios({
                method: "post", // 以post方式访问接口
                url: "http://127.0.0.1:8000/api/check_username/",
                data: zipFormData, // 提交参数是表单输入的验证码值
            }).then(res=>{
                console.log(res.data)
                if(res.data.code==200){
                this.user_name_message = res.data.mes
                this.username_ture = true

                }else{
                this.user_name_message = res.data.mes
                }

            }).catch(error=>{
                console.log(error)
            })

        },

        //验证密码
        check_user_pwd:function(){
            var zipFormData = new FormData();
            zipFormData.append('password',this.user_pwd);
            this.axios({
                method: "post", 
                url: "http://127.0.0.1:8000/api/check_user_pwd/",
                data: zipFormData, 
            }).then(res=>{
                console.log(res.data)
                this.user_pwd_mes = res.data.mes
                this.pwd_ture = true

            }).catch(error=>{
                console.log(error)
            })

        },
        // 确认密码
        check_pwd_again:function(){
            var pwd1 = this.user_pwd
            var pwd2 = this.user_pwd_again
            this.user_password_again = true
            if(pwd1==pwd2){
                this.user_pwd_mes_again = '密码正确'    
                this.pwd_again_ture = true  
            }else{
                this.user_pwd_mes_again = '两次密码输入不匹配'  
            }
        },
        on_submit:function(){
            if(this.username_ture==true&&this.pwd_ture==true&&this.pwd_again_ture==true){
                var r = this.$router
                let access_token_object =  localStorage.access_token_object
                let data = new FormData()
                data.append('username',this.user_name)
                data.append('password',this.user_pwd)
                data.append('password2',this.user_pwd_again)
                data.append('access_token_object',access_token_object)
                this.axios({
                    url:'http://127.0.0.1:8000/api/bind_user/',
                    method:'post',
                    data:data
                }).then(res=>{
                    if(res.data.code==201){
                        alert(res.data.mes)
                    }else{
                        console.log(res.data)
                        localStorage.clear() // 清空本地存储区域
                        sessionStorage.clear() // 清空session区域
                        localStorage.username = res.data.username
                        localStorage.token = res.data.token
                        localStorage.user_id = res.data.user_id
                        r.push({'path':"/"})
                    }

                }).catch(error=>{
                    console.log(error)
                })
                
            }else{
                alert('必须全部验证通过')
            }
            

        },
    },

}
</script>