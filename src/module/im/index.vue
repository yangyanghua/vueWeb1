<template>
  <div>
    <im-user></im-user>
   <div class="im-main">
     <router-view/>
   </div>
  </div>
</template>
<script>
import imUser from '@/components/imUser/index.vue';
  export default {
    data() {
      return {

      }
    },
    components: {
      imUser
    },
    methods: {
      login() {
       
      }
    },
    mounted() {

      // this.login();
    }
  }

</script>
<style lang="scss" scoped>
.im-main{
  // margin-left: 100px;
  position: absolute;
  left: 100px;
  height: 100vh;
}
  
</style>
