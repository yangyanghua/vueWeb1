<template>
	<section >
		<div class="content">
			     <div class="breadcrumb">
			      <el-breadcrumb separator="/">
			        <el-breadcrumb-item :to="{ path: '/' }">营销</el-breadcrumb-item>
			        <el-breadcrumb-item>新建活动</el-breadcrumb-item>
			      </el-breadcrumb>
			    </div> 			
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="活动范围" prop="resource">
			    <el-radio-group v-model="ruleForm.resource">
			      <el-radio label="商品"></el-radio>
			      <el-radio label="全店"></el-radio>
			    </el-radio-group>
			  </el-form-item>
			  <el-form-item label="活动类型" prop="resource">
			    <el-radio-group v-model="ruleForm.resource">
			      <el-radio label="满额优惠"></el-radio>
			      <el-radio label="满件优惠"></el-radio>
			      <el-radio label="限时折扣"></el-radio>
			    </el-radio-group>
			  </el-form-item>			  
			  <el-form-item label="活动名称" prop="name">
			    <el-input v-model="ruleForm.name"></el-input>
			  </el-form-item>
			  <el-form-item label="优惠方式" prop="region">
			    <el-select v-model="ruleForm.region" placeholder="请选择优惠方式">
			      <el-option label="方式一" value="shanghai"></el-option>
			      <el-option label="方式二" value="beijing"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="活动时间" required>
			    <div style="width: 100%;height: 40px;">
				    <el-col :span="5">
				      <el-form-item prop="date1">
				        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
				      </el-form-item>
				    </el-col>
				    <el-col class="line" style="text-align: center;" :span="1">—</el-col>
				    <el-col :span="5">
				      <el-form-item prop="date2">
				        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
				      </el-form-item>
				    </el-col>			    	
			    </div>
			    <div style="width: 100%;height: 40px;margin-top: 5px;">
				    <el-col :span="5">
				      <el-form-item prop="date1">
				        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
				      </el-form-item>
				    </el-col>
				    <el-col class="line" style="text-align: center;" :span="1">—</el-col>
				    <el-col :span="5">
				      <el-form-item prop="date2">
				        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
				      </el-form-item>
				    </el-col>			    	
			    </div>
			  </el-form-item>
			  <el-form-item label="活动说明" prop="desc">
			    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
			  </el-form-item>
			  <div class="addR" >
			  	<div class="addItem">
			  		<span>单笔订单满</span>
			  		<el-input v-model="ruleForm.name" style="width: 80px;"></el-input>
			  		<span>元，减</span>
			  		<el-input v-model="ruleForm.name" style="width: 80px;"></el-input>
			  		<span>元</span>
			  		<el-button type="text" size="small" style="margin-left: 20px;">删除</el-button>   
			  	</div>

			  	<div class="addItem">
			  		<span>单笔订单满</span>
			  		<el-input v-model="ruleForm.name" style="width: 80px;"></el-input>
			  		<span>件，减</span>
			  		<el-input v-model="ruleForm.name" style="width: 80px;"></el-input>
			  		<span>元</span>
			  		<el-button style="margin-left: 20px;" type="text" size="small">删除</el-button>   
			  	</div>
			  	<el-checkbox v-model="ruleForm.baoyou">包邮</el-checkbox>
			  </div>
			  <p style="text-align: right;margin-top: 5px;"><el-button style="margin-left: 20px;" type="text" size="small">+添加更多优惠层次</el-button><span>【注：“优惠条件”必须逐级递增】</span>   </p>
			  
			  <el-form-item label="优惠商品" prop="desc">
			    <el-button  type="text" size="small">已选择（0）个宝贝</el-button>
			  </el-form-item>			 
			<div class="proTable">
			 <div class="optHaed">
			 	  <el-button size="mini" round>批量取消</el-button>
			 	  <div class="opt_right">
			 	  	<span>商品折扣：</span>
			 	  	<el-input size="mini" style="width: 60px;margin-right: 10px;"  > </el-input>
			 	 	<span>每人限购：</span>
			 	 	<el-input size="mini" style="width: 60px;margin-right: 10px;"  > </el-input>
			 	 	<el-button size="mini" round>批量设置</el-button>
			 	 	<el-button size="mini" round>重置</el-button>
			 	  </div>
			 </div>	 
			 <div class="proTableContent" >
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%"
				    @selection-change="handleSelectionChange">
				    <el-table-column
				      type="selection"
				      width="55">
				    </el-table-column>				    
				    <el-table-column
				      prop="name"
				      width="260"
				      label="商品名称">
				    </el-table-column>
				    <el-table-column
				      label="码上花价">
				     <template slot-scope="scope"> 
				     	<el-input size="mini" v-model="scope.row.iflashPrice" > </el-input>
				     </template>  
				    </el-table-column>
				    <el-table-column
				      label="折扣">
				     <template slot-scope="scope"> 
				     	<el-input size="mini" v-model="scope.row.discount" > </el-input>
				     </template> 				      
				    </el-table-column>
				    <el-table-column
				      label="折扣价">
				     <template slot-scope="scope"> 
				     	<el-input size="mini" v-model="scope.row.discountPrice" > </el-input>
				     </template>				      
				    </el-table-column>
				    <el-table-column
				      label="每人限购">
				     <template slot-scope="scope"> 
				     	<el-input size="mini" v-model="scope.row.purchasing" > </el-input>
				     </template>				      
				    </el-table-column>				    
				    <el-table-column
				      label="操作">
				     <template slot-scope="scope">
				     	<el-button type="text" size="small">删除</el-button>   
				     </template>  
				    </el-table-column>
				  </el-table>			 	
			 </div>
			 
			</div> 
			 <el-form-item style="margin-top: 30px;">
			    <el-button type="primary" @click="submitForm('ruleForm')">创建活动</el-button>
			    <el-button @click="resetForm('ruleForm')">取消</el-button>
			  </el-form-item>
			</el-form>			
		</div>

	</section>

</template>

<script>

  export default {
    data() {
      return {
      	multipleSelection:[],
        tableData: [{
          name: '1王小虎',
          iflashPrice:'120.00',
          discount:15,
          discountPrice:'60.00',
          purchasing:10,
        },
		{
          name: '2王小虎',
          iflashPrice:'120.00',
          discount:25,
          discountPrice:'60.00',
          purchasing:10,
        },
		{
          name: '3王小虎',
          iflashPrice:'120.00',
          discount:35,
          discountPrice:'60.00',
          purchasing:10,
        },        
        ],
        ruleForm: {
          baoyou:'',
          name: '',
          region: '',
          date1: '',
          date2: '',
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }      	
		}
    },

    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }     
    },
 	mounted() {

	 },	   
    
  }

</script>

<style lang="scss" scoped>
@import url("../list/table.css");
	.content{
		padding: 30px;
		width: 100%;
		border: 1px solid gainsboro;
		background: white;
	}
	.BreadCrumbs{
		height: 30px;
		line-height: 30px;
	}
	.addR{
		background: #FBFBFB;
		padding: 20px;
		margin-left: 99px;
	}
	.addItem{
		margin-bottom: 8px;
	}
	.optHaed{
		margin-left: 99px;
		height: 40px;
		line-height: 40px;
		padding:0 20px;
		background: #FBFBFB;
	}
	.opt_right{
		float: right;
		width: 70%;
		text-align: right;
	}
	.proTableContent{
		margin-left: 99px;
		margin-top: 10px;
	}
</style>