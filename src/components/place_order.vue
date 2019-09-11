<template>
    <div>
            <Header></Header>
            <div class="search_bar clearfix">
                    <router-link to="/" class="logo fl"><img src="../../static/images/logo.png"></router-link>
                    <div class="sub_page_name fl">|&nbsp;&nbsp;&nbsp;&nbsp;提交订单</div>
                    <div class="search_con fr  mt40">
                        <input type="text" class="input_text fl" name="" placeholder="搜索商品">
                        <input type="button" class="input_btn fr" name="" value="搜索">
                    </div>		
                </div>
                
                <h3 class="common_title">确认收货地址</h3>
            
                <div class="common_list_con clearfix" id="get_site">
                    <dl>
                        <dt>寄送到：</dt>
                     
                        <dd :class="[(nowsite==0)?'current':'']" @click="nowsite=0"><input type="radio" name="get_site" value="0" v-model="nowsite">{{order_dict.order_address.province}} {{order_dict.order_address.city}} {{order_dict.order_address.town}}  ( {{order_dict.order_address.receiver}} 收) {{order_dict.order_address.mobile}}</dd>
                       
                      
                    </dl>
                    <a :href="'http://127.0.0.1:8080/#/user_center_site?order_code='+this.order_code" class="edit_site">编辑收货地址</a>
                  
          
                </div>
                
                <h3 class="common_title">支付方式</h3>
                <div class="common_list_con clearfix">
                    <div class="pay_style_con clearfix">
                        <input type="radio" name="pay_style" value="1">
                        <label class="cash">货到付款</label>
                        <input type="radio" name="pay_style" value="1" checked>
                        <label class="zhifubao"></label>
                    </div>
                </div>
            
                <h3 class="common_title">商品列表</h3>
                
                <div class="common_list_con clearfix">
                    <ul class="goods_list_th clearfix">
                        <li class="col01">商品名称</li>
                        <li class="col03">商品价格</li>
                        <li class="col04">数量</li>
                        <li class="col05">小计</li>		
                    </ul>
                    <ul class="goods_list_td clearfix" v-for="(item,index) in orders_data">
                        <li class="col01">{{index+1}}</li>			
                        <li class="col02"><img :src="item.image"></li>
                        <li class="col03">{{item.name}}</li>
                        <li class="col05">{{item.price}}元</li>
                        <li class="col06">{{item.number}}</li>
                        <li class="col07">{{item.subtotal}}元</li>	
                    </ul>
                  
                </div>
            
                <h3 class="common_title">总金额结算</h3>
            
                <div class="common_list_con clearfix">
                    <div class="settle_con">
                        <div class="total_goods_count">共<em>{{sku_number}}</em>件商品，总金额<b>{{total}}元</b></div>
                        <!-- <div class="transit">运费：<b>10元</b></div> -->
                        <div class="total_pay">实付款：<b>{{total}}元</b></div>
                    </div>
                </div>
            
                <div class="order_submit clearfix">
                    <a href="javascript:;" id="order_btn" @click="sub_order">提交订单</a>
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
export default {
    components:{
        'Header': Header,
        'Foots': Foots
    },
    data:function(){
        return{
            order_code:"",
            nowsite:0,
            order_dict:{'order_address':{'province':""}},     // 用户收货地址和 付款方式
            orders_data:"",    // 购买商品信息
            sku_number:0,      // 商品数量
            total:0,           // 总价钱
        }
    },
    mounted() {
        this.get_orders_mes()
    },
    methods: {
        // 拿到 uuid 去 后台取订单详情，购物车数据还没有删除，记得要删除
        get_orders_mes:function(){
            this.order_code = this.$route.query.order_code
            var zipFormData = new FormData();
            zipFormData.append('order_code',this.order_code);
            this.axios({
                url:'http://127.0.0.1:8000/api/get_orders_message/',
                method:'post',
                data:zipFormData,
                headers:{
                'Authorization': 'JWT ' + localStorage.token
            }
            }).then(res=>{
                console.log(res.data)
                this.order_dict = res.data.orders_dict
                this.orders_data = res.data.orders_data
                this.sku_number = res.data.lens
                this.total = res.data.total
            }).catch(error=>{
                console.log(error)
            })
        },
        // 提交订单,需要携带当前地址id，当前付款方式和订单号
        sub_order:function(){
            var r = this.$router
            var adres_id = this.order_dict.order_address.id
            var zipFormData = new FormData();
            zipFormData.append('adres_id',adres_id);
            zipFormData.append('order_code',this.order_code);
            this.axios({
                url:'http://127.0.0.1:8000/api/change_adres/',
                method:'post',
                data:zipFormData,
                headers:{
                'Authorization': 'JWT ' + localStorage.token
            }
            }).then(res=>{
                console.log(res.data)
                if(res.data.code==200){
                    r.push({'path':"/user_center_order?order_code="+this.order_code})
                }else{
                    alert(res.data.mes)
                }
            }).catch(error=>{
                console.log(error)
            })
        }
    },
}
</script>