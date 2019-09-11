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
                        <div class="site_top_con">
                            <a @click="add_edit">新增收货地址</a>
                            <span>你已创建了<b>{{len_address}}</b>个收货地址，最多可创建<b>20</b>个</span>
                        </div>
                        <div class="site_con" v-for="def in default_list">
                            <div class="site_title">
                                <h3>{{def.receiver}} {{def.province}}</h3>
                                <a></a>
                                <em>默认地址</em>						
                                <span @click="deletes(def.id)">×</span>
                            </div>
                            <ul class="site_list">
                                <li><span>收货人：</span><b>{{def.receiver}}</b></li>
                                <li><span>所在地区：</span><b>{{def.province}}{{def.city}}{{def.town}}</b></li>
                                <li><span>地址：</span><b>{{def.place}}</b></li>
                                <li><span>手机：</span><b>{{def.mobile}}</b></li>
                                <li><span>电子邮箱：</span><b>{{def.email}}</b></li>
                            </ul>
                            <div class="down_btn">
                                <a @click="redact_address(def.id)">编辑</a>
                            </div>
                        </div>
        
                        <div class="site_con" v-for="i in address_list">
                            <div class="site_title">
                                <h3>{{i.receiver}} {{i.province}}</h3>
                                <a></a>
                                <span @click="deletes(i.id)">×</span>
                            </div>
                            <ul class="site_list">
                                <li><span>收货人：</span><b>{{i.receiver}}</b></li>
                                <li><span>所在地区：</span><b>{{i.province}}{{i.city}}{{i.town}}</b></li>
                                <li><span>地址：</span><b>{{i.place}}</b></li>
                                <li><span>手机：</span><b>{{i.mobile}}</b></li>
                                <li><span>电子邮箱：</span><b>{{i.email}}</b></li>
                            </ul>
                            <div class="down_btn">
                                <a @click="SetDefault(i.id)">设为默认</a>
                                <a @click="redact_address(i.id)">编辑</a>
                            </div>
                        </div>
        
                  			
                </div>
            </div>
            
            <Foots></Foots>
        
            <div class="pop_con" v-show="is_show_edit">
                <div class="site_con site_pop">
                        <div class="site_pop_title">
                            <h3>新增收货地址</h3>
                            <a @click="hides">×</a>
                        </div>				
                        <form>
                            <div class="form_group">
                                <label>*收货人：</label>
                                <input type="text" name="" v-model="receiver">
                            </div>
                            <div class="form_group">
                                <label>*所在地区：</label>
                                
                                <select @change="get_two_city" v-model="one_city_id">   
                                    <option v-for="one in city_one" :value="one.city_id">{{one.name}}</option>

                                </select>
                                <select @change="get_three_city" v-model="two_city_id">
                                    <option v-for="two in city_two" :value="two.city_id">{{two.name}}</option>

                                </select>
                                <select v-model="three_city_id">
                                    <option v-for="three in city_three" :value="three.city_id">{{three.name}}</option>

                                </select>
                            </div>
                            <center>
                                <span style="color:red" v-show="city_show" class="error_tip">{{ city_mes }}</span>
                            </center>
                            <div class="form_group">
                                <label>*详细地址：</label>
                                <input type="text" name="" v-model="place">
                            </div>
                            <div class="form_group">
                                <label>*手机：</label>
                                <input type="text" name="" v-model="mobile">
                            </div>

                            <div class="form_group">
                                <label>邮箱：</label>
                                <input type="text" name="" v-model="email">
                            </div>
                            <input type="text" v-model="red_id" v-show="redact_addres_id">  
                            <input type="button" @click="sub_add(red_id)" value="保 存" class="info_submit">
                            <input @click="is_show_edit=false" type="reset" name="" value="取 消" class="info_submit info_reset">
                        </form>
                </div>
                <div class="mask"></div>
            </div>
            </div>

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
        'User_info_url': User_info_url,
        'Header': Header,
        'Foots': Foots,
    },
    inject:['reload'],
    data:function(){
        return{
            is_show_edit:false,
            city_one:[],      // 一级城市数据
            one_city_id:"",   // 一级城市 id
            city_two:[],      // 二级城市数据
            two_city_id:"",   //二级城市 id
            city_three:[],    // 三级城市数据
            three_city_id:"",  //三级城市 id
            city_show:false,
            city_mes:"",
            receiver:"",      // 收件人
            place:"",         // 地址
            mobile:"",        // 手机号
            email:"",        // 邮箱
            address_list:[],  // 地址数据
            len_address:"",   // 总地址数
            default_list:[],  // 默认地址
            red_id:"",        // 默认点击编辑获取的当前地址ID
            redact_addres_id:false,  // 点击编辑返回的当前地址ID框


        }
    },
    mounted() {
        // 获取地址
        this.get_address()
        // 获取默认地址
        this.get_def_address()
    },

    methods: {
        // 获取一级城市
        add_edit:function(){
            this.is_show_edit = true
            this.axios({
                url:"http://127.0.0.1:8000/api/get_edit_one/",
                method:'get'
            }).then(res=>{
                this.city_one = res.data
                this.get_two_city()
            }).catch(error=>{
                console.log(error)
            })

        },
        // 获取二级城市    
        get_two_city:function(){

            this.axios({
                url:"http://127.0.0.1:8000/api/get_edit_two/" + this.one_city_id + '/',
                method:'get'
            }).then(res=>{
                this.city_two = res.data

            }).catch(error=>{
                console.log(error)
            })
        },
        // 获取三级城市
        get_three_city:function(){
            this.axios({
                url:"http://127.0.0.1:8000/api/get_edit_three/" + this.two_city_id + '/',
                method:'get'
            }).then(res=>{
                this.city_three = res.data
            }).catch(error=>{
                console.log(error)
            })
        },
        // 关闭地址框
        hides:function(){
            this.is_show_edit=false
            this.receiver = ""
            this.place = ""
            this.mobile = ""
            this.email = ""
            this.one_city_id = ""
            this.two_city_id = ""
            this.three_city_id = ""
        },
        
        //提交地址数据
        sub_add:function(adres_id){
            var zipFormData = new FormData();
            zipFormData.append('receiver',this.receiver);
            zipFormData.append('province',this.one_city_id);
            zipFormData.append('city',this.two_city_id);
            zipFormData.append('town',this.three_city_id);
            zipFormData.append('place',this.place);
            zipFormData.append('mobile',this.mobile);
            zipFormData.append('email',this.email);
            zipFormData.append('adres_id',adres_id);
            this.axios({
                url:"http://127.0.0.1:8000/api/inert_addres/",
                method:'post',
                data:zipFormData,
                headers:{
                'Authorization': 'JWT ' + localStorage.token
        }
            }).then(res=>{
                console.log(res)
                if(res.data.code==200){
                    this.is_show_edit = false
                    this.reload();
                }else{
                    this.city_show = true
                    this.city_mes = res.data.mes
                }
            }).catch(error=>{
                console.log(error)
            })
        },
        // 获取地址
        get_address:function(){
            this.axios({
                url:'http://127.0.0.1:8000/api/get_address_mes/',
                method:'get',
                headers:{
                    'Authorization':'JWT ' + localStorage.token
                }
            }).then(res=>{
                console.log(res.data)
                this.len_address = res.data.len_address
                this.address_list = res.data.address
            }).catch(error=>{
                console.log(error)
                this.$router.push({'path':'/login'})
            })
        },
        // 获取默认地址
        get_def_address:function(){
            this.axios({
                url:'http://127.0.0.1:8000/api/def_address_mes/',
                method:'get',
                headers:{
                    'Authorization':'JWT ' + localStorage.token
                }
            }).then(res=>{
                if(res.data.code==200){
                    this.default_list = res.data.mes
                }

            }).catch(error=>{
                console.log(error)
                this.$router.push({'path':'/login'})
            })
        },
        // 设置默认地址
        SetDefault:function(adres_id){
            var r = this.$router
            var order_code = this.$route.query.order_code   // 这是 place_order.vue 发过来的id，用来判断跳转的页面
            this.axios({
                url:'http://127.0.0.1:8000/api/set_def_address/' + adres_id + '/',
                method:'get',
                headers:{
                    'Authorization':'JWT ' + localStorage.token
                }
            }).then(res=>{
               if(res.data.code==200){
                   if(order_code){
                    r.push({'path':"/place_order?order_code="+order_code})
                   }else{
                    this.reload();
                   }
                
               }
            }).catch(error=>{
                console.log(error)
                this.$router.push({'path':'/login'})
            })
        },

        // 删除地址
        deletes:function(adres_id){
            this.axios({
                url:'http://127.0.0.1:8000/api/delete_def_address/' + adres_id + '/',
                method:'get',
                headers:{
                    'Authorization':'JWT ' + localStorage.token
                }
            }).then(res=>{
                if(res.data.code==200){
                    this.reload();
                }
            }).catch(error=>{
                console.log(error)
                this.$router.push({'path':'/login'})
            })
          
        },
        // 编辑地址
        redact_address:function(adres_id){
            this.axios({
                url:'http://127.0.0.1:8000/api/redact_address/' + adres_id + '/',
                method:'get',
                headers:{
                    'Authorization':'JWT ' + localStorage.token
                }
            }).then(res=>{
               if(res.data.code==200){
                   console.log(res.data)
                this.receiver = res.data.mes.receiver
                this.place = res.data.mes.place
                this.mobile = res.data.mes.mobile
                this.email = res.data.mes.email
                this.red_id = res.data.mes.id
                this.add_edit()
               }
            }).catch(error=>{
                console.log(error)
                this.$router.push({'path':'/login'})
            })
        }
    },
}
</script>