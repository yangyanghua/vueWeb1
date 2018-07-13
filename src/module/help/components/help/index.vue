<template>
	
	<section  style="background: none;">


	
	</section>
</template>

<script>

  export default {
    data() {
      return {

      }
    },
    methods: {
     
    },
    mounted(){


    }
  }
</script>

<style lang="scss" scoped>

.BreadCrumbs{
	height: 30px;
	line-height: 30px;
}	
.content{
	width: 100%;
	background: white;	
	border: 1px solid gainsboro;
	padding: 30px;
	.he_title{
		width: 100%;
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		position: relative;
		font-weight: bold;
		i{
			position: absolute;
			height: 2px;
			width: 47px;
			bottom: 6px;
			left: 3px;
			background: #F04134;
		}
	}
	.msgTxt{
		margin-top: 5px;
		p{
			line-height: 24px;
			padding-left: 25px;
			font-size: 14px;
		}
	}
}
.processList{
	margin-top: 5px;
	padding-left: 25px;
    height: 220px;
	li.items{
    width: 135px;
    height: 210px;
    border: 1px solid #DCDCDC;
    float: left;
    margin: 0 6px;
    text-align: center;
    overflow: hidden;
    img{
    	width: 51px;
    	margin-top: 30px;
    	
    }
    h3{
    	margin-top: 20px;
    	color: #000000;
    	font-size: 14px;
    	text-align: center; 	
    }
    p{
    	padding: 0 5px;
    	font-size: 13px;
    	line-height: 24px;
    	text-align: center;
    	color: #666666;
    }		
	}
	li.jiant{
		width: 30px;
		height: 210px;
		float: left;
		text-align: center;
		line-height: 210px;
		font-size: 22px;
	}
}

		.out{
			width: 900px;
			height: 200px;
			margin-top: 5px;
			margin-left: 25px;
			overflow: hidden;
			text-align: center;
		}
		.con{
			width: 3200px;
			height: 100px;
			overflow: hidden;
			animation: move 29s linear infinite normal;
			animation-fill-mode:forwards;
		}
		.con:hover{
			animation-play-state:paused;
			-webkit-animation-play-state:paused;
		}
		.con li{
			float: left;
			width: 100px;
			height: 100px;			
			list-style: none;
			box-sizing:border-box ;
			padding: 5px;
			overflow: hidden;
		}
		.con img{
			float: left;
			width: 100%;
			border: 1px solid gainsboro;
		}

		@keyframes move{
			0%{transform:translateX(0px);}
			100%{transform:translateX(-2300px);}
		}



</style>