<template>
  <div class="main">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">经营数据</el-breadcrumb-item>
        <el-breadcrumb-item>销量统计</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form :inline="true" :model="preSearchForm" class="inline-header">
      <el-form-item label="">
        <el-button type="primary" size="mini" @click="onSubmit">导出数据</el-button>
      </el-form-item>
      <el-form-item label="">
        <date-search></date-search>
      </el-form-item>
    </el-form>
    <div class="com-block-split">
      <ul class="list block-body">
        <li  v-for="item in dataList" class="list-item is-medium" :key="item.name">{{item.name}}
          <el-tooltip class="item" effect="dark" :content="item.help"  placement="bottom-start"> <i class="el-icon-info"></i></el-tooltip>
           <p class="num">100</p>
        </li>

      </ul>
    </div>
    <div class="block-body">
      <div class="searchBox">
        <el-input size="mini" class="searchWord" placeholder="商品搜索" v-model="searchWord"></el-input>
        <el-button size="mini" type="primary">
          搜索
        </el-button>
      </div>
      <operation-data :dataList="dataList" :firstColumn="listFirst"></operation-data>
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
          :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="totalRecord">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import dateSearch from '../common/date.vue';

  import operationData from '../common/data.vue';
  export default {
    data() {
      return {
        searchWord: '',
        searchType: 1,
        value4: '',
        value6: '',
        checkList: ['浏览量', '访客数', '收藏数', '访客数', '转化率', '加入购物车次数'],
        dataList: [{
            name: '订单数',
            help: '期内对您店铺商品购买的订单笔数；同一用户购买多笔，订单笔数累计。（生成订单号即算是订单，不同订单状态不重复统计）'
          },
          {
            name: '订单件数',
            help: '期内对您店铺商品购买的订单笔数；同一用户购买多笔，订单笔数累计。（生成订单号即算是订单，不同订单状态不重复统计）'

          },
          {
            name: '订单金额',
            help: '期内对您店铺商品购买的订单笔数；同一用户购买多笔，订单笔数累计。（生成订单号即算是订单，不同订单状态不重复统计）'

          },
          {
            name: '支付数',
            help: '期内对您店铺商品购买的订单笔数；同一用户购买多笔，订单笔数累计。（生成订单号即算是订单，不同订单状态不重复统计）'

          },
          {
            name: '支付件数',
            help: '期内对您店铺商品购买的订单笔数；同一用户购买多笔，订单笔数累计。（生成订单号即算是订单，不同订单状态不重复统计）'

          },
          {
            name: '支付金额',
            help: '期内对您店铺商品购买的订单笔数；同一用户购买多笔，订单笔数累计。（生成订单号即算是订单，不同订单状态不重复统计）'

          }, {
            name: '退款数',
            help: '期内对您店铺商品购买的订单笔数；同一用户购买多笔，订单笔数累计。（生成订单号即算是订单，不同订单状态不重复统计）'

          },
          {
            name: '退款件数',
            help: '期内对您店铺商品购买的订单笔数；同一用户购买多笔，订单笔数累计。（生成订单号即算是订单，不同订单状态不重复统计）'

          },
          {
            name: '退款金额',
            help: '期内对您店铺商品购买的订单笔数；同一用户购买多笔，订单笔数累计。（生成订单号即算是订单，不同订单状态不重复统计）'

          },
          {
            name: '已关闭订单',
            help: '期内对您店铺商品购买的订单笔数；同一用户购买多笔，订单笔数累计。（生成订单号即算是订单，不同订单状态不重复统计）'

          },
          {
            name: '已关闭件数',
            help: '期内对您店铺商品购买的订单笔数；同一用户购买多笔，订单笔数累计。（生成订单号即算是订单，不同订单状态不重复统计）'

          },
          {
            name: '已关闭金额',
            help: '期内对您店铺商品购买的订单笔数；同一用户购买多笔，订单笔数累计。（生成订单号即算是订单，不同订单状态不重复统计）'

          },
        ],
        listFirst: {
          name: '商品名称',
          value: 'goods name'
        },
        searchForm: {
          nameInput: '',
          onlineStatus: '0'
        },
        preSearchForm: {
          nameInput: '',
          onlineStatus: '0'
        },
        currentPage: 1,
        pageSize: 10,
        totalPage: 8,
        totalRecord: 78
      }
    },

    components: {
      dateSearch,
      operationData
    },
    methods: {
      setSearch(type) {
        this.searchType = type;
      },
      convertTime(time) {
        if (time != 8888888888888) {
          return (new Date(time)).Format('yyyy-MM-dd hh:mm:ss');
        } else {
          return "永久";
        }
      },
      // addBrandRecommend(){
      //   this.$router.push({
      //     path: '/detail'
      //   })    		
      // },
      editDetail(brandRecommend) {
        this.$router.push({
          path: '/detail',
          query: {
            id: brandRecommend.id
          }
        })
      },
      deleteBrandRecommend(brandRecommend) {
        this.$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // delBrandRecommend({id:brandRecommend.id})
          //   .then(res=>{
          //     this.getList();
          //     this.$message({
          //   type: 'success',
          //   message: '删除成功'
          // });
          //   }).catch(res => {
          //     this.$message.error(res.message);
          // })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      onSubmit() {
        this.searchForm = Object.assign({}, this.preSearchForm);
        this.currentPage = 1;
        this.getList();
      },
      onReset() {
        this.currentPage = 1;
        this.preSearchForm = {
          nameInput: '',
          onlineStatus: '0'
        };
        this.searchForm = {
          nameInput: '',
          onlineStatus: '0'
        };
        this.getList();
      },
      handleSizeChange(val) {
        this.currentPage = 1;
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getList();
      },
      addNewBrandRecommend() {
        this.$router.push('/detail');
      },
      getList() {
        let params = {
          pSize: this.pageSize,
          p: this.currentPage,
          status: parseInt(this.searchForm.onlineStatus),
          name: this.searchForm.nameInput
        };
        // getBrandRecommendList(params).then(res => {
        //   console.log('get list ',res);
        //   this.dataList = res.data;
        //   this.totalPage = res.totalPage;
        //   this.currentPage = res.currentPage;
        //   this.pageSize = res.pageSize;
        //   this.totalRecord = res.totalRecord
        // }).catch(res => {
        //     this.$message.error(res.message);
        // })
      }
    },
    mounted() {
      this.getList();
    }
  }

</script>
<style scoped lang="scss">
  .dateBox {
    /* width: 200px; */
  }

  .inline-header {
    width: 1020px;
    text-align: right;
  }

  .searchBox {
    /* width: 260px; */
    margin-bottom: 10px;
    .searchWord {
      display: inline-block;
      width: 260px;
      margin-right: 10px;
    }
  }

</style>
