<template>
  <div class="main">
     <!--面包屑-->
    <div class="crumbs">
      修改密码
    </div>
     <!-- / 面包屑--> 
    <div class="subject">
      <div class="filter_query mat20">
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="90px" class="demo-ruleForm login-container" style="padding:20px;">
          <el-form-item prop="oldPassword" label="原密码" >
            <el-input type="password" v-model="ruleForm2.oldPassword" style="border-radius:0 ;" auto-complete="off" placeholder="请输入原密码"></el-input>
          </el-form-item>
          <el-form-item prop="newPassword" label="新密码">
            <el-input type="password" v-model="ruleForm2.newPassword" auto-complete="off" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item prop="againNewPassword" label="确认密码">
            <el-input type="password" v-model="ruleForm2.againNewPassword" auto-complete="off" placeholder="确认密码"></el-input>
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
      /*验证输入两次密码是不是一样*/
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value != this.ruleForm2.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };          
      return {
        logining: false,
        ruleForm2: {
          newPassword: '',
          oldPassword: '',
          againNewPassword:''
        },

        rules2: {
          oldPassword: [
            { required: true, message: '请输入原密码', trigger: 'blur' }
          ],
          newPassword: [
            { required: true, message: '请输入新密码', trigger: 'blur' }
          ],
          againNewPassword: [{
            validator: validatePass2,
            required: true,
            trigger: 'blur'
          }]     
        }
      };
    },

    methods: {
      /*返回上一步*/
      hanldebaek(){
        history.go(-1);
      },
      /*确认事件方法*/
      handleSubmit2() {   //提交表单
        var _this = this;
        _this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
              _this.logining = true;
                console.log(this.ruleForm2);
          //调用后台接口修改密码，成功后保存用户user到localStorage中
        Service.passwordUpdate(this.ruleForm2).then((res) => {
		        localStorage.setItem('user', JSON.stringify(res));
		        // localStorage.setItem('timeOut', new Date().getTime()+60*1000);
					_this.logining = false;	
	          this.$message({
	              type: 'success',
	              message: '修改成功'
	            });
	          setTimeout(()=>{
	             _this.$router.push({ path: '/index'});
	          },1500) 
          
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
      }
    }

  }

</script>
<style lang="scss" scoped>
  
</style>
