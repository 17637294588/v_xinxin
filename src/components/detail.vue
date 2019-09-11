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
                        <router-link to="/cart" class="cart_name fl">我的购物车</router-link>
                        
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
                                <Gps></Gps>
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
                <a href="#">笔记本</a>
                <span>></span>
                <a href="#">mac电脑</a>
            </div>
          
            <div class="goods_detail_con clearfix">
                    <!--  -->
                <div class="goods_detail_pic fl"><img :src="sku_dict.goods_sku.default_image_url"></div>
                <div class="goods_detail_list fr">
                    <h3>{{sku_dict.goods_sku.name}}</h3>
                    <p>{{sku_dict.goods_sku.caption}}</p>
                    <div class="prize_bar">
                        <span class="show_pirze">¥<em>{{sku_dict.goods_sku.price}}</em></span>
                        <a href="javascript:;" class="goods_judge">{{sku_dict.goods_sku.comments}}人评价</a>
                    </div>
                    <div class="goods_num clearfix">
                        <div class="num_name fl">数 量：</div>
                        <div class="num_add fl">
                            <input type="text" class="num_show fl" value="1" v-model="number">
                            <a href="javascript:;" class="add fr" @click="add(sku_dict.goods_sku.id,1)">+</a>
                            <a href="javascript:;" class="minus fr" @click="add(sku_dict.goods_sku.id,2)">-</a>	
                        </div> 
                    </div>
                    <div class="type_select" v-for="sku in sku_dict.sku_list">
                        <label>{{sku.cate_name}}:</label>
                        
                        <a :class="{select:selects==value.id}" @click="checked(value.id)" v-for="value in sku.cate_value">{{value.value}}</a>
                        
                    </div>
                    
                    <div class="total">总价：<em>{{this.number * sku_dict.goods_sku.price}}元</em></div>
                    <div class="operate_btn">
                        <a href="javascript:;" class="buy_btn">立即购买</a>
                        <a href="javascript:;" class="add_cart" id="add_cart" @click="sub_cart(sku_dict.goods_sku.id)">加入购物车</a>				
                    </div>
                </div>
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
                    <ul class="detail_tab clearfix">
                        <li :class="{active:shows==1}" @click="check_detail">商品详情</li>
                        <li :class="{active:shows==2}" @click="check_pack">规格与包装</li>
                        <li :class="{active:shows==3}" @click="check_evaluate">商品评价(2)</li>
                        <li :class="{active:shows==4}" @click="check_server">售后服务</li>
                    </ul>
                    <!-- current 有这个属性才会显示数据 -->
                    <div class="tab_content current" v-show="goods_detail">
                        <dl>
                            <dt>商品详情：</dt>
                            
                            <dd v-html="sku_dict.goods_mes"></dd>
                        </dl>
                    </div>
                    <!-- v-show="goods_pack" -->
                    <div class="tab_content current" v-show="goods_pack">
                        <dl>
                            <dt>规格与包装：</dt>
                           
                            <dd v-html="sku_dict.goods_pack"></dd>
                        </dl>
                    </div>
                    <div class="tab_content current" v-show="user_evaluate">
                        <ul class="judge_list_con">
                            <li class="judge_list fl">
                                <div class="user_info fl">
                                    <img src="images/cat.jpg">
                                    <b>潇***啼</b>
                                </div>
                                <div class="judge_info fl">
                                    <div class="stars_five"></div>
                                    <div class="judge_detail">派送非常快，第二天上午就收到。2天使用初步总结，前一部手机也是华为P9plus.MATE10pro包装原封未拆精致大气。拆开后第一眼就看到宝石蓝的手机，非常惊艳；然后就是配件一应俱全。开机各方面设置，把通讯录、短信等同步好，同品牌手机同步很快。和P9plus一样的后置指纹识别很方便。录制指纹容易，解锁非常快，秒开！屏幕完好，默认分辨率显示效果很好。</div>
                                </div>
                            </li>
                           
                          				
                        </ul>
                    </div>
                    <div class="tab_content current" v-show="goods_server">
                        <dl>
                            <dt>售后服务：</dt>
                            <dd v-html="sku_dict.goods_service"></dd>
                        </dl>
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
export default {
    components:{
        'Header': Header,
        'Foots': Foots,
        'Gps': Gps
    },
    inject:['reload'],
    data:function(){
        return{
            sku_dict:{'goods_sku':{'default_image_url':''}}, 
            price:"",                // 默认价钱
            goods_detail:true,       // 商品详情框
            goods_pack:false,        // 商品规格包装框
            user_evaluate:false,     // 评价框
            goods_server:false,      // 售后服务框
            shows:1,                 // 默认 shows=1 的显示
            selects:0,               // 默认选中规格显示状态
            number:1,               // 数量
            
        }
    },
    created() {
        this.get_goods_detail()
        // 验证 token
        this.verify_token()        
    },
    methods: {

        verify_token:function(){
            let token = localStorage.token
            var zipFormData = new FormData();
            zipFormData.append('token',token);
            this.axios({
                url:"http://127.0.0.1:8000/api/verify/",
                method: "post",
                data:zipFormData
            }).then(res=>{
                this.set_redis()
            }).catch(error=>{
                // console.log(error)
            })
        },

        get_goods_detail:function(){
            var goods_sid = this.$route.query.goods_sid
            var zipFormData = new FormData();
            zipFormData.append('goods_sid',goods_sid);
           
            this.axios({
                url:'http://127.0.0.1:8000/api/get_detail_goods/',
                method:'post',
                data:zipFormData
            }).then(res=>{
                // console.log(res.data)
                this.sku_dict = res.data
                this.total = res.data.goods_sku.price
            }).catch(error=>{
                // console.log(error)
            })
        },
        // 入redis
        set_redis:function(){
            var goods_sid = this.$route.query.goods_sid
            var zipFormData = new FormData();
            zipFormData.append('goods_sid',goods_sid);
            zipFormData.append('user_id',localStorage.user_id);
            this.axios({
                url:'http://127.0.0.1:8000/api/send_redis/',
                method:'post',
                data:zipFormData
            }).then(res=>{
                console.log(res.data)
            })
           
        },
        // 规格选项
        checked:function(id){
            this.selects = id    // 选定规格
           
            this.axios({
                url:'http://127.0.0.1:8000/api/check_sku/'+id+'/',
                method:'get'
            }).then(res=>{
                // console.log(res.data)
                this.sku_dict = res.data
                this.total = res.data.goods_sku.price
                // this.reload;
                this.number = 1
            }).catch(error=>{
                console.log(error)
            })

        },
        // docker run -dti --network=host --name=elasticsearch -v /home/python/elasticsearch-2.4.6/config:/usr/share elasticsearch/config delron/elasticsearch-ik:2.4.6-1.0

        // 商品详情框
        check_detail:function(){
            this.shows=1
            this.goods_detail = true
            this.goods_pack = false
            this.user_evaluate = false
            this.goods_server = false
        },
        // 商品包装框
        check_pack:function(){
            this.shows=2
            this.goods_detail = false
            this.goods_pack = true
            this.user_evaluate = false
            this.goods_server = false
        },
        // 商品评价框
        check_evaluate:function(){
            this.shows=3
            this.goods_detail = false
            this.goods_pack = false
            this.user_evaluate = true
            this.goods_server = false

        },
        // 售后服务框
        check_server:function(){
            this.shows=4
            this.goods_detail = false
            this.goods_pack = false
            this.user_evaluate = false
            this.goods_server = true

        },
        // 加减操作
        add:function(sku_id,state){
            var zipFormData = new FormData();
            zipFormData.append('sku_id',sku_id) 
            zipFormData.append('state',state)
            zipFormData.append('number',this.number)
            this.axios({
                url:"http://127.0.0.1:8000/api/add_detail/",
                method:'post',
                data:zipFormData
            }).then(res=>{
                if(res.data.code==200){
                    // 加
                    if(state==1){
                        this.number++;
    
                    }
                    // 减
                    else{
                        this.number--;

                    }
                }else{
                    alert(res.data.mes)
                }
            }).catch(error=>{
                console.log(error)
            })
        },
        // 加入购物车
        sub_cart:function(sku_id){
            if(this.selects == 0){
                alert('请勾选具体规格')
            }else{
                var r = this.$router
                var zipFormData = new FormData();
                zipFormData.append('number',this.number) 
                this.axios({
                url:"http://127.0.0.1:8000/api/cart/"+sku_id+'/',
                method:'post',
                data:zipFormData,
                headers:{
                        'Authorization': 'JWT ' + localStorage.token
                    }
                }).then(res=>{
                    alert(res.data.mes)
                    
                }).catch(error=>{
                    alert(res.data.mes)
                    console.log(error)
                    r.push({'path':"/login?goods_sid="+this.sku_dict.goods_sku.id})
            })
            }
            
        }
    },
}
</script>