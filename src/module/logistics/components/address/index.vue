<template>
  <div class="main">
     <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">物流管理</el-breadcrumb-item>
        <el-breadcrumb-item>自提地址管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-form :inline="true" :model="preSearchForm" class="demo-form-inline">
      <el-form-item label="">
        <el-input size="medium" v-model="preSearchForm.nameInput" placeholder="名称关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" round @click="onSubmit">搜索</el-button>
        <el-button size="medium" round @click="onReset">重置</el-button>
      </el-form-item>
      <el-form-item style="float: right;">
        <el-button type="primary" size="medium" @click="addNewEntry()">新增地址</el-button>
      </el-form-item>
    </el-form>
    
    <table class="table-strip-ls">
      <thead>
        <tr>
          <td class="w170">所在地区</td>
          <td >街道地址</td>
          <td class="w170">联系人</td>
          <td class="w120">联系人电话</td>
          <td class="w130">操作</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="address in dataList" :key="address.id">
          <td class="bannerInfo">
            <div class="linkBlock" :title="address.countyName">
              <span class="bannerTitle">{{address.countyName}}</span>
            </div>
          </td>
          <td>{{address.detailAddr}}</td>
          <td>{{address.name}}</td>
          <td>{{address.telephone}}</td>
          <td class="">
            <el-button type="text" class="btn-handle" @click="editDetail(address.id)"> 编辑
            </el-button>
            <i class="btnsplit"></i>
            <el-button type="text" class="btn-handle" @click="deleteEntry(address.id)"> 删除
            </el-button>
          </td>
        </tr>
        <tr v-if="dataList.length===0">
          <td colspan="6" class="com-nodata">暂无数据</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination" v-if="dataList.length!==0">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="totalRecord">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import * as Service from '@/common/service/logistics/index.js';
  export default{
    data() {
      return{
        searchForm:{
          nameInput:''
        },
        preSearchForm:{
          nameInput:''
        },
        dataList:[],
        currentPage:1,
        pageSize:10,
        totalRecord:0
      }
    },
    methods:{
      /*编辑*/
      editDetail(bannerId){
        this.$router.push({
          path:'/logistics/address_detail',
          query:{
            id:bannerId
          }
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
          Service.addressDelete(params).then(res => {
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
      onSubmit(){
        this.searchForm = Object.assign({},this.preSearchForm);
        this.getList();
      },
      onReset(){
        this.currentPage =1;
        this.searchForm = {
          nameInput:''
        },
        this.preSearchForm = {
          nameInput:''
        },
        this.getList()
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
      addNewEntry(){
        this.$router.push('/logistics/address_detail');
      },
      getList(){
        let params = {
          pageSize:this.pageSize,
          currentPage:this.currentPage,
          name:this.searchForm.nameInput
        };
        Service.addressList(params).then(res=>{
          console.log('get list ',res);
          this.dataList = res.content;
          this.pageSize = res.size;
          this.totalRecord = res.totalElements;
        }).catch(res=>{
          this.$message.error(res,message);
        })
      }
    },
    mounted(){
      this.getList();
    }
  }
</script>
<style lang="scss" scoped>
  .form {
    width: 680px;
    margin-top: 40px;
  }

  .timelimit {
    // height: 55px;
    margin-bottom: 15px;
    font-size: 14px;
  }

  .imagebox {
    width: 420px;
    height: 200px;
    .image1 {
      width: 200px;
      height: 200px;
      text-align: center;
      line-height: 200px;
      float: left;
      border: 1px solid gainsboro;
    }
    .image2,
    .image3 {
      width: 200px;
      text-align: center;
      line-height: 95px;
      height: 95px;
      float: right;
      border: 1px solid gainsboro;
    }
    .image3 {
      margin-top: 10px;
    }
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;

    text-align: center;
  }

  .avatar-uploader-icon {
    width: 120px;
    height: 120px;
    line-height: 120px;
  }

  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }

  .i_navlist {
    width: 300px;
    height: 30px;
    li {
      height: 30px;
      width: 80px;
      float: left;
      margin-right: 3px;
      line-height: 30px;
      font-size: 14px;
      cursor: pointer;
      text-align: center;
      border: 1px solid gainsboro;
      transition: all 0.3s;
      &.active {
        background: #F04134;
        color: #FFFFFF;
      }
    }
    li:hover {
      background: #F04134;
      color: #FFFFFF;
    }
  }

  .upload_c {
    margin-top: 10px;
    padding: 10px;
  }
.el-radio__input.is-checked+.el-radio__label{
	color: #666;
}
</style>
