<template>
    <div>
        <van-nav-bar @click-left="$router.go(-1)" title="" left-text="" left-arrow>
            <van-icon name="share" slot="right" />
        </van-nav-bar>
        <!-- 顶部栏 -->
        <div class="content" v-if="goods_info.length">
            <!-- 内容页面有商品信息才显示 -->
            <van-swipe :autoplay="3000" indicator-color="white">
                <van-swipe-item :key="index" v-for="(item,index) in goods_info[current].gallery_v3">
                    <img v-lazy="item.img_url" width="100%" alt="">
                </van-swipe-item>                
            </van-swipe>
            <!-- 顶部幻灯片 -->

            <h3>{{product_info.name}}</h3>
            <p v-html="product_info.product_desc"></p> 
            <h3>{{goods_info[current].price}} <del>{{goods_info[current].market_price}}</del></h3>  
            <!-- 商品的标题描述价格 -->
            <div class="tpl">
            <!-- 商品的详情 -->
                <div v-for="(item,index) in tpl" :key="index">
                    <!-- 遍历所有的详情数据 -->
                    <div v-if="item.view_type=='image_w_1080'">
                        <img v-lazy="item.body.img_url" width="100%" alt="">
                    </div>
                    <!-- 如果是1080全宽图片 -->
                <van-swipe 
                    :style="{'height':item.body.h/100+'rem','width':item.body.w/100+'rem'}"
                    :autoplay="3000" indicator-color="white" v-if="item.view_type=='gallery_w_1080'">
                    <van-swipe-item :key="ind" v-for="(item,ind) in item.body.items">
                        <img v-lazy="item.img_url" width="100%" alt="">
                    </van-swipe-item>                
                </van-swipe>
                <!-- 如果是 gallery_w_1080 幻灯片-->
                    
                </div>
            </div>
        </div>
        <!-- contented -->
        <div class="t-footer">
            <div class="wrap">
                <div class="col-25" @click="$router.push('/')" >
                    <img src="../assets/images/home.png" height="24" alt="">
                    <p>首页</p>
                    </div>
                <div class="col-25"  @click="$router.push('/cart')">
                      <img src="../assets/images/cart.png" height="24" alt="">
                      <p> 购物车{{cartNum}}</p>
                   </div>
                <div class="col" @click="addToCart(goods_info[0])">
                    <button>加入购物车</button>
                </div>
            </div>
    </div>
    </div>
</template>
<script>
import {mapMutations,mapGetters} from 'vuex';
// 导入映射方法
export default {
    data(){
        return {
             current:0,// 当前显示第几个商品 默认第0个
             goods_info:[],//商品信息
             product_info:{},//产品信息
             tpl:[]//商品的详情
        }
    },
    computed:{
        ...mapGetters(['cartNum'])
    },
    created(){
        this.$emit("footerEvent",false);
        this.getDetail();
        // 当页面创建时候 获取商品信息
    },
    destroyed(){
         this.$emit("footerEvent",true)
    },
    methods:{
        ...mapMutations(['addToCart']),
        // 把vuex里面addTopCart方法映射到 vue组件里面
        getDetail(){
            this.$http.get("http://biger.applinzi.com/product.php?id="+this.$route.params.id)
            .then(xhr=>{
                this.goods_info = xhr.data.data.goods_info;
                // 多个商品信息 数组
                this.product_info = xhr.data.data.product_info;
                //  商品的标题与描述
                 var id = this.product_info.page_id;
                 this.tpl = xhr.data.data.goods_tpl_datas[id].sections;
               
               
                // 商品的详情
            })
        }
    }
}
</script>
<style >
.t-footer{
        /* background-color: orange; */
        height: 49px;
        position: fixed;
        /* 固定定位 定位参照物是屏幕的可视区域 */
        /* 参照点 左 下 */
        left:0;
        bottom:0;
        /* 定位后元素没有宽 */
        width: 100%;
        height: 79px;
        /* padding: 15px;
        box-sizing: border-box;
        height: 79px; */
        /* 调整父子元素间距可以用父亲的padding */
    }
    .t-footer .wrap{
        background-color:rgba(255,255,255,.9);
        height: 49px;
        /* 调整父子元素间距也可以用子元素的margin */
        margin: 15px;
        border-radius: 8px;
        /* 圆角 */
        box-shadow: 0 2px 4px #ccc;
        /* 投影 x0  y2 模糊为4 颜色灰色 */
        display: flex;
        /* 开启弹性布局 */
        align-items: center;
        /* 块 弹性的方式垂直居中 */
        /* 设置左右两边内边距 */
        padding: 0 15px;
       
    }
    .t-footer .col-25{
        flex-basis: 25%;
        max-width: 25%;
        text-align: center;
        /* 文字左右居中 */
        font-size: 10px;
       
    }
    .t-footer .col{
        flex:1;
        /* 按钮右对齐 */
        /* display: flex;
        justify-content: flex-end; */
        /* 按钮右对齐 */
        text-align: right;
    }
    /* 写css选择器应该带一个特定的父类 */
    .t-footer button{
        background-color: orange;
        /* 按钮背景色橙色 */
        color:#fff;
        /* 文本白色 */
        border:0;
        /* 没有边框 */
        padding:8px 15px;
        /* 内边距 上下8px 左右15px  （背景颜色会在内边距显示） */
        border-radius:15px;
        /* 圆角15px */
    }
</style>