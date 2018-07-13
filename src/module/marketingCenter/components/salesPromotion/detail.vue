<template>
	<div class="main logistics">
		 <!--面包屑-->
      <div class="crumbs">
         促销管理
      </div>
      <!-- / 面包屑--> 
      <div class="subject">
      	<div class="filter_query mat20">
      		
	    <div class="form" >
	    	<el-form ref="form" :model="form" label-width="100px">
	    		<el-form-item label="活动类型：">
	            	 {{form.promoType}}
	            	 <i v-if="form.isAllJoin==0">(全店)</i>
          		</el-form-item>
				<el-form-item label="活动名称：">
	            	 {{form.name}}
          		</el-form-item>

	    		<el-form-item label="活动时间：">
	            	 {{form.effectiveFrom}}至 {{form.effectiveTo}}
          		</el-form-item>
          		<el-form-item label="活动说明：">
	            	 {{form.content}}
          		</el-form-item>
		       <el-form-item label="活动说明：">
	            	 {{form.content}}
          		</el-form-item>
		       
				
				<el-form-item style="padding-bottom:20px;">
		            <el-button @click="$router.go(-1)">返回</el-button>
		        </el-form-item>	
	    	</el-form>
	    </div>
      	</div>
      	
      </div>
	
	</div>
</template>
<script>
import {getTocity} from '../../service.js';
import * as Service from '@/common/service/logistics/index.js';	
import {promoteAdd,promoteUpdate,promoteInfo} from '@/common/service/marketingCenter/index.js';	

	
	export default {
		data () {
			return{
				dialogVisible:false,
				form:{
					promoType:'',
					name:'',
					effectiveFrom:'',
					effectiveTo:'',
					content:'',
					
				},
				
			}
		},
		methods: {
		  _getTocity(){

		     getTocity().then(res => {
				this.data = res;
		      }).catch(res => {
		        this.$message.error(res.message);
		      })      		
		  },       	 	
		},
		mounted(){
			this._getTocity();
		}	
	}
</script>
<style lang="scss" scoped>
// @import url("./el-tree.scss");

		

	.freightRules{
		background:#FFF5F3;
		padding:14px 15px;
		line-height:24px;
		margin-bottom:15px;
		p{
			font-weight:600;
		}
	}
	.input_default{
		width:85px;
	}
	.input_mini{
		width:85px;
		
	}
	.table-strip-ls tbody .btn-handle{
		color:#F26749;
	}
	.setUp{
		font-size:14px;
		padding-bottom:15px;
	}
	.table-strip-ls{
		margin-bottom:15px;
		font-size:14px;
		border-top:1px solid #ddd;
	}
	.add-area{
		margin-bottom:15px;
	}
	
	.el-tree{
		.is-focusable{
			color: red !important;
		}
	}
	
	.checkList{
		margin-bottom: 20px;
		height: 30px;
		width: 100%;
		// width: 500px;
		li{
			height: 30px;
			line-height: 30px;
			float: left;
			width: 120px;			
			position: relative;
			.el-checkbox + .el-checkbox{
				margin-left: 0;
			}
			.checkBoxItem{
				width: 100%;
				height: 30px;
				position: absolute;
				top: 0;
				left: 0;
				background: white;
				overflow: hidden;
				box-sizing: border-box;
				padding: 5px;
				&.active{
					width: 520px;
					
				z-index: 10000;	
				border: 1px solid gainsboro;
				box-shadow:0 1px 8px -2px #999999;
				height: auto;						
				}				
			}
			
			.optBtn{
				display: inline-block;
				position: absolute;
				width: 30px;
				height: 30px;
				top: 2px;
				right: 14px;
				transition: all 0.3s;
				text-align: center;
				line-height: 33px;
				cursor: pointer;
				background: #FBFBFB;
				z-index: 50;
				&.active{
					transform: rotateZ(180deg);
				}
				
			}

			.el-checkbox-group{
				overflow: hidden;
			}
			.el-checkbox{
				margin-right: 5px;
				// width: 100%;
				width: 120px;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;				
			}
		}
	}
	
	
	
	
	
</style>
