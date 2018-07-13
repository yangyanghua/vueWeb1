<template>
  <div class="main">
    <!--面包屑-->
      <div class="crumbs">
        运费模板管理
      </div>
      <!-- / 面包屑-->
    <div class="subject">
       <!--筛选查询-->
      <div class="filter_query mat20">
        <h2 class="s_h2"><i></i>筛选查询</h2>
          <el-form :inline="true" :model="preSearchForm" class="demo-form-inline">
            <el-form-item label="">
              模版名称：
            </el-form-item>
            <el-form-item label="">
              <el-input size="medium" v-model="preSearchForm.nameInput" placeholder="名称关键字"></el-input>
            </el-form-item>
            <el-form-item label="">
              [当前共 {{totalElements}} 条记录] 
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="onSubmit">查询</el-button> 
              <el-button size="medium" icon="el-icon-refresh" @click="onReset">重置</el-button>
            </el-form-item>
            <!-- <el-form-item style="float: right;">
              <el-button type="primary" size="medium" @click="addNewEntry()">新增运费模板</el-button>
            </el-form-item> -->
          </el-form>
      </div>
       <!--   / 筛选查询-->

       <div class="tableList">
       <h2 class="s_h2"><i></i>数据列表   <p class="btn_qj"><el-button type="primary" size="medium" @click="addNewEntry()">新增运费模板</el-button></p></h2>
         <div class="ma_list" v-for="item in dataList" :key="item.id">
           <div class="mp_title">
          <p>【{{item.type==='P'?'按件数':'按重量'}}】 {{item.ruleName}}</p>
          <p>
            最后编辑时间：{{item.updateTime}}   
            <el-button type="text" class="btn-handle" @click="copyTemplate(item.id)">复制模板
            </el-button>
            <i class="btnsplit"></i>  
            <el-button type="text" class="btn-handle" @click="editDetail(item.id)"> 编辑
            </el-button>
            <i class="btnsplit"></i>
            <el-button type="text" class="btn-handle" @click="deleteEntry(item.id)"> 删除
            </el-button>
          </p>
        </div>
        <div style="clear: both;"></div>
        <table class="table-strip-ls">
          <thead>
            <tr>
              <td>运送到</td>
              <td class="w110">{{item.type==='P'?'首件（个）':'首重（kg）'}}</td>
              <td class="w110">运费（元）</td>
              <td class="w110">{{item.type==='P'?'续件（个）':'续重（kg）'}}</td>
              <td class="w110">运费（元）</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="list in item.ruleItem">
              <td>{{list.showName}}</td>
              <td>{{list.baseunit}}</td>
              <td>{{list.baseprice}}</td>
              <td>{{list.increaseunit}}</td>
              <td>{{list.increaseprice}}</td>
            </tr>
            <tr v-if="item.ruleItem.length===0">
              <td colspan="5" class="com-nodata">暂无数据</td> 
            </tr> 
          </tbody>
        </table>
     </div>
     <div v-if="dataList.length===0" class="ma_listNo" >
    	 <p style="width: 100%;text-align: center;color: #999999;"></p>  暂无数据
     </div>
     <!--分页-->
      <div class="pagination" v-if="dataList.length!==0">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="totalRecord">
      </el-pagination>
    </div> 
       </div>
    </div>
    
    
  </div>
</template>
<script>
 import * as Service from '@/common/service/logistics/index.js';   
  export default {
    data() {
      return {
        currentPage:1,
        pageSize:10,
        totalRecord:0,
        searchForm: {
          nameInput: '',
        },
        preSearchForm: {
          nameInput: '',
        },
        dataList:[],
        totalElements:''
      }
    },
    methods: {
      /*编辑*/
      editDetail(id) {
        this.$router.push({
          path: '/logistics/template_detail',
          query: {id: id}
        })
      },
      /*删除*/	
      deleteEntry(_id) {
        this.$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            id : _id
          };
          Service.templateDelete(params).then(res => {
            this.getList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(res => {
            this.$message.error(res.message);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      /*复制*/ 
      copyTemplate(id){
          let params = {
              id:id
          };
          Service.templateCopy(params).then(res => {
          console.log('get list ',res);
          this.dataList.unshift(res);
        }).catch(res => {
            this.$message.error(res.message);
        })
      },
      /*查询*/
      onSubmit() {
         this.searchForm = Object.assign({},this.preSearchForm);
         this.getList();
      },
      /*重置*/
      onReset(){
          this.preSearchForm = {
            nameInput: ''
          };
          this.searchForm = {
            nameInput: ''
          };
          this.getList();
      },
      /*新增运费模板*/
      addNewEntry() {
        this.$router.push('/logistics/template_detail');
      },
      handleSizeChange(val){
        console.log(`每页 ${val} 条`);
        this.currentPage = 1;
        this.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val){
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getList();

      },
      /*返回给后端的数据*/
      getList(){
        let params = {
          name: this.searchForm.nameInput,
          pageSize:this.pageSize,
          currentPage:this.currentPage
      };
        Service.templateList(params).then(res => {
          console.log('get list ',res);
          this.dataList = res.content;
          this.totalElements =res.totalElements;
          this.totalRecord =res.totalElements;
          this.pageSize = res.size;
        }).catch(res => {
            this.$message.error(res.message);
        })
      }
    },
    mounted(){
      this.getList();
    }
  }

</script>
<style lang="scss" scoped>
  .mp_title{
    margin:15px 10px 0 10px;
    height: 30px;
    p{
      float: left;
      &:last-child{
        float: right;
      }
      a{
         margin: 0 5px;
      }
      .btn-handle{
        font-size:12px;
        padding:0;
      }
      .btn-handle:nth-child(1){
        margin-left:10px;
      }
    }
  }
.ma_list{
  /*margin-bottom: 40px;*/
}
  .ma_listNo{
     height: 50px;
  }

  .table-strip-ls{
    border-top:1px solid #ddd;
  }

</style>
