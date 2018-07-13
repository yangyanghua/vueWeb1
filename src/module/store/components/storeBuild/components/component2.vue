<template>
	<section>
		<ul class="c_content">
			<li><div class="layer"></div></li>
			<li><div class="layer"></div></li>
		</ul>
	</section>
</template>

<script>
</script>

<style lang="scss" scoped>
	.c_content{
		height: 187.5px;
		width: 380px;
		text-align: center;
		display: flex;
		box-sizing: border-box;
		padding: 2.5px 5px;
		li{
			float: left;
			height: 182.5px;
			width: 182.5px;
			position: relative;
			cursor: pointer;
			background:url(../../../../../assets/images/store/imgimg.png) no-repeat 50% 50% ;
			background-size:cover ;
			.layer{
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				background: rgba(150,150,150,0.5);
				display: none;
			}
		}
		li:nth-child(1){
			margin-right: 5px;
		}
		li:hover .layer{
			display: block;
		}
	}
</style>