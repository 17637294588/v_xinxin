<template>
    <div>
            <Header></Header>
            <div class="search_bar clearfix">
                    <router-link to="/" class="logo fl"><img src="../../static/images/logo.png"></router-link>
                <div class="sub_page_name fl">|&nbsp;&nbsp;&nbsp;&nbsp;购物车</div>
                <div class="search_con fr mt40">
                    <input type="text" class="input_text fl" name="" placeholder="搜索商品">
                    <input type="button" class="input_btn fr" name="" value="搜索">
                </div>		
            </div>
        
            <div class="total_count">全部商品<em>{{lens}}</em>件</div>	
            <ul class="cart_list_th clearfix">
                <li class="col01">商品名称</li>
                <li class="col03">商品价格</li>
                <li class="col04">数量</li>
                <li class="col05">小计</li>
                <li class="col06">操作</li>
            </ul>
            <ul class="cart_list_td clearfix" v-for="i in goods_sku_list">
                    <!-- :class="{'check':i.checked}" -->
                <li class="col01"><input type="checkbox" v-model="i.checked" @click="checkOne(i)"></li>
                <li class="col02"><img :src="i.image_url"></li>
                <li class="col03">{{i.name}}</li>
                <li class="col05">{{i.price}}元</li>
                <li class="col06">
                    <div class="num_add">
                        <a href="javascript:;" class="add fl">+</a>
                        <input type="text" class="num_show fl" :value="i.number">	
                        <a href="javascript:;" class="minus fl">-</a>	
                    </div>
                </li>
                <li class="col07">{{i.price * i.number}}元</li>
                <li class="col08"><a href="javascript:;">删除</a></li>
            </ul>
        
          
            
        
            <ul class="settlements">
                    <!-- :class="{'check':checkAllFlag}" -->
                <li class="col01"><input type="checkbox" id="checkall" v-model="checkAllFlag" @click="checkedAll"></li>
                <li class="col02">全选</li>
                <li class="col03">合计(不含运费)：<span>¥</span><em>{{total}}</em><br>共计<b>{{lens}}</b>件商品</li>
                <li class="col04"><a href="javascript:;" @click="sub_cart">去结算</a></li>
            </ul>
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
            goods_sku_list:"",
            lens:"",
            total:0,      
            checkAllFlag: "",    //选中全部
            check_list:[],
              
        }
    },

    mounted() {
        this.get_cart_mes()
    },
    methods: {
        get_cart_mes:function(){
            var user_id = localStorage.user_id
            if(user_id){
                this.axios({
                url:"http://127.0.0.1:8000/api/cart_mes/"+user_id+'/',
                    method:'get',
                }).then(res=>{
                    console.log(res.data.data)
                    this.lens = res.data.lens
                    this.goods_sku_list = res.data.data
                    
                    // console.log(res.data)
                }).catch(error=>{
                console.log(error)
            })
            }
          
        },
        // 单选
        checkOne:function(item){
            if(typeof item.checked == 'undefined'){
                this.$set(item,'checked',true)
            }else{
                item.checked = !item.checked
            }
            // 如果取消一个商品的选中，全选也取消
            var itemisChenked = []
            this.goods_sku_list.forEach((item,index)=>{
                if(item.checked == true){
                    itemisChenked.push(item)
                }
            })
            if(itemisChenked.length == this.goods_sku_list){
                this.checkAllFlag = true
            }else{
                this.checkAllFlag = false
            }
            // 这个位置调用总金额的函数
            this.calcTotalPrice()
        },
        // 全选
        checkedAll:function(){
                if(this.checkAllFlag == false){
                    this.checkAllFlag = true
                    this.goods_sku_list.forEach((item,index)=>{
                    if(typeof item.checked == 'undefined'){

                        this.$set(item,"checked",true)
                    }else{
                        item.checked = this.checkAllFlag
                    }
            })
                }else{
                    this.checkAllFlag = false
                    this.goods_sku_list.forEach((item,index)=>{
                    if(typeof item.checked == 'undefined'){

                        this.$set(item,"checked",false)
                    }else{
                        item.checked = this.checkAllFlag
                    }
            })
                }
                         
            this.calcTotalPrice()
        },
        // 计算总金额
        calcTotalPrice:function(){
            this.total = 0
            this.goods_sku_list.forEach((item,index)=>{
                if(item.checked){
                    this.total += item.price * item.number
                }
            })
        },
        // 提交购物车
        sub_cart:function(){
            var checkList = []
            this.goods_sku_list.forEach((item,index)=>{
                if(item.checked == true){
                    checkList.push(item.id)
                    
                }
            })
            var r = this.$router
            this.check_list = checkList
            var zipFormData = new FormData();
            zipFormData.append('check_list',this.check_list);
            this.axios({
                url:'http://127.0.0.1:8000/api/sub_order/',
                method:'post',
                data:zipFormData,
                headers:{
                'Authorization': 'JWT ' + localStorage.token
            }
            }).then(res=>{
                
                if(res.data.code==200){
                    r.push({'path':"/place_order?order_code="+res.data.order_code})
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