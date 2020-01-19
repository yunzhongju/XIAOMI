import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Category from '../views/Category.vue'
import Cart from '../views/Cart.vue'
import User from '../views/User.vue'
import Jok from '../views/Jok.vue'
import Regist from '../views/Regist.vue'
import Login from '../views/Login.vue'
import Detail from '../views/Detail.vue'
Vue.use(VueRouter)
import state from "../state.js"
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/jok',
    name: 'jok',
    component: Jok
  },{
    path: '/detail/:id',
    name: 'detail',
    component: Detail
  },{
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/regist',
    name: 'regist',
    component: Regist
  },
  {
    path: '/category',
    name: 'category',
    // meta:{auth:true},
    component: Category
  },
  {
    path: '/cart',
    name: 'cart',
    meta:{auth:true},
    component: Cart,
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    meta:{auth:true}
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if(to.meta.auth){
  // 如果要去的路由to里面的meta需要auth权限 那么否要判断
      if(state.getUser()){
        next();
        // 如果有登录状态 放行
      }else{
        next("/login?redirect="+to.path)
        // 否则跳转到登录
      }
  }else{
    // 如果不需要就直接放行
    next();
  }
})
 

export default router
