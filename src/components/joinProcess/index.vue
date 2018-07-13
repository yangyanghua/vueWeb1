<template>
	<section>
		<div class="process1">
			<ul class="process1List">
				<li  v-bind:class="{'active':active >= '1'}">
					<span class="line"></span>
					<span class="process_iocn"></span>
					<p>入驻介绍</p>
				</li>
				<li v-bind:class="{'active':active >='2'}">
					<span class="line"></span>
					<span class="process_iocn"></span>
					<p>提交入驻</p>
				</li>
				<li v-bind:class="{'active':active >='3'}">
					<span class="line"></span>
					<span class="process_iocn"></span>
					<p>平台审核</p>
				</li>
				<li v-bind:class="{'active':active >='4'}">
					<span class="line"></span>
					<span class="process_iocn"></span>
					<p>缴纳费用</p>
				</li>
				<li v-bind:class="{'active':active >='5'}">
					<span class="line"></span>
					<span class="process_iocn"></span>
					<p>入驻成功</p>
				</li>				
			</ul>
		</div>			
	</section>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    props: {
      active: {
        required: false,
        type: Number
      },
    },

  }

</script>


<style lang="scss" scoped>
	.process1{
		height: 176px;
		box-sizing: border-box;
		padding: 30px;
		width: 100%;
		text-align: center;
		background: #F5F5F5;
		border-bottom: 1px solid #E6E6E6;
	}
	.process1List{
		width: 100%;
		text-align: center;
		li{
			position: relative;
			padding-top: 10px;
			display: inline-block;
			width: 220px;
			p{
				margin-top: 14px;
				font-size: 20px;
				color: #666666;				
			}
			.process_iocn{
				height:40px;
				width: 40px;
				background:#F5F5F5 url(../../assets/images/join/Waiting.png) no-repeat 50% 50%;
				display: block;
				position: relative;
				z-index: 15;
				left: 50%;
				margin-left: -20px;
				background-size:cover ;
			}
			.line{
				position: absolute;
				height: 2px;
				width: 102%;
				display: block;
			    background: #C9C9C9;
			    z-index: 1;
			    top: 29px;
			}
		}
		li.active{
			p{
			font-size: 20px;
			color: #4DA9E4;				
			}
			.process_iocn{
				background:#F5F5F5 url(../../assets/images/join/Group.png) no-repeat 50% 50%;
				background-size:40px 40px ;
			}
			.line{
				background: #4DA9E4;		
			}			
		}
		
		
	}	
</style>