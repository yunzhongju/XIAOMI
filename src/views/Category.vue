<template>
    <div class="category">
        <van-nav-bar
  title="分类"
  left-text="返回"   
  left-arrow 
  @click-left="$router.go(-1)"
  @click-right="$router.push('/')"
>
<van-icon name="search" slot="right" />
</van-nav-bar>
    <div class="content">
        <div class="left">
            <div class="item" 
            @click="current=index"
            :class="{'active':current==index}"
            v-for="(item,index) in category" :key="index">
                {{item.category_name}}
            </div>
        </div>
        <div class="right" v-if="category.length">
            <!-- 循环current对应的大分类里面的 category_list-->
            <div class="cate"  v-for="(cate,index) in category[current].category_list" :key="index">
                    <!-- autofill -->
                    <div v-if="cate.view_type=='cells_auto_fill'">
                        <img width="100%" :src="cate.body.items[0].img_url" alt="">
                    </div>
                    <!-- title -->
                    <div v-if="cate.view_type=='category_title'" class="category_title">
                       -- {{cate.body.category_name}} --
                    </div>
                    <!-- group -->
                    <div class="row-wrap category_group" v-if="cate.view_type=='category_group'">
                        <!-- 当div单击时候跳转到详情页面 并带上详情id -->
                        <div class="col-33" @click="$router.push('/detail/'+item.action.path)" v-for="(item,ind) in cate.body.items" :key="ind">
                            <img v-lazy="item.img_url" width="100%" alt="">
                            <p class="product_name">{{item.product_name}}</p>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            category:[],//分类数据
            current:0,//当前是第几个
            }
    },
    created(){
        this.getCategory();
    },
    methods:{
        getCategory(){
            this.$http
            .get("http://biger.applinzi.com/category.php")
            .then(xhr=>{
                this.category = xhr.data.data;
            })
        }
    }
}
</script>
<style lang="less" scoped>
   .category_title{
       text-align:center;
   }
// 标题内容水平居中
   .category_group{
       
       display: flex;
       flex-wrap:wrap;
    //    弹性布局，可以换行
       .col-33{
           flex-basis: 33%;
           max-width: 33%;
        //    弹性宽为33.3% 最大宽33%
           text-align: center;
           color:#777;
           font-size:12px;   
        //   文字水平居中 颜色灰色  文字大小12px 
           padding: 15px;
           box-sizing: border-box;
        // 元素宽度从边框开始算起 内边距15px；
           .product_name{
               white-space: nowrap;
               overflow: hidden;
               text-overflow: ellipsis;
        //   超出宽度 的文字变成...
           }
       }
   }
    
    .left .item{
        font-size:12px;
        color:#484848;
        line-height: 44px;
        border-bottom: 1px solid #fafafa;
        text-align: center;
        transition: all ease .5s;
        // white-space: nowrap;
        // text-overflow: ellipsis;
        // overflow: hidden;
        // 文字大小12 颜色灰色 下边框1px 实线 浅灰色    文字居中对齐 
        //  注释部分超出遍...
    }
    .left .active{
        font-size:14px; 
        color:#f30; 
        font-weight: 900;
        }
        // 选择给16px字体大小  橙色  文字最粗100最细 900最粗
    .van-icon::before{
        color:#777;
        font-size:22px;
    }
    .van-nav-bar__text{
        color:#777;
    }
    // 修改导航栏 文字图标颜色为灰色 font-size用来修改图标大小
    .category{
        display: flex;
        flex-direction: column;
        height: 100%;
         
    }
    // 让整个分类开启垂直弹性布局
    .content{
        display: flex;
        // 内容区域也是弹性布局
        flex:1;
        // 自适应高
        .left{ 
            flex-basis: 25%;
            max-width: 25%; 
            overflow-y:auto;
            background-color: #fff;
            height: 100%;
            // 宽25% 最大宽25% 垂直滚动自动 背景白色
        }
        .right{
            flex-basis: 75%;
            max-width: 75%;
            height: 100%;
            overflow-y:auto;
            background-color: #fff;

        }
    }
</style>