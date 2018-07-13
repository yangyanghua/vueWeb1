<template>
	<div class="main">
		<!--面包屑-->
	    <div class="crumbs">
	      店铺资料编辑
	    </div>
	    <!-- / 面包屑-->
			    
		<div class="subject">
			<div class="filter_query mat20">
				<el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" style="padding:20px;">
				  <el-form-item label="店铺名称："  prop="name">
				     <el-input v-model="ruleForm.name" :maxlength="20" style="width: 50%;"></el-input>
				  </el-form-item>
				  <el-form-item label="店铺logo："  prop="logoUrl"  >
					<el-upload
					  class="avatar-uploader"
					  action=""
					  :show-file-list="false"
					  :before-upload="beforeAvatarUploadLogo">
					  <img v-if="ruleForm.logoUrl" :src="ruleForm.logoUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				    
				  </el-form-item>	
				  <el-form-item label="店铺大图：" prop="maxImage" >
				    
				    <div class="bigImg">
				    <el-upload
					  class="avatar-uploader"
					  action=""
					  :show-file-list="false"
					  :before-upload="beforeAvatarUploadMax">
					  <img v-if="ruleForm.maxImage" :src="ruleForm.maxImage" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>	
				    </div>
				  </el-form-item>
				  <el-form-item label="国家：" prop="country" >
				    <el-input v-model="ruleForm.country" style="width: 50%;"></el-input>
				  </el-form-item>	  
				  <el-form-item label="服务电话：" prop="servicePhone">
				    <el-input v-model="ruleForm.servicePhone" :maxlength="20" style="width: 50%;"></el-input>
				  </el-form-item>		  
				  <el-form-item label="店铺故事：" prop="story">
				    <el-input v-model="ruleForm.story"  type="textarea" :rows="4"style="width: 50%;"></el-input>
				  </el-form-item>
					  <el-form-item>
					    <el-button type="primary" size="medium"  @click="submitForm('ruleForm')">保存</el-button>
					    <el-button size="medium"  @click="$router.push({path:'/store/info'})">返回</el-button>
					  </el-form-item>	  
				</el-form>
			</div>
		</div>

	</div>
</template>

<script>
import {getUploadImgSrc} from '@/common/js/service.js';

import {storeSave,storeInfo} from '../../service.js';



  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          logoUrl: '',
          maxImage: '',
          country: '',
          servicePhone: '',
          story: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入店铺名称', trigger: 'blur' },
            // { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ],
          logoUrl: [
            { required: true, message: '请上传店铺logo', trigger: 'blur' }
          ],
          maxImage: [
            { required: true, message: '请上传店铺大图', trigger: 'blur' }
          ],          
          country: [
            { required: true, message: '请输入店铺所属国家', trigger: 'blur' }
          ],            
          servicePhone: [
            { required: true, message: '请输入店铺服务电话', trigger: 'blur' },
            // { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],          
          story: [
            { required: true, message: '请输入店铺故事', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {

      beforeAvatarUploadLogo(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 3;

        if (!isLt3M) {
          this.$message.error('上传图片不可大于3M，请重新选择上传!');
          return false;
        }
		 getUploadImgSrc(file).then((res) => {
						this.ruleForm.logoUrl = res;
					}).catch((res) => {
						console.log('error ', res);
						this.$message({
							type: 'error',
							message: res.message
						});	 
			})          
      },
      beforeAvatarUploadMax(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt3M = file.size / 1024 / 1024 < 3;

        if (!isLt3M) {
          this.$message.error('上传图片不可大于3M，请重新选择上传!');
          return false;
        }
		 getUploadImgSrc(file).then((res) => {
						this.ruleForm.maxImage = res;
					}).catch((res) => {
						console.log('error ', res);
						this.$message({
							type: 'error',
							message: res.message
						});	 
			})   
		return false;	
      },      
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
         
		 storeSave(this.ruleForm).then((res) => {
						this.$message({
							type: 'success',
							message: '保存成功！'
						});	
						console.log();
						this.$router.push({
							path:'/store/info'
						});
					}).catch((res) => {
						console.log('error ', res);
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
			_storeInfo(){
		 		storeInfo().then((res) => {
			        this.ruleForm = {
			          name: res.store.name,
			          logoUrl: res.store.logoUrlPath == "" ? res.store.logoUrl : res.store.logoUrlPath,
			          maxImage: res.store.maxImagePath == "" ? res.store.maxImage : res.store.maxImagePath,
			          country: res.storeTemplate!= null && res.storeTemplate.country != null ? res.storeTemplate.country : "",
			          servicePhone: res.storeTemplate!= null && res.storeTemplate.servicePhone != null ? res.storeTemplate.servicePhone : "",
			          story: res.storeTemplate!= null && res.storeTemplate.story != null ? res.storeTemplate.story : "",
			        }
			        //老数据该字段是富文本，要处理一下。
					this.ruleForm.story = this.ruleForm.story.replace(/<\/?[^>]*>/g,''); //去除HTML tag	
					
					}).catch((res) => {
						console.log('error ', res);
						this.$message({
							type: 'warning',
							message: res.message
						});	 
			})  		
	}      
    },mounted(){
   	this._storeInfo();

    }
  }
</script>

<style lang="scss" scoped>
	.BreadCrumbs{
		height: 30px;
		line-height: 30px;
	}
	.infoContent{
		width: 100%;
		box-sizing: border-box;
		padding: 30px 50px;
		position: relative;
		background: white;
		border: 1px solid gainsboro;
	}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
  .bigImg{
  	.avatar-uploader{
    width: 320px;
    height: 140px;
    line-height: 140px;   		
  	}
  	.avatar-uploader-icon {
    width: 320px;
    height: 140px;
    line-height: 140px; 		
  	}
   .avatar {
    width: 320px;
    height: 140px;
  } 	
  }
</style>