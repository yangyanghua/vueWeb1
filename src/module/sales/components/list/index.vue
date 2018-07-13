<template>
	
	<section  style="background: none;">
	<div class="content">
			     <div class="breadcrumb">
			      <el-breadcrumb separator="/">
			        <el-breadcrumb-item :to="{ path: '/' }">营销</el-breadcrumb-item>
			        <el-breadcrumb-item>促销活动</el-breadcrumb-item>
			      </el-breadcrumb>
			    </div>  		
		<ul class="navlist">
			<li>所有活动（100）</li>
			<li>满额优惠（50）</li>
			<li>满额优惠（50）</li>
			<li>满额优惠（50）</li>
		</ul>
	<div class="s_form">
<el-form ref="form" :model="form">
  <el-form-item style="width: 160px;display: inline-block;" >
    <el-select v-model="form.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item style="width: 160px;display: inline-block;" >
    <el-select v-model="form.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item style="width: 160px;display: inline-block;" >
    <el-select v-model="form.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item style="width: 160px;display: inline-block;" >
    <el-input v-model="form.name" placeholder="输入活动名称"></el-input>
  </el-form-item>  
  <el-form-item style="margin-left: 20px; display: inline-block;">
    <el-button type="primary" @click="onSubmit">查询</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>		
	</div>

<div class="t_content">
  <el-table
    :data="tableData"
    border
    style="width: 100%;overflow: hidden;">
    <el-table-column
      prop="name"
      label="活动名称">
    </el-table-column>
    <el-table-column
      prop="type"
      label="活动类型">
    </el-table-column>
    <el-table-column
      prop="startTime"
       width="200"
      label="开始时间">
    </el-table-column>
    <el-table-column
      prop="endTime"
      width="200"
      label="结束时间">
    </el-table-column>    
    <el-table-column
      prop="state"
      label="状态">
    </el-table-column>      
    <el-table-column
      label="操作">
      	<template slot-scope="scope">
 <el-button type="text" size="small">查看</el-button>     
 <el-button type="text" size="small">删除</el-button>      	
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


	
	</div>
	
	
	</section>
</template>

<script>

  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
        },
        currentPage4: 4,
        tableData: [{
          name: '王小虎',
          type:'满减优惠',
          startTime:'2016-05-02 15:20:00',
          endTime:'2016-05-02 15:20:00',
          state:'促销中',
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
	padding: 30px;
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