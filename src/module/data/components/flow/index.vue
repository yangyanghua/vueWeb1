<template>
  <div class="main">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">经营数据</el-breadcrumb-item>
        <el-breadcrumb-item>流量统计</el-breadcrumb-item>
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
      <!-- <div class="com-title">
  <i class="el-icon-tickets"></i>
        店铺流量统计
    </div> -->
      <ul class="list block-body">
        <li class="list-item">浏览量
          <el-tooltip class="item" effect="dark" content="用户每1次对网站中的每个网页访问(店铺首页、商品列表、商品)均被记录1次；用户对同一页面的多次访问，浏览量累计" placement="bottom-start">
            <i class="el-icon-info"></i>
          </el-tooltip>
          <p class="num">10</p>
        </li>
        <li class="list-item"> 访客数
          <el-tooltip class="item" effect="dark" content="访问您店铺的一台终端客户端为一个访客；00:00-24:00内相同的客户端只被计算一次">
            <i class="el-icon-info"></i>
          </el-tooltip>
          <p class="num">10</p>
        </li>
        <li class="list-item">收藏数
          <el-tooltip class="item" effect="dark" content="对您店铺首页收藏一次则记录一个收藏数；取消收藏则减少对应的数量" placement="bottom-start">
            <i class="el-icon-info"></i>
          </el-tooltip>
          <p class="num">10</p>
        </li>
        <li class="list-item">转化率
          <el-tooltip class="item" effect="dark" content="对您店铺首页收藏一次则记录一个收藏数；取消收藏则减少对应的数量" placement="bottom-start">
            <i class="el-icon-info"></i>
          </el-tooltip>
          <p class="num">10</p>
        </li>
        <li class="list-item">加入购物车次数
          <el-tooltip class="item" effect="dark" content="对您店铺首页收藏一次则记录一个收藏数；取消收藏则减少对应的数量" placement="bottom-start">
            <i class="el-icon-info"></i>
          </el-tooltip>
          <p class="num">10</p>
        </li>
      </ul>
    </div>
    <!-- <div class="com-title">
      <i class="el-icon-tickets"></i>
      产品流量统计明细
    </div> -->
    <div class="block-body">
      <div class="searchBox">
        <el-input size="mini" class="searchWord" placeholder="商品搜索" v-model="searchWord"></el-input>
        <el-button size="mini" type ="primary">
          搜索
        </el-button>
        <!-- <el-input placeholder="商品搜索" v-model="searchWord" class="wd-middle is-round">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input> -->
      </div>
      <operation-data :dataList="flowList" :firstColumn="listFirst"></operation-data>
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
          :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="totalRecord">
        </el-pagination>
      </div>
      <!-- <el-checkbox-group v-model="checkList" class="itemList">
        <el-checkbox label="浏览量">浏览量
          <el-tooltip class="item" effect="dark" content="用户每1次对网站中的某商品访问均被记录1次；用户对同一商品的多次访问，浏览量累计" placement="bottom-start">
            <i class="el-icon-info"></i>
          </el-tooltip>
        </el-checkbox>
        <el-checkbox label="访客数">访客数
          <el-tooltip class="item" effect="dark" content="访问您店铺某商品的一台终端客户端为一个访客；00:00-24:00内相同的客户端只被计算一次" placement="bottom-start">
            <i class="el-icon-info"></i>
          </el-tooltip>
        </el-checkbox>
        <el-checkbox label="收藏数">收藏数
          <el-tooltip class="item" effect="dark" content="对您店铺商品收藏一次则记录一个收藏数；取消收藏则减少对应的数量" placement="bottom-start">
            <i class="el-icon-info"></i>
          </el-tooltip>
        </el-checkbox>
        <el-checkbox label="转化率">转化率
          <el-tooltip class="item" effect="dark" content="转化率=订单件数/访客次数" placement="bottom-start">
            <i class="el-icon-info"></i>
          </el-tooltip>
        </el-checkbox>
        <el-checkbox label="加入购物车次数">加入购物车次数
          <el-tooltip class="item" effect="dark" content="对您店铺某商品加入一次则记录一个加入购物车数" placement="bottom-start">
            <i class="el-icon-info"></i>
          </el-tooltip>
        </el-checkbox>
      </el-checkbox-group> -->
    </div>
  </div>
</template>
<script>
  import dateSearch from '../common/date.vue';

  import operationData from '../common/data.vue';
  export default {
    data() {
      return {
        searchWord:'',
        searchType: 1,
        value4: '',
        value6: '',
        checkList: ['浏览量', '访客数', '收藏数', '访客数', '转化率', '加入购物车次数'],
        flowList: [{
            name: '浏览量'
          },
          {
            name: '访客数'
          },
          {
            name: '收藏数'
          },
          {
            name: '转化率'
          },
          {
            name: '加入购物车次数'
          },
        ],
        listFirst: {
          name: '商品名称',
          value: '名称1111111'
        },
        searchForm: {
          nameInput: '',
          onlineStatus: '0'
        },
        preSearchForm: {
          nameInput: '',
          onlineStatus: '0'
        },
        dataList: [],
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
    .searchWord{
      display: inline-block;
      width: 260px;
      margin-right: 10px;
    }
  }

</style>
