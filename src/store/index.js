import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // vuex数据中心
    // goods:[{name:"小米6",price:666},{name:"小米7",price:777},{name:"小米8",price:888}]
    goods:[],
  },
  getters:{
    //  vuex从现有数据计算新的数据
    cartNum:function(state){
      let num = 0;
      state.goods.forEach(item=>{
        num+=parseInt(item.num);
      })
      return num;
    }
  },
  mutations: {
    //  vuex 方法中心
    addToCart:function(state,data){
      data.select = true;
      data.num=1;
      // 默认添加选中属性
      let canUnshift =true;
      // 默认是可以加入
      console.log(data);
      state.goods.forEach(item=>{
        if(item.name==data.name){
            item.num=window.parseInt(item.num)+1;
            console.log(item.num);
            if(item.num>item.buy_limit){
              item.num =item.buy_limit;
              alert(`最多购买${item.buy_limit}`) ;
            }
            canUnshift = false;
            // 如果加了数量就不在unshift
        }
      })
      if( canUnshift){
        state.goods.unshift(data);
      }
      let item = state.goods;
      state.goods = [];
      state.goods = item;
      // 强制getter刷新;
     
      // unshift把data数据添加到goods数组最前面
    },
    updateCart(state) {
      let item = state.goods;
      state.goods = [];
      state.goods = item;
    },
    

    initCart:function(state,data){
      state.goods = data;
    },
    // 初始化goods商品列表
    delCart:function(state,data){
      var flag =  window.confirm("主人你不要我了吗？");
      if(flag){
        var ind = state.goods.indexOf(data);
        state.goods.splice(ind,1);
      }
    }
  },
  actions: {
    //  vuex   是异步方法中心的（可以实现ajax）
    //  action 触发mutation里面的方法
    getCart(context){
        axios.get("http://biger.applinzi.com/cart.php")
        .then(res=>{
          context.commit("initCart",res.data)
          // 把申诉局提交给mutation里面的initCart
        })
    }
  },
  modules: {
  }
})
