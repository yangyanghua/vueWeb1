<template>
	<div class="main">
		<!--面包屑-->
	    <div class="crumbs">
	      店铺资料
	    </div>
	    <!-- / 面包屑-->
		<div class=" subject">
			<div class="filter_query mat20">
				<el-form ref="form"  label-width="100px" style="padding:20px;">
				  <el-form-item label="店铺名称：">
				    <p>{{data.store.name}}</p>
				  </el-form-item>
				  <el-form-item label="店铺logo：">
				    <p style="height: 80px;">
				    	<img style="height: 100%;" :src="data.store.logoUrlPath == '' ? data.store.logoUrl : data.store.logoUrlPath"/>
				    </p>
				  </el-form-item>	
				  <el-form-item label="店铺大图：">
				    <p style="height: 130px;">
				    	<img style="height: 100%;" :src="data.store.maxImagePath == '' ? data.store.maxImage : data.store.maxImagePath"/>
				    </p>
				  </el-form-item>
				  <el-form-item label="国家：">
				    <p >{{data.storeTemplate.country}}</p>
				  </el-form-item>	  
				  <el-form-item label="服务电话：">
				    <p >{{data.storeTemplate.servicePhone}}</p>
				  </el-form-item>		  
				  <el-form-item label="店铺故事：">
				    <p v-html="data.storeTemplate.story" ></p>
				  </el-form-item>		  

				</el-form>
				<el-button type="primary"  size="medium" icon="el-icon-edit-outline" class="editStoreBtn" @click="$router.push({path:'/store/info/edit'})">编辑</el-button>
			</div>     
		</div>

</div>
</template>

<script>
import {storeInfo} from '../../service.js';
  export default {
    data() {
      return {
      	data:{
      		store:{
      			name:'',
      			logoImage:'',
      			maxImageUrl:'',
      		},
      		storeTemplate:{
      			country:'',
      			servicePhone:'',
      			story:''
      		}
      	},
      }
    },
    methods: {
    	addStore(){
    		this.$router.push({path:'/join/storelist'})
	
    	},
		_storeInfo(){
		 		storeInfo().then((res) => {
						this.data.store = res.store;
						if (res.storeTemplate != null && res.storeTemplate != undefined) {
							this.data.storeTemplate = res.storeTemplate;
						}
					}).catch((res) => {
						console.log('error ', res);
						this.$message({
							type: 'error',
							message: res.message
						});
						if (res.code == -1 && res.message == '未创建店铺') {
							this.$router.push({
								path:'/store/info/edit'
							});
						}
						
			})  		
	}

    },mounted(){

    this._storeInfo()

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
		border: 1px solid gainsboro;
		background: white;
	}
	.editStoreBtn{
		position: absolute;
		right: 5%;

		top: 3%;
		// border: none;
		// background: none;
		// height: 35px;
		// line-height: 35px;
		// text-align: center;
		// border-radius:100px;
		// border: 1px solid gainsboro;
		// width: 120px;
	}

</style>