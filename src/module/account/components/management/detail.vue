<template>
	<div class="main">
		 <!--面包屑-->
		    <div class="crumbs">
		      <el-breadcrumb-item>{{ editStatus?'编辑':'新增' }}账号</el-breadcrumb-item>
		    </div>
	     <!-- / 面包屑--> 
	     <div class="subject">
	     	<div class="filter_query mat20">
	    	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" style="padding:20px;">
          		<el-form-item label="账号名称" required prop="loginName">
	            	 <el-input v-model="ruleForm.loginName" placeholder=""></el-input>
	                
          		</el-form-item>	

				<el-form-item label="真实姓名" prop="realName"  required>
	            	 <el-input v-model="ruleForm.realName" placeholder=""></el-input>
	                
          		</el-form-item>
          		<el-form-item label="手机号码" prop="telephone" required>
	            	 <el-input v-model="ruleForm.telephone" placeholder=""></el-input>
          		</el-form-item>

          		<el-form-item label="登录密码" prop="password" auto-complete="off" required>
	            	 <el-input type="password" v-model="ruleForm.password" placeholder=""></el-input>
	                 
          		</el-form-item> 
				<el-form-item label="确认密码" prop="againPasswd" auto-complete="off">
	            	 <el-input type="password" v-model="ruleForm.againPasswd" placeholder=""></el-input>
	                 
          		</el-form-item>
          		<!-- <el-form-item label="上传头像"  prop="headPicUrl"  required>
					<el-upload
					  class="avatar-uploader"
					  action=""
					  :show-file-list="false"
					  :before-upload="beforeAvatarUploadLogo">
					  <img v-if="ruleForm.headPicUrl" :src="ruleForm.headPicUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				    
				  </el-form-item>	 -->
				<el-form-item label="账号描述" prop="description">
	            	 <el-input v-model="ruleForm.description" placeholder="" type="textarea"></el-input>
	                
          		</el-form-item>	
				
				<el-form-item>
		            <el-button type="primary" size="medium" @click="addForm('ruleForm')">保存</el-button>
		            <el-button size="medium" @click="$router.go(-1)">取消</el-button>
		        </el-form-item>	
	    	</el-form>
	    </div>
	     </div>
	    
	</div>

</template>
<script>
import * as Service from '@/common/service/account/index.js';
import {getUploadImgSrc} from '@/common/js/service.js'; /*上传图片组件*/
	export default {
		data () {
			/*验证特殊字符*/
			var validateSpecial = (rule, value, callback) => {
			var pattern = new RegExp("[`~!@#$%^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）+—_——|{}【】‘；：”“'。，、？]")        	
				 if((pattern.test(value))){
			 		callback(new Error('内容不能包含特殊字符'));
				 } else{
				 	callback();
				 }
		    }; 
		    /*验证手机号码*/
		    var validatePhone = (rule, value, callback) => {
				 if(!(/^1[3|4|5|8|7][0-9]\d{8}$/.test(value))){
			 			callback(new Error('请输入有效的手机号码'));
				 } else{
				 	callback();
				 }
		    };
		    /*确认密码*/
		    var validatePass2 = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请再次输入密码'));
		        } else if (value != this.ruleForm.password) {
		          callback(new Error('两次输入密码不一致!'));
		        } else {
		          callback();
		        }
	        };  
			return{
				editStatus: false,
				addMsg:'新增成功!',
				ruleForm: {
		          loginName:'',
		          realName:'',
		          telephone:'',
		          password: '',
		          againPasswd:'',
		          editId:'',
		          // headPicUrl:'',
		          description:''
		        },
		       
		        rules: {
		          loginName: [
		            { required: true, message: '请输入账号', maxlength:'20', trigger: 'blur' },
		            { validator: validateSpecial, trigger: 'blur' },
		            // { validator: validateAccount, trigger: 'blur' }
		          ],
		          realName: [
		            { required: true, message: '真实名称', trigger: 'blur' },
		            { validator: validateSpecial, trigger: 'blur' }
		          ],
		          telephone: [
		            { required: true, message: '请输入手机号', trigger: 'blur' },
		            { validator: validatePhone, trigger: 'blur' }
		          ],
		          password: [
		            { required: true, message: '请输入登录密码',maxlength:'20', trigger: 'blur' },

		          ],
		          // headPicUrl: [
		          //   { required: true, message: '请上传头像', trigger: 'blur' }
		          // ], 
		          againPasswd: [
		          {
		            validator: validatePass2,
		            required: true,
		            trigger: 'blur'
		          }]
		        }

			};
    
		},
		methods: {
			 /*上传图片方法*/
		  //     beforeAvatarUploadLogo(file) {
		  //       const isJPG = file.type === 'image/jpeg';
		  //       const isPNG = file.type === 'image/png';
		  //       const isLt2M = file.size / 1024 / 1024 < 2;


		  //       if (!isJPG&&!isPNG) {
		  //         this.$message.error('上传头像图片只能是 JPG 格式!');
		  //         return false
		  //       }
		  //       if (!isLt2M) {
		  //         this.$message.error('上传头像图片大小不能超过 2MB!');
		  //         return false;
		  //       }
				// getUploadImgSrc(file).then((res) => {
				// 	console.log('headPicUrl'+ res);
				// 	this.ruleForm.headPicUrl = res;
				// }).catch((res) => {
				// 	console.log('error ', res);
				// 	this.$message({
				// 		type: 'error',
				// 		message: res.message
				// 	});	 
				// })          
		  //     },
			/*新增点保存的方法*/
	        addForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
			   		if(this.ruleForm.password.indexOf('*****')!=-1){  /*如果提交时，密码的值包含*****，则赋值null*/
			   			this.ruleForm.password=null;
			   		}
			   		/*向后端请求数据 （成功）*/         	
				   Service.managementSave(this.ruleForm).then((res) => { /*新增修改接口*/
			          this.$message({
			            type: 'success',
			            message: this.addMsg    /*提示新增成功*/
			         		 });
			          	this.$router.push('/account/management');
			          	this.ruleForm.password = this.ruleForm.againPasswd;  /**/
			         	
				 })
				   /*向后端请求数据 （失败）*/	
				   .catch((res) => {
				 		this.ruleForm.password = this.ruleForm.againPasswd;
							this.$message({
								type: 'error',
								message: res.message
							});
					}) 
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		    },

		},
		mounted(){
			/*回显编辑内容*/
			let vm = this;
			if(this.$route.query.id){
				this.editStatus = true;
				this.ruleForm.editId = this.$route.query.id;
				/*从后端拿*/
				Service.managementFind({  /*查询指定ID接口*/
		            id: this.ruleForm.editId
		         }).then(res =>{
		         	console.log(res);
		         	this.ruleForm = res;  
		         	this.ruleForm.againPasswd = res.password;/*从后台拿密码给前台确认密码*/
		         	this.addMsg='编辑成功!';    /*提示新增成功*/
		         }).catch((res) => {
				 	this.ruleForm.pwd='*******';
						this.$message({
							type: 'error',
							message: res.message
						});
					}) 

			}
		}	
	}
</script>
<style lang="scss" scoped>
	.input_180{
		width:197px;
	}
	
</style>

