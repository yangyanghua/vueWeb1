<template>
	<section class="join_content">
		<join-header name="创建店铺"></join-header>
		<div class="info_content">
		<stroe-process :active="active"></stroe-process>	
		
		<div class="auditContent">
			<div class="audit_state" v-if="storeStatus=='WAIT_AUDIT'" >
				<div class="audit_icon">
					<img src="../../../../assets/images/join/audit1.png"/>
				</div>
				<h2 class="stateName">等待平台审核资质</h2>
				<div class="audit_instruction">
					<p>店铺资质认证已提交至码上花平台，平台审核成功后，可进行下一步操作</p>
					<p>码上花商家客服电话：020-81831888</p>
				</div>
			</div>

			<div class="audit_state" v-if="storeStatus=='AUDIT_FALL'">
				<div class="audit_icon">
					<img src="../../../../assets/images/join/audit2.png"/>
				</div>
				<h2 class="stateName fail">资质审核认证失败！</h2>
				<div class="audit_instruction">
					<p>失败理由：{{auditRemark}}</p>
					<p>码上花商家客服电话：020-81831888</p>
				</div>
			</div>

			<div class="audit_state" v-if="storeStatus=='ONLINE'">
				<div class="audit_icon">
					<img src="../../../../assets/images/join/audit3.png"/>
				</div>
				<h2 class="stateName success">资质审核认证成功！</h2>
				<div class="audit_instruction">
					<el-button size="small" style="width: 100px;" type="primary" @click="toStore" >进入店铺</el-button>	 	
				</div>
			</div>

		</div>
		<div class="btnBox" v-if="storeStatus=='AUDIT_FALL'">
			<el-button size="small" @click="toEdit" >返回修改相关资质</el-button>
			<el-button size="small" @click="_storeReaudit" style="width: 100px;" type="primary">重新发起审核</el-button>
		</div>
		<div class="btnBox" v-if="storeStatus=='WAIT_AUDIT'">
			<el-button size="small" @click="toStoreList" >返回店铺列表</el-button>
		</div>		
		</div>		
		<footer-box></footer-box>
	</section>
</template>
<script>
import footerBox from '@/components/footer/index.vue';
import joinHeader from '@/components/joinHeader/index.vue';
import stroeProcess from '@/components/stroeProcess/index.vue';
import {storeReaudit,storeDetail} from '../../service.js';
  export default {
    data() {
      return {
      	user:{
      		store:{
      			
      		},
      	},
      	auditRemark:'',
		choosed:'',
		storeStatus:'WAIT_AUDIT',
		storeId:'',
		active:3,
      };
    },
    components: {
      footerBox,
      stroeProcess,
      joinHeader
    },    
    methods: {
    	_storeDetail(id){
    			storeDetail({id:id}).then((res)=>{
    				this.storeStatus = res.status;
    				this.auditRemark = res.auditRemark;
    				if(res.status=='ONLINE'){
							this.active = 4;
						}
    		}).catch((res)=>{
		    		this.$message({
		        		type:'error',
		        		message:res.message
		    		}) 
			})

    	},
    	toStoreList(){
    		this.$router.push({
         		 path:'/join/slist',
        		})	    		
    	},
    	toStore(){
    		this.$router.push({
         		 path:'/store/info/edit',
          		 query:{id:this.storeId}
        		})	
    	},
		toEdit(){
       			 this.$router.push({
         		 path:'/join/fillqualification',
          		 query:{id:this.storeId}
        		})			
		},
		_storeReaudit(){
			storeReaudit({id:this.storeId}).then((res)=>{
		    		this.$message({
		        		type:'success',
		        		message:'已提交审核'
		    		}) 
		    this._storeDetail(this.$route.query.id);
			}).catch((res)=>{
		    		this.$message({
		        		type:'error',
		        		message:res.message
		    		}) 
			})
		},
    },    
 	mounted() {
 		this._storeDetail(this.$route.query.id);
		this.storeId = this.$route.query.id;

	 },	   
    
  }

</script>

<style lang="scss" scoped>
.join_content{
	width: 100%;
	background: #FFFFFF;
}

	.info_content{
		width: 1200px;
		margin: auto;
		margin-top: 30px;
		border: 1px solid #E6E6E6;
	}
	.auditContent{
		width: 100%;
		padding: 61px 0;
		
	}	
	.audit_state{
		width: 100%;
		text-align: center;
		.stateName{
			width: 100%;
			text-align: center;
			font-size: 27px;
			color: #4DA9E4;
			margin-bottom: 30px;
			&.fail{
			  color: #F24949;
			}
			&.success{
			  color: #53BE6E;	
			}			
		}
		p{
			font-size: 14px;
			color: #333333;
			letter-spacing: 0;
			line-height: 30px;			
		}
	}
	
	
	
	
	
.btnBox{
		width: 100%;
		height: 80px;
		line-height: 80px;
		text-align: center;
		border-top:1px solid gainsboro ;
		.submitBtn{
			border: none;
			background: none;
			padding:0 15px;
			width: 150px;
			height: 40px;
			line-height: 35px;
			background: #4DA9E4;
			border-radius: 2px;
			border: 1px solid #4DA9E4;
			color: #FFFFFF;
			font-size: 14px;
			margin-right: 30px;			
		}
		.submitBtn:hover{
			opacity: 0.8;
		}
	}	

</style>