<template>
	<section class="join_content">
		<join-header name="商家入驻"></join-header>
		<div class="info_content">
		<div class="process">
		<join-process :active="3"></join-process>	
		<div class="audit_process">
			<ul class="process1List">
				<li class="active" v-bind:class="{'active':active >= '1'}">
					<span class="line"></span>
					<span class="process_iocn"><i v-if="active < 1">1</i><img v-else src="../../../../assets/images/join/gou1.png"/></span>
					<p>提交入驻</p>
				</li>
				<li v-bind:class="{'active':active >='2'}">
					<span class="line"></span>
					<span class="process_iocn"><i v-if="active <= 2">2</i><img v-else src="../../../../assets/images/join/gou1.png"/></span>
					<p>等待平台审核</p>
				</li>
				<li v-bind:class="{'active':active >='3'}">
					<span class="line"></span>
					<span class="process_iocn"><i v-if="active <= 3">3</i><img v-else src="../../../../assets/images/join/gou1.png"/></span>
					<p>审核结果</p>
				</li>
			</ul>			
		</div>
		<div class="auditStatet">
			<div class="auditing" v-if="entStatus == 'WAIT_AUDIT'" >
			<p>入驻申请已提交至码上花平台，平台审核成功后，可进行下一步操作。</p>			
			</div>
			
			<div class="auditSuccess" v-if="entStatus== 'AUDIT_SUCCESS'">
				<p>入驻审核成功！请继续进行下一步操作。</p>
			</div>
			<div class="auditFailure" v-if="entStatus== 'AUDIT_FALL'">
				<p class="errorTip">资质审核失败！</p>
				<p class="reason">失败理由：{{auditRemark}}</p>
			</div>			
			<p>码上花商家入驻客服电话：020-81831888</p>
		</div>
		<div class="btnBox" v-if="entStatus != 'WAIT_AUDIT'" >
			<button class="prevBtn" @click="prev" v-if="entStatus== 'AUDIT_FALL'">返回修改入驻信息</button>
			<button class="submitBtn" v-if="entStatus== 'AUDIT_FALL'" @click="_reaudit" >重新发起审核</button>
			<button class="submitBtn" v-if="entStatus== 'AUDIT_SUCCESS'" @click="nextToPay">缴纳合同费用</button>
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
import {reaudit,getEntInfo} from '../../service.js';

  export default {
    data() {
      return {
      		auditRemark:'',
      	    entStatus:'',
			active:'2',
      };
    },
    components: {
      footerBox,
      joinProcess,
      joinHeader
    },    
    methods: {
    	_getEntInfo(){
    		getEntInfo().then((res)=>{
    			this.entStatus = res.status;
    			this.auditRemark = res.auditRemark;
    			if(res.status !='WAIT_AUDIT'){
    				this.active = 3
    			}
    			//更新本地企业状态
    			let userInfo = JSON.parse(localStorage.getItem('user'))||{};
    			userInfo.userEnter.status = res.status;
    			localStorage.setItem('user', JSON.stringify(userInfo));
    			// localStorage.setItem('userInfo', JSON.stringify(userInfo));
				localStorage.setItem('a', JSON.stringify(userInfo.contractNo));
    			
    		}).catch((res) => {
 				this.$message({
					type: 'error',
					message: res.message
				});	
				});	
    	},
    	_reaudit(){
			// debugger;
    		reaudit().then((res) =>{
 				this.$message({
					type: 'success',
					message: '提交成功！'
				});	 
			this.active = 2	;
			this._getEntInfo();
    		}).catch((res) => {
 				this.$message({
					type: 'error',
					message: res.message
				});	     			
    			
    		})
    	},
    	prev(){
    		this.$router.push('/join/writeInfo');
    	},
    	nextToPay(){
    		this.$router.push('/join/pay');
    	}
    	
    },    
 	mounted() {	
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
	.audit_process{
		width: 100%;
		.process1List{
			width: 70%;
			margin: auto;
			margin-top:81px ;
			height:185px;
			text-align: center;
			display: flex;
			li{
				position: relative;
				flex: 1;
				.process_iocn{
					display: block;
					position: relative;
					margin: auto;
					height: 80px;
					width: 80px;
					text-align: center;
					line-height: 75px;
					font-size: 36px;
					color: #C7C7C7;	
					border: 4px solid  #C7C7C7;	
					border-radius:50%;
					background: #FFFFFF;
					z-index: 10;		
				}
				.line{
					display: block;
					position: absolute;
					width: 100%;
					height: 4px;
					background: #C7C7C7;
					z-index: 5;
					top: 39px;
						
				}
				p{
					margin-top:24px;
					font-size: 20px;
					color: #999999;
				}
				img{
					width: 80%;
					margin: auto;
					margin-top: -5px;				
				}
				
			}
			li.active{
				.process_iocn{
					border: 4px solid  #4DA9E4;	
					color: #4DA9E4;	
				}
				.line{
					background: #4DA9E4;	
				}
				p{
					color: #4DA9E4;	
				}
			}
		}
	}
	
	.auditStatet{
		width: 60%;
		margin: auto;
		min-height: 150px;
		p{
			font-size: 14px;
			color: #333333;
			margin-bottom: 15px;
		}
	}
	.auditSuccess{
		p{
			font-size: 14px;
			color: #53BE6E;	
			padding-left: 23px;	
			background: url(../../../../assets/images/join/examine_success.png) no-repeat 0 40%;
			background-size: 18px 18px;	
		}
		
	}
	.auditFailure{
		.errorTip{
			font-size: 14px;
			color: #FF0E0E;
			padding-left: 23px;				
			background: url(../../../../assets/images/join/examine_fail.png) no-repeat 0 40%;
			background-size: 18px 18px;							
		}
		.reason{
			font-size: 14px;
			color: #333333;			
		}
	}
	
.btnBox{
		width: 100%;
		height: 100px;
		line-height: 100px;
		text-align:center;
		border-top:1px solid gainsboro ;
		.prevBtn{
			padding:0 15px;
			width:250px;
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
			width:250px;
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