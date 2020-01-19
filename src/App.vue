<template>
  <div id="app">  
     <!--page 页面  -->
    <router-view class="page" @footerEvent="handlerFooter"/>
    <!-- 主导航 -->
    <transition name="van-slide-up">
      <div id="nav" v-if="showFooter">
        <router-link class="col ihome" to="/">
        <i></i>
        <span>首页</span>
        </router-link> 
        <router-link class="col icategory" to="/category"><i></i>
        <span>分类</span></router-link> 
        <router-link class="col icart" to="/cart"><i></i>
        <span>购物车{{cartNum}}</span></router-link>  
        <router-link  class="col iuser" to="/user"><i></i>
        <span>用户中心</span></router-link> 
      </div>
    </transition>
  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex';
// 导入映射方法
export default {
  created(){
   this.getCart();
    // 当vue创建时候获取购物车内容
  },
  computed:{
    ...mapGetters(["cartNum"])
    // 使用映射数据
  },
  data(){
    return{showFooter:true}
  },
  methods:{
    ...mapActions(["getCart"]),
    handlerFooter($event){
        console.log($event);
        this.showFooter=$event;
    }
  }
}
</script>

<style >

*{
  margin: 0;
  padding: 0;
}
/* 默认间距清除 */
a{text-decoration: none;}
/* 删除a标签默认的下划线 */
#app{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column
}
/* 设置app的宽 屏幕的宽 高 屏幕的高（100vh=屏幕的高） */
/* 启用弹性布局 */
/* 布局方向为垂直 */
.page{
  flex:1;
  background:#f0f0f0;
}
/* 页面自适应高 ，背景灰色 */
#nav{
  display: flex;
  flex-direction: row;
  height: 49px;
  font-size: 10px;
}
/* 导航 */
/* 启用弹性布局;布局方向水平;高49px;文字10px； */
.col{
  flex:1;
}
/* 底部导航链接 自适应 平均分 */
#nav .col{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color:#777;
}
/* 底部栏导航链接 */
/* 启用弹性布局；布局方向垂直；主轴方向 居中对齐；次要轴居中对齐； 文字颜色灰色 */
#nav  .router-link-exact-active{ color:#f30;}
/* 导航 链接如果是激活的文字 橙色 */
#nav i{
  display: block;
  height: 22px;
  width: 22px;
  background-image: url("./assets/images/home.png");
  background-size:cover;
}
/* 链接里面的i （存放图片） */
/* 设置为块元素（i元素默认是行内设置宽高不管用）； 高22； 宽22 ； 背景图片；背景图片覆盖宽高 */
#nav  .ihome.router-link-exact-active i{
  background-image: url("./assets/images/home-h.png");
}
/* 导航 是ihome并且是激活(.router-link-exact-active)  里面的i 更换一张高亮的图片*/
#nav .icategory i{
  background-image: url("./assets/images/cat.png")
}
/* 导航 是icategory 里面i 更换一张图片 */
#nav .icategory.router-link-exact-active i{
  background-image: url("./assets/images/cat-h.png")
}

#nav .icart i{
  background-image: url("./assets/images/cart.png")
}
#nav .icart.router-link-exact-active i{
  background-image: url("./assets/images/cart-h.png")
}
#nav .iuser i{
  background-image: url("./assets/images/user.png")
}
#nav .iuser.router-link-exact-active i{
  background-image: url("./assets/images/user-h.png")
}
</style>
