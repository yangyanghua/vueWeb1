<template>
  <div class="main">
     <!--面包屑-->
    <div class="crumbs">
      分期设置编辑
    </div>
     <!-- / 面包屑--> 
    <div class="subject">

      <div class="subsidy">
          <i class="el-icon-warning"></i>店铺免息设置全店生效，按照每笔交易成功订单金额收取一定比例手续费，商品金额大于等于500元，才可以使用分期购
      </div>

      <div class="filter_query management">
         <el-tabs v-model="couponName" @tab-click="handlemenu">
          <el-tab-pane label="店铺贴息" name="N"></el-tab-pane>
          <!-- <el-tab-pane label="单品贴息" name="Y"></el-tab-pane> -->
        </el-tabs>
     <!-- :rules="rules2" -->  <el-form :model="ruleForm2"  ref="ruleForm2" label-position="right" label-width="120px" class="demo-ruleForm login-container" style="padding: 10px 20px;">
              <el-form-item label="3期">
              <el-radio-group v-model="ruleForm2.three">
                 <el-radio :label="0">不付息(0费率)</el-radio>
                <el-radio :label="1">商家付息(费率2%)</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="6期">
              <el-radio-group v-model="ruleForm2.six">
                <el-radio :label="0">不付息(0费率)</el-radio>
                <el-radio :label="1">商家付息(费率3%)</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="12期">
              <el-radio-group v-model="ruleForm2.twelve">
                <el-radio :label="0">不付息(0费率)</el-radio>
                <el-radio :label="1">商家付息(费率4%)</el-radio>
              </el-radio-group>
            </el-form-item>
              <el-form-item >
                <el-button size="medium"  @click="hanldebaek">返回</el-button>
                <el-button size="medium" type="primary"  @click.native.prevent="handleSubmit2" :loading="logining" >确定</el-button>                 
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
      /*验证手机号码*/
       var validatePhone = (rule, value, callback) => {
         if(!(/^1[3|4|5|8|7][0-9]\d{8}$/.test(value))){
            callback(new Error('请输入有效的手机号码'));
         } else{
          callback();
         }
        };         
      return {
        logining: false,
        couponName: 'N',
        ruleForm2: {
          three: '0',
          six: '0',
          twelve:'0'
        },

        // rules2: {
        //   merchantId: [
        //     { required: true, message: '请输入商户编码', trigger: 'blur' }
        //   ],
        //   branchId: [
        //     { required: true, message: '请输入分行代码', trigger: 'blur' }
        //   ],
        //   posId: [
        //     { required: true, message: '请输入柜台编号', trigger: 'blur' }
        //   ],
        //   publicKey: [
        //     { required: true, message: '请输入公钥', trigger: 'blur' }
        //   ],
        //    operator: [
        //     { required: true, message: '请输入操作员', trigger: 'blur' },
        //     { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }

        //   ],
        //   phone: [
        //     { required: true, message: '请输入操作员手机号', trigger: 'blur' },
        //     { validator: validatePhone, trigger: 'blur' }
        //   ],
        //   password: [
        //     { required: true, message: '请输入登录密码', trigger: 'blur' }
        //   ],
        // }
      };
    },

    methods: {
      /*返回上一步*/
      hanldebaek(){
        history.go(-1);
      },
       //tab切换
      handlemenu() {
        console.log('切换',status)
        this.entinfo();
      },
      /*确认事件方法*/
      handleSubmit2() {   //提交表单
        var _this = this;
        _this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
              _this.logining = true;
                console.log(this.ruleForm2);
         
        Service.subsidyEdit(Object.assign({},this.ruleForm2)).then((res) => {

           _this.logining = false; 
            this.$message({
                type: 'success',
                message: '修改成功'
              });
            this.$router.push({
                  path: '/account/subsidy'
                })    
          
          }).catch((res) => {
            this.$message({
              type: 'error',
              message: res.message
            });
           _this.logining = false;
            })
         } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      /*回显数据*/
      entinfo(type){
        // if(type){
        // this.couponName = type;
        // }
        //  let params = {
        //   type:this.couponName
        // };
        Service.subsidyGet().then((res) => {
              console.log('get list ',res);
              this.ruleForm2 = res||{};
              // this.$refs['ruleForm2'].resetFields();
              
          }).catch((res) => {
            console.log('error ', res);
            this.$message({
              type: 'error',
              message: res.message
            });  
      })      
    },
    },
    mounted(){
      /*初使化数据*/
      this.entinfo(this.$route.query.type);
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
