<template>
    <div>
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

            <User_info_url></User_info_url>

            <div class="right_content clearfix">
                <h3 class="common_title2">全部订单</h3>

                <div v-for="i in orders_list">
                    <ul class="order_list_th w978 clearfix">
                        <li class="col01">{{i.orders.datetime}}</li>
                        <li class="col02">订单号：{{i.orders.order_code}}</li>
                    </ul>
    
                    <table class="order_list_table w980">
                        <tbody>
                            <tr>
                                <td width="60%">
                                    <ul class="order_goods_list clearfix" v-for="item in i.orders_detail">					
                                        <li class="col01"><img :src="item.image"></li>
                                        <li class="col02">{{item.name}}  <em>{{item.price}}元</em></li>	
                                        <li class="col03">{{item.number}}</li>
                                        <li class="col04">{{item.xiaoji}}<em>元</em></li>	
                                    </ul>
                                    
                                </td>
                                <td width="15%">{{i.orders.total_manoy}}元</td>
                                <td width="15%" v-if="i.orders.pay_type==2">支付宝</td>
                                <td width="15%" v-if="i.orders.pay_type==1">货到付款</td>
                                <td width="15%" v-if="i.orders.status==1">
                                    <a href="javascript:;" @click="go_pay(i.orders.order_code)" class="oper_btn">去付款</a>
                                </td>
                                <td width="15%" v-if="i.orders.status==2">
                           
                                    <a href="javascript:;" @click="back_pay(i.orders.order_code)" class="oper_btn">退款</a>
                                </td>
                                <td width="15%" v-if="i.orders.status==3">
                           
                                    <a href="javascript:;" class="oper_btn">已退款</a>
                                </td>
                            </tr>
                        </tbody>
                        
                    </table>
                </div>
                    
    
                    <div class="pagenation">
                        <a href="#"><上一页</a>
                        <a href="#" class="active">1</a>
                        <a href="#">2</a>
                        <a href="#">3</a>
                        <a href="#">4</a>
                        <a href="#">5</a>
                        <a href="#">下一页></a>
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
import Header from './header.vue'
import Foots from './foots.vue'
import User_info_url from './user_info_url.vue'
export default {
    components:{
        'Header': Header,
        'Foots': Foots,
        'User_info_url': User_info_url,
    },
    inject:['reload'],
    data:function(){
        return{
           orders_list:"",
           return_res:"",
        }
    },
    mounted() {
        this.get_orders_mes()
    },
    methods: {
        get_orders_mes:function(){
            var order_code = this.$route.query.order_code
            this.axios({
                url:'http://127.0.0.1:8000/api/get_my_orders/',
                method:'get',
                headers:{
                'Authorization': 'JWT ' + localStorage.token
            }
            }).then(res=>{
                console.log(res.data)
                this.orders_list = res.data
            }).catch(error=>{
                console.log(error)
            })
        },
        // 付款
        go_pay:function(order_code){
            this.axios({
                url:'http://127.0.0.1:8000/api/go_pay_money/'+order_code+'/',
                method:'get',
            }).then(res=>{
                console.log(res.data)
                if(res.data.code==200){
                    window.location.href = res.data.pay_url
                }else{
                    alert(res.data.mes)
                }
            }).catch(error=>{
                console.log(error)
            })
        },
        //退款
        back_pay:function(order_code){
            this.axios({
                url:'http://127.0.0.1:8000/api/refund_money/'+order_code+'/',
                method:'get',
            }).then(res=>{
                console.log(res.data)
                this.return_res = res.data
                this.check_return_money(order_code)
            }).catch(error=>{
                console.log(error)
            })
        },
        check_return_money:function(order_code){
            var zipFormDate = new FormData()
            zipFormDate.append('return_res',this.return_res)
            zipFormDate.append('order_code',order_code)
            this.axios({
                url:'http://127.0.0.1:8000/api/return_money/',
                method:'post',
                data:zipFormDate,
            }).then(res=>{
                this.reload();
            }).catch(error=>{
                console.log(error)
            })
        }
    },
}
</script>