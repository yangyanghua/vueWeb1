<template>
  <div class="main">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>经营数据</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>流量统计</el-breadcrumb-item> -->
      </el-breadcrumb>
    </div>
    <div class="block1 block">
      <date-search name="销量统计"></date-search>
      <div>
        <ul class="list u-center">
          <li class="list-item">订单数
            <p class="num">10</p>
          </li>
          <li class="list-item mgr0">商品数
            <p class="num">10</p>
          </li>
          <li class="list-item wdmore">销售额
            <p class="num">10</p>
          </li>
          <li class="viewDetail wdmore">
            <el-button type="text" @click="$router.push('/sales')">查看详情</el-button>
          </li>
        </ul>
      </div>
    </div>
    <div class="block2 block">
      <el-form :inline="true">
        <el-form-item label="商品统计"> </el-form-item>
      </el-form>
      <ul class="list u-center">
        <li class="list-item">已上架
          <p class="num">10</p>
        </li>
        <li class="list-item mgr0">已下架
          <p class="num">10</p>
        </li>
        <li class="list-item">库存紧张
          <p class="num">10</p>
        </li>
        <li class="list-item mgr0">总商品数
          <p class="num">10</p>
        </li>
        <li class="viewDetail wdmore">
          <el-button type="text">查看详情</el-button>
        </li>
      </ul>
    </div>
    <div class="block3 block">
      <date-search name="流量统计"></date-search>
      <div>
        <ul class="list u-center">
          <li class="list-item">浏览量
            <p class="num">10</p>
          </li>
          <li class="list-item mgr0">访客数
            <p class="num">10</p>
          </li>
          <li class="list-item ">收藏
            <p class="num">10</p>
          </li>
          <li class="list-item mgr0">转化率
            <p class="num">10</p>
          </li>
          <li class="viewDetail wdmore">
            <el-button type="text" @click="$router.push('/flow')">查看详情</el-button>
          </li>
        </ul>
      </div>
    </div>
    <div class="block4 block">
      <el-form :inline="true">
        <el-form-item label="活动统计"> </el-form-item>
      </el-form>
      <ul class="list u-center">
        <li class="list-item">满额优惠
          <p class="num">10</p>
        </li>
        <li class="list-item mgr0">满件优惠
          <p class="num">10</p>
        </li>
        <li class="list-item">限时折扣
          <p class="num">10</p>
        </li>
        <li class="list-item mgr0">所有活动
          <p class="num">10</p>
        </li>
        <li class="viewDetail wdmore">
          <el-button type="text">查看详情</el-button>
        </li>
      </ul>
    </div>
    <div>
      <div class="blockwide">
        <el-form :inline="true">
          <el-form-item label="经营报告详情"> </el-form-item>
        </el-form>
        <div class="operationDate">
          <el-form :inline="true">
            <el-form-item label="">
              <el-button type="primary" size="mini" @click="onSubmit">导出数据</el-button>
            </el-form-item>
            <el-form-item>
              <date-search></date-search>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <ul>
            <li class="list-item is-small" v-for="item in operationList" :key="item.name">{{item.name}}
              <p class="num">10</p>
            </li>
          </ul>
            <el-button-group class="btngroup">
            <el-button :plain="dataFormat==='table'" type="primary" @click="changeDataFormat('chart')">趋势图</el-button>
            <el-button :plain="dataFormat==='chart'" type="primary" @click="changeDataFormat('table')">表格
            </el-button>
          </el-button-group>
          <chart-data v-if="dataFormat==='chart'"  :firstColumn="listFirst" :dataList="operationList" ></chart-data>
          <div  v-if="dataFormat==='table'">
              <operation-data :dataList="operationList" :firstColumn="listFirst"></operation-data>
             <div class="pagination">
        <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
          :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="totalRecord">
        </el-pagination>
      </div>
          </div>
        
        </div>
      </div>


    </div>
  </div>
</template>
<script>
  import dateSearch from '../common/date.vue';
  import chartData from '../common/chart.vue';
  import operationData from '../common/data.vue';
  export default {
    data() {
      return {
        value6: '',
        dataFormat: 'chart',
          listFirst: {
          name: '日期',
          value: '2017-12-19'
        },
        operationList: [{
            name: '浏览量'
          },
          {
            name: '访客数'
          },
          {
            name: '收藏数'
          },
          {
            name: '订单数'
          },
          {
            name: '订单件数'
          },
          {
            name: '订单金额'
          },
          {
            name: '买家量'
          },
          {
            name: '客单件数'
          },
          {
            name: '客单价'
          },
          {
            name: '转化率'
          },
        ],
        listFirst: {
            name: '日期',
            value: '2017-12-29'
        },
        currentPage: 1,
        pageSize: 10,
        totalPage: 10,
        totalRecord: 96
      }
    },
    methods: {
        changeDataFormat(format){
            this.dataFormat = format;
        },
        handleCurrentChange(){

        },
        onSubmit(){

        }
    },
    components: {
      dateSearch,
      operationData,
      chartData
    }
  }

</script>
<style lang="scss" scoped>
  .block {
    display: inline-block;
    border: 1px solid $color-split;
    padding: 10px;
    margin-bottom: 15px;
    .el-form-item {
      margin-bottom: 12px;
    } // background-color: $color-bg-dialog;
  }

  .blockwide {
    width: 100%;
    border: 1px solid $color-split;
    padding: 10px;
  }

  .block1,
  .block3 {
    // width: 600px;
    width: 550px;
    margin-right: 15px;
  }

  .block2,
  .block4 {
    width: 450px;
  }

  .viewDetail {
    text-align: right;
    display: inline-block;
    width: 375px;
  }

  .el-form--inline {
    height: 62px;
  }

  .operationDate {
    float: right;
  }
.btngroup{
    text-align: center;
    margin-top: 15px;
    margin-bottom: 10px;
}
</style>
