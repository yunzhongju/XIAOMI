<template>
    <div>
       <van-nav-bar
  title="购物车"
  left-text=""
  
  left-arrow
  @click-left="$router.go(-1)"
   
>
<van-icon name="search" slot="right" />
</van-nav-bar>
        <div v-for="(good,index) in goods" :key="index" class="goodsItem">
            <div class="col-10">
                 <van-checkbox v-model="good.select" checked-color="#f30"></van-checkbox>
              
            </div>
            <div class="col-30">
                 <img :src="good.img_url" width="100%" alt=""/>
            </div>
            <div class="col">
                <h5>{{good.name}}</h5>
                <p>售价：{{good.price}}</p>
                <van-stepper @change="updateCart" v-model="good.num" :min="1" :max="good.buy_limit" />
            </div>
            <div class="col-10" @click="delCart(good)">
                <van-icon name="delete" />
            </div>
           
            
        </div>
    </div>
</template>
<style>
  .goodsItem{
      display: flex;
      /* 开启弹性布局 */
      background-color: #fff;
      align-items: center;
      /* 子内容垂直居中 */
  } 
  .goodsItem .col-10{
      flex-basis: 10%;
      max-width: 10%;       
      text-align: center;

  } 
  .goodsItem .van-checkbox{
      justify-content: center;
      /* vant-checkbox 子内容水平居中 */
  }
 .goodsItem .col-30{
      flex-basis: 30%;
      max-width: 30%;
  }
.goodsItem .col{
    flex:1;
}
</style>
<script>
import {mapState,mapMutations} from 'vuex';
// 导入mapState映射方法从 vuex
//  能够把 vuex里面的数据，映射为 vue里面的数据
export default {
    data(){
        return {checked:true,}
    },
    computed:{
        ...mapState(['goods']),
        // mapState 会根据名称 返回一个数据 ...把数据展开了。
    },
    methods:{
        ...mapMutations(["delCart","updateCart"])
    },
    created(){
        this.$emit("footerEvent",false)
    },
    destroyed(){
        this.$emit("footerEvent",true)
    }
}
</script>