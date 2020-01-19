<template>
    <div>
        <h1>用户中心</h1>
       <p v-if="userInfo"> {{userInfo.M_UserName}} <span>{{userInfo.M_Scores}}</span> 
       <button @click="logOut">注销</button>
       </p> 
       <p v-else>
           <button @click="$router.push('/login')">登录</button> |
            <button @click="$router.push('/regist')">免费注册</button>
       </p>
       <img :src="pics[0]" alt="">
    </div>
</template>
<script>
import state from '../state.js'
export default {
    data(){
        return {
            userInfo:{},
            pics:[require("../assets/images/slide.jpg")],
        }
    },
    created(){
        this.getUserInfo();
    },
    methods:{
        getUserInfo(){
            var that = this;
            this.$http({
                url:'http://www.520mg.com/member/ajax_login.php',
                method:"GET",
                withCredentials:true,
            })
            .then(xhr=>{
                that.userInfo = xhr.data;
            })
        },
        logOut(){
            var that = this;
            this.$http({
                url:'http://www.520mg.com/member/index_login.php',
                method:"POST",
                withCredentials:true,
                data:`dopost=exit`
            })
            .then(xhr=>{
                if(xhr.data.status){
                    alert(xhr.data.msg);
                    state.setUser('');
                    //注销时候设置用户cookie为空
                    that.$router.push("/login")
                }
            })

        }
    }
}
</script>