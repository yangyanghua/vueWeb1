<template>
	<section class="join_content">
		<join-header name="商家入驻"></join-header>
		<div class="info_content">
		<div class="process">
		<join-process :active="4"></join-process>	
		<div class="successBox">
			<img src="../../../../assets/images/join/success1.png"/>
			<h2 class="s_tip">恭喜您！签约成功</h2>
			<p class="s_pla">请选择付款方式支付合同款项</p>
		<div class="btnBox">
			<button class="prevBtn" @click="toView" v-show="showBtn">
				查看合同
				<!--<a :href="pdfUrls" target="_blank">查看合同</a>-->
				</button>
		</div>			
		</div>
		<div class="payBox">
	        <div class="payMethod" style="text-align: center;">
	          <div v-if="(userInfo.userEnter.type == 'BRAND')&&showBtn" class="payMethod-item item1">
	            <p class="title">在线支付</p>
	            <div style="position: relative;" >
	            <a class="online mt36" @click="payOnline">
	              <img style="margin-top: -5px;" src="../../../../assets/images/join/alipay.png"/>
	              <div class="online-name">
	                <p>支付宝付款</p>
	                <p class="payNote">使用支付宝付款，推荐使用</p>
	              </div>
	            </a>
	            <a class="online" @click="payOnlineYL" >
	               <img style="margin-top: -5px;" src="../../../../assets/images/join/unionpay.png"/>
	              <div class="online-name">
	                <p>银联付款</p>
	                <p class="payNote">使用银联卡付款，方便快捷</p>
	              </div>
	            </a>
	             <a class="online" @click="payOnlineWX" v-show="showWXPay">
	               <img src="../../../../assets/images/join/wepay.png"/>
	              <div class="online-name">
	                <p>微信付款</p>
	                <p class="payNote">使用微信付款，扫码支付</p>
	              </div>
	            </a>
	            <div  class="expandArrow" v-bind:class="{'up':showWXPay}" @click="tapShowWXPay">
	            </div>	            	
	            </div>
	          </div>
	          <div class="payMethod-item item2">
	            <p class="title">线下支付</p>
	            <div class="offline u-offline">
	              <p class="offline-title">请将合同款项汇入以下账号：</p>
	              <p>户名：广州闪购软件服务有限公司</p>
	              <p>开户行：中国建设银行股份有限公司广州广花三路支行</p>
	              <p>账号：4405&nbsp;&nbsp;0149&nbsp;&nbsp;1103&nbsp;&nbsp;000&nbsp;&nbsp;000&nbsp;&nbsp;29</p>
	            </div>
	            <div class="offline">
	              <p class="offline-title">并在汇款成功后联系我们：</p>
	              <p>客服中心电话：400-862-0028</p>
	            </div>
	          </div>
	        </div>			
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
import {exportpdf,getEntInfo} from '../../service.js';
import {openAliPay,openYLPay} from '@/common/js/service.js';
  export default {
    data() {
      return {
      userInfo:{
     	userEnter:{}
     },
		 showWXPay:false,
		 showBtn: false,
     pdfUrls:'',
			active:'2',
			contractNo:''
      };
    },
    components: {
      footerBox,
      joinProcess,
      joinHeader
    },    
    methods: {
    	_getEntInfo(){
				let vm = this;
    		getEntInfo().then((res)=>{
    			if(res.status=='NORMAL'){
			        this.$router.push({
			          path: '/join/joinSuccess',
			        });    				
    			}
    			//更新本地企业状态
    			let userInfo = JSON.parse(localStorage.getItem('user'))||{};
    			userInfo.userEnter.status = res.status;
					localStorage.setItem('user', JSON.stringify(userInfo));
							vm.contractNo = res.contractNo;
			
			console.log('cnum ', vm.contractNo);
			vm.showBtn =  true;
 		})
    	},
    	toView(){	
		var userinfos = JSON.parse(localStorage.getItem('user'))||{};
		let urla =  exportpdf+'/api/v1/contract/export.pdf?accessToken='+userinfos.accessToken+ '&cNumber='+this.contractNo
		window.open(urla);		    
			
    	},
    	tapShowWXPay(){
    		this.showWXPay = !this.showWXPay;
    	},
    	payOnline() {
          openAliPay(this.contractNo);
     },
      payOnlineWX(){	
        this.$router.push({
          path: '/join/WXPay',
          query: {
            outTradeNo: this.contractNo
          }
        });
      },
      payOnlineYL() {
      	 this.userInfo = JSON.parse(localStorage.getItem('user'))||{};   

    	  let outTradeNo = 	this.userInfo.contractNo;
          openYLPay(this.contractNo);
      },
    },    
 	mounted() { 
		this._getEntInfo();	

	 this.userInfo = JSON.parse(localStorage.getItem('user'))||{};

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
		.successBox{
			text-align: center;
			padding-bottom: 20px;
			padding-top:40px;
			border-bottom: 1px solid gainsboro;
			.s_tip{
				text-align: center;
				font-size: 20px;
				color: #333333;
				margin-top: 15px;				
			}
			.s_pla{
				font-size: 14px;
				color: #999999;				
			}
		}
	
.btnBox{
		width: 100%;
		height: 60px;
		line-height: 60px;
		text-align:center;
		.prevBtn{
			padding:0 15px;
			width:150px;
			height: 40px;
			line-height: 35px;		
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
	}		

.payBox{
	padding-bottom: 30px;
}

  .payMethod {
    width: 1150px;
    margin: 0 auto;
    padding-top: 46px; // border-top: 1px solid $color-split;
    text-align: left;
    &-item {
      display: inline-block;
      width: 368px;
      height: 300px;
      text-align: left;
      vertical-align: top;
      .title {
		font-size: 18px;
		color: #222222;
        &:before {
          content: '';
          display: inline-block;
          width: 6px;
          height: 16px;
          background: #4DA9E4;
          margin-right: 8px;
          vertical-align: middle;
          position: relative;
          top: -1px;
        }
      }
    }
    .item1 {
      margin-left: 233px;
      margin-right: 80px;
    }
    .item2 {}
    .online {
      &.mt36 {
        margin-top: 22px;
      }
      background: url('../../../../assets/images/join/arrow_right.png') no-repeat 255px 50%;
      background-size:16px 17px;
      display: block; // border: 1px solid gainsboro;
      box-sizing: border-box;
      cursor: pointer;
      width: 288px;
      height: 70px;
      text-align: left;
      border: 1px solid #ECECF0;
      // padding: 15px 0 15px 20px;
      padding: 15px 0 15px 20px;
      margin-bottom: 15px;
      .icon-zhifubao {
        // margin-top: 39px;
        // margin-bottom: 14px;
      }
      .icon-yinlian {
        margin-top: 8px;
        margin-bottom: 8px;
      }
        .icon-wePay {
        margin-top: 2px;
        margin-bottom: 2px;
      }

      &-name {
        font-size: 14px;
        color: #333333;
        display: inline-block;
        vertical-align: top;
        margin-left: 12px;
        .payNote {
          font-size: 11px;
          color: #333333;
        }
      }

      .online-btn {
        display: inline-block;
        width: 150px;
        height: 35px;
        border: 1px solid gainsboro;
        color: #333333;
        font-size: 13px;
        line-height: 35px;
        margin-top: 22px;
        &:hover {
          opacity: 0.7;
        }
      }
    }
    .u-offline {
      margin-top: 14px;
    }
    .offline {
      color: #333333; // line-height: 1.5;
      margin-bottom: 25px;
      font-size: 14px;
      line-height: 22px;
    }
    .offline-title {
	  font-size: 12px;
	  color: #999999;
      margin-bottom: 10px;
    }
  }

.expandArrow{
	height: 30px;
	width: 30px;
	position: absolute;
	left: 120px;
	bottom:-30px;
	background:url(../../../../assets/images/join/more.png) no-repeat 50% 50%;
	opacity: 0.6;
	transition: all 0.3;
	cursor: pointer;
	background-size:17px 10px ;
}
.expandArrow:hover{
	opacity: 0.8;
}
.expandArrow.up{
	transform: rotateZ(180deg);
}



	
</style>