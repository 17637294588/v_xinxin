<template>
    <div>
                <!-- 头部组件 -->
                <Header></Header>
            
                <div class="search_bar clearfix">
                    <router-link to="/" class="logo fl"><img src="../../static/images/logo.png"></router-link>
                    <div class="sub_page_name fl">|&nbsp;&nbsp;&nbsp;&nbsp;用户中心</div>
                    <div class="search_con fr mt40">
                        <input type="text" class="input_text fl" name="" placeholder="搜索商品">
                        <input type="button" class="input_btn fr" name="" value="搜索">
                    </div>		
                </div>
            
                <div class="main_con clearfix">

                    <!-- 个人中心路由继承 -->
                    <User_info_url></User_info_url>

                    <div class="right_content clearfix">
                            <div class="info_con clearfix">
                            <h3 class="common_title2">修改密码</h3>
                            <div class="site_con pass_change_con">			
                                <form>
                                    <div class="form_group">
                                        <label>当前密码：</label>
                                        <input type="password" name="" v-model="password">
                                    </div>
                                    <div class="form_group">
                                        <label>新密码：</label>
                                        <input type="password" name="" v-model="new_password">
                                    </div>
                                    <div class="form_group">
                                        <label>确认新密码：</label>
                                        <input type="password" name="" v-model="new_password_again">
                                    </div>
                                    <input type="button" @click="sub_pwd" value="确 定" class="info_submit">
                                </form>
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
// 将header 组件 导入
import Header from './header.vue'
import Foots from './foots.vue'
import User_info_url from './user_info_url.vue'
export default {
     // 表名继承的组件
     components:{
        'Header': Header,
        'Foots': Foots,
        'User_info_url': User_info_url,
    },
    data:function(){
        return{
            password:"",
            new_password:"",
            new_password_again:""
        }
    },

// 权限认证
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
        
    }).catch(error=>{
        console.log(error)
        r.push({'path':"/login"})
    })

  },
  methods: {

    sub_pwd:function(){
        if(this.new_password==this.new_password_again){
        var zipFormData = new FormData();
        zipFormData.append('old_password',this.password);
        zipFormData.append('new_password',this.new_password);
        this.axios({
        url:"http://127.0.0.1:8000/api/user_pass/",
        method: "post",
        data:zipFormData,
        headers:{
                'Authorization': 'JWT ' + localStorage.token
        }
        }).then(res=>{  
            console.log(res) 
            if(res.data.code==200){
                alert('修改成功')
                this.password = ""
                this.new_password = ""
                this.new_password_again = ""
            }else{
                alert('修改失败')
                console.log(res.data)
            }
                    
        }).catch(error=>{
            console.log(error)
            r.push({'path':"/login"})
        
        })

    }else{
        alert('两次密码输入有误')
    }
  },
    
}
}
</script>
