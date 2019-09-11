<template>
    <div id="come_back">
        <p>跳转中...</p>
    </div>
</template>
<script>
// document.title = "跳转页面";
export default {
    // 从url上拿到 code 去后台获取token
    mounted() {
        var r = this.$router
        let code = this.$route.query.code
        this.axios({
            url:'http://127.0.0.1:8000/api/get_weibo_uid/?code='+code,
            method:'get'
        }).then(res=>{
            if(res.data.code==200){
                console.log(res.data)
                localStorage.clear() // 清空本地存储区域
                sessionStorage.clear() // 清空session区域
                localStorage.username = res.data.username
                localStorage.token = res.data.token
                localStorage.user_id = res.data.user_id
                r.push({'path':"/"})
            }else if(res.data.code==202){
                console.log(res.data.mes)
            }else{
                localStorage.access_token_object = res.data.mes
                r.push({'path':"/userbind"})
            }
        }).catch(error=>{
            console.log(error)
        })
    },
}
</script>