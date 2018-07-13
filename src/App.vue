<template>
  <div class="com-wrapper" >
     <template>
<!--  <header-box :username="username">
        </header-box> -->
  <div class="com-page">
    <nav-section :navData="navData" v-if="canMounted && hasNav">
    </nav-section>
    <div class="com-mainSection">
      <router-view v-if="canMounted">
      </router-view> 
    </div>
  </div>
  </template>
   <!--<router-view v-if="!hasNav">
      </router-view> -->
  </div>
</template>

<script>
  import navSection from '@/components/navSection/index.vue';
  import headerBox from '@/components/headerBox/index.vue';
  import {getNavList} from '@/common/js/service.js';
  export default {
    data() {
      return {
        username: '',
        canMounted: false,
        hasNav: false,
        navData: {
        navList: [],
        navLevelFirst: 1,
        navLevelFirstIndex: 0,
        navLevelSecond: 11,
        completeName: ''
        }
      };
    },
    watch: {
      '$route':function(val){
        this.initNav(val);
      }
    },
    methods: {
      initNav(val){
      	 let isJoin = val.path.indexOf('join')!=-1
         // 增加闪聊，不需要nav
         if(val.path=='/login'|| isJoin || val.path=='/im/message' || val.path=='/im/set'){
          this.hasNav = false;
        } else {
          this.hasNav = true;
         let navInfo = this.navData.navList.find((x,index)=>{
           if(!x){
             return false;
           }
           let hasMatch = x.child.find(y=>{
            //  console.log('child ', y.link, val.path);
             return (val.path).match(y.link)
           });
            // console.log('catch ', hasMatch )
           if(hasMatch){
            
              this.navData.navLevelFirst = hasMatch.pid;
             this.navData.navLevelSecond = hasMatch.id;
             this.navData.navLevelFirstIndex = index;
             return true;
           }
            return false;
          });
          if(navInfo){
             this.navData.completeName = navInfo.completeName;
            
          }
         
          // console.log('navInfo ', this.navData);
          
          // this.navLevelSecond = navInfo.child;
        }
      }
    },
    computed: {

    },
    components: {
      navSection,
      headerBox
    },
    mounted(){
      let isLogin =this.$router.currentRoute.path==='/login'?true: false;
      let isJoin = this.$router.currentRoute.path.indexOf('join')!=-1
      // console.log(isLogin,this.$router);
      if(isLogin||isJoin){
        this.hasNav = false;
      }else{
      	this.hasNav = true;
      }
      getNavList().then(res => {
        // console.log('res返回值：',res);
        this.navData.navList = res.navList;
        this.username = res.userName;
          //  console.log('this route ', this.$route);
      this.initNav(this.$route);
        this.canMounted = true;
      });
   
    }
};

</script>
<style lang="scss">
  @import './assets/css/basic.scss';
// @import './index.scss';
</style>
