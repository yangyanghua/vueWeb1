<template>
	<section class="join_content">
		<join-header name="创建店铺"></join-header>
		<div class="info_content">
		<stroe-process :active="1"></stroe-process>	
		<div class="tyeps">
			<p class="title">选择您要创建的店铺类型</p>
			<ul class="typeList">
				<li class="typeItem" v-bind:class="{'choosed':choosed=='0'}" @click="chooseType('0')">
					<div class="logos">
						<img src="../../../../assets/images/join/qijiandian.png"/>
					</div>
					<div class="instructions">
						<h2 class="typeName">多品牌店铺</h2>
						<p class="typeInst">旗舰店指以自有品牌或由商标权人提供独占授权的品牌入驻码上花开设的多品牌店铺</p>
					</div>
				</li>
				<li class="typeItem" v-bind:class="{'choosed':choosed=='1'}" @click="chooseType('1')">
					<div class="logos">
						<img width="150"  src="../../../../assets/images/join/zhuanyin.png"/>
					</div>
					<div class="instructions">
						<h2 class="typeName">单品牌店铺</h2>
						<p class="typeInst">专营店指该店铺只在平台销售单一品牌商品的店铺</p>
					</div>
				</li>				
			</ul>
		</div>
		<div class="btnBox">
			<button class="submitBtn" @click="next">下一步</button>
		</div>			
		</div>		
		<footer-box></footer-box>
	</section>
</template>
<script>
import footerBox from '@/components/footer/index.vue';
import joinHeader from '@/components/joinHeader/index.vue';
import stroeProcess from '@/components/stroeProcess/index.vue';
  export default {
    data() {
      return {
		choosed:'',
      };
    },
    components: {
      footerBox,
      stroeProcess,
      joinHeader
    },    
    methods: {
		chooseType(type){
			this.choosed = type;
		},
		next(){
			if(this.choosed){
       			 this.$router.push({
         		 path:'/join/fillqualification',
          		 query:{ type:this.choosed}
        		})
			}else{
				this.$message({
				type: 'error',
				message: '请选择店铺类型'
				});					
			}
			
		}
		
		
    },    
 	mounted() {

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
	.tyeps{
		padding-bottom: 30px;
	}
	.title{
		height: 100px;
		line-height: 100px;
		text-align: center;
		font-size: 20px;
		color: #4DA9E4;		
	}
	.typeList {
		text-align: center;
	}
	.typeList .typeItem{
		position: relative;
		cursor: pointer;
		overflow: hidden;
		display:inline-block;
		width: 480px;
		height: 200px;
		border: 1px solid #E6E6E6;
		box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16);
		margin-bottom: 30px;
		padding: 35px;
		
		.logos{
			float: left;
			width: 130px;
			height: 130px;
		}
		.instructions{
			width: 245px;
			float: left;
			margin-left: 30px;
			text-align: left;
			.typeName{
				font-size: 18px;
				color: #222222;	
				height: 50px;
				line-height: 50px;			
			}
			.typeInst{
				font-size: 14px;
				color: #999999;				
			}
		}
		
	}
	.typeList .typeItem:first-child{
		margin-right: 65px;
	}
	.typeList .typeItem.choosed::before{
		content: '已选';
		height: 30px;
		line-height: 30px;
		color: #FFFFFF;
		text-align: center;
		width: 80px;
		position: absolute;
		background: #67C23A;
		transform: rotateZ(45deg);
		top: 0;
		right: -25px;
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