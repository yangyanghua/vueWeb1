<template>
	<div class="main">
		<!--面包屑-->
	    <div class="crumbs">
	      店铺装修
	    </div>
	    <!-- / 面包屑-->
		<div align="center" class="subject" >
		 	<div class="filter_query mat20" style="padding-top:20px;">
		 		<el-button type="primary"  @click="$router.push({path:'/store/storeTemplate/choosePro'})" >选择推荐商品</el-button>
				<div style="margin-top: 20px;">
			    		<img  class="selectTemple_img" id="defalut"   src="../../../../assets/images/store/defalut.png" />			    
			    </div>   
		 	</div>						
		</div>
	</div>
</template>

<script>
import {getStoreTemplate} from '../../service.js';
  export default {
    data() {
      return {
      	storeTemplate:'',
      }
    },
    methods: {
		_getStoreTemplate(){
		 		getStoreTemplate().then((res) => {
						this.data = res;
						
					}).catch((res) => {
						console.log('error ', res);
						/*this.$message({
							type: 'error',
							message: res.message
						}); */
						if ( (res.code == -1 && res.message == '未创建店铺') || (res.code == -3 && res.message == '属性有误') ) {							
								         this.$alert('您需要完善店铺信息之后才能使用该模块', '提示', {
									          confirmButtonText: '确定',
									          callback: action => {
													this.$router.push({
														path:'/store/info/edit'
													});					
									          }
									        });  	      
	
						}
						
			})
		}
    },mounted(){
		this._getStoreTemplate();

    }
  }
</script>

<style>
	.BreadCrumbs{
		height: 30px;
		line-height: 30px;
	}
	.templeSelecontent{
		padding: 30px;
		background: white;
		padding-bottom: 60px;
		border: 1px solid gainsboro;
	}
	.selectTemple_img{
		box-shadow: 0px 3px 9px 0px #999999;
		margin-top: 5px;
		width: 280px;
	}
	.swiper-slide{
		position: relative;
		padding-bottom: 30px;
	}
	.selectTemple{
		position:absolute;
		bottom: 0;
		text-align: center;
		left: 0;
		width: 100%;
	}
	
input[type="radio"]{
  -webkit-appearance: none;
  outline: none;
}
input[type="radio"]{
  position: relative;
  height: 16px;
  width: 16px;
  border: 1px solid gainsboro;/*no*/
  border-radius:50%;
  vertical-align: middle;
  background: white;
}

input[type="radio"]:checked:after {
  content: '';
  position: absolute;
  height: 16px;
  width: 16px;
  top: -1px;
  left:-1px;
  border: none;
  background-color:#e94d1b;
  background: url(../../../../assets/images/store/ridio.png) no-repeat left top;
  background-size:16px 16px ;
  border-radius:50%;

}
input[type="radio"]:checked {
  background-color: #fff;
}
html,body{
	width: 100%;
	height: 100%;
}
body{
	position: relative;
}	
.viewtempleContent{
	text-align: center;
	display: none;
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 200;
	background: rgba(50,50,50,0.8);
}
.viewtempleContent img{
	height: 100%;	
	margin: auto;
}
.viewtempleContent .close_btn{
	position: absolute;
	top: 50px;
	right: 20%;
	color: white;
	border: 1px solid white;
	width: 50px;
	height: 50px;
	border-radius:50% ;
	line-height: 45px;
	text-align: center;
	font-size: 25px;
	cursor: pointer;
	transition: all 0.3s;
}
	
</style>