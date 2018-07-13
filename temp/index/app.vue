<template>
  <div class="com-page">
    <nav-section :navData="navData">
    </nav-section>
    <div class="com-mainSection">
      <header-box :username="username">
      </header-box>
      <!-- <router-view>
      </router-view> -->
    </div>
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
        navData: {
        firstLevelId: 111112, //当前页面的一级菜单ID
        secondLevelId: 111113,//当前页面的二级菜单ID
        navList: []
        }
      };
    },
    components: {
      navSection,
      headerBox
    },
    mounted(){
      getNavList().then(res => {
        this.navData.navList = res.navList;
        this.username = res.userName;
      })
    }
  };

</script>
<style lang="scss">
  @import '../../assets/css/basic.scss';

</style>
