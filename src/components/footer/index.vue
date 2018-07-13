<template>
	<section>
		<div class="footer">
			<ul class="entInfo">
				<li>
					<h2>联系方式</h2>
					<p><span>客服电话：400-850-6055</span><span style="margin-left: 30px;">招商电话：020-29165571</span></p>
				</li>
				<li>
					<h2>地址</h2>
					<p>公司地址：广州市天河区珠江东路32号利通广场21楼</p>
				</li>
				<li>
					<img style="margin-right: 40px;" src="../../assets/images/join/shimingrenzheng.png"/>
					<img src="../../assets/images/join/wangxinrenzheng.png"/>
				</li>
			</ul>
			<div class="copBox">
			<p class="copyright">Copyright © 2010-2018 广州闪购软件服务有限公司 All Rights Reserved</p>
			<p class="copyright">粤ICP备10235323号-2 | SP号粤B2-20110</p>
			</div>
		</div>
	</section>
</template>

<script>
</script>

<style lang="scss" scoped>
	.footer{
		margin-top: 60px;
		height: 264px;
		width: 100%;
		background: #2B3847;
		.entInfo{
			display: flex;
			width: 1200px;
			padding-top: 50px;
			padding-bottom: 40px;
			border-bottom: 1px solid rgba(240,240,240,0.8);
			margin:auto;
			li{
				flex: 5;
				h2{
					font-size: 16px;
					color: #FFFFFF;
				}
				p{
					margin-top: 5px;
					font-size: 14px;
					color: #FFFFFF;
					opacity: 0.8;
				}
				img{
					margin-top: 20px;
				}
			}
			li:last-child{
				flex: 3;
				text-align: right;
			}
		}
		.copBox{
			width: 100%;
			margin-top:30px;
		}
		.copyright{
			margin-bottom: 5px;
			width: 100%;
			text-align: center;
			font-size: 14px;
			color: #FFFFFF;
			opacity: 0.8;
		}


	}
</style>
