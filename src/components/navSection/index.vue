
<template>
  <div class="nav">
  <!-- 主导航 -->
    <div class="navMain">
      <div class="nav_img">
        <img src="/static/images/logo.png">
      </div>
      <ul class="navlist">
        <li class="navlist-item" 
        v-for="(item,index) in navData.navList" :class="[item.icon, (navData.navLevelFirst==item.id)?'active':'']" :key="item.id" 
        @click="setCurrentNav(index,$event)">
          <a v-if="item.id===15" target="_blank" class="toIm"></a>       
          {{item.name}}
        </li>
        <!-- <li class="home">首页</li>
        <li class="commodity">商品</li>
        <li class="order">订单</li>
        <li class="shop">店铺</li>
        <li class="promotion">促销</li>
        <li class="logistics">物流</li>
        <li class="statistics">统计</li>
        <li class="asset">资产</li> -->
      </ul>
      <!-- <div class="sign_out">Kim Lam键</div> -->
      <div class="sign_out">
        <button v-text="btnText" @click="showToggle" class="btn_out"></button>  
        <div v-show="isShow" class="sign_lr">
          <p class="title">{{btnText}}</p>
          <p class="sign_btn">
          <el-button type="primary" class="refresh_btn" @click="sign_out()">退出登录</el-button> 
           
          <!-- 退出登录 -->
          </p>
        </div>  
      </div>
      
    </div>
    <!--  / 主导航 -->
    <!-- 二级菜果 -->
    <div class="menu">
      <div class="title">
        {{navData.completeName}}
        <!-- {{navData?navData.navList[navData.navLevelFirstIndex].completeName:''}} -->
      </div>
      <ul>
        <li v-for="item in navData.navList[navData.navLevelFirstIndex].child" :key="item.id">
          <router-link :to="item.link">{{item.name}}</router-link></li>
      </ul>
    </div>
    <!-- / 二级菜果 -->

  </div>
</template>
<script>
import * as Service from '@/module/login/service.js';//退出的接口
import {getNavList} from '@/common/js/service.js';
  export default {
    data() {
      return {
        hideSecond: false,
        btnText:"",  
        isShow:false, 
        // currentNavIndex: 0
        // navInfo: {navList}, 
      }
    },
    props: {
      navData: {
        required: true,
        type: Object,
        default: {
        navList: [],
        navLevelFirst: 1,
        navLevelFirstIndex: 0,
        navLevelSecond: 11
        }
      }
    },
    // computed: {
    //   navChilds: function(){
    //     let childs;

    //     try{
    //       childs=[...
    //       [this.currentNavIndex].child];
    //     } catch(e){
    //       console.log('catch error ', e);
    //       childs = [];
    //     }
    //     console.log('childs ', childs);
    //     return childs;


    //   }
    // },
    watch: {
      //监听路由，展示对应导航
      'navData': function(val){
        console.log('navData change ', val);
        
      }
    },

    methods:{
      goTo(link){
        this.$router.push(link);
      },
      /*点击显示*/
      showToggle:function(){
        this.isShow = !this.isShow;  
      },

      //点击一级菜单时记录当前选中一级菜单序号
      setCurrentNav(index,el){
        // this.currentNavIndex = index;
        // console.log('this.navData',this.navData);
        let vm = this;
        if(this.navData.navList[index].id !== 15){
          vm.$router.push({
            path: vm.navData.navList[index].child[0].link
          })
        }else{
          // 客服模块
          // console.log('location-----',location,el);
          let currentUseId = JSON.parse(localStorage.getItem('user'));
          console.log(currentUseId.id);
          // 客服分配
          // let params = {
          //   userId: currentUseId.id
          // }
          // Service.IMdistribute(params).then(res =>{
          //   // el.target.href =  location.origin + '/#/im';
          //   // this.$router.push('/im');
          //   // console.log(res);
          // }).catch(error =>{

          // })
          
          el.target.href =  location.origin + '/#/im';
          // vm.$router.push({
          //   path: vm.navData.navList[index].link
          // })
        }
        
      },
      /*退出登录*/
      sign_out(){
        //退出提示
          this.$confirm('确定退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
            Service.logout().then(res=>{
              //成功，则返回登录页面
              console.log(res);
              localStorage.removeItem('user');
              this.$router.push('/login');
            }).catch(res=>{
              localStorage.removeItem('user');
              this.$router.push('/login');
            })
          }).catch(() => {
          
          });
      },
    getLoginUserName(){
  		this.btnText = JSON.parse(localStorage.getItem('user'))&&JSON.parse(localStorage.getItem('user')).loginName;
    }

    },
    mounted(){
        // console.log('get nav ', this.navData);
        this.getLoginUserName();
    }
  }

</script>
<style lang="scss" scoped>

  body,html{
    height:100%;
  }
  .nav {
    position:fixed;
    top:0;
    left:0;
    bottom:0;
    width:225px;
    height:100vh;
    background:#fff;
    z-index:99;
  }
  .navMain{
    position: fixed;
    top:0;
    left:0;
    height:100vh;
    background:#2B3847;
    width: 100px;

    .nav_img{
      padding:16px 0 0 30px;
    }
    .navlist{
      
      .navlist-item{
      width:100px;
      height: 38px;
      display: inline-block;
      padding-left:40px;
      line-height:38px;
      font-size:14px;
      color:#B6B6B6;
      margin-top: 20px;
      cursor: pointer;
      // 添加客服模块的样式
      position:relative;
      .toIm {
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        display:block;
        // z-index:1000000;
      }
      &.home{
        background: url(/static/images/navigation/home.png)no-repeat 15px 8px;
        &:hover, &.active{
          background:#fff url(/static/images/navigation/home1.png)no-repeat 15px 8px; color:#333;
        }
      }
      &.commodity{
        background: url(/static/images/navigation/commodity.png)no-repeat 15px 8px;
        &:hover, &.active{
          background:#fff url(/static/images/navigation/commodity1.png)no-repeat 15px 8px; color:#333;
        }
      }
      &.order{
        background: url(/static/images/navigation/order.png)no-repeat 15px 8px;
        &:hover, &.active{
          background:#fff url(/static/images/navigation/order1.png)no-repeat 15px 8px; color:#333;
        }
      }
      &.shop{
        background: url(/static/images/navigation/shop.png)no-repeat 15px 8px;
        &:hover, &.active{
          background:#fff url(/static/images/navigation/shop1.png)no-repeat 15px 8px; color:#333;
        }
      }
      &.promotion{
        background: url(/static/images/navigation/promotion.png)no-repeat 15px 8px;
        &:hover, &.active{
          background:#fff url(/static/images/navigation/promotion1.png)no-repeat 15px 8px; color:#333;
        }
      }
      &.logistics{
        background: url(/static/images/navigation/logistics.png)no-repeat 15px 8px;
        &:hover, &.active{
          background:#fff url(/static/images/navigation/logistics1.png)no-repeat 15px 8px; color:#333;
        }
      }
      &.statistics{
        background: url(/static/images/navigation/statistics.png)no-repeat 15px 8px;
        &:hover, &.active{
          background:#fff url(/static/images/navigation/statistics1.png)no-repeat 15px 8px; color:#333;
        }
      }
      &.asset{
        background: url(/static/images/navigation/asset.png)no-repeat 15px 8px;
        &:hover, &.active{
          background:#fff url(/static/images/navigation/asset1.png)no-repeat 15px 8px; color:#333;
        }
      }
      &.setUp{
        background: url(/static/images/navigation/setUp.png)no-repeat 15px 8px;
        &:hover, &.active{
          background:#fff url(/static/images/navigation/setUp1.png)no-repeat 15px 8px; color:#333;
        }
      }
      }
    }
    
  }
  .menu{
    position: fixed;
    top:0;
    left:100px;
    width:125px;
    height:100vh;
    border-right: 1px solid #E6E6E6;
    font-size: 14px;
    .title{
      color: #333333;
      height: 55px;
      line-height:55px;
      text-align: center;
      border-bottom: 1px solid #E6E6E6;
    }
    ul{
      padding: 0 12px;
      li a{
         width:100px;
         height: 38px;
         display: inline-block;
         text-align: center;
         line-height:38px;
         margin-top: 18px;
         cursor: pointer;
          color:#787878;
         &:hover,&.router-link-active{
          background: #E7F1F8;
          border-radius: 5px;
         color: #333333;
         
         }
      }
    }
  }
.sign_out{
  height: 56px;
  background:rgba(255,255,255,.1);
  line-height:56px;
  text-align: center;
  width: 100px;
  font-size: 14px;
  color: #FFFFFF;
  // cursor:pointer;
  position: absolute;
  left:0;
  bottom:0;

  .sign_lr{
    position: absolute;
    width:162px;
    height: 115px;
    background: #FFFFFF;
    box-shadow: 0 2px 7px 0 rgba(0,0,0,0.28);
    border-radius: 2px;
    color: #787878;
    top:-125px;
    left:10px;
    &:after{
      content:'';
      border-width: 7px;  
      border-color: #FFFFFF;  
      border-bottom-width: 0;  
      border-style: dashed;  
      border-top-style: solid;  
      border-left-color: transparent;  
      border-right-color: transparent;
      position: absolute;
      left:23px;
      bottom:-7px;
    }
    .title{
      background: #F8F8F8;
      height: 50px;
      padding:0 10px 0 20px;
      line-height:50px;
      color:#333;
      font-size:14px;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .sign_btn{
      text-align:left;
      padding-left:20px;
    }

  }


}
 .btn_out{
  border:none;
  background:none;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
 }

 /*重置的样式*/
 .el-dropdown-menu__item{
  padding:0;
 }
 .el-button{
  background:none;
  font-size: 14px;
  color: #787878;
  border:none;
  padding:0;
 }
</style>

