<template>
    <div>
        <h1>登录</h1>
        用户名: <input type="text" v-model="user.name"><br>
        密码： <input type="password" v-model="user.pwd"><br>
         
        <button @click="login">登录</button>
    </div>
</template>
<script>
import state from '../state.js'
export default {
    data(){
        return {
            user:{
                pwd:'',
                name:'',
                email:''
            }
        }
    },
    methods:{
        login(){
            var that = this;
            this.$http({
                url:'http://www.520mg.com/member/index_login.php',
                method:"POST",
                withCredentials:true,
                //我们的域名都是 localhost:8080 请求的地址是520mg.com 默认是不会吧cookie上传的
                //跨域请求强制携带cookie,
                data:`fmdo=login&dopost=login&userid=${that.user.name}&pwd=${that.user.pwd}`
            })
            .then(xhr=>{
                if(xhr.data.status==1){
                    alert(xhr.data.msg)
                    state.setUser(1)
                    // 登录时候设置用户cookie为1
                    console.log(that.$route);
                    if(that.$route.query.redirect){
                        that.$router.replace(that.$route.query.redirect);
                    }else{
                        that.$router.replace("/")
                    }
                    //如果有redirect就跳转到redirect
                    // that.$router.push("/")

                }else{
                     alert(xhr.data.msg)
                }
            })
            .catch(err=>{
                // 网络错误。。
            })
        }
    }
}
</script>