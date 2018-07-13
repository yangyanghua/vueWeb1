<template>
	<div class="main">
		<div class="breadcrumb">
	      <el-breadcrumb separator="/">
	        <el-breadcrumb-item :to="{ path: '/' }">运费模板管理</el-breadcrumb-item>
        	<el-breadcrumb-item>{{ editStatus?'编辑':'新增' }}运费模板</el-breadcrumb-item>
	      </el-breadcrumb>
	    </div>	
		<div class="freightRules">
			<p>运费规则说明：</p>
			除制定区域外，其他地区采用默认运费。
		</div>
	    <div class="form">
	    	<el-form ref="form" :model="form" label-width="100px">
	    		<el-form-item label="模板名称" required>
	            	 <el-input v-model="form.suitName" placeholder="30个字符以内"></el-input>
	                 <div class="el-form-item__error">
				        {{error1}}
				     </div>
          		</el-form-item>

          		<el-form-item label="计费方式" required>
		            <el-radio-group v-model="dateType">
		              <div class="timelimit">
		                <el-radio label="1" class="mgr10">
		                  按件数
		                </el-radio>
		                
		                <el-radio label="2" class="mgr10">
		                  按重量
		                </el-radio>
		                
		              </div>
		            </el-radio-group>
		            <div class="el-form-item__error">
		                  {{error2}}
		                </div>
		        </el-form-item>

		        <el-form-item label="默认运费" required>
		           <div>
		           	 <el-input class="input_150" v-model="form.pieceWithin" placeholder=""></el-input>
		             件内，
		             <el-input class="input_150" v-model="form.element" placeholder=""></el-input>
		             元， 每增加
		             <el-input class="input_150" v-model="form.piece" placeholder=""></el-input>
		             件， 增加运费
		             <el-input class="input_150" v-model="form.freightElement" placeholder=""></el-input>
		             元
		           </div>

		            <div class="el-form-item__error">
		                  {{error3}}
		                </div>
		        </el-form-item>
		        <div class="setUp">
		        	设置指定地区运费：
		        </div>
				<table class="table-strip-ls">
					 <thead>
			            <tr>
			              <td>运送到</td>
			              <td class="w106">首件（个）</td>
			              <td class="w106">运费（元）</td>
			              <td class="w106">续件（个）</td>
			              <td class="w106">运费（元）</td>
			              <td class="w106">操作</td>
			            </tr>
			          </thead>
			          <tbody>
			          	<tr>
			          		<td>
			          			未添加地区
			          			<el-button type="text" class="btn-handle" @click="editDetail(entry.id)"> 编辑</el-button>
			          		</td>
			          		<td><el-input size="mini" class="input_80" v-model="form.pieceWithin" placeholder=""></el-input></td>
			          		<td><el-input size="mini" class="input_80" v-model="form.pieceWithin" placeholder=""></el-input></td>
			          		<td><el-input size="mini" class="input_80" v-model="form.pieceWithin" placeholder=""></el-input></td>
			          		<td><el-input size="mini" class="input_80" v-model="form.pieceWithin" placeholder=""></el-input></td>
			          		<td>
			          			<el-button type="text" class="btn-handle" @click="deleteEntry(item.id)"> 删除</el-button>
            				</td>
			          	</tr>
			          </tbody>
				</table>
				<div class="add-area">
					<i class="el-icon-plus"></i>
					<el-button type="text" class="btn-handle" @click="addArea()"> 添加地区</el-button>
				</div>
				<el-form-item>
		            <el-button type="primary" @click="onSubmit">保存</el-button>
		            <el-button @click="$router.go(-1)">取消</el-button>
		        </el-form-item>	
	    	</el-form>
	    </div>
	</div>

</template>
<script>
	export default {
		data () {
			return{
				form:{
					suitName:''
				},
				editStatus: false,
				dateType:'1',
				error1: '',
				error2: '',
				error3: ''
			}
		}	
	}
</script>
<style lang="scss" scoped>
	.freightRules{
		background:#FFF5F3;
		padding:14px 15px;
		line-height:24px;
		margin-bottom:15px;
		p{
			font-weight:600;
		}
	}
	.input_150{
		width:80px;
	}
	.input_80{
		width:60px;
		
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
	}
	.add-area{
		margin-bottom:15px;
	}
</style>
