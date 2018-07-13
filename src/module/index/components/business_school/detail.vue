<template>
	<div class="main">
		<!--面包屑-->
	    <div class="crumbs">
	      码上花商学院
	    </div>
	     <!-- / 面包屑-->
	     <div class="subject">

	        <div class="tableList">
	        	<h2 class="s_h2"><i></i>内容详细</h2>
	        	<div class="details":model="form">
	        		<h3>
	        			<p class="title">{{form.name}}</p>
	        			<p>更新时间：{{form.time}}</p>
	        		</h3>
	        		<p class="zi">{{form.content}}</p>
	        		<p class="hanldebaek">
	        			<el-button @click="hanldebaek">返回</el-button>
	        		</p>
	        		<div class="enclosure">
	        			<h2 class="s_h2"><i></i> 附 件</h2>
	        			<ul>
	        				<li>
	        					<img :src="form.dataImageUrl" alt="" width="100" height="100">
	        				</li>
	        				<li class="btn">
	        					<el-button type="primary" size="medium" icon="el-icon-download" @click="download">下载</el-button>
	        				</li>
	        			</ul>
	        		</div>
	        	</div>
	        	
	        </div>
	        
	     </div>
	</div>

</template>
<script>
import * as Service from '@/common/service/index/index.js';

	export default {
		data () {
			return{
				form:{
					name:'',
					time:'',
					content:'',
					dataImageUrl:'',
					id:''
				},
				dataUrl:''
			};
    
		},
		methods: {
			download(){
				location.href = this.dataUrl;	
			},
			/*返回上一步方法*/
		      hanldebaek(){
		        history.go(-1);
		      }
		},
		mounted(){
			/*回显编辑内容*/
			let vm = this;
			if(this.$route.query.id){
				this.form.id = this.$route.query.id;
				/*从后端拿*/
				Service.businessSchoolInfo({  /*查询指定ID接口*/
		            id: this.form.id
		         }).then(res =>{
		         	console.log(res);
		         	this.form = res; 
		         	this.dataUrl = res.dataUrl; //下载
		         }).catch((res) => {
						this.$message({
							type: 'error',
							message: res.message
						});
					}) 

			}
		}	
	}
</script>
<style lang="scss" scoped>
	
	.details{
		h3{
			text-align: center;
			margin-top: 20px;
			font-size:14px;
			color: #999999;
			.title{
				font-size: 20px;
				color: #333333;
			}
		}
		.zi{
			padding:20px;
			line-height:24px;
		}
		.hanldebaek{
			padding:20px;
			text-align: center;
		}
	}
	.enclosure{
		position: relative;
		height: 170px;

		h2{
			background:#F6F7F7;
		}
		ul{
			padding:10px;
			li{
				float: left;
				&.btn{
					margin-top: 30px;
					margin-left:30px;
				}
			}
		}

	}
</style>

