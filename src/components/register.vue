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
        <h1>用户注册</h1>
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
              <span v-show="user_name_code" class="error_tip">{{user_name_message}}</span>
            </li>
            <li>
              <label>密码:</label>
              <input 
                type="password" name="pwd" id="pwd"
                @blur="check_user_pwd"
                v-model="user_pwd"
              >
              <span v-show="user_password" class="error_tip">{{user_pwd_mes}}</span>
            </li>
            <li>
              <label>确认密码:</label>
              
              <input 
                type="password" name="cpwd" id="cpwd"
                @blur="check_pwd_again"
                v-model="user_pwd_again"
              >
              <span v-show="user_password_again" class="error_tip">{{user_pwd_mes_again}}</span>
            </li>
            <li>
              <label>手机号:</label>
              <input
               type="text" name="phone" id="phone"
               @blur="check_phone"
               v-model="user_phone"

               >
              <span v-show="user_phone_show" class="error_tip">{{ user_phone_message }}</span>
            </li>
            <li>
              <label>图形验证码:</label>

              <input
                type="text"
                @blur="check_image_code"
                v-model="image_code"
                name="pic_code"
                id="pic_code"
                class="msg_input"
              >
              <img :src="image_code_url" @click="generate_image_code" alt="图形验证码" class="pic_code">
              <span v-show="image_code_statr" class="error_tip">{{ image_mes }}</span>
            </li>
            <li>
              <label>输入邮箱:</label>
              <input
                type="text"
                @blur="check_email_num"
                v-model="email"
                name="msg_code"
                id="msg_code"
                class="msg_input"
              >
              <button @click.prevent="send_email_code" v-show="show_email_button" class="get_msg_code">{{sms_code_tip}}</button>
              <span v-show="email_show" class="error_tip">{{ email_message }}</span>
              
            </li>
            <li>
              <label>邮箱验证码:</label>
              <input
                type="text"
                @blur="sub_email_num"
                v-model="email_code"
                name="msg_code"
                id="msg_code"
                class="msg_input"
              >
              <!-- 验证邮箱验证码 -->
              <span v-show="sub_email_show" class="error_tip">{{ email_show_message }}</span>
            </li>
            <li class="agreement">
                <!-- @change="check_allow" -->
              <input
                type="checkbox"
               
                v-model="is_check"
                name="allow"
                id="allow"
                checked="checked"
              >
              <label>同意”美多商城用户使用协议“</label>
              <span v-show="error_allow" class="error_tip2">{{check_mes}}</span>
            </li>
            <li class="reg_sub">
              <input type="submit" value="注 册" name>
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
// 修改页面title名字
// document.title = "注册页面";
export default {
  data: function() {
    // 存储变量
    return {
      image_code:"",      // 用户输入的验证码
      image_code_url: "",  //图片
      image_code_uuid: "",
      image_mes:"",
      image_code_statr:false,
      user_name:"",         // 绑定用户名
      user_name_code:true,
      user_name_message:"输入至少6位，开头必须是英文" ,
      user_pwd:"" ,        //绑定的密码
      user_password:true,
      user_pwd_mes:"至少6位",
      user_pwd_again:"" ,    //绑定确认密码
      user_password_again:false,
      user_pwd_mes_again:"",
      user_phone:"" ,          //绑定用户手机号
      user_phone_show:false,
      user_phone_message:"",
      email:"" ,                // 绑定用户输入邮箱、
      email_code:""  ,           // 绑定用户输入邮箱验证码
      email_show:true,
      email_message:"输入有效qq的邮箱",
      show_email_button:false,
      sub_email_show:false,
      email_show_message:"",

      sms_code_tip:"发送验证码",
      totalTime: 60,
      canClick: true, //添加canClick
      error_allow:false,   //勾选提示
      check_mes:"", //勾选提示内容
      is_check:true,        //勾选状态






      
     

    };
  },
  // 走钩子函数 里面调用的  generate_image_code 函数
  mounted() {
    // 钩子函数
    this.generate_image_code();
  },
  methods: {
    generate_uuid: function() {
      // 在浏览器生成UUID值
      var d = new Date().getTime();
      if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
      }
      var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function(c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
      return uuid;
    },
    //  generate_image_code 里面调用了生成uuid函数，将uuid变量和 图片验证码scr 路径重新赋值
    generate_image_code: function() {
      // 将uuid值生成后 拼接到图片的src属性部分
      this.image_code_uuid = this.generate_uuid();
      this.image_code_url =
        "http://127.0.0.1:8000/api/" +
        "image_code/" +
        this.image_code_uuid +
        "/";
        
    },
    check_image_code:function(){
      let post_data = new URLSearchParams()
      post_data.append('image_code',this.image_code)
      this.axios({
        method: "post", // 以post方式访问接口
        url: this.image_code_url,
        data: post_data, // 提交参数是表单输入的验证码值
      })
        .then( result => { 
          console.log(result.data.code)
          // result后台返回的数据结果
          this.image_code_statr = true
          if (result.data.code == 200) {
            
            this.image_mes = '验证码输入正确'
          }else{
            this.image_mes = '验证码输入错误'
          }
          
        })
        .catch(function(result) {});

    },
    // 用户名验证
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
        method: "post", // 以post方式访问接口
        url: "http://127.0.0.1:8000/api/check_user_pwd/",
        data: zipFormData, // 提交参数是表单输入的验证码值
      }).then(res=>{
        console.log(res.data)
        this.user_pwd_mes = res.data.mes


      }).catch(error=>{
        console.log(error)
      })

    },
     //确认密码
     check_pwd_again:function(){
      var pwd1 = this.user_pwd
      var pwd2 = this.user_pwd_again
      this.user_password_again = true
      if(pwd1==pwd2){
        this.user_pwd_mes_again = '密码正确'      
      }else{
        this.user_pwd_mes_again = '两次密码输入不匹配'  
      }
    },
    //验证手机号
    check_phone:function(){
      var zipFormData = new FormData();
      zipFormData.append('user_phone',this.user_phone);
      this.axios({
        method: "post", // 以post方式访问接口
        url: "http://127.0.0.1:8000/api/check_user_phone/",
        data: zipFormData, // 提交参数是表单输入的验证码值
      }).then(res=>{
        console.log(res.data)
        this.user_phone_show = true
        if(res.data.code==200){
          this.user_phone_message = '有效手机号'
        }else{
          this.user_phone_message = '无效手机号'
        }

      }).catch(error=>{
        console.log(error)
      })
    },
    //验证有效邮箱
    check_email_num:function(){
      var zipFormData = new FormData();
      zipFormData.append('email',this.email);
      this.axios({
        method: "post", // 以post方式访问接口
        url: "http://127.0.0.1:8000/api/check_email/",
        data: zipFormData, // 提交参数是表单输入的验证码值
      }).then(res=>{
        console.log(res.data)
        
        if(res.data.code==200){
            this.email_message = '有效的邮箱'
            this.show_email_button = true
        }else{
          this.email_message = '无效的邮箱'
          this.show_email_button = false
        }

      }).catch(error=>{
        console.log(error)
      })

    },


    // 封装点击访问邮箱接口
    email_again:function(){
      var zipFormData = new FormData();
      zipFormData.append('email',this.email);
      this.axios({
        method: "post", // 以post方式访问接口
        url: "http://127.0.0.1:8000/api/sub_email/",
        data: zipFormData, // 提交参数是表单输入的验证码值
      }).then(res=>{
        console.log(res)
        //创建倒计时器
        let clock = window.setInterval(() => {
        this.totalTime--
        this.sms_code_tip = this.totalTime + 's后重新发送'
        if (this.totalTime < 0) {
        window.clearInterval(clock)
        this.sms_code_tip = '重新发送验证码'
        this.totalTime = 60
        this.canClick = true  //这里重新开启

  }
 },1000)
          
      }).catch(error=>{
        console.log(error)
      })


    },

    // 点击发送邮箱
    send_email_code:function(){
      // 如果 this.canClick==true 就调用访问后台接口
      if(this.canClick==true){
        this.canClick = false
        this.email_again();

      }

      //如果this.canClick==false 就不访问接口告诉用户多久之后才可以重新发送
      if (this.canClick==false) return  //改动的是这两行代码
      this.sms_code_tip = this.totalTime + 's后重新发送'

    },

    // 邮箱验证码验证
    sub_email_num:function(){
      var zipFormData = new FormData();
      zipFormData.append('email',this.email);
      zipFormData.append('email_code',this.email_code);
      this.axios({
        method: "post", // 以post方式访问接口
        url: "http://127.0.0.1:8000/api/check_email_code/",
        data: zipFormData, // 提交参数是表单输入的验证码值
      }).then(res=>{
        this.sub_email_show = true
        console.log(res.data.code)
        if(res.data.code==200){
  
          this.email_show_message = res.data.mes
        }else{

          this.email_show_message = res.data.mes
        }
      }).catch(error=>{
        console.log(error)
      })

},

    // 提交表单
    on_submit:function(){
      if(this.is_check==false){
        this.error_allow = true
        this.check_mes = "请勾选同意"
        
      }
      else if(this.image_code==""){
        this.error_allow = true
        this.check_mes = "请填写图片验证码"
      }
      else if(this.email_code==""){
        this.error_allow = true
        this.check_mes = "请填写邮箱验证码"
      }
      else{
        var r = this.$router
        var zipFormData = new FormData();
        zipFormData.append('username',this.user_name);
        zipFormData.append('password',this.user_pwd);
        zipFormData.append('password2',this.user_pwd_again);
        zipFormData.append('mobile',this.user_phone);
        zipFormData.append('email',this.email);
        this.axios({
        method: "post", // 以post方式访问接口
        url: "http://127.0.0.1:8000/api/sub_reg/",
        data: zipFormData, // 提交参数是表单输入的验证码值
      }).then(res=>{
        
        if(res.data.code==200){
          alert('注册成功')
          r.push({'path':"/login"})
        }else if(res.data.code==202){
          alert(res.data.mes)
        }
        else{
          alert(res.data.mes.username)
          
        }
       
      }).catch(error=>{
        console.log(error)
      })

      }
      

    }

  }
 
};
</script>