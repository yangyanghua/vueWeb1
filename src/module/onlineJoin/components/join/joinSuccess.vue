<template>
	<section class="join_content">
		<join-header name="商家入驻"></join-header>
		<div class="info_content">
		<div class="process">
		<join-process :active="5"></join-process>	
		<div class="successBox">
			<img src="../../../../assets/images/join/success1.png"/>
			<h2 class="s_tip">商家入驻成功！</h2>		
		</div>
		<div class="btnBox">
			<button class="submitBtn" @click="toBuild">创建店铺</button>
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
  export default {
    data() {
      return {
			active:'2',
      };
    },
    components: {
      footerBox,
      joinProcess,
      joinHeader
    },    
    methods: {
		toBuild(){
       		this.$router.push({
         		 path:'/join/slist',
        	})
		}
    },
    
 	mounted() {

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
			height:360px ;
			text-align: center;
			padding-bottom: 20px;
			padding-top:100px;
			
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
		height: 100px;
		line-height: 100px;
		text-align:center;
		.submitBtn{
			border: none;
			background: none;
			width: 150px;
			padding:0 15px;
			height: 40px;
			line-height: 35px;
			background: #4DA9E4;
			border-radius: 2px;
			border: 1px solid #4DA9E4;
			color: #FFFFFF;
			font-size: 14px;	
		}
		.submitBtn:hover{
			opacity: 0.8;
		}	
	}		




	
</style>