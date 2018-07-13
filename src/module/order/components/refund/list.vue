<template>
	<div class="main">
		<div class="crumbs">
			维权订单
		</div>
		<div class="subject">
      <div class="filter_query mat20">
        <!-- 不可用v-once -->
        <h2 class="s_h2"><i></i>筛选查询</h2>   

        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="订单编号">
            <el-input 
              v-model="listParams.orderCode" 
              placeholder="请输入订单编号"  
              @focus="focus($event)"
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item label="申请时间">
            <el-date-picker
              v-model="applyTime"
              type="datetimerange"
              :picker-options="pickerOptions2"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              :clearable="false"
              @focus="applyTimeFocus()">
            </el-date-picker>
          </el-form-item>
        </el-form>

        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="退款编号">
            <el-input 
              v-model="listParams.refundNo" 
              placeholder="请输入退款编号"  
              @focus="focus($event)"
              clearable>
            </el-input>
          </el-form-item>

          <el-form-item label="退款方式">
            <el-select v-model="listParams.refundMethod" placeholder="请选择">
              <el-option
                v-for="(item,idx) in refundMethods"
                :key="item"
                :label="item"
                :value="idx-1">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="退款状态">

            <el-select v-if="listParams.status == '0,1,2,3,4'" :value="'退款处理中'" placeholder="请选择">
              <el-option
                v-for="(item,idx) in refundStatus"
                :key="item"
                :label="item"
                :value="idx-1">
              </el-option>
            </el-select>
            
            <el-select v-else v-model="listParams.status" placeholder="请选择">
              <el-option
                v-for="(item,idx) in refundStatus"
                :key="item"
                :label="item"
                :value="idx-1">
              </el-option>
            </el-select>

          </el-form-item>

          <!-- <el-form-item label="退款类型" >
            <el-select v-model="listParams.refundType" placeholder="请选择">
              <el-option
                v-for="(item,idx) in refundTypes"
                :key="item"
                :label="item"
                :value="idx-1">
              </el-option>
            </el-select>
          </el-form-item> -->
        </el-form>

        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
              <el-dropdown @command="exportRefunds">
                <el-button style="margin-right:15px;">
                  批量操作<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="0">导出全部</el-dropdown-item>
                  <el-dropdown-item command="1">导出选中</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-button type="primary" @click="filterList()" >筛选</el-button>
              <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="main-son">

        <div class="btns">
          <el-button class="tab-button" type="text" @click="changeStatus($event)">全部</el-button>
          <el-button class="tab-button" type="text" @click="changeStatus($event)">退款处理中</el-button>
          <el-button class="tab-button" type="text" @click="changeStatus($event)">退款成功</el-button>
          <el-button class="tab-button" type="text" @click="changeStatus($event)">退款关闭</el-button>
        </div>

        <div class="son-box">
          <el-table 
            :data="dataset" 
            highlight-current-row 
            border 
            style="width: 100%"
            @selection-change="handleSelection">
            <el-table-column type="selection" width="30"></el-table-column>
            <el-table-column prop="refundNo" label="退款单号" header-align="center"></el-table-column>
            <el-table-column label="退款方式" width="90" header-align="center" align="center">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ refundMethods[scope.row.refundMethod+1] }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="orderCode" label="订单号" header-align="center"></el-table-column>
            <el-table-column prop="productName" label="商品" class="goods" width="130" header-align="center" align="center">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="light" :content="scope.row.productName" placement="bottom-start">
                  <p class="goods">{{ scope.row.productName}}</p>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="orderAmount" label="订单金额" width="80" header-align="center" align="center"></el-table-column>
            <el-table-column prop="refundAmount" label="退款金额" width="80" header-align="center" align="center"></el-table-column>
            <el-table-column prop="refundSubmitDate" label="申请时间" header-align="center" align="center">
              <template slot-scope="scope">
                <p>{{ scope.row.refundSubmitDate.slice(0,10) }}</p>
                <p>{{ scope.row.refundSubmitDate.slice(11) }}</p>
              </template>
            </el-table-column>
            <el-table-column prop="STATUS" label="状态" header-align="center" align="center">
              <!-- <template slot-scope="scope">
                <span class="status">{{ refundStatus[scope.row.STATUS+1] }}</span>
              </template> -->
              <template slot-scope="scope">
                <el-tooltip class="item" effect="light" :content="refundStatus[scope.row.STATUS+1]" placement="bottom-start">
                  <p class="status" v-if="scope.row.refundMethod==1" >{{ refundStatus[scope.row.STATUS+1] }}</p>
                  <p class="status" v-if="scope.row.refundMethod==0" >{{ refundStatus1[scope.row.STATUS+1] }}</p>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="操作" header-align="center" width="80">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.STATUS >= 5"
                  type="text"
                  @click="toDetail(scope.$index, scope.row)">查看详情</el-button>
								  
                <el-button
                  v-else-if="scope.row.STATUS < 5&& scope.row.STATUS != 2"	
                  type="text"
                  @click="toDetail(scope.$index, scope.row)">处理退款</el-button>
                <el-button
                  v-else-if="scope.row.STATUS == 2 && scope.row.refundMethod==1"	
                  type="text"
                  @click="toDetail(scope.$index, scope.row)">处理退款</el-button>
                <el-button
                  v-else-if="scope.row.STATUS == 2 && scope.row.refundMethod==0"	
                  type="text"
                  @click="toDetail(scope.$index, scope.row)">查看详情</el-button>

                  
              </template>
            </el-table-column>
          </el-table>

          <el-dropdown @command="exportRefunds">
            <el-button>
              批量操作<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="0">导出全部</el-dropdown-item>
              <el-dropdown-item command="1">导出选中</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-pagination
            @current-change="paging"
            :page-size="listParams.pageSize"
            layout="prev, pager, next, jumper"
            :total="totalRecord">
          </el-pagination>

        </div>
      </div>
		</div>
	</div>
</template>

<script>
  import * as Service from '@/common/service/refund/index.js';
  import {httpService,api} from '@/common/http/http.js';
  import {
    getRefundList,
    exportRefundList
  } from '@/common/service/refund/index.js';

  export default {
    data(){
      return{
        dataset: [],
        activeRefunds: [],
        listParams: {
          storeId: JSON.parse(localStorage.getItem('user')).store.id ||'317229',//商家id
          orderCode: null,//订单编号
          applyBeginTime: null,
          applyEndTime: null,
          refundNo: null,//退款单号
          refundType: null,//退款类型
          refundMethod: null,//退款方式
          status: null,//退款状态
          currentPage: 1,
          pageSize: 8
        },
        emptyParams: {
          storeId: JSON.parse(localStorage.getItem('user')).store.id ||'317229',
          orderCode: null,
          applyBeginTime: null,
          applyEndTime: null,
          refundNo: null,
          refundType: null,
          refundMethod: null,
          status: null,
          currentPage: 1,
          pageSize: 8,
        },
        totalRecord: null,
        applyTime: [],
        refundTypes: ['全部','售中退款','售后退款'],// || [{"id":"1","value":"全部"},{}]
        refundMethods: ['全部','仅退款','退货退款'],
        refundStatus: [
          '全部',
          '退款申请等待卖家确认',
          '卖家拒绝退款，等待买家重新申请',
          '卖家同意申请，等待买家填写退货物流',
          '买家已退货，等待卖家收货',
          '卖家未收到货，拒绝退款',
          '退款成功',
          '退款关闭'
        ],
        refundStatus1: [
          '全部',
          '退款申请等待卖家确认',
          '卖家拒绝退款，等待买家重新申请',
          '退款中',
          '退款中',
          '退款中',
          '退款成功',
          '退款关闭'
        ],        
        
        
        
        
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        currentTab: '1',
        isFilter: false,
      }
    },
    watch: {
      listParams:{
        handler: function(){
          // console.log(this.listParams);
        },
        deep: true,
        immediate: true
      },
      applyTime: {
        handler: function(){
          if(this.applyTime == null || !this.applyTime.length){
            console.log(this.applyTime);
            return false;
          }
          console.log(this.applyTime);
          this.listParams.applyBeginTime = dayjs(this.applyTime[0]).format('YYYY-MM-DD HH:mm:ss');
          this.listParams.applyEndTime = dayjs(this.applyTime[1]).format('YYYY-MM-DD HH:mm:ss');
        },
        deep: true
      },
    },
    methods: {
      toDetail(idx, row){
        Service.getRefundInfo({code: row.refundNo}).then((res) => { 
          localStorage.setItem('refund',JSON.stringify(row));
          this.$router.push({
            name: 'refundInfo', 
            params: this.objCopy(row),
            // query: {refundNo: row.refundNo},
          });

        }).catch((res) => {
          if(res.code == 400 || res.code == 500){
            this.tips('info','服务器繁忙，请稍后重试')
          }
        })

        
      },
      applyTimeFocus(){
        let btn = document.querySelectorAll('.el-picker-panel__link-btn')[0]
        if(btn!==undefined){
          btn.onclick= ()=>{
            this.emptyParams.applyBeginTime = "";
            this.emptyParams.applyEndTime = "";
            this.listParams.applyBeginTime = "";
            this.listParams.applyEndTime = "";
          };
        }
      },
      changeStatus(e) {
        this.emptyParams.status = null;

        let btns = document.querySelectorAll('.tab-button');
        [...btns].forEach(item => item.classList.remove('active'));

        if(e.target.innerHTML === "退款处理中"){
          this.emptyParams.status = "0,1,2,3,4";
        }else if(e.target.innerHTML === "退款成功"){
          this.emptyParams.status = 5;
        }else if(e.target.innerHTML === "退款关闭"){
          this.emptyParams.status = 6;
        }else if(e.target.innerHTML === "全部"){
          this.emptyParams.status = null;
        }

        e.target.parentNode.classList.add('active');

        //筛选和tab不叠加
        this.reset();
        this.initRefund(this.emptyParams);
      },
      initRefund(_params){
        //筛选、init、分页 || status切换即tab
        if(_params === undefined){
          // this.listParams.storeId = "301083";
          // this.listParams.storeId = "317012";//真实
          // this.listParams.storeId = "317229";
          
          getRefundList(this.listParams).then((res)=>{
            this.dataset = [...res.content];
            // this.dataset[0].productName = '测试商品测试商品测试商品测试商品测试商品测试商品测试商品'
            this.totalRecord = res.totalElements;
            if(this.isFilter){
              this.tips('success','筛选成功');
              this.isFilter = false;
            }
          }).catch((res) => {
            this.$message.error(res.message);
          }) 
        }else{
          // this.emptyParams.storeId = "301083";
          // this.emptyParams.storeId = "317012";
          // this.listParams.storeId = "317229";
          // console.log(_params.status);
          getRefundList(_params).then((res)=>{
            this.dataset = [...res.content] ;
            this.totalRecord = res.totalElements;
          }).catch((res) => {
            this.$message.error(res.message);
          }) 
        }

      },
      paging(val){
        this.listParams.currentPage = val;
        this.initRefund();
      },
      //选项发生变化
      handleSelection(val){
        if(!val.length){
          return false;
        }
        this.activeRefunds = [];
        this.activeRefunds = [...val];
        console.log(val);
      },
      exportRefunds(command) {
        this.$loading();
        if(command == 0){

          if(!this.dataset.length){
            this.tips('error','当前订单为空');
            this.$loading().close();
            return false;
          }

          let params = {
            storeId: this.listParams.storeId,
            type: 0,
            ...this.listParams
          }
          delete params.pageSize;
          delete params.currentPage;

          Service.exportRefundList(params).then((res)=>{
          	 this.$loading().close();
            window.location.href = httpService
              +api.refundListDownload+"?accessToken="
              +JSON.parse(localStorage.getItem("user")).accessToken;
          }).catch((res) => {
            this.$message.error(res.message);
          }) 
          
        }else if(command == 1){

          if(!this.activeRefunds.length){
            this.tips('error','所选订单不能为空');
            this.$loading().close();
            return false;
          }

          let str = '';
          for(let i=0,len=this.activeRefunds.length;i<len;i++){
            str += this.activeRefunds[i].refundNo + ',';
          }
          str = str.slice(0, -1);

          let params = {
            storeId: this.listParams.storeId,
            //storeId: '301083',
            type: 1,
            refundNoList: str
          }
          console.log(params);

          Service.exportRefundList(params).then((res)=>{
          	this.$loading().close();
            window.location.href = httpService
              +api.refundListDownload+"?accessToken="
              +JSON.parse(localStorage.getItem("user")).accessToken;
          }).catch((res) => {
            this.$message.error(res.message);
          }) 
          
        }
      },
      filterList(){
        //筛选和tab条件不叠加
        let count = 0;
        for(let key in this.listParams){
          this.listParams[key] === null ? count++ : '';
          this.listParams[key] === "" ? count++ : '';
        }
        if(count === 7){
          this.tips('error', '筛选条件不能为空')
          return false;
        }

        for(let key in this.listParams){
          this.listParams[key] == -1 && (this.listParams[key] = null);
        }
        this.isFilter = true;
        // this.listParams.status = null;

        let btns = document.querySelectorAll('.tab-button');
        [...btns].forEach(item => item.classList.remove('active'));
        // btns[0].classList.add('active');
        console.log(this.listParams);

        this.initRefund();
      },
      reset(){
        this.applyTime = [];
        this.emptyParams.applyBeginTime = "";
        this.emptyParams.applyEndTime = "";
        this.listParams = this.objCopy(this.emptyParams);

        this.initRefund(this.emptyParams);
      }
    },
    mounted(){
      this.initRefund();
    }
  }
</script>

<style lang="scss" scoped>
@import url("../list/commonstyle.css");
  .main-son{
    padding: 10px 20px;
    margin-top: 10px;
    background: #fff;
    position: relative;
    >.btns{
      margin: 5px 0 15px 0;
      >.el-button{
        padding: 0 25px;
      }
      .active{
        color: #58bc58 !important;
      }
    }
    >.son-box{
      .el-table{
        margin-bottom: 15px;
        div.cell{
          // text-align: center !important;
          >p.goods,>.p.status{
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
      .el-dropdown{
        display: inline-block;
      }
      .el-pagination{
        margin-left: 20px;
        display: inline-block;
      }
    }
  }
  
</style>