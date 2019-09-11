<template>
        <div>
                <div class="find_header">
                        <img src="../../static/images/logo.png">
                        <span class="sub_page_name fl">|&nbsp;&nbsp;&nbsp;&nbsp;设置密码</span>
                    </div>
                
                        <form class="form_step" @submit.prevent="on_submit">
                            <div class="form_group">
                                <label>新密码：</label>
                                <input type="text" v-model="new_pwd" class="input_txt">
                                <span class="error" v-show="pwd_show">{{pwd_mes}}</span>
                            </div>
                            <div class="form_group">
                                    <label>确认密码：</label>
                                    <input type="text" v-model="new_pwd_again" class="input_txt">
                                    <span class="error" v-show="pwd_show">{{pwd_mes_again}}</span>
                            </div>
    
                            <div class="form_group">
                                <input type="submit" value="提交" class="input_sub">
                            </div>
                        </form>
    
      
                
                    <div class="footer no-mp">
                        <div class="foot_link">
                            <a href="#">关于我们</a>
                            <span>|</span>
                            <a href="#">联系我们</a>
                            <span>|</span>
                            <a href="#">招聘人才</a>
                            <span>|</span>
                            <a href="#">友情链接</a>		
                        </div>
                        <p>CopyRight © 2016 北京美多商业股份有限公司 All Rights Reserved</p>
                        <p>电话：010-****888    京ICP备*******8号</p>
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
                new_pwd:"",
                pwd_show:false,
                pwd_mes:"",
                new_pwd_again:"",
                pwd_show:false,
                pwd_mes_again:""

            }
        },
        methods: {
            on_submit:function(){
                var r = this.$router
                if(this.new_pwd!=this.new_pwd_again){
                    this.pwd_show = true
                    this.pwd_mes_again = '两次密码输入有误'
                }else{
                        let token = this.$route.query.token
                        alert(token)
                        let post_data = new FormData()
                        post_data.append('token',token)
                        post_data.append('new_pwd',this.new_pwd)
                        this.axios({
                            url:"http://127.0.0.1:8000/api/update_pwd/",
                            method:"post",
                            data:post_data
                        }).then(res=>{
                            console.log(res)
                            if(res.data.code==200){
                                alert('设置成功')
                                r.push({'path':"/login"})
                            }else{
                                console.log(res.data.mes)
                                alert('设置失败')
                            }
                        }).catch(error=>{
                            console.log(error)
                        })
                }
            }
        },
    }
    </script>