<template>
    <div>
        <h1>注册</h1>
        用户名: <input type="text" v-model="user.name"><br>
        密码： <input type="password" v-model="user.pwd"><br>
        邮箱： <input type="text" v-model="user.email"><br>
        <button @click="regist">注册</button>
    </div>
</template>
<script>
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
        regist(){
            var that = this;
            this.$http({
                url:'http://www.520mg.com/member/reg_new2.php',
                method:"POST",
                withCredentials:true,
                //我们的域名都是 localhost:8080 请求的地址是520mg.com 默认是不会吧cookie上传的
                //跨域请求强制携带cookie,
                data:`userid=${that.user.name}&userpwd=${that.user.pwd}&email=${that.user.email}`
            })
            .then(xhr=>{
                if(xhr.data.status==1){
                    alert(xhr.data.msg)
                    that.$router.push("/login")

                }else{
                     alert(xhr.data.msg)
                }
            })
            .catch(err=>{

            })
        }
    }
}
</script>