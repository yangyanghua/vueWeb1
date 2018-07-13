<template>
  <div class="main">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to='/goods/list'>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>预览扫码溯源信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="previewPage">
      <iframe scrolling="no" id="prev" name="prev" frameborder="0"  :src="url" style="min-height:600px;width:100%;height:100%;"></iframe>  

    </div>
  <div class="btn-group">
      <el-button @click="closePreview" class="close-btn" round type="primary" plain>关闭</el-button>
  </div>    
    <div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      url: ''
    }
  },
  methods: {
    closePreview(){
      history.go(-1);
    }
  },
  mounted() {
    //判断页面是否在移动端打开
    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
     // window.location.href = "http://tapp-wap.z-code.cn:8383/product.html?code=1090133530259008";
     window.location.href = this.$route.query.url;
    } else {
      this.url = this.$route.query.url;
    }
  }
}
</script>
  <style lang="scss" scoped>
  .main{
  	background: #FFFFFF;
  }
    .previewPage{
      width:400px; margin:0 auto;
      background: url(/static/images/sj_dj.jpg) no-repeat;
      height:800px;
      padding:58px 26px;
    }
    .close-btn{
      margin-top: 30px;
      
    }
    .btn-group{
      text-align: center
    }
  </style>