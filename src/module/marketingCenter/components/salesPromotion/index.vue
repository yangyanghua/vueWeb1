<template>
  <div class="main">
    <!--面包屑-->
      <div class="crumbs">
        促销管理
      </div>
      <!-- / 面包屑-->
    <div class="subject mat20">
        <el-tabs v-model="couponName" @tab-click="handlemenu">
         <!--  <el-tab-pane label="所有活动" name="ALL"></el-tab-pane> -->
          <el-tab-pane label="满额优惠" name="MEYH"></el-tab-pane>
          <!-- <el-tab-pane label="满件优惠" name="MJYH"></el-tab-pane>
          <el-tab-pane label="限时折扣" name="XSZK"></el-tab-pane> -->
      </el-tabs>
       <!--筛选查询-->
          <div class="filter_query">
          
              <el-form :inline="true" :model="preSearchForm" class="demo-form-inline" >
               <el-form-item label="活动类型:" size="medium" v-if="couponName=='ALL'">
                    <el-select v-model="preSearchForm.promoType" placeholder="全部" style="width:250px;">
                    <el-option label="全部活动" value="ALL"></el-option>
                    <el-option label="满额优惠" value="MEYH"></el-option>
                    <el-option label="满件优惠" value="MJYH"></el-option>
                    <el-option label="限时折扣" value="XSZK"></el-option>
                    </el-select>          
                </el-form-item> 
                <el-form-item label="活动状态:" size="medium" >
                    <el-select v-model="preSearchForm.state" placeholder="全部" style="width:250px;">
                    <el-option label="未开始" value="NOT_START"></el-option>
                    <el-option label="促销中" value="STARTED"></el-option>
                    <el-option label="已结束" value="END"></el-option>
                    </el-select>          
                </el-form-item> 

                <el-form-item label="">
                  <el-input size="medium" v-model="preSearchForm.name" placeholder="优惠活动名称"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" size="medium" icon="el-icon-search" @click="onSubmit">查询</el-button> 
                  <el-button size="medium" icon="el-icon-refresh" @click="onReset">重置</el-button>
                </el-form-item>
               <!--  <el-form-item style="float: right;">
                  <el-button type="primary" size="medium" @click="commodityAdd()">创建全店活动</el-button>
                  <el-button type="primary" size="medium" @click="storeAdd()">创建商品活动</el-button>
                </el-form-item> -->
              </el-form>
          </div>
          <!--   / 筛选查询-->
           <div class="tableList">
           <h2 class="s_h2"><i></i>数据列表   
           <p class="btn_qj" v-show="couponName!=='ALL'">
              <!-- <el-button type="primary" size="medium" @click="commodityAdd()" v-show="couponName!=='XSZK'">创建全店活动</el-button> -->
              <el-button type="primary" size="medium" @click="storeAdd()">创建商品活动</el-button>
            </p></h2> 
            <div class="salesPromotion">
              <table class="table-strip-ls">
              <thead>
                <tr>
                  <td>活动名称</td>
                  <td class="w110">活动类型 </td>
                  <td class="w200">开始时间</td>
                  <td class="w200">结束时间</td>
                  <td class="w110">状态</td>
                  <td class="w110">操作</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in dataList" :key="item.id">
                  <td>{{item.name}}</td>
                  <td>
                    {{item.promoType}}

                  </td>
                  <td>{{item.effectiveFrom}}</td>
                  <td>{{item.effectiveTo}}</td>
                  <td>{{item.state}}</td>
                  <td>
                    <!-- <i class="btnsplit"></i>   -->
                    <el-button type="text" class="btn-handle" v-if="item.state!=='已结束' " @click="storeAdd(item.id)"> 修改
                    </el-button>
                     <el-button type="text" class="btn-handle" v-if="item.state=='已结束'" @click="editDetail(item.id)"> 查看
                    </el-button>
                    <i class="btnsplit"></i>
                    <el-button type="text" class="btn-handle" @click="deleteEntry(item.id)"> 删除
                    </el-button>
                  </td>
                </tr>
                <tr v-if="(!dataList)||dataList.length===0">
                  <td colspan="6" class="com-nodata">暂无数据</td> 
                </tr> 
              </tbody>
            </table>
            </div>
            <div style="height:60px;"></div>
            <!--分页-->
            <div class="pagination" v-if="(!dataList)||dataList.length!==0">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="totalRecord">
              </el-pagination>
            </div> 
         </div>
    
    </div>
    
    
  </div>
</template>
<script>
  import * as Service from '@/common/service/marketingCenter/index.js';
  export default {
    data() {
      return {
        couponName: 'MEYH',//切换默认第一个
        currentPage:1,
        pageSize:10,
        totalRecord:0,
        searchForm: {
          promoType:'ALL',
          state:'',
          name: '',
        },
        preSearchForm: {
          promoType:'ALL',
          state:'',
          name: '',
        },
        dataList:[],
        totalElements:''
      }
    },
    methods: {
      //tab切换
      handlemenu() {
        console.log('切换',this.couponName);
        this.searchForm.promoType = this.couponName;
        this.getList();
      },
      /*查看*/
      editDetail(id) {
        this.$router.push({
          path: '/salesPromotion/salesPromotion_commodityAdd',
          query: {id: id,edit:2}
        })
      },
      /*删除*/	
      deleteEntry(_id) {
        console.log('id',_id)
        this.$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            id : _id
          };
          Service.promoteDel(params).then(res => {
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
      /*查询*/
      onSubmit() {
         this.searchForm = Object.assign({},this.preSearchForm);
         this.getList();
      },
      /*重置*/
      onReset(){
          this.preSearchForm = {
             promoType:'ALL',
              state:'',
              name: '',
          };
          this.searchForm = {
             promoType:'ALL',
             state:'',
             name: '',
          };
          this.getList();
      },
      /*新增修改 全店活动*/
      commodityAdd() {
        console.log('add --- ');
        // return;
        let type;
        let vm = this;
        if(this.couponName=='MEYH'){
           type = 1;
        }else if(this.couponName=='MJYH'){
          type = 5;
        }
        vm.$router.push({
          path: '/salesPromotion/salesPromotion_commodityAdd',
          query: {type, couponName: vm.couponName,isAllJoin:'SHOP',edit:1}
        })
      },
       /*修改 商品活动*/
      storeAdd(id) {
        let type;
        if(this.couponName=='XSZK'){
          type =4;
        }
        if(this.couponName=='MJYH'){
          type =3;
        }
        if(this.couponName=='MEYH'){
          type =2;
        }
        this.$router.push({
          path: '/salesPromotion/salesPromotion_commodityAdd',
          query: {type: type, couponName:this.couponName,isAllJoin:'PRODUCT',id,edit:1}
        })
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
          promoType: this.searchForm.promoType,
          name: this.searchForm.name,
          state: this.searchForm.state,
          pageSize:this.pageSize,
          currentPage:this.currentPage,  
      };
        Service.promoteList(params).then(res => {
          console.log('get list ',res);
          this.dataList = res.content||[];

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
  .salesPromotion{
    padding:20px;
  }
  .pagination{
    margin-top:0;
    padding-top:0px;
    position: absolute;
    bottom:0;
    right:0;
  }
  .table-strip-ls{
    border-top:1px solid #ddd;
  }
  .subject .el-tabs__header{
    margin:0;
    background:#fff;
  }
  
</style>
