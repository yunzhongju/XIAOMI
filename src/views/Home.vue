<template>
  <div class="home">
     <div class="header">
       <a href=""><img src="../assets/images/logo.png" height="22" alt=""></a>
       <input type="text" placeholder="搜索商品名称">
       <a href=""><img src="../assets/images/user.png" height="26" alt=""></a>
     </div>
     
     <div class="sub-header">
       <van-tabs color="#f30" background="#f0f0f0" title-active-color="#F30">
        <van-tab v-for="(item,index) in tabs"  :key="index" :title="item.name">     
            <Page :item="item"></Page>
        </van-tab>
      </van-tabs>
     </div>
    
  </div>
</template>
<script>
 import Page from '../components/Page'
export default {
  data(){
    return {
      tabs:[],//次导航信息
      // gallery:[],//幻灯片信息
      // subMenu:[],
      // subMenu2:[],
      sections:[],
     
    }
  },
  created(){
    this.getPage();
    // 获取页面信息
  },
  components:{Page,},
  methods:{
    getPage(){
      this.$http.get("/home/q/news_list_for_channel?channel_id=best&cstart=0&cend=10&infinite=true&refresh=1&__from__=wap&docids=0NQN1IKx%2C0NQCbR4e%2C0NQOeHSb%2C0NPRsNOH%2C0NPnjhyQ&_spt=yz~eaodhoy~%3A%3B%3A&appid=web_yidian&_=1571587189361")
      .then(xhr=>{
        console.log("yidian",xhr)
      })
      this.$http.get("/data.json")
      .then(xhr=>{
        console.log(xhr.data);
      })
      // https://api.hqtime.huanqiu.com/api/news/category 
      this.$http.get("/api/news/category")
      .then(xhr=>{
        console.log(xhr.data,"that hit")
      })
      
      this.$http.get("http://biger.applinzi.com/page.php")
      .then(xhr=>{
        console.log(xhr.data);
        this.tabs = xhr.data.data.tabs;
        // this.gallery = xhr.data.data.data.sections[0].body.items;
        // this.subMenu = xhr.data.data.data.sections[1].body.items;
        // this.subMenu2 = xhr.data.data.data.sections[2].body.items;
        this.sections = xhr.data.data.data.sections;
        
      })
    }
  }
}
</script>
<style lang="less">
.tac{text-align: center;}
// 修正滚动
.sub-header,
.van-tabs--line,
.van-tabs__content
{
  height: 100%;

}
.van-tabs__content{
  overflow-y:auto;
}
 
 .tac{
   text-align: center;
 }
 .brif{
   white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size:0.2rem;
    color:#ccc;
 }
  .home{
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .header{
    height: 44px;
   
    // 高
    display: flex;
    // 弹性布局
    align-items: center;
    // 次要在垂直居中对齐
    input{
      flex:1;
      height: 29px;
      border:0;
    }
    // header里面的input
    a{ 
      padding-left: 15px; 
      padding-right: 15px;
      }
    //  header 里面的a
  }
  
  .sub-header{
    // height: 44px;
    flex: 1;
  }
  .content{
    flex:1;
    overflow-y: auto;
  }
  .row{
    display:flex;
  }
  .col{
    flex:1;
    img{display: block}
  }
</style>

 
 
