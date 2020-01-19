<template>
    <div>
         <div v-for="(section,index) in sections" :key="index">
      <!-- 幻灯片类型 -->
      <div class="" v-if="section.view_type=='gallery'">
        <van-swipe>
          <van-swipe-item v-for="(item,ind) in section.body.items" :key="ind">
            <img :src="item.img_url" :style="{height:item.h/100+'rem',width:item.w/100+'rem'}" alt="">
          </van-swipe-item>          
        </van-swipe>
      </div>
      <!-- 自动填充类型 -->
       <div v-if="section.view_type=='cells_auto_fill'" :style="{height:section.body.h/100+'rem',width:section.body.w/100+'rem',position:'relative'}" >
          <div v-for="(item,ind) in section.body.items" 
          :key="ind" 
          @click="changePage(item)"
          :style="{height:item.h/100+'rem',width:item.w/100+'rem',position:'absolute',left:item.x/100+'rem',top:item.y/100+'rem'}"        
           >
          
           <img :src="item.img_url" width="100%" alt="">

          </div>
      </div>
      <!-- 分割线类型 -->
      <div v-if="section.view_type=='divider_line'" :style="{height:section.body.line_height/100+'rem',backgroundColor:section.body.divider_line}"></div>
      <!-- 商品两分 -->
     
       <div v-if="section.view_type=='list_two_type13'" class="row" :style="{backgroundColor:section.body.bg_color}" >
          <div class="col tac"
          v-for="(item,ind) in section.body.items" 
          :key="ind"  
          @click="changePage(item)"             
           >
          <!-- 组件内部执行change -->
           <img :src="item.img_url" width="100%" alt="">
           <h4 class="name">{{item.product_name}}</h4>
           <p class="brief">{{item.product_brief}}</p>
           <div class="price">{{item.product_price}}起 <del>{{item.product_org_price}}</del></div>
           <van-button type="danger" size="small">立即购买</van-button>

          </div>
      </div>
    </div>
        
    </div>
</template>
<script>
export default {
    data(){return{
        sections:[]
    }},
    props:["item"],
    created(){
        this.getPage();
    },
    methods:{
        getPage(){
            this.$http.get(`http://biger.applinzi.com/page.php?page_id=${this.item.page_id}&page_type=${this.item.page_type}`)
            .then(xhr=>{
              this.sections =  xhr.data.data.data.sections;
            })
        },
        changePage(item){
          
           // 如果页面中有product_id 则跳转
          if(item.product_id){
              this.$router.push('/detail/'+item.product_id)
          }
           // 如果页面中有action.path 则跳转
          if(item.action.path){
             this.$router.push('/detail/'+item.action.path)
          }
 
        }
    }
}
</script>