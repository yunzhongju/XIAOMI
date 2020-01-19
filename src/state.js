import Vue from 'vue';
import Cookies from  'js-cookie';
var store = new Vue();
// 创建vue实例
store.getUser=function(){
    return Cookies.get('user') 
}
// 获取用户信息
store.setUser=function(val){
    Cookies.set("user",val)
}
// 设置用户信息

export default store;
// 导出store