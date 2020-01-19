<template>
    <div class="jok">
        <p>{{address}}</p>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" pulling-text="发现更多美好">
            <div v-for="(item,index) in joks" :key="index" class="card">
                <h3>{{item.title}}</h3>
                <p>{{item.summary}}</p>
            </div>
         </van-pull-refresh>
        <van-button type="primary" size="large" @click="getJoks">加载更多</van-button>
    </div>
</template>
<script>
// /xiaomi
// yarn add axios
import axios from 'axios';
import jsonp from 'jsonp';
// 导入包
export default {
    data(){
        return {
            joks:[],//定义笑话数据
            page:0,//默认获取第0页
            isLoading: false,
            address:'',//地址信息
        }
    },
    created(){
        this.getJoks();
        this.getAdd();
        this.getCarts();
    },
    methods:{
        getCarts(){
            //vue.config.js proxy代理做个配置会自动把懂车帝 https://m.dcdapp.com/motor
            // 转发为 localhost:8080 进行访问
            axios.get("/motor/brand/m/v1/brand/?device_id=0")
            .then(xhr=>{
                console.log("车信息",xhr)
            })
            .catch(err=>{
                console.log("失败了");
            })
        },
        getAdd(){
            var that = this;
                jsonp("http://api.map.baidu.com/location/ip?ak=I5p02PxH5e459CAk9vt4elbXNTkgfxde",{},function(err,data){
                    
                    console.log("json方法",data);
                    that.address = data.address;
                })

        },
        onRefresh() {
            this.getJoks("pull");
          
            // 下拉刷新获取数据
        },
        getJoks(type){
            var that = this;
            axios.get("http://biger.applinzi.com/duan/list.php?page="+that.page)
            .then(xhr=>{
                if(type=="pull"){
                    that.joks = xhr.data.result.concat(that.joks);
                    // 如果是下拉把数据放在最前面
                    that.isLoading = false;
                }else{
                     that.joks = that.joks.concat(xhr.data.result);
                    //  如果是加载更多吧新加载的数据放在后面
                }
                that.page++;
               
                // 新加载的数据合并在后面
                 //A.concat(B) 把A和B两个数组合并
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
}
</script>
<style scoped>
 /* scoped css 只在当前组件启用 */
 .jok{overflow: auto;}
 .card{
     background-color: #fff;
     margin: 15px;
     padding: 15px;
     border-radius: 12px;
 }
</style>