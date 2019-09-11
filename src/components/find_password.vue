<template>
    <div>
            <div class="find_header">
                    <img src="../../static/images/logo.png">
                    <span class="sub_page_name fl">|&nbsp;&nbsp;&nbsp;&nbsp;找回密码</span>
                </div>
            
                    <form class="form_step" @submit.prevent="on_submit">
                        <div class="form_group">
                            <label>邮箱：</label>
                            <input type="text" v-model="email" class="input_txt">
                            <span class="error" v-show="email_show">{{email_mes}}</span>
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
            email:"",
            email_show:false,
            email_mes:""
        }
    },
    methods: {
        on_submit:function(){
            var r = this.$router
            var zipFormData = new FormData();
            zipFormData.append('email',this.email);
            this.axios({
                url:"http://127.0.0.1:8000/api/send_email/",
                method: "post",
                data:zipFormData
            }).then(res=>{
                console.log(res.data)
                if(res.data.code==200){
                    this.email_show = true
                    this.email_mes = '请查收邮箱'
                    this.email = ""
                }else{
                    this.email_show = true
                    this.email_mes = '邮箱不存在'
                    this.email = ""
                }
            }).catch(error=>{
                console.log(error)
            })
        }
    },
}
</script>