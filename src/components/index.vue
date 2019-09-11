<template>
    <div id="index">

        <!-- 路由传参  <router-link :to="{ name: 'news', params: { userId: 1111}}">click to news page</router-link> -->
            <!-- 引入的组件 -->
            <Header></Header>
            <!-- ------------------ -->
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
                                <img src="../../static/images/goods/goods001.jpg" alt="商品图片">
                                <h4>商品名称手机</h4>
                                <div>4</div>
                            </li>
                            <li>
                                <img src="../../static/images/goods/goods002.jpg" alt="商品图片">
                                <h4>商品名称手机</h4>
                                <div>5</div>
                            </li>
                            <li>
                                <img src="../../static/images/goods/goods003.jpg" alt="商品图片">
                                <h4>商品名称手机</h4>
                                <div>6</div>
                            </li>
                            <li>
                                <img src="../../static/images/goods/goods003.jpg" alt="商品图片">
                                <h4>商品名称手机</h4>
                                <div>6</div>
                            </li>
                        </ul>			
                    </div>
                </div>
            
                <div class="navbar_con">
                    <div class="navbar">
                        <h1 class="fl">商品分类</h1>
                        <ul class="navlist fl">
                            <li><a href="">首页</a></li>
                            <li class="interval">|</li>
                            <li><a href="">真划算</a></li>
                            <li class="interval">|</li>
                            <li><a href="">抽奖</a></li>
                        </ul>
                    </div>
                </div>
            
                <div class="pos_center_con clearfix">
                    <ul class="slide">
                        <li><a href="#"><img src="../../static/images/slide01.jpg" alt="幻灯片01"></a></li>
                        <li><a href="#"><img src="../../static/images/slide02.jpg" alt="幻灯片02"></a></li>
                        <li><a href="#"><img src="../../static/images/slide03.jpg" alt="幻灯片03"></a></li>
                        <li><a href="#"><img src="../../static/images/slide04.jpg" alt="幻灯片04"></a></li>
                    </ul>
                    <div class="prev"></div>
                    <div class="next"></div>
                    <ul class="points">
                        <!-- <li class="active"></li>
                        <li></li>
                        <li></li>
                        <li></li> -->
                    </ul>
                    <Gps></Gps>
                   
                    <div class="news">
                        <div class="news_title">
                            <h3>快讯</h3>
                            <a href="#">更多 &gt;</a>
                        </div>
                        <ul class="news_list">
                            <li><a href="#">i7顽石低至4199元</a></li>
                            <li><a href="#">奥克斯专场 正1匹空调1313元抢</a></li>
                            <li><a href="#">荣耀9青春版 高配 领券立减220元</a></li>
                            <li><a href="#">美多探索公益新模式</a></li>
                            <li><a href="#">i7顽石低至4199元</a></li>
                            <li><a href="#">正1匹空调1313元抢</a></li>
                            <li><a href="#">奥克斯专场 正1匹空调1313元抢</a></li>
                        </ul>
                        <a href="#" class="advs"><img src="images/adv01.jpg"></a>
                    </div>
                </div>
                
                <div class="list_model">
                    <div class="list_title clearfix">
                        <h3 class="fl" id="model01">1F 手机通讯</h3>
                        <div class="subtitle fr">
                            <a href="#" class="active">时尚新品</a>
                            <a href="#">加价换购</a>
                            <a href="#">畅想低价</a>
                            <a href="#">手机配件</a>
                            <a href="#">精选单品</a>
                        </div>
                    </div>
                    <div class="goods_con clearfix">
                        <div class="goods_banner fl">
                            <img src="images/banner01.jpg">
                            <div class="channel">
                                <a href="#">手机</a>
                                <a href="#">配件</a>
                                <a href="#">充值</a>
                                <a href="#">优惠券</a>
                            </div>
                            <div class="key_words">
                                <a href="#">荣耀手机</a>
                                <a href="#">国美手机</a>
                                <a href="#">华为手机</a>
                                <a href="#">热销推荐</a>
                                <a href="#">以旧换新</a>
                                <a href="#">潮3C</a>
                                <a href="#">全面屏</a>
                                <a href="#">守护宝</a>
                                <a href="#">存储卡</a>
                                <a href="#">保护套</a>
                            </div>
                        
                        </div>
                        <ul class="goods_list fl">
                            <li>					
                                <a href="#" class="goods_pic"><img src="images/goods/goods003.jpg"></a>
                                <h4><a href="#" title="360手机 N6 Pro 全网通 6GB+128GB 极夜黑">360手机 N6 Pro 全网通 6GB+128GB 极夜黑</a></h4>
                                <div class="prize">¥ 2699.00</div>
                            </li>
                            <li>					
                                <a href="#" class="goods_pic"><img src="images/goods/goods002.jpg"></a>
                                <h4><a href="#">iphoneX N6 Pro 全网通 6GB+128GB 极夜黑</a></h4>
                                <div class="prize">¥ 7788.00</div>
                            </li>
                            <li>					
                                <a href="#" class="goods_pic"><img src="images/goods/goods001.jpg"></a>
                                <h4><a href="#">360手机 N6 Pro 全网通 6GB+128GB 极夜黑</a></h4>
                                <div class="prize">¥ 1988.00</div>
                            </li>
                            <li>					
                                <a href="#" class="goods_pic"><img src="images/goods/goods004.jpg"></a>
                                <h4><a href="#">360手机 N6 Pro 全网通 6GB+128GB 极夜黑</a></h4>
                                <div class="prize">¥ 3688.00</div>
                            </li>
                            <li>					
                                <a href="#" class="goods_pic"><img src="images/goods/goods005.jpg"></a>
                                <h4><a href="#">360手机 N6 Pro 全网通 6GB+128GB 极夜黑</a></h4>
                                <div class="prize">¥ 4288.80</div>
                            </li>
                            <li>					
                                <a href="#" class="goods_pic"><img src="images/goods/goods003.jpg"></a>
                                <h4><a href="#">360手机 N6 Pro 全网通 6GB+128GB 极夜黑</a></h4>
                                <div class="prize">¥ 2699.00</div>
                            </li>
                            <li>					
                                <a href="#" class="goods_pic"><img src="images/goods/goods002.jpg"></a>
                                <h4><a href="#">iphoneX N6 Pro 全网通 6GB+128GB 极夜黑</a></h4>
                                <div class="prize">¥ 7788.00</div>
                            </li>
                            <li>					
                                <a href="#" class="goods_pic"><img src="images/goods/goods001.jpg"></a>
                                <h4><a href="#">360手机 N6 Pro 全网通 6GB+128GB 极夜黑</a></h4>
                                <div class="prize">¥ 1988.00</div>
                            </li>
                            <li>					
                                <a href="#" class="goods_pic"><img src="images/goods/goods004.jpg"></a>
                                <h4><a href="#">360手机 N6 Pro 全网通 6GB+128GB 极夜黑</a></h4>
                                <div class="prize">¥ 3688.00</div>
                            </li>
                            <li>					
                                <a href="#" class="goods_pic"><img src="images/goods/goods005.jpg"></a>
                                <h4><a href="#">360手机 N6 Pro 全网通 6GB+128GB 极夜黑</a></h4>
                                <div class="prize">¥ 4288.80</div>
                            </li>
                        </ul>
                    </div>
                </div>
            
                <div class="list_model model02">
                        <div class="list_title clearfix">
                            <h3 class="fl" id="model01">2F 电脑数码</h3>
                            <div class="subtitle fr">
                                <a href="#" class="active">时尚新品</a>
                                <a href="#">加价换购</a>
                                <a href="#">畅想低价</a>
                                <a href="#">配件</a>
                                <a href="#">精选单品</a>
                            </div>
                        </div>
                        <div class="goods_con clearfix">
                            <div class="goods_banner fl">
                                <img src="images/banner02.jpg">
                                <div class="channel">
                                    <a href="#">电脑</a>
                                    <a href="#">数码</a>
                                    <a href="#">配件</a>
                                    <a href="#">潮电子</a>
                                </div>
                                <div class="key_words">
                                    <a href="#">Apple</a>
                                    <a href="#">神舟战神</a>
                                    <a href="#">单反相机</a>
                                    <a href="#">智能家居</a>
                                    <a href="#">智能路由</a>
                                    <a href="#">限时抢</a>
                                    <a href="#">顽石</a>
                                    <a href="#">微单</a>
                                    <a href="#">耳机</a>
                                    <a href="#">投影机</a>
                                </div>
                            </div>
                            <ul class="goods_list fl">
                                    <li>					
                                        <a href="#" class="goods_pic"><img src="images/goods/goods008.jpg"></a>
                                        <h4><a href="#" title="华硕明星爆款 八代i7顽石低至4199">华硕明星爆款 八代i7顽石低至4199</a></h4>
                                        <div class="prize">¥ 4199.00</div>
                                    </li>
                                    <li>					
                                        <a href="#" class="goods_pic"><img src="images/goods/goods002.jpg"></a>
                                        <h4><a href="#">iphoneX N6 Pro 全网通 6GB+128GB 极夜黑</a></h4>
                                        <div class="prize">¥ 7788.00</div>
                                    </li>
                                    <li>					
                                        <a href="#" class="goods_pic"><img src="images/goods/goods001.jpg"></a>
                                        <h4><a href="#">360手机 N6 Pro 全网通 6GB+128GB 极夜黑</a></h4>
                                        <div class="prize">¥ 1988.00</div>
                                    </li>
                                    <li>					
                                        <a href="#" class="goods_pic"><img src="images/goods/goods004.jpg"></a>
                                        <h4><a href="#">360手机 N6 Pro 全网通 6GB+128GB 极夜黑</a></h4>
                                        <div class="prize">¥ 3688.00</div>
                                    </li>
                                    <li>					
                                        <a href="#" class="goods_pic"><img src="images/goods/goods005.jpg"></a>
                                        <h4><a href="#">360手机 N6 Pro 全网通 6GB+128GB 极夜黑</a></h4>
                                        <div class="prize">¥ 4288.80</div>
                                    </li>
                                    <li>					
                                        <a href="#" class="goods_pic"><img src="images/goods/goods003.jpg"></a>
                                        <h4><a href="#">360手机 N6 Pro 全网通 6GB+128GB 极夜黑</a></h4>
                                        <div class="prize">¥ 2699.00</div>
                                    </li>
                                    <li>					
                                        <a href="#" class="goods_pic"><img src="images/goods/goods002.jpg"></a>
                                        <h4><a href="#">iphoneX N6 Pro 全网通 6GB+128GB 极夜黑</a></h4>
                                        <div class="prize">¥ 7788.00</div>
                                    </li>
                                    <li>					
                                        <a href="#" class="goods_pic"><img src="images/goods/goods001.jpg"></a>
                                        <h4><a href="#">360手机 N6 Pro 全网通 6GB+128GB 极夜黑</a></h4>
                                        <div class="prize">¥ 1988.00</div>
                                    </li>
                                    <li>					
                                        <a href="#" class="goods_pic"><img src="images/goods/goods004.jpg"></a>
                                        <h4><a href="#">360手机 N6 Pro 全网通 6GB+128GB 极夜黑</a></h4>
                                        <div class="prize">¥ 3688.00</div>
                                    </li>
                                    <li>					
                                        <a href="#" class="goods_pic"><img src="images/goods/goods005.jpg"></a>
                                        <h4><a href="#">360手机 N6 Pro 全网通 6GB+128GB 极夜黑</a></h4>
                                        <div class="prize">¥ 4288.80</div>
                                    </li>
                            </ul>
                        </div>
                    </div>
                
                    <div class="list_model model03">
                        <div class="list_title clearfix">
                            <h3 class="fl" id="model01">3F 家居家装</h3>
                            <div class="subtitle fr">
                                <a href="#" class="active">生活用品</a>
                                <a href="#">厨房用品</a>
                                <a href="#">精品家具</a>
                                <a href="#">家装建材</a>
                            </div>
                        </div>
                        <div class="goods_con clearfix">
                            <div class="goods_banner fl">
                                <img src="images/banner03.jpg">
                                <div class="channel">
                                    <a href="#">家居日用</a>
                                    <a href="#">家纺寝居</a>
                                    <a href="#">住宅家具</a>
                                </div>
                                <div class="key_words">
                                    <a href="#">厨具餐饮</a>
                                    <a href="#">被子</a>
                                    <a href="#">实木床</a>
                                    <a href="#">箭牌马桶</a>
                                    <a href="#">指纹锁</a>
                                    <a href="#">电饭煲</a>
                                    <a href="#">热水器</a>
                                    <a href="#">席梦思</a>
                                    <a href="#">沙发</a>
                                    <a href="#">酒柜</a>
                                </div>
                            </div>
                            <ul class="goods_list fl">
                                    <li>					
                                        <a href="#" class="goods_pic"><img src="images/goods/goods009.jpg"></a>
                                        <h4><a href="#" title="维达3层超韧120抽软抽纸每提4包【大规格L】V2240(4包)">维达3层超韧120抽软抽纸每提4包【大规格L】V2240(4包)</a></h4>
                                        <div class="prize">¥ 18.80</div>
                                    </li>
                                    <li>					
                                        <a href="#" class="goods_pic"><img src="images/goods/goods002.jpg"></a>
                                        <h4><a href="#">iphoneX N6 Pro 全网通 6GB+128GB 极夜黑</a></h4>
                                        <div class="prize">¥ 7788.00</div>
                                    </li>
                                    <li>					
                                        <a href="#" class="goods_pic"><img src="images/goods/goods001.jpg"></a>
                                        <h4><a href="#">360手机 N6 Pro 全网通 6GB+128GB 极夜黑</a></h4>
                                        <div class="prize">¥ 1988.00</div>
                                    </li>
                                    <li>					
                                        <a href="#" class="goods_pic"><img src="images/goods/goods004.jpg"></a>
                                        <h4><a href="#">360手机 N6 Pro 全网通 6GB+128GB 极夜黑</a></h4>
                                        <div class="prize">¥ 3688.00</div>
                                    </li>
                                    <li>					
                                        <a href="#" class="goods_pic"><img src="images/goods/goods005.jpg"></a>
                                        <h4><a href="#">360手机 N6 Pro 全网通 6GB+128GB 极夜黑</a></h4>
                                        <div class="prize">¥ 4288.80</div>
                                    </li>
                                    <li>					
                                        <a href="#" class="goods_pic"><img src="images/goods/goods003.jpg"></a>
                                        <h4><a href="#">360手机 N6 Pro 全网通 6GB+128GB 极夜黑</a></h4>
                                        <div class="prize">¥ 2699.00</div>
                                    </li>
                                    <li>					
                                        <a href="#" class="goods_pic"><img src="images/goods/goods002.jpg"></a>
                                        <h4><a href="#">iphoneX N6 Pro 全网通 6GB+128GB 极夜黑</a></h4>
                                        <div class="prize">¥ 7788.00</div>
                                    </li>
                                    <li>					
                                        <a href="#" class="goods_pic"><img src="images/goods/goods001.jpg"></a>
                                        <h4><a href="#">360手机 N6 Pro 全网通 6GB+128GB 极夜黑</a></h4>
                                        <div class="prize">¥ 1988.00</div>
                                    </li>
                                    <li>					
                                        <a href="#" class="goods_pic"><img src="images/goods/goods004.jpg"></a>
                                        <h4><a href="#">360手机 N6 Pro 全网通 6GB+128GB 极夜黑</a></h4>
                                        <div class="prize">¥ 3688.00</div>
                                    </li>
                                    <li>					
                                        <a href="#" class="goods_pic"><img src="images/goods/goods005.jpg"></a>
                                        <h4><a href="#">360手机 N6 Pro 全网通 6GB+128GB 极夜黑</a></h4>
                                        <div class="prize">¥ 4288.80</div>
                                    </li>
                            </ul>
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
document.title = "首页";
// 将header 组件 导入
import Header from './header.vue'
import Foots from './foots.vue'
import Gps from './gps.vue'

export default {
    // 表名继承的组件
    components:{
        'Header': Header,
        'Foots': Foots,
        'Gps': Gps
    },

    

}
</script>