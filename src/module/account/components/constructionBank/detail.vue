<template>
  <div class="main">
     <!--面包屑-->
    <div class="crumbs">
      建行支付编辑
    </div>
     <!-- / 面包屑--> 
    <div class="subject">
      <div class="filter_query mat20 management">
         <el-tabs v-model="couponName" @tab-click="handlemenu">
          <el-tab-pane label="不贴息  " name="N"></el-tab-pane>
          <el-tab-pane label="贴息" name="Y"></el-tab-pane>
        </el-tabs>
       <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="right" label-width="130px" class="demo-ruleForm login-container" style="padding: 10px 20px;">
              <el-form-item prop="merchantId" label="商户编码：" >
                <el-input v-model="ruleForm2.merchantId" style="border-radius:0 ;" auto-complete="off" placeholder="请输入商户编码"></el-input>
              </el-form-item>
              <el-form-item prop="branchId" label="分行代码：">
                <el-input v-model="ruleForm2.branchId" auto-complete="off" placeholder="请输入分行代码"></el-input>
              </el-form-item>
              <el-form-item prop="posId" label="柜台编号：">
                <el-input v-model="ruleForm2.posId" auto-complete="off" placeholder="请输入柜台编号"></el-input>
              </el-form-item> 
               <el-form-item prop="publicKey" label="公钥：">
                <el-input v-model="ruleForm2.publicKey" auto-complete="off" placeholder="请输入公钥"></el-input>
              </el-form-item>       
              <el-form-item prop="operator" label="操作员：">
                <el-input v-model="ruleForm2.operator" auto-complete="off" placeholder="请输入操作员"></el-input>
              </el-form-item> 
              <el-form-item prop="phone" label="操作员手机号：">
                <el-input v-model="ruleForm2.phone" auto-complete="off" placeholder="请输入操作员手机号"></el-input>
              </el-form-item> 
              <el-form-item prop="password" label="登录密码：" required>
                <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="请输入登录密码"></el-input>
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
          merchantId: '',
          branchId: '',
          posId:'',
          publicKey:'',
          operator:'',
          phone:'',
          password:''
        },

        rules2: {
          merchantId: [
            { required: true, message: '请输入商户编码', trigger: 'blur' },
            { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur' }
          ],
          branchId: [
            { required: true, message: '请输入分行代码', trigger: 'blur' },
            { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur' }
          ],
          posId: [
            { required: true, message: '请输入柜台编号', trigger: 'blur' },
            { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur' }
          ],
          publicKey: [
            { required: true, message: '请输入公钥', trigger: 'blur' },
            // { min: 1, max: 512, message: '长度在 1 到 512 个字符', trigger: 'blur' }
          ],
           operator: [
            { required: true, message: '请输入操作员', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }

          ],
          phone: [
            { required: true, message: '请输入操作员手机号', trigger: 'blur' },
            { validator: validatePhone, trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入登录密码', trigger: 'blur' },
            { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur' }
          ],
        }
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
         
        Service.ccbEdit(Object.assign({},this.ruleForm2,{type:this.couponName})).then((res) => {

           _this.logining = false; 
            this.$message({
                type: 'success',
                message: '修改成功'
              });
            this.$router.push({
                  path: '/account/constructionBank'
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
        if(type){
        this.couponName = type;
        }
         let params = {
          type:this.couponName
        };
        Service.ccbGet(params).then((res) => {
              console.log('get list ',res);
              this.ruleForm2 = res||{};
              this.$refs['ruleForm2'].resetFields();
              
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
</style>
