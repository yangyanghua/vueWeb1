<template>
	<section class="join_content">
		<join-header name="商家入驻"></join-header>
		<div class="info_content">
		<p class="instructions">码上花真品致力于打造全球引领未来的移动物联网购物平台，将“真知码+物联网+云计算”等核心科技创造性的应用在商业领域，带动消费进入体验经济时代。通过商品和服务联接消费者、商家，
			构建万物联网生态系统，实现消费者、商家和谐相依，共同发展。</p>	
		<div class="process">
		<join-process :active="1"></join-process>	
		<div class="process2">
			<h1 class="title">一、商家入驻流程</h1>	
			<table border="0" width="1060"  cellspacing="" cellpadding="">
				<tr height="76">
					<th colspan="5">
						<ul class="process2List">
							<li>1、准备资料</li>
							<li class="arrow"><span></span></li>
							<li>2、提交入驻</li>
							<li class="arrow"><span></span></li>
							<li>3、平台审核</li>
							<li class="arrow"><span></span></li>
							<li>4、缴纳费用</li>
							<li class="arrow"><span></span></li>
							<li>5、创店经营</li>
						</ul>
					</th>
				</tr>
				<tr height="176">
					<td>
						<p style="margin-bottom: 36px;"><img src="../../../../assets/images/join/join6.png"/><span>准备公司资质</span></p>
						<p><img src="../../../../assets/images/join/join7.png"/><span>准备经营资质</span></p>
					</td>
					<td>
						<p style="margin-bottom: 36px;"><img src="../../../../assets/images/join/join6.png"/><span>提交公司资质</span></p>
						<p><img src="../../../../assets/images/join/join7.png"/><span>提交公司资质</span></p>						
					</td>
					<td>
						<p style="margin-bottom: 36px;"><img src="../../../../assets/images/join/join1.png"/><span>公司信息审核</span></p>
						<p><img src="../../../../assets/images/join/join1.png"/><span>经营资质审核</span></p>						
					</td>
					<td>
						<p style="margin-bottom: 36px;"><img src="../../../../assets/images/join/join4.png"/><span>缴纳合同费用</span></p>
						<p><img src="../../../../assets/images/join/join2.png"/><span>账号开店授权</span></p>						
					</td>
					<td>
						<p style="margin-bottom: 36px;"><img src="../../../../assets/images/join/join5.png"/><span>发布商品</span></p>
						<p><img src="../../../../assets/images/join/join3.png"/><span>店铺装修</span></p>						
					</td>
				</tr>
			</table>
		</div>
		<div class="btnBox">
			<button class="submitBtn" @click="next">开始提交</button>
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

      };
    },
    components: {
      footerBox,
      joinProcess,
      joinHeader
    },    
    methods: {
    	next(){
    		this.$router.push('/join/writeInfo');
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

	
	.process2{
		padding:30px 70px 70px 70px;
		border-bottom: 1px solid gainsboro ;
		.title{
			font-size: 20px;
			color: #333333;			
		}
		table{
			margin-top: 20px;
			text-align: center;
			border: 1px solid #E6E6E6;

			th{
				background: #E7F1F8;
				border: 1px solid #E6E6E6;
			}
			td{
				border: 1px solid #E6E6E6;
				img{
					margin-right: 5px;
					height: 20px;
					width: 20px;
					margin-top: -3px;
				}
				p{
					height: 25px;
					line-height: 25px;
					span{
						font-size: 14px;
						color: #333333;				
					}
				}
			}
		}
	}
	.process2List{
		width: 100%;
		li{
			width:120px;
			overflow: hidden;
			font-size: 18px;
			font-weight: normal;
			color: #333333;			
			height: 76px;
			display: inline-block;
			line-height: 76px;
		}
		li.arrow{
			position: relative;
			width: 100px;
			span{
				position: absolute;
				display: block;
				width:95px;
				height: 1px;
				top: 50%;
				left: 0;
				background: #999999;
			}
			span:before{
				content: '';
				border: 6px solid #999999;
				position: absolute;
				border-left-color:rgba(0,0,0,0);
				border-top-color:rgba(0,0,0,0);
				transform: rotateZ(-45deg);
				right: 1px;
				top: -6px;
			}
		}
	}

.btnBox{
		width: 100%;
		height: 100px;
		line-height: 100px;
		text-align: right;
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