<template>
    <div>
            <ul class="sub_menu">			
                    <li v-for="(i,index) in goods_channel">
                        <div class="level1">
                            <a href="#" v-for="cat in i.channels">{{cat.name}}</a>
                        </div>
                        <div class="level2">
                            <div class="list_group" v-for="cat in i.channels">
                                  
                                <div class="group_name fl"> {{cat.name}}&gt;</div>
                                <div class="group_detail fl">
                                    
                                    <a :href="'http://127.0.0.1:8080/#/list?cid='+item.id" v-for="item in cat.sub_cats">{{item.name}}</a>
                                 
                                </div>						
                            </div>
                          
                        </div>
                    </li>
                   
                </ul>
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
            goods_channel:[],      // 频道数据

        }
    },
    inject:['reload'],
    mounted() {
        this.get_goods_channel()
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
     
       
    },
}
</script>