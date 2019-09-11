<template>
    <div id="user_center_info">

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
                            <h3 class="common_title2">基本信息</h3>
                                    <ul class="user_info_list">
                                        <li><span>用户名：</span>{{username}}</li>
                                        <li><span>手机号：</span>{{phone_number}}</li>
                                        <li><span>Email：</span>{{email}}</li>
                                    </ul>
                            </div>
                            
                            <h3 class="common_title2">最近浏览</h3>
                            <div class="has_view_list">
                            <ul class="goods_type_list clearfix">
                            <li v-for="i in goods_sku">
                            
                                <a :href="'http://127.0.0.1:8080/#/detail?goods_sid='+i.id"><img :src="i.default_image_url"></a>
                                <h4><a href="detail.html">{{i.name}}</a></h4>
                                <div class="operate">
                                    <span class="prize">￥{{i.price}}</span>
                                    <span class="unit">台</span>
                                    <a href="#" class="add_goods" title="加入购物车"></a>
                                </div>
                            </li>
            
                           
                        </ul>
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
            username:"",
            phone_number:"",
            email:"",
            goods_sku:[],     // 默认浏览记录列表
        }
    },

    mounted() {
        var r = this.$router
        this.axios({
            url:'http://127.0.0.1:8000/api/user_info/',
            method:'get',
            headers:{
                'Authorization': 'JWT ' + localStorage.token
            }
        }).then(res=>{
            console.log(res.data)
            this.username = res.data.user.username
            this.phone_number = res.data.user.mobile
            this.email = res.data.user.email
            this.goods_sku = res.data.sku_list
        }).catch(error=>{
            
            r.push({'path':"/login"})
        })
    },
}
</script>