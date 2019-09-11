<template>
    <div id="login">
        <div class="login_top clearfix">
                <router-link to="/" class="logo fl"><img src="../../static/images/logo.png"></router-link>
        </div>
        <div class="login_form_bg">
            <div class="login_form_wrap clearfix">
                <div class="login_banner fl"></div>
                <div class="slogan fl">商品美 · 种类多 · 欢迎光临</div>
                <div class="login_form fr">
                    <div class="login_title clearfix">
                        <a href="javascript:;" class="cur">账户登录</a>
                    </div>
                    <div class="form_con">
                        <div class="form_input cur">
                            <form>
                                <input type="text" v-model="username" class="name_input" placeholder="请输入用户名">
                                <!-- <div class="user_error" v-show="user_show">{{user_mes}}</div> -->
                                <input type="password" v-model="password" class="pass_input" placeholder="请输入密码">
                                <!-- <div class="pwd_error" v-show="pwd_show">{{pwd_mes}}</div> -->
                                <div class="more_input clearfix">
                                    <input type="checkbox"  v-model='checked' name="">
                                    <label>记住登录</label>
                                    <router-link to="/find_password">忘记密码</router-link>
                                </div>
                                <input type="button" @click="sub_login" value="登 录" class="input_submit">
                            </form>
                        </div>
                    </div>
                    <div class="third_party">
                        <a href="#" class="qq_login">QQ</a>
                        <a href="#" class="weixin_login">微信</a>
                        <a :href="weibo_login_url" class="weibo_login">微博</a>
                        
                        <router-link to="/register" class="register_btn">立即注册</router-link>
                    </div>
    
                </div>
            </div>
        </div>
        <Foots></Foots>
        
    </div>
</template>
<style>
    @import "../../static/css/reset.css";
    @import "../../static/css/main.css";
</style>
<script>
import Foots from './foots.vue'
// 修改页面title名字
// document.title = "登录页面";
export default {
    components:{
        'Foots': Foots
    },
    data:function(){
        return{
            username:"",
            password:"",
            weibo_login_url:"",
            checked:""
              

        }
    },

    // 获取第三方登录链接
    mounted() {

        // 在页面加载时从cookie获取登录信息
        let username = this.getCookie("account")
        let password = this.getCookie("password")
        // 如果存在赋值给表单，并且将记住密码勾选
        if(username){
            this.username = username
            this.password = password
           
         }

        this.axios({
        method: "get", // 以post方式访问接口
        url: "http://127.0.0.1:8000/api/get_weibo_login/",
       
      }).then(res=>{
            this.weibo_login_url = res.data.weibo_url

      }).catch(error=>{
        console.log(error)
      })
        
    },
    methods: {
        sub_login:function(){

        var goods_sid = this.$route.query.goods_sid
        var r = this.$router
        var zipFormData = new FormData();
        zipFormData.append('username',this.username);
        zipFormData.append('password',this.password);

        if (this.checked == true) {
			console.log("checked == true");
			//传入账号名，密码，和保存天数3个参数
			this.setCookie(this.username, this.password, 7);
		}else {
			console.log("清空Cookie");
			//清空Cookie
			this.clearCookie();
         }
                
        this.axios({
        method: "post", // 以post方式访问接口
        url: "http://127.0.0.1:8000/api/login/",
        data: zipFormData, // 提交参数是表单输入的验证码值
      }).then(res=>{
            console.log(res.data)
            localStorage.clear() // 清空本地存储区域
            sessionStorage.clear() // 清空session区域
            localStorage.username = res.data.username
            localStorage.token = res.data.token
            localStorage.user_id = res.data.user_id
            if(goods_sid){
                r.push({'path':"/detail?goods_sid="+goods_sid})

            }else{
                r.push({'path':"/"})
            }

      }).catch(error=>{
        console.log(error)
        alert('账号或密码错误')
      })
        },

        //设置cookie
		setCookie(c_name, c_pwd, exdays) {
                var exdate = new Date(); //获取时间
                exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
                //字符串拼接cookie
                window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
                window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
            },

        	//清除cookie
		clearCookie: function() {
			this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
        },
        
    	//读取cookie
		getCookie: function() {
			if (document.cookie.length > 0) {
				var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
				for (var i = 0; i < arr.length; i++) {
					var arr2 = arr[i].split('='); //再次切割
					//判断查找相对应的值
					if (arr2[0] == 'userName') {
						this.username = arr2[1]; //保存到保存数据的地方
					} else if (arr2[0] == 'userPwd') {
						this.password = arr2[1];
					}
				}
			}
		},
    },
}
</script>

