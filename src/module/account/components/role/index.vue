<template>
  <div class="main">

    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">设置</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
	<div class="s_form">
	<el-form ref="form"  label-width="80px" >
	
	  <el-form-item style="width: 400px;display: inline-block;" label="角色名称" >
		  <el-input
		    size="mini"
		    placeholder="请输入内容"
		    suffix-icon="el-icon-date"
		    v-model="input9">
		  </el-input>
	  </el-form-item>
	  <el-form-item style="width:400px ; margin-left: 20px; display: inline-block;">
	    <el-button size="mini" type="primary" @click="onSubmit">查询</el-button>
	    <el-button size="mini">重置</el-button>
	    <el-button size="mini" type="primary" style="margin-left: 120px;">提现</el-button>
	  </el-form-item>
	</el-form>		
	</div>
	 <el-button @click="addRoledialogVisible=true" size="mini" type="primary" style="margin-bottom: 10px;">新建角色</el-button>
    <div class="roleTableContent">
		  <el-table
		    :data="tableData"
		    border
		    style="width: 100%">
		    <el-table-column
		      prop="name"
		      label="角色名称">
		    </el-table-column>
		    <el-table-column
		      prop="describe"
		      label="角色描述">
		    </el-table-column>
		    <el-table-column
		      prop="creatTime"
		      label="创建日期">
		    </el-table-column>		    
		    <el-table-column
		      prop="creater"
		      label="创建人">
		    </el-table-column>			    
		    <el-table-column
		      prop="userNum"
		      label="用户数">
		    </el-table-column>	
		    
		    <el-table-column
		      label="操作">
		     <template slot-scope="scope">
		     	<el-button type="text" size="mini">查看</el-button>
		     	<el-button type="text" size="mini">删除</el-button>
		     	<el-button type="text" size="mini" @click="dialogVisible=true">角色授权</el-button>
		     </template> 
		    </el-table-column>
		    
		  </el-table>    	
    	
<div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>	
</div>
    </div>
    <!--
    	作者：1063676593@qq.com
    	时间：2018-01-19
    	描述：角色授权
    -->
    
	<el-dialog
	  title="角色授权"
	  :visible.sync="dialogVisible"
	  width="60%">
	  <h2>当前角色：<span style="color: #F04134;">财务</span></h2>
	  <div class="infoTbc">
  			<el-checkbox :indeterminate="isIndeterminate" style="border: 1px solid gainsboro; width: 100%;height: 30px;line-height: 30px;padding-left: 20px; background: #FBFBFB;" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
			  <el-checkbox-group style="border: 1px solid gainsboro;border-top:none ;border-right:none ; width: 100%;padding-left: 20px;display: flex;height: 30px;line-height: 30px;" v-model="checkedCities" @change="handleCheckedCitiesChange">
			    <el-checkbox  style="flex: 1;border-right: 1px solid gainsboro;" v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
			  </el-checkbox-group>		  	
		</div>
	  <div class="infoTbc">
  			<el-checkbox :indeterminate="isIndeterminate" style="border: 1px solid gainsboro; width: 100%;height: 30px;line-height: 30px;padding-left: 20px; background: #FBFBFB;" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
			  <el-checkbox-group style="border: 1px solid gainsboro;border-top:none ;border-right:none ; width: 100%;padding-left: 20px;display: flex;height: 30px;line-height: 30px;" v-model="checkedCities" @change="handleCheckedCitiesChange">
			    <el-checkbox  style="flex: 1;border-right: 1px solid gainsboro;" v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
			  </el-checkbox-group>		  	
		</div>
	  <div class="infoTbc">
  			<el-checkbox :indeterminate="isIndeterminate" style="border: 1px solid gainsboro; width: 100%;height: 30px;line-height: 30px;padding-left: 20px; background: #FBFBFB;" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
			  <el-checkbox-group style="border: 1px solid gainsboro;border-top:none ;border-right:none ; width: 100%;padding-left: 20px;display: flex;height: 30px;line-height: 30px;" v-model="checkedCities" @change="handleCheckedCitiesChange">
			    <el-checkbox  style="flex: 1;border-right: 1px solid gainsboro;" v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
			  </el-checkbox-group>		  	
		</div>		
	 
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="dialogVisible = false">取 消</el-button>
	    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
	  </span>
	</el-dialog>    
  <!--
  	作者：1063676593@qq.com
  	时间：2018-01-19
  	描述：新增角色
  -->  

	<el-dialog
	  title="新增角色"
	  :visible.sync="addRoledialogVisible"
	  width="50%">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="活动名称" prop="name">
			    <el-input v-model="ruleForm.name"></el-input>
			  </el-form-item>
			  <el-form-item label="活动形式" prop="desc">
			    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
			     <el-button @click="addRoledialogVisible = false">取 消</el-button>
			  </el-form-item>
			</el-form>
	</el-dialog> 
 
  </div>
</template>
<script>
	const cityOptions = ['上海', '北京', '广州', '深圳'];
  export default {
    data() {
      return {
      	dialogVisible:false,
      	addRoledialogVisible:false,
        checkAll: false,
        checkedCities: ['上海', '北京'],
        cities: cityOptions,
        isIndeterminate: true,      	
      	currentPage4:2,
      	input9:'',
        tableData: [{
          name: '超级管理员',
          describe:'超级管理员',
          creatTime:'2018-12-12 12:00:00',
          creater:'王大锤',
          userNum:'10',
        }] ,
        ruleForm: {
          name: '',
          desc: ''
        },        
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }        
      }
    },
    methods: {
    	onSubmit(){
    		console.log(213);
    	},
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
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      } ,
      
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      }      
    },
    mounted(){

    }
  }

</script>
<style lang="scss" scoped>
.pagination{
	text-align: center;
}
		.infoTbc{
			margin-left: 30px;
			margin-top: 20px;
		}
</style>

