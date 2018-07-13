<template>
  <div>
    <main-header name="商家入驻"></main-header>
   
    <div class="mainSection"   >
      <p class="status">
        <i class="icon-weTxt"></i>
      </p>
      <div class="payBlock">
        <p>
          <span class="title">合同编号</span>： &nbsp;&nbsp;{{contractInfo.outTradeNo}}</p>
        <p>
          <span class="title">收款方</span>： &nbsp;&nbsp;广州闪购软件服务有限公司</p>
        <p>
          <span class="title">用途</span>： &nbsp;&nbsp;{{contractInfo.productName}}</p>
        <span class="amount">
          应付金额：
          <span class="price">{{contractInfo.totalAmount}}</span>元
        </span>
      </div>
      <div class="payInfo">
			<div v-if="onloading" class="loadingbox" >
				<p><i class="el-icon-loading"></i></p>
			</div> 
        <div v-if="!onloading"  class="qrCodeImg">
          <img :src="imgBase64" alt="">
        </div>
        <i class="wxtips">
        	打开微信，扫二维码完成支付
        </i>
      </div>
    </div>
    
    <main-footer></main-footer>

  </div>

</template>
<script>
  import {
    getWXPayInfo, getPayInfo
  } from '@/module/onlineJoin/service.js';
  import mainHeader from '@/components/joinHeader/index.vue';
  import mainFooter from '@/components/footer/index.vue';
  import {getEntInfo} from '../../service.js';
  
  
  export default {
    data() {
      return {
      	contractNo:'',
      	onloading:true,
        contractInfo: {},
        imgBase64: '',
        queryId: '',
        countTime: 0,
        firstQueryId: ''
      }
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
	    			vm.contractNo = res.contractNo;
	    			this.init();
	    			//更新本地企业状态
	    			let userInfo = JSON.parse(localStorage.getItem('user'))||{};
	    			userInfo.userEnter.status = res.status;
						localStorage.setItem('user', JSON.stringify(userInfo));
						
				       
				console.log('cnum ', vm.contractNo);
				vm.showBtn =  true;
	 		})
    	},    	
      init() {   	
        let params = {
//        outTradeNo: this.$route.query.outTradeNo,
					outTradeNo: this.contractNo,
          type: 1,
          isFast:1
        };
        let vm = this;
        getWXPayInfo(params).then((res) => {
          console.log(res);
          this.contractInfo = Object.assign({}, res);
        }).catch(res => {
          this.$message({
            type: 'error',
            message: res.message
          });
        });
        let params1 = {
					outTradeNo: this.contractNo,
          type: 1,
          isFast:0
        };
        getWXPayInfo(params1).then((res) => {
          let options = {
            width: 160,
            height: 160,
          };
          this.imgBase64 = jrQrcode.getQrBase64(res.code, options);
          this.firstQueryId = setTimeout(function(){
            vm.queryPayInfo(vm.contractInfo.outTradeNo);
            vm.onloading = false;
          }, 1000);
        }).catch(res => {
          this.$message({
            type: 'error',
            message: res.message
          });
        });
      },
      queryPayInfo(tradeNo, queryTime) {
        let vm = this;
        let timeInterval = queryTime ? queryTime: 2;//queryTime 以秒为单位
        vm.queryId = setTimeout(function () {
           vm.countTime = vm.countTime + timeInterval;
           console.log(vm.countTime);
          // if(vm.countTime > 29) {
          //   vm.$router.push('payOutTime');
          //   return;
          // }
          getPayInfo({contractNo: tradeNo}).then(res => {
               if (res.respCode === '0') {
                 clearTimeout(vm.queryId);
                 vm.$router.replace({path: 'joinSuccess', query: {
                   outTradeNo: tradeNo
                 }});
               } else {
                //  vm.queryPayInfo(tradeNo, vm.countTime > 29?60:2);
                 vm.queryPayInfo(tradeNo);
               }
          });
        }, timeInterval*1000);
      }
    },
    mounted() {
   		this._getEntInfo();
    },
    beforeDestroy(){
       clearTimeout(this.queryId);
       clearTimeout(this.firstQueryId);
    },

  //     beforeRouteLeave (to, from, next) {
  //   // 导航离开该组件的对应路由时调用
  //   // 可以访问组件实例 `this`
  //    clearTimeout(this.queryId);
  //    next();
  // },
    components: {
      mainHeader,
      mainFooter
    }
  }

</script>
<style lang='scss' scoped>
  /*@import "../src/assets/css/_partial/_vars.scss";*/

  .status {
    .icon-weTxt {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
	.mainSection{
		background-color: #FFFFFF;
		padding-top: 30px;
		height: 390px;
	}
  .payBlock {
    padding: 37px 0 29px 66px;
    box-sizing: border-box;
    margin: 0 auto 0 auto;
    width: 1200px;
    background-color: #FFFFFF;
    border: 1px solid gainsboro;
    position: relative;
    /*color: $color-textHeavy;*/
    font-size: 14px;
    line-height: 1.8;
    .amount {
      position: absolute;
      top: 37px;
      right: 120px;
      .price {
        margin-left: 11px;
        margin-right: 3px;
        color: $color-primary;
        font-size: 20px;
      }
    }
    .title {
      display: inline-block;
      width: 62px;
      text-align: justify;
      -moz-text-align-last: justify;
      text-align-last: justify;
      /* IE */
    }
  }

  .wxtips {
    display: inline-block;
    width: 260px;
    margin: 10px auto 248px auto;
  }

  .payInfo {
    text-align: center;
  }
	.loadingbox{
		width: 160px;
		margin: auto;
		text-align: center;
		height: 160px;
		margin-top: 25px;
		background: #FFFFFF;
		border: 1px solid gainsboro;
		i{
			display: block;
			width: 160px;
			height: 160px;
			line-height: 160px;
			font-size: 30px;
		}
	}
.qrCodeImg{
  padding-top: 25px;
}
</style>
