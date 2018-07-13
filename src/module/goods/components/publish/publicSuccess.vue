<template>
  <div class="main">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to='/goods/list'>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>完善溯源信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <p class="success-tip">
      <i class="el-icon-success icon-success"></i>
      <span class="text">恭喜！商品已成功发布。</span>
    </p>

    <div class="btn-group">
      <el-button class="block-btn" type="primary" @click="goToPublish">继续发布商品</el-button>
      <br>
      <el-button type="text" @click="goToSource">编辑溯源信息</el-button>
    </div>
  </div>

</template>
<script>
    export default {
        data(){
            return {

            }
        },
        methods: {
            goToPublish(){
                this.$router.push({
                    path: '/goods/publish',
                })
            },
            goToSource(){
                    this.$router.push({
                    path: '/goods/source',
                    query: {
                        id: this.$route.query.id
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
  .success-tip {
    font-size: 24px;
    text-align: center;
    margin: 60px 30px;
    line-height: 68px;
    .text {
      display: inline-block;
      vertical-align: middle;
      margin-left: 20px;
    }
  }

  .icon-success {
    color: #67c23a;
    font-size: 68px;
    vertical-align: middle;

  }

  .btn-group {
    text-align: center;
    margin-bottom: 80px;
    display: block;
    .block-btn {

      margin-bottom: 15px;
      text-align: center;
    }
  }

</style>
