<template>
  
	<div class="main">
   <!--面包屑-->
    <div class="crumbs">
      订单详情
    </div>
     <!-- / 面包屑--> 
	<div class="content">
			     <!-- <div class="breadcrumb">
			      <el-breadcrumb separator="/">
			        <el-breadcrumb-item :to="{ path: '/' }">订单管理</el-breadcrumb-item>
			        <el-breadcrumb-item>订单详情</el-breadcrumb-item>
			      </el-breadcrumb>
			    </div> 	 -->
	<div class="s_form">
<el-form ref="form" :model="form" label-width="80px" >

  <el-form-item style="width: 400px;display: inline-block;" label="创建日期" >
    <el-date-picker
      v-model="value6"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </el-form-item>
  <el-form-item style="width:400px ; margin-left: 20px; display: inline-block;">
    <el-button type="primary" @click="onSubmit">查询</el-button>
    <el-button>重置</el-button>
    <el-button type="primary" style="float: right;">提现</el-button>
  </el-form-item>
</el-form>		
	</div>

<div class="t_content">
	<h2 style="color: #F04134;font-size: 14px;">清算记录</h2>
  <el-table
    :data="tableData"
    border
    style="width: 100%;overflow: hidden;">
    <el-table-column
      prop="name"
      label="企业名称">
    </el-table-column>
    <el-table-column
      prop="type"
      label="业务类型">
    </el-table-column>
    <el-table-column
      prop="amount"
      label="交易金额">
    </el-table-column>
    <el-table-column
      prop="orderCod"
      width="200"
      label="交易流水号/关联订单">
    </el-table-column>    
    <el-table-column
      prop="creatTime"
      width="200"
      label="创建时间">
    </el-table-column>    
    <el-table-column
      prop="updater"
      label="更新人">
    </el-table-column>       
    <el-table-column
       width="200"
       prop="updateTime"	
      label="更新时间">
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


	
	</div>
	
	
	</div>
</template>

<script>

  export default {
    data() {
      return {
      	value6:'',
        form: {
          name: '',
          region: '',
        },
        currentPage4: 4,
        tableData: [{
          name: '王小虎',
          amount:'120.00',
          type:'入账',
          orderCod:'12564321635413545',
          creatTime:'2018-11-12 12:20:00',
          updater:'王小虎',
          updateTime:'2016-05-02 15:20:00',
        },
        
        ]
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }      
    },
    mounted(){


    }
  }
</script>

<style lang="scss" scoped>
@import url("./table.css");
.BreadCrumbs{
	height: 30px;
	line-height: 30px;
}	
.content{
	width: 100%;
	background: white;	
	border: 1px solid gainsboro;
	padding:30px;
	padding-bottom: 30px;
}
.navlist{
	width: 100%;
	height: 30px;
	 li{
		width: 120px;
		height: 30px;
		line-height: 30px;
		float: left;
		margin-right: 30px;
		text-align: center;
		border: 1px solid gainsboro;
	}
}
.s_form{
	margin-top: 15px;
}
.pagination{
	width: 100%;
	text-align: center;
	margin-top: 15px;
}

</style>