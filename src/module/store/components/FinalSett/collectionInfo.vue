<template>
	
	<section class="content orderc" style="background: none;">
<div class="infoContent">
			     <div class="breadcrumb">
			      <el-breadcrumb separator="/">
			        <el-breadcrumb-item :to="{ path: '/' }">店铺管理</el-breadcrumb-item>
			        <el-breadcrumb-item>店铺装修</el-breadcrumb-item>
			        <el-breadcrumb-item>收款信息编辑</el-breadcrumb-item>
			      </el-breadcrumb>
			    </div>		
	<el-form ref="form"  label-width="100px">
	<h2 style="color: #F04134;">收款单位信息</h2>
	  <el-form-item label="收款单位：">
	  	<p>收款单位信息</p>
	  </el-form-item>
	  <el-form-item label="联系人：">
	    <el-input style="width: 50%;"></el-input>
	  </el-form-item>	  
	  <el-form-item label="电话：">
	    <el-input style="width: 50%;"></el-input>
	  </el-form-item>
	  <el-form-item label="邮箱：">
	    <el-input style="width: 50%;"></el-input>
	  </el-form-item>	  
	  <el-form-item label="地址：">
	     <el-input   type="textarea" :rows="2"style="width: 50%;"></el-input>
	  </el-form-item>	  
	<h2 style="color: #F04134;">收款账户信息</h2>  
	  <el-form-item label="开户姓名：">
	     <el-input style="width: 50%;"></el-input>
	  </el-form-item>
	  <el-form-item label="开户银行：">
	    <el-input style="width: 50%;"></el-input>
	  </el-form-item>	  
	  <el-form-item label="银行账号：">
	    <el-input style="width: 50%;"></el-input>
	  </el-form-item>	  
	</el-form>
	
	
	
	
	
	
	
	
	<button class="editBtn">编辑</button>
</div>
	</section>
</template>

<script>
var getOrderList='',modifyfreight='',exportOrder='';
//import {getOrderList,modifyfreight,exportOrder} from './service.js';
  export default {
    data() {
      return {
      	imageUrl:'',
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }

    },mounted(){
    

    	
    	

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
		background:white;
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