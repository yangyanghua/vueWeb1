<template>
  <div class="com-wrapper">
 <header-box :username="username">
        </header-box>
  <div class="com-page">
    <nav-section :navData="navData">
    </nav-section>
    <div class="com-mainSection">
  
      <router-view v-if="canMounted">
      </router-view> 
    </div>
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
        canMounted: false,
        navData: {
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
        this.canMounted = true;
      })
    }
  };

</script>
<style lang="scss">
  @import '../../assets/css/basic.scss';

</style>
