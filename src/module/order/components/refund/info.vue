<template>
  <div class="main">
		<div class="crumbs">
			维权订单详情
		</div>
		<div class="subject">
      <div class="filter_query mat20">
          <div class="header-title">协商记录</div>

          <div class="header-item" v-for="(item,idx) in consultList" :key="idx">
            <h3 class="refund-date">{{item.createTime}}</h3>
            <img v-if="item.roleName=='用户'" src="@/assets/images/refund/u6396.png">
            <img v-else-if="item.roleName=='商家'" src="@/assets/images/refund/u6516.png">
            <div class="cont-right">
              <p class="header-p">{{item.roleName}}</p>
              <p class="header-p">{{item.remark}}</p>
            </div>
          </div>

          <!-- <div class="header-item">
            <h3 class="refund-date">{{listDetail.refundSubmitDate}}</h3>
            <img :src="info.imageUrl">
            <div class="cont-right">
              <p class="header-p">{{info.name}}</p>
              <p class="header-p">发起了仅退款申请，原因：{{info.refundReason}}，金额：{{info.refundAmount}}元。</p>
            </div>
          </div> -->
          
      </div>
      <div class="main-son">
        <div class="aside">
          <div class="aside1">售后详情</div>
          <div class="aside2">
            <img :src="info.imageUrl">
            <div class="aside2-right">
              <el-tooltip class="aside2-p" effect="light" :content="info.goodsName" placement="bottom-start">
                <p class="goods">{{info.goodsName}}</p>
              </el-tooltip>
              <el-tooltip class="aside2-p" effect="light" :content="info.goodsName" placement="bottom-start">
                <p class="goods">{{info.sku}}</p>
              </el-tooltip>
              <!-- <p class="aside2-p" >{{info.goodsName}}</p> -->
              <!-- <p class="aside2-p">{{info.sku}}</p> -->
            </div>
          </div>
          <div class="aside3">
            <div class="aside3-item">
              <span class="left">买家</span>
              <span v-if="info.name == null || info.name ==''" class="right">{{info.account}}</span>
              <span v-else class="right">{{info.name}}</span>
            </div>
            <div class="aside3-item" @click="toOrderDetail()">
              <span class="left">订单编号</span>
              <span class="right order-code">{{info.orderCode}}</span>
            </div>
            <div class="aside3-item">
              <span class="left">成交时间</span>
              <span class="right">{{info.payTime}}</span>
            </div>
            <div class="aside3-item">
              <span class="left">单价</span>
              <span class="right">￥{{info.price}}*{{info.num}}</span>
            </div>
            <div class="aside3-item">
              <span class="left">邮费</span>
              <span class="right">{{info.freight}}</span>
            </div>
            <div class="aside3-item">
              <span class="left">商品总价</span>
              <span class="right">￥{{info.sumPrice}}</span>
            </div>
          </div>
          <div class="aside3 aside3-end">
            <div class="aside3-item">
              <span class="left">退款单号</span>
              <el-tooltip class="aside2-p" effect="light" :content="info.refundNo" placement="bottom-start">
                <span class="right">{{info.refundNo}}</span>
              </el-tooltip>
              <!-- <span class="right">{{info.refundNo}}</span> -->
            </div>
            <div class="aside3-item">
              <span class="left">退款金额</span>
              <span class="right">￥{{info.refundAmount}}</span>
            </div>
            <div class="aside3-item" v-if="listDetail.STATUS >= 3 && info.result==1">
              <span class="left">物流信息</span>
              <span class="right" style="color: #4DA9E4;cursor: pointer;" @click="getLogistics">查看详情</span>
            </div>
            <div class="aside3-item">
              <span class="left">原因</span>
              <span class="right">{{info.refundReason}}</span>
            </div>
            <div class="aside3-item">
              <span class="left">期望结果</span>
              <span class="right result">{{ refundMethods[info.result] }}</span>
            </div>
            <!-- <div class="aside3-item">
              <span class="left">说明</span>
              <span class="right">{{info.freight}}</span>
            </div> -->
          </div>
        </div>

        <!-- <h1>isAgree：{{isAgree}}</h1>
        <h1>list,refundNo:{{listDetail.refundNo}}</h1>
        <h1>list,Status:{{listDetail.STATUS}}</h1>
        <h1>info,status:{{info.status}}</h1> -->

        <div class="handle" v-if="isAgree == true">

          <div class="handle-item" v-if="listDetail.STATUS == 6">
            <h2>退款关闭</h2>
            <p>本次交易已被撤销</p>
          </div>

          <div class="handle-item" v-else-if="listDetail.STATUS == 5">
            <h2>退款完成！</h2>
          </div>

          <div class="handle-item" v-else-if="listDetail.STATUS == 4">
            <div class="handle-top">
              <h3>商家不同意退款</h3>
              <p>您已拒绝本次退款申请，买家修改退款申请后，需要您重新处理</p>
              <span>或者：</span>
              <span id="draw-back" style="color: red;" @click="closeRefund()">已解决退货问题，关闭退货单</span>
            </div>
            <span>你还可以：</span>
            <span id="draw-back">退款给卖家</span>
          </div>
          <div class="handle-item" v-else-if="listDetail.STATUS == 3">
            <div class="handle-top">
              <h3>买家已退货，等待卖家收货</h3>
              <!-- <div class="logistics">
                <span>买家已退货，物流公司：</span>
                <span class="logistics-item">{{logistics.logisticsVendor}}</span>
                <span>物流单号：</span>
                <span class="logistics-item">{{logistics.logisticsNo}}</span>
                <span>手机</span>
                <span class="logistics-item">{{logistics.mobilePhone}}</span>
              </div> -->
              <div class="count-down count-down-status3">
                <span>请在</span>
                <span v-if="isOverdue" class="count-item-error">0 天 0 小时 0 分钟</span>
                <span v-else class="count-item">{{countDown}}</span>
                <span>内确认，如逾期未处理，将自动退款给买家。</span>
              </div>
              <el-button type="primary" :loading="agreeloading" @click="agreeRefund3()">确认收货并退款</el-button>
              <el-button  @click="refuseRefund()">拒绝确认收货</el-button>
            </div>
          </div>

          <div class="handle-item" v-else-if="listDetail.STATUS == 2 && info.result==1">
            <div class="handle-item-son">
              <div class="handle-top">
                <h2>商家已同意退款，等待买家退货</h2>
                <h3>您已同意退款申请，请等待买家回寄商品。</h3>
                <div class="count-down">
                  <span>买家在</span>
                  <span v-if="isOverdue" class="count-item-error">0 天 0 小时 0 分钟</span>
                  <span v-else class="count-item">{{countDown}}</span>
                  <span>内未响应，退款申请将自动关闭</span>
                </div>
              </div>
              <div class="confirm-apply">
                <el-switch
                  v-model="isConfirmRefundApply"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="confirmRefundApply">
                </el-switch>
                <h2 style="display:inline-block;">买家已填写退货申请</h2>
              </div>
              <span>你还可以：</span>
              <span id="draw-back" v-if="agreeloading">已收到货，同意退款</span>
              <span id="draw-back" v-if="!agreeloading" @click="agreeRefund3()">已收到货，同意退款</span>
            </div>
          </div>

          <div class="handle-item" v-else-if="listDetail.STATUS == 2 && info.result==0">
            <div class="handle-item-son">
              <div class="handle-top">
                <h2>商家已同意退款，等待银行系统处理退款</h2>
                <h3>系统已发起退款，具体时间以银行实际到账时间为准。</h3>
              </div>
            </div>
          </div>

          <div class="handle-item" v-else-if="listDetail.STATUS == 1">
            <div class="handle-top">
              <h3>商家不同意退款</h3>
              <p>您已拒绝本次退款申请，买家修改退款申请后，需要您重新处理</p>
              <span>或者：</span>
              <span id="draw-back" style="color: red;" @click="closeRefund()">已解决退货问题，关闭退货单</span>
            </div>
          </div>
          
          <!-- status 0  -->
          <div class="handle-item" v-else-if="listDetail.STATUS == 0 || info.status == 0">
            <!-- status=>1 -->
            <div class="handle-item" v-if="listDetail.refundMethod == 0">
              <div class="handle-item-son">
                <div class="handle-top">
                  <h2>请处理退款申请</h2>
                  <div class="count-down">
                    <span>还剩</span>
                    <span v-if="isOverdue" class="count-item-error">0 天 0 小时 0 分钟</span>
                    <span v-else class="count-item">{{countDown}}</span>
                  </div>
                  <p>如果未发货，请点击同意退款将款项返还给买家</p>
                  <p>如果实际已发货，请主动与买家联系</p>
                  <p>如果您逾期未响应申请，视作同意买家申请，系统将自动退款给买家</p>
                </div>
                <el-button type="primary" :loading="agreeloading" @click="agreeRefund()">同意退款</el-button>
                <el-button @click="refuseRefund()">拒绝退款</el-button>
              </div>
            </div>

            <div class="handle-item" v-else-if="listDetail.refundMethod == 1">
              <!-- status=>4 -->
              <div class="handle-item-son">
                <div class="handle-top">
                  <h2>请处理退款申请</h2>
                  <div class="count-down">
                    <span>还剩</span>
                    <span v-if="isOverdue" class="count-item-error">0 天 0 小时 0 分钟</span>
                    <span v-else class="count-item">{{countDown}}</span>
                  </div>
                  <p>如果未发货，请点击同意退款将款项返还给买家</p>
                  <p>如果实际已发货，请主动与买家联系</p>
                  <p>如果您逾期未响应申请，视作同意买家申请，系统将自动退款给买家</p>
                </div>
                <el-button type="primary" :loading="agreeloading" @click="agreeRefund2()">同意退货 ，发送退货地址</el-button>
                <el-button  @click="refuseRefund()">拒绝退款申请</el-button>
              </div>
            </div>

          </div>
        </div>

        <!-- 不同意页面 -->
        <div class="handle" v-else-if="isAgree == false">

          <div class="handle-item" v-if="listDetail.STATUS == 6">
            <h2>退款关闭</h2>
            <p>本次交易已被撤销</p>
          </div>

          <div class="handle-item" v-else-if="listDetail.STATUS == 4">
            <div class="handle-top">
              <h3>商家不同意退款</h3>
              <p>您已拒绝本次退款申请，买家修改退款申请后，需要您重新处理</p>
              <span>或者：</span>
              <span id="draw-back" style="color: red;" @click="closeRefund()">已解决退货问题，关闭退货单</span>
            </div>
            <span>你还可以：</span>
            <span id="draw-back">退款给卖家</span>
          </div>

        </div>


        <!-- 拒绝 -->
        <el-dialog title="维权处理" :visible.sync="dialogTableVisible">
          <div class="refuse-item">
            <span>处理方式：</span>
            <span>{{ refundMethods[info.result] }}</span>
          </div>
          <div class="refuse-item">
            <span>退款金额：</span>
            <span class="refund-amount">￥{{info.refundAmount}}</span>
          </div>
          <div class="refuse-item">
            <span class="refuse-reason">拒绝理由：</span>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="输入拒绝理由"
              v-model="refundReason"
              style="margin-bottom:10px;">
            </el-input>
          </div>
          <div class="refuse-item">
            <!-- status=>1 仅退款 -->
            <el-button type="primary" :loading="refuseloading" v-if="listDetail.refundMethod == 0" @click="confirmRefuse()">拒绝退款</el-button>
            <!-- status=>4 退货退款-->
            <el-button type="primary" :loading="refuseloading" v-if="listDetail.refundMethod == 1"  @click="confirmRefuse2()">拒绝退款申请</el-button>
          </div>
        </el-dialog>



        <!-- 发送地址 -->
        <el-dialog title="维权处理" :visible.sync="dialogTableVisible2">
          <div class="refuse-item">
            <span>处理方式：</span>
            <span>{{ refundMethods[info.result] }}</span>
          </div>
          <div class="refuse-item">
            <span>退款金额：</span>
            <span class="refund-amount">￥{{info.refundAmount}}</span>
          </div>
          <div class="refuse-item">
            <div class="refuse-item-son">
              <span class="refuse-reason">联系人：</span>
              <el-input
                placeholder="输入联系人"
                class="el-input-special"
                v-model="refundLinkMan"
                @focus="focus($event)"
                clearable>
              </el-input>
            </div>

            <div class="refuse-item-son">
              <span class="refuse-reason">联系人号码：</span>
              <el-input
                placeholder="输入联系人号码"
                class="el-input-special"
                v-model="refundLinkManTel"
                @focus="focus($event)"
                clearable>
              </el-input>
            </div>

            <div class="refuse-item-son">
              <span class="refuse-reason">退货地址：</span>
              <el-input
                placeholder="输入退货地址"
                class="el-input-special"
                v-model="refundAddress"
                @focus="focus($event)"
                clearable>
              </el-input>
            </div>

          </div>
          <div class="refuse-item">
            <el-button :loading="agreeloading" type="primary" @click="confirmRefund2()">同意退货 ，发送退货地址</el-button>
          </div>
        </el-dialog>


        <!-- 找不到物流轨迹：物流概要弹框 -->
        <el-dialog title="物流信息" class="logictics" :visible.sync="dialogTableVisible4">
          <div class="logistics">
            <div>
              <span class="left">物流公司：</span>
              <span class="right">{{logistics.logisticsVendor}}</span>
            </div>
            <div>
              <span class="left">物流单号：</span>
              <span class="right">{{logistics.logisticsNo}}</span>
            </div>
            <div>
              <span class="left">手机：</span>
              <span class="right">{{logistics.mobilePhone}}</span>
            </div>
          </div>
        </el-dialog>

        <!-- 物流追踪 -->
        <el-dialog title="物流信息" :loading="true"  class="logictics" :visible.sync="dialogTableVisible5">
          <div class="logistics">
            <!-- express -->
            <div>
              <span class="left">物流单号：</span>
              <span class="right">{{express.nu}}</span>
            </div>
            <div>
              <span class="left">物流状态：</span>
              <span class="right">{{expressState[express.state]}}</span>
            </div>
            <div>
              <span class="left">物流公司：</span>
              <span class="right">{{express.name}}</span>
            </div>
							
            <el-table
              :data="express.data"
              style="width: 100%"
               v-loading="loading"
              >
              <el-table-column
                prop="ftime"
                label="时间"
                width="160">
              </el-table-column>
              <el-table-column
                prop="context"
                label="地点和跟踪进度">
              </el-table-column>
            </el-table>

          </div>
        </el-dialog>

      </div>
		</div>
	</div>
</template>

<script>
  import * as Service from '@/common/service/refund/index.js';
  import {httpService} from '@/common/http/http.js';
  import {
    passRefund,
    refuseRefund,
    getLogistics,
    getLogisticsResume,
    trailExpress,
    getConsultList,
    confirmPassRefund,
    getStoreRefundResume,
    agreeAndSendAddr,
    rejectGoods,
  } from '@/common/service/refund/index.js';
  import { http, api } from '@/common/http/http.js';

  export default {
    data(){
      return{
      	agreeloading:false,
      	refuseloading:false,
      	loading:true,
        orderDetail: {
          refundMethod: 1,//1
          status: 1,
        },
        listDetail: {},//list传过来的detail
        info: {},
        refundMethods: ['仅退款','退货退款'],
        countDown: null,
        isOverdue: false,//倒计时是否过期
        dialogTableVisible: false,
        dialogTableVisible2: false,
        dialogTableVisible3: false,
        dialogTableVisible4: false,
        dialogTableVisible5: false,
        refundReason: null,
        refundAddress: null,
        refundLinkMan: null,
        refundLinkManTel: null,
        isAgree: true,//商家同意退款,否
        isConfirmRefundApply: false,
        logistics: {},
        express: {},
        logisticsUrl: null,
        consultList: [],
        expressState: [
          '在途中',
          '已揽收',
          '疑难',
          '已签收',
          '退签',
          '同城派送中',
          '退回',
          '转单',
        ],
        expressCom:[{"yunda":"韵达快运"},{"shentong":"申通快运"}],
      }
    },
    watch: {
      isAgree(){
        if(!this.isAgree){
          this.initCountDown(7);
        }
      },
      "listDetail.STATUS"(){
        //refundSubmitDate 5、merchartAgreeTime 7、logisticsTime 10
        if(this.listDetail.STATUS == 4){
          this.initCountDown(7);
        }
        if(this.listDetail.STATUS == 3){
          this.initCountDown(10, this.info.logisticsTime);
        }
        if(this.listDetail.STATUS == 2){
          this.initCountDown(7, this.info.merchartVerifyTime);
        }
        this.verifyCountDown(this.listDetail.STATUS);
      },
      listDetail:{
        handler: function(){
          //更新
          localStorage.setItem('refund',JSON.stringify(this.listDetail));
        },
        deep: true,
      },
    },
    methods: {
      toOrderDetail(){
        this.$router.push({
          path: `/order/detail?orderCode=${this.info.orderCode}`,
        })
      },
      getLogistics(){
				this.loading = true;
				this.dialogTableVisible5 = true;
        Service.trailExpress({refundNo: this.listDetail.refundNo}).then((res) => { 
          this.express = this.objCopy(res);
          this.loading = false;
          console.log(this.express);
          
          let timer = setTimeout(() => {
            let node = document.querySelector('.el-table__body tbody tr');
            node.style.color = 'red';
          }, 20);

        }).catch((res) => {
           this.$message.error(res.message);
           this.dialogTableVisible5 = false;
        })

      },
      initInfo(){
        //this.listDetail.refundNo
        Service.getRefundInfo({code: this.listDetail.refundNo}).then((res) => { 
          this.info = this.objCopy(res)||{}
          console.log(this.info);
        }).catch((res) => {
          this.$message.error(res.message);
        })
      },
      initConsult(){
        //152480791472527
        Service.getConsultList({refundNo: this.listDetail.refundNo}).then((res) => { 
          this.consultList = [...res];
        }).catch((res) => {
          this.$message.error(res.message);
        })
      },
      initCountDown(_day, _source){
        if(_source == undefined){
          _source = this.listDetail.refundSubmitDate;
        }

        let now = dayjs();
        let diff = dayjs().diff(dayjs(_source).add(_day,'day'), now) * (-1);

        var days = parseInt(diff / (1000 * 60 * 60 * 24));
        var hours = parseInt((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = parseInt((diff % (1000 * 60 * 60)) / (1000 * 60));
        // var seconds = parseInt((diff % (1000 * 60)) / 1000);

        let target = days + " 天 " + hours + " 小时 " + minutes + " 分钟 ";
        (_day == 5 || _day == 7 || _day == 10) && (this.countDown = target);
        return target;
      },
      verifyCountDown(status){
        // this.countDown = '-4 天 -21 小时 -24 分钟';
        let res = this.countDown.indexOf('-'); 
        
        if(res != -1 && status != 5 && status != 6){
          this.isOverdue = true;
          this.$notify.error({
            title: '重要提示',
            message: '该退款申请处理已超时，请快速处理，避免影响店铺信誉',
          });
        }

      },
      agreeRefund(){
        this.$confirm('确定同意退款?', '提示', {
          confirmButtonText: '同意退款',
          cancelButtonText: '取消操作',
          type: 'warning'
        }).then(() => {
          this.agreeloading = true;
          passRefund({code: this.info.refundNo}).then((res)=>{
            //status=>2
            
            Service.confirmPassRefund({refundNo: this.info.refundNo}).then((res) => { 
              if(res.result == false){
                // this.tips('error',"没有查询到符合条件的记录");
                this.$message.error(res.msg);
					          this.$router.push({
					            path: '/refund', 
					          });		            
                return false
              }
              this.listDetail.STATUS = 5;
              this.isAgree = true;
              this.tips('success','已同意退款!');
            }).catch((res) => {
            	this.agreeloading = false;
              this.$message.error(res.message);
            })

          }).catch((res) => {

          	this.agreeloading = false;
            this.$message.error(res.message);
		          this.$router.push({
		            path: '/refund', 
		          });

          })
          
        }).catch(() => {
          this.tips('info','已取消操作!');
        });
      },
      //
      agreeRefund3(){
      	
        this.$confirm('确定同意退款?', '提示', {
          confirmButtonText: '同意退款',
          cancelButtonText: '取消操作',
          type: 'warning'
        }).then(() => {
        	 this.agreeloading = true;
		            Service.confirmPassRefund({refundNo: this.info.refundNo}).then((res) => { 
		              if(res.result == false){
		                // this.tips('error',"没有查询到符合条件的记录");
		                this.$message.error(res.msg);
								    this.agreeloading = false;
					          this.$router.push({
					            path: '/refund', 
					          });								    
		                return false
		              }
		              this.listDetail.STATUS = 5;
		              this.isAgree = true;
		              this.tips('success','已同意退款!');
		            }).catch((res) => {
		            	this.agreeloading = false;
		              this.$message.error(res.message);
		            })
			        }).catch(() => {
			          this.tips('info','已取消操作!');
			        });
      },
      agreeRefund2(){
         this.agreeloading = true;
        //JSON.parse(localStorage.getItem('user')).store.id
        let storeId = JSON.parse(localStorage.getItem('user')).store.id;
        Service.getStoreRefundResume({storeId: storeId}).then((res) => { 
          this.refundLinkMan = res.refundName;
          this.refundLinkManTel = res.refundPhone;
          this.refundAddress = res.refundAddress;
        	this.agreeloading = false;
          this.dialogTableVisible2 = true;
        }).catch((res) => {
        	this.agreeloading = true;
          this.dialogTableVisible2 = true;
        })

      },
      confirmRefund2(){
        if(this.refundLinkMan == null){
          this.tips('error','联系人不能为空')
          return false
        }else if(this.refundLinkManTel == null){
          this.tips('error','联系人号码不能为空')
          return false
        }else if(this.refundAddress == null ){
          this.tips('error','退货地址不能为空');
          return false
        }

        let params = {
          refundNo: this.info.refundNo,
          refundAddr: this.refundAddress,
          refundReceiver: this.refundLinkMan,
          refundTel: this.refundLinkManTel,
        }
				this.agreeloading = true;
        agreeAndSendAddr(params).then((res)=>{
        this.agreeloading = false;	
          console.log(res);
          this.dialogTableVisible2 = false;
          this.listDetail.STATUS = 2;
          this.isAgree = true;
          this.initCountDown(7);
          this.tips('success','已同意退货!');
        }).catch((res) => {
        	this.agreeloading = false;	
          if(res.code == 400 || res.code == 500){
            this.tips('info','服务器繁忙，请稍后重试')
          }
        }) 
      },
      //同意退货申请
      confirmRefundApply(){
        this.listDetail.STATUS = 3;
        // this.getLogistics();
        this.countDown = this.initCountDown(10)
      },
      refuseRefund(){
        this.dialogTableVisible = true;
      },
      //status=>1
      confirmRefuse(){
        if(this.refundReason == "" || this.refundReason == null){
          this.tips('error','拒绝退款原因不能为空');
          return false
        }

        let params = {
          code: this.info.refundNo,
          refundReason: this.refundReason,
        }
        console.log(params);
				this.refuseloading = true;
        refuseRefund(params).then((res)=>{
          this.listDetail.STATUS = 1;
          this.isAgree = false;
          this.refuseloading = false;
          this.dialogTableVisible = false;
          console.log(res);
          this.tips('success','已拒绝退款!');
        }).catch((res) => {
        	this.refuseloading = false;
          this.$message.error(res.message);
        }) 
      },
      //status=>4
      confirmRefuse2(){
        if(this.refundReason == "" || this.refundReason == null){
          this.tips('error','拒绝退款原因不能为空');
          return false
        }

        let params = {
          refundNo: this.info.refundNo,
          refundReason: this.refundReason,
        }
        console.log(params);
				this.refuseloading = true;
        Service.rejectGoods(params).then((res)=>{
        	this.refuseloading = false;
          this.listDetail.STATUS = 4;
          this.isAgree = false;
          this.dialogTableVisible = false;
          console.log(res);
          this.tips('success','已拒绝退款!');
        }).catch((res) => {
        	this.refuseloading = false;
          this.$message.error(res.message);
        }) 
      },
      //status 1 || 4 => 6
      closeRefund(){
        this.$confirm('已解决退货问题，关闭退货单?', '提示', {
          confirmButtonText: '直接关闭订单',
          cancelButtonText: '取消操作',
          type: 'warning'
        }).then(() => {
          Service.setCloseRefund({refundNo: this.info.refundNo}).then((res) => { 
            console.log(res);
            this.listDetail.STATUS = 6;
            this.isAgree = true;
            this.tips('success','已关闭订单!');
          }).catch((res) => {
            this.$message.error(res.message);
          })
          
        }).catch(() => {
          this.tips('info','已取消操作!');
        });
      },
    },
    mounted(){
      this.listDetail = Object.assign(JSON.parse(localStorage.getItem('refund')), this.objCopy(this.$route.params));

      this.initInfo();
      this.initConsult();
      // this.listDetail.STATUS = 0;
      // this.listDetail.refundMethod = 1;

      if(this.listDetail.refundMethod == 0 || this.listDetail.refundMethod == 1){
        this.initCountDown(5);
      }
      
    }
  }
</script>

<style lang="scss" scoped>
  .subject{
    .filter_query{
      width: 100%;
      padding: 15px;
      border:1px solid #ccc;
      margin-bottom: 20px;
      background: #fff;
      .header-item{
        position: relative;
        min-height: 65px;
        border-bottom: 1px dashed #ccc;
        >img{
          width: 55px;
          height: 55px;
          float: left;
          margin-top: 5px;
        }
        >.cont-right{
          margin-left: 60px;
        	min-height: 65px;
          padding-left: 10px;
          width: 890px;
          >.header-p{
            width: 100%;
            min-height: 30px;
            line-height: 30px;
          }
        }
        .refund-date{
          color: #aaa;
          position: absolute;
          top: 10px;
          right: 20px;
          display: inline-block;
        }
      }
      
      .header-title{
        font-size: 18px;
      }
      .header-cont{
        
        >img{
          width: 60px;
          height: 60px;
          background: #58bc58;
          float: left;
        }
        >.cont-right{
          float: left;
          height: 60px;
          padding-left: 10px;
          >.header-p{
            height: 30px;
            line-height: 30px;
          }
        }
      }
    }
    .main-son{
      width: 100%;
      height: 470px;
      border: 1px solid #ccc;
      margin-bottom: 20px;
      >.aside{
        width: 25%;
        height: 100%;
        padding: 10px;
        background: #fff;
        float: left;
        border-right: 1px solid #ccc;
        >.aside1{
          font-size: 16px;
          border-bottom: 1px solid #ccc;
        }
        >.aside2{
          width: 100%;
          border-bottom: 1px solid #ccc;
          height: 100px;
          padding-top: 19px;
          >img{
            width: 60px;
            height: 60px;
            background: #58bc58;
            float: left;
          }
          >.aside2-right{
            float: left;
            height: 60px;
            padding-left: 10px;
            >.aside2-p{
              height: 30px;
              width: 170px;
              line-height: 30px;
              display: block;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
          }
        }
        >.aside3{
          border-bottom: 1px solid #ccc;
          >.aside3-item{
            line-height: 30px;
            height: 30px;
            position: relative;
            >span.left{
              width: 60px;
              position: absolute;
              // display: inline-block;
              text-align: justify;
              height: 30px;
              line-height: 30px;
            }
            >span.right{
              // display: inline-block;
              position: absolute;
              left: 60px;
              width: 180px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            >.order-code{
              color: #4DA9E4;
            }
            >.result{
              color: red;
            }
          }
        }
        >.aside3-end{
          border: none;
        }
      }
      >.handle{
        width: 75%;
        height: 100%;
        padding: 30px;
        background: #fff;
        float: left;
        display: block !important;
        .handle-item{
        	>h2{
        		font-size: 24px;
        	}
        }
        .handle-top{
          border-bottom: 1px solid #ccc;
          margin-bottom: 10px;
          padding-bottom: 10px;
          >h2{
            font-size: 24px;
          }
          >p{
            font-size: 14px;
            height: 25px;
            line-height: 25px;
          }
          >.count-down{
            >.count-item{
              color: #4DA9E4;
              margin-left: 10px;
              font-size: 14px;
            }
            >.count-item-error{
              color: red;
            }
          }
          >.count-down-status3{
            margin-bottom: 10px;
          }
          >.logistics{
            margin-bottom: 10px;
            >.logistics-item{
              color: #4DA9E4;
              margin-left: 10px;
              font-size: 14px;
            }
          }
          
          >h3{
            font-weight: bold;
          }
        }
        .refuse-item{
          >span{
            height: 30px;
            line-height: 30px;
          }
          .el-textarea{
            display: inline-block;
            margin-left: 10px;
            width: 75%;
          }
          >span.refuse-reason{
            height: 54px;
            line-height: 54px;
            display: inline-block;
          }
          >span.refund-amount{
            color: red;
          }
          >.el-button--primary{
            margin-top: 20px;
          }
        }
      }

    }
  }
  .handle{
    #draw-back{
      font-size: 14px;
      color: #4DA9E4;
    }
  }

  .main-son{
    .refuse-item{
      .refuse-item-son{
        margin-bottom: 10px;
        .el-input-special{
          width: 76%;
        }
      }
    }
  }

  .logictics{
    >.el-dialog{
      width: 51% !important;
      >.el-dialog__body{
        overflow: hidden;
        height: 330px;
      }
    }
  }

</style>