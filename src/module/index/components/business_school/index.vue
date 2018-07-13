<template>
  <div class="main">
     <!--面包屑-->
    <div class="crumbs">
      码上花商学院
    </div>
     <!-- / 面包屑-->
    
   
     <div class="subject">
         <!--筛选查询-->
        <div class="filter_query mat20">
          <h2 class="s_h2"><i></i>筛选查询</h2>
          <el-form :inline="true" :model="preSearchForm" class="demo-form-inline">   
            <el-form-item label="">
              <el-input size="medium" class="input_150" v-model="preSearchForm.name" placeholder="输入内容"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search"  @click="onSubmit">搜索</el-button>
              <el-button size="medium" icon="el-icon-refresh" @click="onReset" >重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!--   /  筛选查询-->
        <!--表格列表-->
        <div class="tableList">
            <h2 class="s_h2"><i></i>数据列表</h2>
            <table class="table-strip-ls">
              <thead>
                <tr>
                  <td width="30%">
                    封面
                  </td>
                  <td width="43%">标题</td>
                  <td width="16%">更新时间</td>
                  <td width="90">操作</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="businessSchool in dataList" :key="businessSchool.id">
                  <td>
                    <img :src="businessSchool.dataImageUrl" alt="" width="100" height="100" >
                  </td>
                  <td>
                    {{businessSchool.name}}
                  </td>
                  <td>
                    {{businessSchool.time}}
                  </td>  
                  <td>
                    <el-button type="primary" size="mini"  icon="el-icon-search"  @click="onContent(businessSchool.id)">查看</el-button>
                  </td> 
                </tr>
                <tr v-if="dataList.length===0">
                  <td colspan="3" class="com-nodata">暂无数据</td>
                </tr>
              </tbody>
            </table>
            <div class="pagination" v-if="dataList.length!==0">
              <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="totalRecord">
              </el-pagination> -->
              <p class="sj">
                共<i>{{currentPage}}</i>页/<i>{{totalRecord}}</i>条数据
              </p>
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="100"
      layout="prev, pager, next, jumper" :total="totalRecord">
              </el-pagination>
            </div>
        </div>
        <!--  /  表格列表-->
     </div>
  </div>

</template>
<script>
  import * as Service from '@/common/service/index/index.js';
  export default {
    data() {
      return {
        searchForm:{
          name:''
        },
        preSearchForm:{
          name:''
        },
        dataList:[],
        currentPage:1,
        pageSize:10,
        totalRecord:0
       
      }
    },
    methods: {
        /*搜索 */
        onSubmit(){
          this.currentPage =1;
          this.searchForm = Object.assign({},this.preSearchForm);  
          this.businessSchoolList();
        },
         /*重置*/
        onReset(){
          this.currentPage =1;
          this.searchForm = {
              name:''
          },
          this.preSearchForm = {
              name:''
          },
          this.businessSchoolList()
        },
        handleSizeChange(val){
        console.log(`每页 ${val} 条`);
        this.currentPage = 1;
        this.pageSize = val;
        this.businessSchoolList();
        },
        handleCurrentChange(val){
          console.log(`当前页: ${val}`);
          this.currentPage = val;
          this.businessSchoolList();
        },
        /*码上花商学院*/ 
        businessSchoolList(){
          let params = {
             pageSize:this.pageSize,
             currentPage:this.currentPage,
             name:this.searchForm.name
          }
          Service.businessSchoolList(params).then(res=>{
          console.log(res);
          this.dataList = res.content;
          this.totalRecord = res.totalElements;

          }).catch(res=>{
            //出现异常
            this.$message.error(res,message);
          })
        },
        /*详情*/   
        onContent(bannerId){
          this.$router.push({
            path:'/index/schoolDetail',
            query:{
              id:bannerId
            }
          })
        }
      	

    },
    mounted(){
      /*显示码上花商学院列表*/ 
      this.businessSchoolList(); 
    }
  }

</script>
<style lang="scss" scoped>

  

  
</style>
