<template>
  <div class="com-wrapper">

  <div class="com-page">
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
	.com-page{
		width: 100%;
		overflow: hidden;
	}
	.com-mainSection{
		width: 100%;
		overflow: hidden;
	}
</style>
