<template>
  <div class="main">
    <!--面包屑-->
    <div class="crumbs">
      对账单
    </div>
    <!-- / 面包屑-->
    <div class="subject mat20">

      <!--筛选查询-->
      <div class="filter_query">
        <h2 class="s_h2">
          <i></i>筛选查询</h2>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="账单日期:" style="display: inline-block;margin-bottom: 10px;">
            <el-date-picker size="medium" v-model="orderTime" type="daterange" align="left" placeholder="选择日期范围" :picker-options="pickerBeginDateAfter"
              range-separator=" ~ " @change="orderTime_select">
            </el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="medium" icon="el-icon-search" @click="onSubmit" v-loading.fullscreen.lock="fullscreenLoading">查询</el-button>
            <el-button size="medium" icon="el-icon-refresh" @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tableList">
        <h2 class="s_h2">
          <i></i>对账查询结果
          <p class="btn_qj">
            <el-button type="primary" size="medium" @click="batchExport">批量导出</el-button>
          </p>
        </h2>
        <div class="paddingFinance">
          <el-table :data="dataList" tooltip-effect="dark" style="width: 100%"  @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="billDate" label="账单日期"></el-table-column>
            <el-table-column prop="payCount" label="支付笔数"></el-table-column>
            <el-table-column prop="payAmount" label="支付金额"></el-table-column>
            <el-table-column prop="refundCount" label="退款笔数"></el-table-column>
            <el-table-column prop="refundAmount" label="退款金额"></el-table-column>
            <el-table-column prop="platformAmount" label="平台佣金"></el-table-column>
            <el-table-column prop="settleAmount" label="结算金额"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope" style="width: 10%">
                <el-button size="mini" @click="exportDetail(scope.row.billDate)">导出明细</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div style="height:60px;"></div>
        <!--分页-->
        <div class="pagination" v-if="(!dataList)||dataList.length!==0">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalRecord">
          </el-pagination>
        </div>
      </div>

    </div>


  </div>
</template>
<script>
  import {
    getOrderAccountList,
    batchExportOrderAccount
  } from '../../service.js';
  import {httpService,api} from '@/common/http/http.js';
  export default {
    data() {
      return {
        orderTime: "",
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0,
        searchForm: {
          orderTime: ""
        },
        dataList: [],
        fullscreenLoading: false,
        pickerBeginDateAfter: {
          disabledDate: (time) => {
            let beginDateVal = new Date().getTime();
            return time.getTime() > beginDateVal;
          }
        },
        multipleSelection: []
      }
    },
    methods: {
      /*查询*/
      onSubmit() {
        this.getList();
      },
      /*重置*/
      onReset() {
        this.orderTime = '';
        this.searchForm = {
          orderTime: ''
        };
      },
      handleSizeChange(val) {
        this.currentPage = 1;
        this.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getList();
      },
      /*返回给后端的数据*/
      getList() {
        if(!this.searchForm.orderTime) {
          this.$message.warning("请输入账单日期");
          return false;
        }
        let fromDate = this.searchForm.orderTime.split(",")[0];
        let toDate = this.searchForm.orderTime.split(",")[1];
        let params = {
          fromDate: fromDate,
          toDate: toDate,
          pageSize: this.pageSize,
          currentPage: this.currentPage,
        };
        this.fullscreenLoading = true;
        getOrderAccountList(params).then(res => {
          this.dataList = res.data || [];

          this.totalRecord = res.totalRecord;
          this.fullscreenLoading = false;
        }).catch(res => {
          this.$message.error(res.message);
          this.fullscreenLoading = false;
        });
      },
      exportDetail(billDate) {
        let dateList = [];
        dateList.push(billDate);
        let href = httpService+api.batchExportOrderAccount+"?accessToken="+this.getToken()+"&dateList="+dateList.toString();
        window.location.href=href;
      },
      batchExport() {
        let selectRows = this.multipleSelection;
        if(selectRows.length <= 0) {
          this.$message.warning("请选择需要导出的数据");
          return;
        }
        let dateList = [];
        for(let i = 0; i < selectRows.length; i++) {
          dateList.push(selectRows[i].billDate);
        }
        let href = httpService+api.batchExportOrderAccount+"?accessToken="+this.getToken()+"&dateList="+dateList.toString();
        window.location.href=href;
      },
      orderTime_select(val) {
        if(val) {
          this.searchForm.orderTime = val[0].getTime() + "," + val[1].getTime();
        } else {
          this.searchForm.orderTime = "";
        }
      },
      getToken(){//获取当前用户token
        var user = JSON.parse(localStorage.getItem("user"));
        return user.accessToken;

      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    },
    mounted() {

    }
  }

</script>
<style lang="scss" scoped>
  .paddingFinance {
    padding: 20px;
  }

  .pagination {
    margin-top: 0;
    padding-top: 0px;
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .table-strip-ls {
    border-top: 1px solid #ddd;
  }

  .subject .el-tabs__header {
    margin: 0;
    background: #fff;
  }

</style>
