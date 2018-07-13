<template>
  <div class="main">
     <!--面包屑-->
    <div class="crumbs">
      柜台信息
    </div>
     <!-- / 面包屑--> 
    <div class="subject">
    <div class="subsidy">
          <i class="el-icon-warning"></i>商家需前往建行柜台开通贴息账套，才可以提供免息服务。
    </div>
      <div class="filter_query management">
        <!-- <div class="constru_left">
          1
        </div>
        <div class="constru_right">
          2
        </div> -->
        <el-button type="primary" size="medium" icon="el-icon-edit-outline" class="editAccountBtn" @click="editDetail()">编辑</el-button>
         <el-tabs v-model="couponName" @tab-click="handlemenu">
          <el-tab-pane label="普通柜台" name="N"></el-tab-pane>
          <el-tab-pane label="商家付息" name="Y"></el-tab-pane>
        </el-tabs>
        <el-form :model="ruleForm2" ref="ruleForm2" label-position="right" label-width="120px" class="demo-ruleForm login-container" style="padding: 10px 20px;">
              <el-form-item label="商户编码：">
                {{ruleForm2.merchantId}}
              </el-form-item>
              <el-form-item  label="分行代码：">
                {{ruleForm2.branchId}}
              </el-form-item>
              <el-form-item  label="柜台编号：">
                 {{ruleForm2.posId}}
              </el-form-item> 
               <el-form-item label="公钥：">
                <p class="hh_wrok">{{ruleForm2.publicKey}}</p>
              </el-form-item>       
              <el-form-item label="操作员：">
                {{ruleForm2.operator}}
              </el-form-item> 
              <el-form-item label="操作员手机号：">
                {{ruleForm2.phone}}
              </el-form-item> 
              <el-form-item label="登录密码：">
                {{ruleForm2.password}}
              </el-form-item>       
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
          merchantId: '',
          branchId: '',
          posId:'',
          publicKey:'',
          operator:'',
          phone:'',
          password:''
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
          path: '/account/constructionBank_detail',
          query: {type: this.couponName}
        })
      },
      /*返回给后端的数据*/

      getList(){
        // alert(1111);
        let params = {
          type:this.couponName
        };
        Service.ccbGet(params).then(res => {
          console.log('get list ',res);
          this.ruleForm2 = res || {};
        }).catch(res => {
            this.$message.error(res.message);
        })
      },
      checkfenqi(){
        Service.subsidyGet().then(res => {
          if(!res){
			        this.$alert('请先完善分期信息', '提示', {
			          confirmButtonText: '确定',
			          callback: action => {
						        this.$router.push({
						          path: '/account/subsidy',
						          query: {type: this.couponName}
						        })										
			          }
			        });          	
          }
         
          
        }).catch(res => {
            this.$message.error(res.message);
        })
      }      
      
      
      
      
    },
     mounted(){
      this.getList();
      this.checkfenqi();
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
  .hh_wrok{
    word-wrap:break-word;
  }
</style>
