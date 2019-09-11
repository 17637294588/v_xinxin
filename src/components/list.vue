<template>
    <div>

            <Header></Header>

            <div class="search_bar clearfix">
                    <router-link to="/" class="logo fl"><img src="../../static/images/logo.png"></router-link>
                    <div class="search_wrap fl">
                        <div class="search_con">
                            <input type="text" class="input_text fl" name="" placeholder="搜索商品">
                            <input type="button" class="input_btn fr" name="" value="搜索">
                        </div>
                        <ul class="search_suggest fl">
                            <li><a href="#">索尼微单</a></li>
                            <li><a href="#">优惠15元</a></li>
                            <li><a href="#">美妆个护</a></li>
                            <li><a href="#">买2免1</a></li>
                        </ul>
                    </div>
            
                    <div class="guest_cart fr">
                        <a href="#" class="cart_name fl">我的购物车</a>
                        <div class="goods_count fl" id="show_count">15</div>
            
                        <ul class="cart_goods_show">
                            <li>
                                <img src="images/goods/goods001.jpg" alt="商品图片">
                                <h4>商品名称手机</h4>
                                <div>4</div>
                            </li>
                            <li>
                                <img src="images/goods/goods002.jpg" alt="商品图片">
                                <h4>商品名称手机</h4>
                                <div>5</div>
                            </li>
                            <li>
                                <img src="images/goods/goods003.jpg" alt="商品图片">
                                <h4>商品名称手机</h4>
                                <div>6</div>
                            </li>
                            <li>
                                <img src="images/goods/goods003.jpg" alt="商品图片">
                                <h4>商品名称手机</h4>
                                <div>6</div>
                            </li>
                        </ul>			
                    </div>
            
                </div>
            
                <div class="navbar_con">
                    <div class="navbar">
                        <div class="sub_menu_con fl">
                            <h1 class="fl">商品分类</h1>
                            <!-- <Gps></Gps> -->
                            <ul class="sub_menu">			
                                    <li v-for="(i,index) in goods_channel">
                                        <div class="level1">
                                            <a href="#" v-for="cat in i.channels">{{cat.name}}</a>
                                        </div>
                                        <div class="level2">
                                            <div class="list_group" v-for="cat in i.channels">
                                                  
                                                <div class="group_name fl"> {{cat.name}}&gt;</div>
                                                <div class="group_detail fl">
                                                    
                                                    <a  v-for="item in cat.sub_cats" @click="again_sub(item.id)">{{item.name}}</a>
                                                 
                                                </div>						
                                            </div>
                                          
                                        </div>
                                    </li>
                                   
                                </ul>
                        </div>		
            
            
                        <ul class="navlist fl">
                            <li><a href="">首页</a></li>
                            <li class="interval">|</li>
                            <li><a href="">真划算</a></li>
                            <li class="interval">|</li>
                            <li><a href="">抽奖</a></li>
                        </ul>
                    </div>
                </div>
            
                <div class="breadcrumb">
                    <a href="#">全部分类</a>
                    <span>></span>
                    <a href="#">手机</a>
                </div>
            
                <div class="main_wrap clearfix">
                    <div class="l_wrap fl clearfix">
                        <div class="new_goods">
                            <h3>热销排行</h3>
                            <ul>
                                <li>
                                    <a href="#"><img src="images/goods/goods001.jpg"></a>
                                    <h4><a href="#">360手机 N6 Pro 全网通 6GB+128GB 极夜黑</a></h4>
                                    <div class="prize">￥3.90</div>
                                </li>
                                <li>
                                    <a href="#"><img src="images/goods/goods002.jpg"></a>
                                    <h4><a href="#">360手机 N6 Pro 全网通 6GB+128GB 极夜黑</a></h4>
                                    <div class="prize">￥16.80</div>
                                </li>
                            </ul>
                        </div>
                    </div>
            
                    <div class="r_wrap fr clearfix">
                        <div class="sort_bar">
                            <a href="#" class="active">默认</a>
                            <a href="#">价格</a>
                            <a href="#">人气</a>
                        </div>
            
                        <ul class="goods_type_list clearfix">
                            
                            <li v-for="sku in goods_sku_list">
                                    
                                <a :href="'http://127.0.0.1:8080/#/detail?goods_sid='+sku.id">
                                    <img :src="sku.default_image_url"></a>
                                <h4><a :href="'http://127.0.0.1:8080/#/detail?goods_sid='+sku.id" 
                                    >{{sku.name}}</a></h4>
                                <div class="operate">
                                    <span class="prize">￥{{sku.price}}</span>
                                    <span class="unit">台</span>
                                    <a href="#" class="add_goods" title="加入购物车"></a>
                                </div>
                            </li>
                            
                           
                        </ul>
                        
                        <div class="pagenation">
                            <a href="#">上一页</a>
                            
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
import Gps from './gps.vue'
export default{
    
    components:{
        'Header': Header,
        'Foots': Foots,
        'Gps': Gps
    },
    inject:['reload'],
    data:function(){
        return{
            goods_channel:[],
            goods_sku_list : [],     // 商品 sku 数据
           
        }
    },
    inject:['reload'],
    mounted() {
        this.get_goods_channel(),
        this.get_goods_sku()
        
    },
    methods: {

        get_goods_channel:function(){
            this.axios({
                url:"http://127.0.0.1:8000/api/goods_channel/",
                method:'get'
            }).then(res=>{
               
                
                this.goods_channel = res.data
            }).catch(error=>{
                console.log(error)
            })
        },
        get_goods_sku:function(){
            
            var r = this.$router
            
            var cid = this.$route.query.cid
            
            this.axios({
                url:'http://127.0.0.1:8000/api/list_goods_mes/'+cid+'/',
                method:'get'
            }).then(res=>{
                console.log(res.data)
                
                this.goods_sku_list = res.data
                
                
            }).catch(error=>{
                console.log(error)
            })
        },
        // 当页点击分类
        again_sub:function(cid){
                      
            this.axios({
                url:'http://127.0.0.1:8000/api/list_goods_mes/'+cid+'/',
                method:'get'
            }).then(res=>{
                console.log(res.data)
                this.goods_sku_list = res.data
              
            }).catch(error=>{
                console.log(error)
            })
        }
      
      
    },

}


</script>