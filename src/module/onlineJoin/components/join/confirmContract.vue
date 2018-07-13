<template>
	<section class="join_content">
		<join-header name="商家入驻"></join-header>
		<div class="info_content">
		<div class="process">
		<join-process :active="2"></join-process>	
		<div class="contract">
			<h2 class="title">码上花商家合作协议</h2>
			<contract-txt :contractData="contractData" ></contract-txt>
			<h2 class="title">保密协议</h2>
			<secret-txt :contractData="contractData"></secret-txt>
			<h2 class="title">码上花真品平台 2018 年报价体系</h2>
			<price-txt></price-txt>
		</div>
		<div class="btnBox">
			<p class="checkBox"><el-checkbox v-model="checked">一经同意，视为已阅读并同意合作协议的所有条款内容</el-checkbox></p>
			<button class="prevBtn" @click="prvePage">上一步</button>			
			<el-button class="submitBtn" :loading="onLoading"  @click="submitAudit" >{{btnTxt}}</el-button>
		</div>
	</div>		
		</div>
		<footer-box></footer-box>
	</section>
</template>

<script>
import footerBox from '@/components/footer/index.vue';
import joinHeader from '@/components/joinHeader/index.vue';
import joinProcess from '@/components/joinProcess/index.vue';
import contractTxt from '@/components/contract/contract2.vue';
import secretTxt from '@/components/contract/contract1.vue';
import priceTxt from '@/components/contract/contract3.vue';
import {singContract,getEntInfo} from '../../service.js';
var ent= JSON.parse(localStorage.getItem('user'))||{};

  export default {
    data() {
      return {
      	onLoading:false,
      	btnTxt:'提交审核',
      	entStatus:'',
      	entInfo:ent,
      	checked:false,
		contractData:ent.userEnter,
      };
    },
    components: {
      footerBox,
      joinProcess,
      joinHeader,
      contractTxt,
      secretTxt,
      priceTxt
    },    
    methods: {
      _getEntInfo(){
		getEntInfo().then((res) => {
					this.entStatus = res.status;	
					}).catch((res) => {
						console.log('error ', res);
						this.$message({
							type: 'error',
							message: res.message
						});	 
					});	      	
    	},     	
    	submitAudit(){
    		if(!this.checked){
				this.$message({
					type: 'warning',
					message:'您要先阅读并同意合作协议的所有条款内容'
				});	   
				return false;
    		}
    		
				if(this.entStatus != 'AUDIT_FALL' && this.entStatus != 'NEW' ){
									this.$message({
										type: 'error',
										message: '该状态下企业无法提交审核，详情请联系管理员。'
									});						
					return false;
				}    		
    		this.onLoading = true;
    		this.btnTxt = '提交中...';
    		singContract().then((res) =>{
				this.$message({
					type: 'success',
					message: '合同签署成功！'
				});				
				localStorage.setItem('a', JSON.stringify(res));
				let _this = this;
				setTimeout(function(){
					_this.$router.push('/join/audit');	
				},2000)    			

    		}).catch((res) => {
    		this.onLoading = true;
    		this.btnTxt = '提交审核';    			
				this.$message({
					type: 'error',
					message:res.message
					});	    			
    		})
    		
    		
    },
    prvePage(){
    	this.$router.push('/join/writeInfo');	
    }
    },    
 	mounted() {
         this.entInfo = JSON.parse(localStorage.getItem('user'))||{};
         this.contractData = this.entInfo.userEnter;
         this._getEntInfo();
	 },	   
    
  }

</script>

<style lang="scss" scoped>
@import url("./elStyle.css");

.join_content{
	width: 100%;
	background: #FFFFFF;
}

	.info_content{
		width: 1200px;
		margin: auto;
		margin-top: 30px;
	}
	.instructions{
		font-size: 14px;
		color: #333333;
		letter-spacing: 0;
		line-height: 24px;		
	}
	.process{
		border: 1px solid gainsboro;
		margin-top: 30px;
	}
	.contract{
		width: 100%;
		.title{
			height:84px;
			line-height: 84px;
			text-align: center;
			font-size: 18px;
			color: #333333;	
			font-weight: bold;
			border-bottom: 1px solid gainsboro;		
		}
	}
	
	.checkBox{
		margin-left: 30px;
		float: left;
	
	}
.btnBox{
		width: 100%;
		height: 100px;
		line-height: 100px;
		text-align: right;
		border-top:1px solid gainsboro  ;
		.prevBtn{
			width: 150px;
			height: 40px;
			line-height: 35px;
			margin-right: 35px;			
			border: none;
			background: none;
			color: #4DA9E4;
			font-size: 14px;
			border-radius: 2px;	
			border: 1px solid #4DA9E4;		
		}
		.prevBtn:hover{
			opacity: 0.8;
		}
		.submitBtn{
			border: none;
			background: none;
			padding:0 15px;
			width: 260px;
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