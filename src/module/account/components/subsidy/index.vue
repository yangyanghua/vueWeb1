<template>
  <div class="main">
     <!--面包屑-->
    <div class="crumbs">
      分期设置
    </div>
     <!-- / 面包屑--> 
    <div class="subject">
    <div class="subsidy">
          <i class="el-icon-warning"></i>店铺免息设置全店生效，按照每笔交易成功订单金额收取一定比例手续费，商品金额大于等于500元，才可以使用分期购
    </div>
      <div class="filter_query management">

        <el-button type="primary" size="medium" icon="el-icon-edit-outline" class="editAccountBtn" @click="editDetail()">编辑</el-button>
         <el-tabs v-model="couponName" @tab-click="handlemenu">
          <el-tab-pane label="店铺贴息" name="N"></el-tab-pane>
          <!-- <el-tab-pane label="单品贴息" name="Y"></el-tab-pane> -->
        </el-tabs>
        
        <el-form :model="ruleForm2" ref="ruleForm2" label-position="left" label-width="50px" class="demo-ruleForm login-container" style="padding: 10px 20px;">
            <el-form-item label="3期">
              <el-radio-group disabled v-model="ruleForm2.three">
                <el-radio :label="0">不付息(0费率)</el-radio>
                <el-radio :label="1">商家付息(费率2%)</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="6期">
              <el-radio-group disabled v-model="ruleForm2.six">
                <el-radio :label="0">不付息(0费率)</el-radio>
                <el-radio :label="1">商家付息(费率3%)</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="12期">
              <el-radio-group disabled v-model="ruleForm2.twelve">
                <el-radio :label="0">不付息(0费率)</el-radio>
                <el-radio :label="1">商家付息(费率4%)</el-radio>
              </el-radio-group>
            </el-form-item>
            
              <!-- <el-form-item label="3期">
                <el-radio disabled v-model="ruleForm2.three" label="0">不贴息(0费率)</el-radio>
                <el-radio disabled v-model="ruleForm2.three" label="1">费率1.5%  </el-radio>
              </el-form-item>
              <el-form-item label="6期">
                <el-radio disabled v-model="ruleForm2.six" label="0">不贴息(0费率)</el-radio>
                <el-radio disabled v-model="ruleForm2.six" label="1">费率2%  </el-radio>
              </el-form-item>
              <el-form-item label="12期">
                <el-radio disabled v-model="ruleForm2.twelve" label="0">不贴息(0费率)</el-radio>
                <el-radio disabled v-model="ruleForm2.twelve" label="1">费率4%  </el-radio>
              </el-form-item> -->
                  
            </el-form>
      </div>
    </div>
    
  </div>
</template>
<script>
  import * as Service from '@/common/service/account/index.js';
  export default {
    data() { 
      return {
        couponName:'N',
        ruleForm2: {
          three: '0',
          six:'0',
          twelve:'0'
        },

        
      };
    },
    methods: {
      /*返回上一步*/
      hanldebaek(){ 
        history.go(-1);
      },
       //tab切换
      handlemenu() {
        console.log('切换',this.couponName)
        this.getList();
      },
       editDetail(id) {
        this.$router.push({
          path: '/account/subsidy_detail',
          query: {type: this.couponName}
        })
      },
      /*返回给后端的数据*/

      getList(){
        // alert(1111);
        // let params = {
        //   type:this.couponName
        // };
        Service.subsidyGet().then(res => {
          console.log('get list ',res);
          this.ruleForm2 = res || {};
        }).catch(res => {
            this.$message.error(res.message);
        })
      }
    },
     mounted(){
      this.getList();
    }
  }
</script>
<style lang="scss" scoped>
  .management{
    padding:20px;
  }
  .el-tabs__item{
    width:100px;
  }
  .el-form-item{
    margin-bottom:10px;
  }
  .editAccountBtn{
    position: absolute;
    right: 20px;
    top: 14px;
    z-index:999;
  }
  .subsidy{
    height: 50px;
    line-height:50px;
    background:#e2f1fa;
    margin-top: 20px;
    padding-left:20px;
    color:#4DA9E4;
    i{
      margin-right:10px;
    }
  }
  .el-radio + .el-radio{
    margin-left: 100px;
  }
</style>
