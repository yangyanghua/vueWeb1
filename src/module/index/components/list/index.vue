<template>
  <div class="main">
    <!--面包屑-->
    <div class="crumbs">
     系统首页
      <div class="refresh">
        <el-button type="primary" class="refresh_btn" size="medium" @click="refresh()">刷新</el-button>
      </div>
    </div>
    <!-- / 面包屑-->

    <div class="subject">
      <!--基础信息-->
      <div class="information">
        <h2 class="t_h2">
          <i></i>基础信息</h2>
        <div class="content">
          <ul>
            <li :model="form">
              <p class="p_img">    
                <img width="100%" v-if="form.logoUrl" :src="(form.logoUrl).indexOf('|')>-1?form.logoUrl.split('|')[1]:(form.logoUrl)" alt="">
                <!--字符串转化成数组用|分开 取第二个-->
              </p>
              <p class="p_zi">
                <span class="s_title">{{form.name}}</span>
                <span class="s_leftone">用户名：{{loginName}}</span>
                <!---->
                <!-- <span>【&nbsp;&nbsp; 管理权限：{{form.Administrators}} </span> -->
                <span>最后登录：{{lastLoginTime}}<!-- &nbsp;&nbsp;】 --></span>
              </p>
            </li>
            <li class="btn">
              <el-button type="primary" size="medium" icon="el-icon-edit-outline" @click="editDetail()">编辑店铺</el-button>
            </li>
          </ul>
        </div>
      </div>
      <!--  / 基础信息-->
      <!--快速导航-->
      <div class="navigation">
        <ul>
          <li>
            <p class="img">
              <img src="/static/images/order.png">
            </p>
            <p class="zi">
              <span class="s_title">今日订单总数</span>
              <span>{{todayOrderNum}}</span>
            </p>
          </li>
          <li>
            <p class="img">
              <img src="/static/images/quota.png">
            </p>
            <p class="zi">
              <span class="s_title">今日成交额</span>
              <span>{{todayOrderSum}}</span>
            </p>
          </li>
          <li>
            <p class="img">
              <img src="/static/images/quota1.png">
            </p>
            <p class="zi">
              <span class="s_title">昨日成交额</span>
              <span>{{yesterdayOrderSum}}</span>
            </p>
          </li>
          <li>
            <p class="img">
              <img src="/static/images/visitor.png">
            </p>
            <p class="zi">
              <span class="s_title">今日访客数</span>
              <span>{{totalStoreUV}}</span>
            </p>
          </li>
        </ul>
      </div>
      <!--  / 快速导航-->

      <!--待处理事务-->
      <div class="transaction">
        <h2 class="t_h2">
          <i></i>待处理事务</h2>
        <div class="content" :model="preHandleForm">
          <ul>
            <li>
              <p class="number" @click="orderBtn(12)">{{preHandleForm.unpaed}}</p>
              <p>待付款订单</p>
              <i></i>
            </li>
            <li>
              <p class="number" @click="orderBtn(8)">{{preHandleForm.hasDelivered}}</p>
              <p>已发货订单</p>
              <i></i>
            </li>
            <li>
              <p class="number" @click="orderBtn(9)">{{preHandleForm.hasFinished}}</p>
              <p>已完成订单</p>
              <i></i>
            </li>
            <li>
              <p class="number" @click="orderBtn(11)">{{preHandleForm.unDelivered}}</p>
              <p>待发货订单 </p>
            </li>
          </ul>
        </div>
      </div>
      <!--  / 待处理事务-->

      <!--总览-->
      <div class="overview">
        <div class="product flxe">
          <h2 class="t_h2">
            <i></i>商品总览</h2>
          <ul :model="overViewForm">
            <li>
              <p class="number">{{overViewForm.downCount}}</p>
              <p>已下架</p>
            </li>
            <li>
              <p class="number">{{overViewForm.upCount}}</p>
              <p>已上架</p>
            </li>
            <li>
              <p class="number">{{overViewForm.stockShortage}}</p>
              <p>库存紧张</p>
            </li>
            <li>
              <p class="number">{{overViewForm.allCount}}</p>
              <p>全部商品</p>
            </li>
          </ul>
        </div>
        <div class="user flxe">
          <h2 class="t_h2">
            <i></i>用户总览</h2>
          <ul>
            <li>
              <p class="number">{{totalStoreUV}}</p>
              <p>今日访客</p>
            </li>
            <li>
              <p class="number">{{yesterdayStoreUV}}</p>
              <p>昨日访客</p>
            </li>
            <li>
              <p class="number">{{currentMonthStoreUV}}</p>
              <p>本月访客</p>
            </li>
            <li>
              <p class="number">{{totalBuyers}}</p>
              <p>今日支付买家数</p>
            </li>
          </ul>
        </div>

      </div>
      <!--  /  总览-->

      <!--订单统计-->
      <div class="order_statistics mat20">
        <h2 class="t_h2">
          <i></i>订单统计</h2>

        <div class="order_btn">
          <date-search :queryMethod="queryDataResult"></date-search>

        </div>

        <div class="order_conter">
          <div class="order_left">
            <ul>
              <li>
                <p class="p1">{{orderNumStaticsInfo[0]}}订单总数</p>
                <p class="p2">{{orderNumStatics}}</p>
                <p class="p3" v-show="orderNumStaticsPercent">
                  <i :class="[parseFloat(orderNumStaticsPercent)>=0?'el-icon-caret-top red': 'el-icon-caret-bottom']">{{orderNumStaticsPercent}}</i>同比{{orderNumStaticsInfo[1]}}</p>
              </li>
              <!-- <li>
                <p class="p1">本周订单数量</p>
                <p class="p2">10000</p>
                <p class="p3"><i class="el-icon-caret-bottom red">10%</i>同比上周</p>
              </li> -->
            </ul>
          </div>
          <div class="order_right" id="main">
            <!-- 2 -->
          </div>
        </div>
      </div>
      <!--  / 订单统计-->

      <!--销售统计-->
      <div class="order_statistics mat20">
        <h2 class="t_h2">
          <i></i>销售统计</h2>

        <div class="order_btn">
          <date-search :queryMethod="salesDataResult"></date-search>

        </div>

        <div class="order_conter">
          <div class="order_left">
            <ul>
              <li>
                <p class="p1">{{salesNumStaticsInfo[0]}}销售总额</p>
                <p class="p2">{{salesNumStatics}}</p>
                <p class="p3" v-show="salesNumStaticsPercent">
                  <i :class="[parseFloat(salesNumStaticsPercent)>=0?'el-icon-caret-top red': 'el-icon-caret-bottom']">{{salesNumStaticsPercent}}</i>同比{{salesNumStaticsInfo[1]}}</p>
              </li>
              <!-- <li>
                <p class="p1">本周订单数量</p>
                <p class="p2">10000</p>
                <p class="p3"><i class="el-icon-caret-bottom red">10%</i>同比上周</p>
              </li> -->
            </ul>
          </div>
          <div class="order_right" id="sales">
            <!-- 2 -->
          </div>
        </div>
      </div>
      <!--  / 销售统计-->

      <!--关于我们-->
      <div class="about">
        <div class="business_school flex">
          <h2 class="t_h2">
            <i></i>码上花商学院
            <el-button type="primary" class="p1" size="medium" @click="more()">更多</el-button>
          </h2>
          <ul>
            <li v-for="businessSchool in dataList" :key="businessSchool.id" @click="onContent(businessSchool.id)">
              <div class="img paddingHeight" v-bind:style="{ backgroundImage: 'url('+businessSchool.dataImageUrl+')' }">
                <!-- <img :src="businessSchool.dataImageUrl" alt=""> -->
              </div>
              <p class="zi">{{businessSchool.name}}</p>
              <p class="z_vce" v-text="businessSchool.content"></p>
            </li>
          </ul>
        </div>
        <div class="notice flex">
          <h2 class="t_h2">
            <i></i>公告
            <el-button type="primary" class="p1" size="medium" @click="noticeMore()">更多</el-button>
          </h2>
          <ul>
            <li v-for="notice in nList" :key="notice.id" @click="content(notice.id)">
              <p class="title">{{notice.name}}
                <i>{{notice.time}}</i>
              </p>
              <p class="detailed">{{notice.content}}</p>
            </li>
          </ul>
        </div>
      </div>
      <!--  /  关于我们-->

    </div>

    <!--首页引导页1-->
    <div class="index_tc">
      <el-dialog title="" :visible.sync="brandAudit" width="560px"> 
          <div class="tc_titel ">重要提示</div>
          <div class="compon_p">
            <p>尊敬的客户：</p>
            <p class="cp_1">  
            欢迎您进驻码上花平台，为确保店铺能正常运营，请您维护建行开户的相关信息到本平台。否则，消费者将无法购买码上花平台上您店铺内的商品。
            </p>
           <!--  <p class="cp_1">请您遵照本指引，维护建行开户的相关信息到本平台。否则，消费者将无法购买码上花平台上您店铺内的商品。</p> -->
          </div>
          <div class="com_btn">
                <el-button type="primary" @click="submitCity()">前往设置企业信息</el-button>
              </div>
        <!--   <div class="com_qh">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="未开通" name="first">
                <div class="tu_img">
                  <p><img src="/static/images/cmp_tu.png" alt=""></p>
                  <ul>
                    <li class="cmp_mar">
                      申请开通建<br >
                    行对公业务账户
                    </li>
                   
                    <li class="cmp_mar">
                      开通建设银行<br >
                    信用卡分期功能
                    </li>
                    <li>
                      码上花商家后<br >
                    台线上完善信息
                    </li>
                  </ul>
                </div>
              </el-tab-pane>
              <el-tab-pane label="已开通" name="second">
              <div class="com_btn">
                <el-button type="primary" @click="submitCity()">设置建行开户资料</el-button>
              </div>
                  
              </el-tab-pane>
            </el-tabs>
          </div> -->
        </el-dialog>
    </div>
     <!--首页引导页 end-->    
  </div>
</template>

<script>
  import * as Service from '@/common/service/index/index.js';
  import {
    queryGoodsCount
  } from '@/common/service/goods/index.js';
  import dateSearch from './date.vue';

  export default {
    data() {
      return {
        brandAudit: false,//弹窗
        activeName:'first',//切换
        loginName: '',
        lastLoginTime: '',
        headPicUrl: '',
        /*获取店铺*/
        form: {
          name: '',
          logoUrl: '',
          Administrators: ''
        },
        dataList: [
          {
            dataImageUrl:'http://img01.iflashbuy.com/img/M00/08/DD/CgoKG1sGYx2AWox8AAEWoeJIXtQ453.jpg',
            name:'10月商家活动排期',
            content:'10月商家活动计划如下：首焦banner位-限时折扣开屏广告位-满减优惠'

          }
        ], //码上花商学院
        nList: [], //公告
        todayOrderNum: '',
        todayOrderSum: '',
        yesterdayOrderSum: '',
        totalStoreUV: '',

        yesterdayStoreUV: '',
        currentMonthStoreUV: '',
        totalBuyers: '',
        preHandleForm: {
          unpaed: '',
          hasDelivered: '',
          hasFinished: '',
          unDelivered: ''
        },
        overViewForm: {
          upCount: '',
          downCount: '',
          allCount: '',
          stockShortage: ''
        },
        value6: '',
        /*统计订单图表*/ // 指定图表的配置项和数据
        option: {
          title: {
            text: '订单统计',
            /*改变标题文本样式*/
            textStyle: {
              color: '#777',
              fontWeight: 'normal',
              fontSize: 16
            }
          },
          /*鼠标到折线点出详情*/
          tooltip: {
            trigger: 'axis',
            backgroundColor: '#fff',
            textStyle: {
              color: '#222',
              fontSize: 14
            },
            extraCssText: 'box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.2); width:100px; line-height:24px;padding-left:15px;'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [],
            type: 'line',
            areaStyle: {}, //加了，线下面就有颜色
            smooth: true, //曲线

            /*改变线下面的颜色*/
            itemStyle: {
              normal: {
                color: '#4DA9E4'
              }
            },
            /*改变折线颜色*/
            lineStyle: {
              normal: {
                color: '#4DA9E4'
              }
            }
          }]
        },
        myChart: null,
        salesOption: {
          title: {
            text: '销售统计',
            /*改变标题文本样式*/
            textStyle: {
              color: '#777',
              fontWeight: 'normal',
              fontSize: 16
            }
          },
          /*鼠标到折线点出详情*/
          tooltip: {
            trigger: 'axis',
            backgroundColor: '#fff',
            textStyle: {
              color: '#222',
              fontSize: 14
            },
            extraCssText: 'box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.2); width:100px; line-height:24px;padding-left:15px;'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [],
            type: 'line',
            areaStyle: {}, //加了，线下面就有颜色
            smooth: true, //曲线

            /*改变线下面的颜色*/
            itemStyle: {
              normal: {
                color: '#4DA9E4'
              }
            },
            /*改变折线颜色*/
            lineStyle: {
              normal: {
                color: '#4DA9E4'
              }
            }
          }]
        },
        /*销售统计图表*/
        salesChart: null,
        //订单统计总数据
        orderNumStatics: '',
        //订单统计所选类型 今日、本周、本月等
        orderNumStaticsType: '',
        //订单统计同比比例
        orderNumStaticsPercent: '',
        //查询日期区间
        orderQueryTime: '',
        //销售统计总数据
         salesNumStatics: '',
        //销售统计所选类型 今日、本周、本月等
        salesNumStaticsType: '',
        //销售统计同比比例
        salesNumStaticsPercent: '',
        //查询日期区间
        salesQueryTime: ''
      }

    },
    computed: {
      //统计时用到
      orderNumStaticsInfo: function(){
        
        if(this.orderNumStaticsType===1){
          return ['今日','昨日']
        } else if(this.orderNumStaticsType===2){
          return ['本周','上周']
        } else if(this.orderNumStaticsType===3){
          return ['本月','上月']
        } else {
          // return [this.orderQueryTime.]
          return [];
        }
      },
       //统计销售额用到
      salesNumStaticsInfo: function(){
        
        if(this.salesNumStaticsType===1){
          return ['今日','昨日']
        } else if(this.salesNumStaticsType===2){
          return ['本周','上周']
        } else if(this.salesNumStaticsType===3){
          return ['本月','上月']
        } else {
          // return [this.orderQueryTime.]
          return [];
        }
      }
    },
    methods: {
      /*弹窗方法*/
      submitCity(){
          this.brandAudit = false;
          this.$router.push({
          path: '/account/entInfo/entUpdate',
          // query: {type: this.couponName}
        })
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      /*获取用户名*/
      getLoginUserName() {
        this.loginName = JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).loginName;
      },
      /*获取用户登录时间*/
      getLastLoginTime() {
        this.lastLoginTime = JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).lastLoginTime;
      },
      /*获取用户头像*/
      // getHeadPicUrl(){
      //   this.headPicUrl = JSON.parse(localStorage.getItem('user'))&&JSON.parse(localStorage.getItem('user')).headPicUrl;
      // },
      
      /*弹窗 验证银行填写信息*/
      _ccbValid(){
        Service.EntcheckEntMsg().then(res => {
		      /*获取店铺头像和名字*/
		      localStorage.setItem('ccb','false'); 
		      this._storeInfo();
		      /*获取展示的总数据*/
		      this.getIndexTotalData();		     
        }).catch(res => {
        	if(res.code==400){
            	this.brandAudit= true;
            	localStorage.setItem('ccb','true');        		
        	}
        	
          //this.$message.error(res.message);
        }) 
      },

      /*刷新页面*/
      refresh() {
        location.reload()
      },
      /*码上花商学院*/
      businessSchoolList() {
        let params = {
          pageSize: 3,
          currentPage: 1
        }
        Service.businessSchoolList(params).then(res => {
          this.dataList = res.content;

        }).catch(res => {
          //出现异常
          this.$message.error(res.message);
        })
      },
      /*公告*/
      noticeList() {
        let params = {
          pageSize: 3,
          currentPage: 1
        }
        /*获取数据*/
        Service.noticeList(params).then(res => {
          this.nList = res.content;

        }).catch(res => {
          //出现异常
          this.$message.error(res.message);
        })
        /*  / 获取数据*/
      },
      /*码上花商学院 更多*/
      more() {
        this.$router.push({
          path: '/index/schoolList'
        })
      },
      /*公告 更多*/
      noticeMore() {
        this.$router.push({
          path: '/index/noticeList'
        })
      },
      /*码上花商学院详情*/
      onContent(bannerId) {
        this.$router.push({
          path: '/index/schoolDetail',
          query: {
            id: bannerId
          }
        })
      },
      /*公告详情*/
      content(bannerId) {
        this.$router.push({
          path: '/index/noticeDetail',
          query: {
            id: bannerId
          }
        })
      },
      /*获取展示的总数据*/
      getIndexTotalData() {
        /*获取数据*/
        Service.getIndexTotalData().then(res => {
          this.todayOrderNum = res.todayOrderNum;
          this.todayOrderSum = res.todayOrderSum.toFixed(2); //取小数点前面2位
          this.yesterdayOrderSum = res.yesterdayOrderSum.toFixed(2);
          this.totalStoreUV = res.totalStoreUV;
          this.yesterdayStoreUV = res.yesterdayStoreUV;
          this.currentMonthStoreUV = res.currentMonthStoreUV;
          this.totalBuyers = res.totalBuyers;
        }).catch(res => {
          //出现异常
          this.$message.error(res.message);
        })
        /*  / 获取数据*/
      },
      /*获取待处理事务*/
      getPreHandleData() {
        /*获取数据*/
        Service.getPreHandleData().then(res => {
          this.preHandleForm = res;
        }).catch(res => {
          //出现异常
          this.$message.error(res.message);
        })
        /*  / 获取数据*/
      },
      /* 获取店铺头像和名字*/
      _storeInfo() {
        Service.storeInfo().then((res) => {
          // alert("message");
        //  console.log('res ', res, res.store);
          this.form = Object.assign({},res.store);
          this.form.Administrators = '高级管理员';
        }).catch((res) => {
          this.$message({
            type: 'error',
            message: res.message
          });

        })
      },
      /*编辑店铺*/
      editDetail() {

        this.$router.push({
          path: '/store/info/edit'
        })
      },
      /*统计商品*/
      _queryGoodsCount() {
        queryGoodsCount().then((res) => {
          this.overViewForm = res;
        }).catch((res) => {
          console.log('error ', res); //输出报错信息
          this.$message({
            type: 'error',
            message: res.message
          });
        })
      },
      /*统计订单图表*/
      init_statistics() {
        // 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(document.getElementById('main'));

        // 使用刚指定的配置项和数据显示图表。
        this.myChart.setOption(this.option);

        /*销售统计*/
        this.salesChart = echarts.init(document.getElementById('sales'));
        this.salesChart.setOption(this.salesOption);
        // this.queryDataResult([], 4);
        // this.salesDataResult([], 4);
      },
      /*统计订单图表 获取数据*/
      queryDataResult(val, searchType) {
        console.log('query result ', val, searchType);
        this.orderQueryTime = val;
        this.orderNumStaticsType = searchType;
        
        let params = {
          timeType: searchType
        };
        if (searchType === 4) {
          params.startTime = val[0]&&val[0].getTime();
          params.endTime = val[1]&&val[1].getTime()+(24*60*60-1)*1000;
        }
        Service.getOrderNumByDate(params).then((res) => {
          console.log('getOrderNumByDate ', res);
          // this.option.xAxis.data = ['8-01周1', '07-99999', '07-03周一', '07-04周二', '07-05周三', '07-06周四', '07-06周五'];
          //           this.option.series[0].data = [111, 333, 999, 999, 999, 1330, 1320];
          this.option.xAxis.data = res.manageDataVOs.map(x => x.date);
          this.option.series[0].data = res.manageDataVOs.map(x => x.orderNum);
          this.myChart.setOption(this.option);
            this.orderNumStatics = res.orderTotalNum;
          this.orderNumStaticsPercent = res.orderNumRateOfRise;
        }).catch((res) => {
          this.$message({
            type: 'error',
            message: res.message
          });
        })
      },
      /*销售统计 图表 获取数据*/
      salesDataResult(val, searchType) {
        console.log('query result ', val);
        this.salesQueryTime = val;
        this.salesNumStaticsType = searchType;
        let params = {
          timeType: searchType
        };
        this.salesQueryTime = val;
        if (searchType === 4) {
          params.startTime = val[0]&&val[0].getTime();
          params.endTime = val[1]&&val[1].getTime()+(24*60*60-1)*1000;
          
        }
        Service.getOrderSalesNumByDate(params).then(res => {
          //    this.salesOption.xAxis.data = ['8-01周18', '07-99999', '07-03周一', '07-04周二', '07-05周三', '07-06周四', '07-06周五'];
          // this.salesOption.series[0].data = [111, 333, 999, 999, 999, 1330, 1320];
          this.salesOption.xAxis.data = res.manageDataVOs.map(x => x.date);
          this.salesOption.series[0].data = res.manageDataVOs.map(x => x.orderSum);
          this.salesChart.setOption(this.salesOption);
          this.salesNumStatics = res.orderTotalSum;
          this.salesNumStaticsPercent = res.orderSumRateOfRise;
        }).catch((res) => {
          this.$message({
            type: 'error',
            message: res.message
          });

        });

      },
      /*订单切换跳转*/
      orderBtn(status) {
        this.$router.push({
          path: '/order',
          query: {
            status
          }
        })
      },


    },
    /*组件*/
    components: {
      dateSearch //统计搜索
    },
    mounted() {
      // let ccb = sessionStorage.getItem('ccb') || '';
      // if(!ccb){
      //      /*弹窗 验证银行填写信息*/
      //      this._ccbValid();
      // }   
      // ths._ccb();
      this._ccbValid();
      /*显示用户名*/
      this.getLoginUserName();
      /*显示用户登录时间*/
      this.getLastLoginTime();
      /*显示用户头像*/
      // this.getHeadPicUrl();   
      /*显示码上花商学院列表*/
      this.businessSchoolList();
      /*显示公告列表*/
      this.noticeList();

      /*获取待处理事务*/
      this.getPreHandleData();
      /*获取店铺头像和名字*/
     // this._storeInfo();
      /*统计商品*/
      this._queryGoodsCount();
      /*统计订单图表*/
      this.init_statistics();


    }
  }

</script>
<style lang="scss" scoped>

  .crumbs {
    height: 55px;
    background: #fff;
    padding-left: 20px;
    line-height: 55px;
    font-size: 14px;
    color: #666666;
    border-bottom: 1px solid #E6E6E6;
    .refresh {
      width: 80px;
      height: 30px;
      float: right;

      margin-right: 20px;
      .refresh_btn {
        width: 80px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #4da9e4;
        background: #fff;
        color: #4da9e4;
        padding: 0px;
        padding-left: 13px;
        background: url(/static/images/refresh.png) no-repeat 13px 7px;
      }

    }
  }

  .subject {
    margin: 0 20px;
  }

  .information {
    height: 160px;
    background: #fff;
    margin-top: 20px;
    position: relative;

    .content {
      padding: 10px;
      position: relative;
      ul {
        padding: 10px;
        height: 74px;
        li {
          float: left;
          font-size: 14px;
          /*&:last-child {
            float: right;
          }*/
          p {
            float: left;
            height: 74px;
            &.p_img {
              width: 70px;
              height: 70px;
              border:1px solid #ddd;
              border-radius: 5px;
              overflow: hidden;
            }
            &.p_zi {
              /*width: 650px;*/
              margin-left: 20px;
              font-size: 14px;
              width: 80%;
              span {
                float: left;
              }
              .s_title {   /*首页店铺标题*/
                font-size: 14px;
                font-weight: 700;
                margin-bottom: 20px;
                width: 100%;
                position:relative;
                height:1.5em;
                overflow:hidden;
                &::after {
                    content:"";
                    font-weight:bold;
                    position:absolute;
                    bottom:0;
                    right:0;
                    padding:0 0px 1px 45px;
                }   
              }
              .s_left {
                margin-right: 30px;
              }
              .s_leftone {
                width: 180px;
                margin-right: 20px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }
      .btn {
        margin-top: 20px;
        position: absolute;
        top:14px;
        right:20px;
      }
    }
  }

  .navigation {
    margin-top: 20px;
    height: 120px;

    ul {
      display: flex;
      li {
        flex: 1;
        box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.05);
        height: 120px;
        background: #fff;
        padding: 20px;
        margin-left: 20px;
        position: relative;
        &:first-child {
          border-left: none;
          margin-left: 0;
        }
        &:last-child {
          border-right: none;
        }
        p {
          height: 48px;
          &.zi {
            // width:156px;
            margin-left: 0px;
            position: absolute;
            left:110px;
            top:20px;
          }

          span {
            font-size: 24px;
            float: left;
            margin-left: 12px;
            font-weight: bold;
            &.s_title {
              width: 100%;
              font-size: 16px;
              color: #777;
              font-weight: normal;
              margin-bottom: 20px;
            }
          }

        }
      }
    }
  }

  .transaction {
    height: 182px;
    background: #fff;
    margin-top: 20px;
    position: relative;
    .content {
      padding: 10px;
      ul {
        display: flex;
        li {
          flex: 1;
          text-align: center;
          position: relative;
          p {
            font-size: 16px;
            color: #777777;
            &.number {
              font-size: 28px;
              color: #4DA9E4;
              padding-top: 28px;
              cursor:pointer;
            }
          }
          i {
            position: absolute;
            width: 2px;
            height: 40px;
            background: #eee;
            top: 45px;
            right: 0;
          }
        }
      }
    }
  }

  .overview {
    height: 182px;
    display: flex;
    margin-top: 20px;
    font-size: 14px;
    .flxe {
      flex: 1;
      background: #fff;
      height: 182px;
      position: relative;

      ul {
        display: flex;
        li {
          flex: 1;
          text-align: center;
          p {
            
            color: #777777;
            &.number {
              font-size: 24px;
              color: #333333;
              font-weight: 700;
              margin: 30px 0 10px 0;
            }
          }
        }
      }
    }
    .product {
      margin-right: 20px;
    }
  }

  .about {
    height: 340px;
    display: flex;
    margin: 20px 0;
    h2 {
      .p1 {
        position: absolute;
        right: 20px;
        top: 8px;
        width: 62px;
        height: 40px;
        background: url(/static/images/more.png) no-repeat right 12px;
        color: #666;
        padding: 0;
        border: none;
        border-radius: 0;
      }
    }
    .flex {
      flex: 1;
      background: #fff;
      cursor: pointer;
    }
    .business_school {
      margin-right: 20px;
      position: relative;
      ul {
        // display: flex;
        margin-left: 20px;
        margin-top: 20px;
        
        li {
          margin-right:4%;
          // flex: 1;
          width:30%;
          display: inline-block;
          .img {
            // width:232px;
            // height: 232px;
            height: 0;
            padding-top: 100%;
            text-align: center;
            background: #F6F7F7;
            position: relative;
            img {
              width: 100%;
              height: auto;
              vertical-align: bottom;
              position: absolute;
              width: 100%;
              margin: auto;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
            }
              &.paddingHeight{
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center center;
                /*background-attachment:fixed;*/
              }
          }
          .zi {
            font-size: 14px;
            color: #333333;
            margin-top: 10px;
            position:relative;
            height:1.5em;
            overflow:hidden;
            &::after {
                content:"";
                font-weight:bold;
                position:absolute;
                bottom:0;
                right:0;
                padding:0 0px 1px 45px;
            }
          }
          .z_vce {
            font-size: 12px;
            color: #999999;
            position:relative;
            height:1.5em;
            overflow:hidden;
            padding-right: 10px;
            &::after {
                content:"";
                font-weight:bold;
                position:absolute;
                bottom:0;
                right:0;
                padding:0 0px 1px 45px;
            }
          }
        }
        li:last-child{
        	margin: 0;
        }
      }
    }
    .notice {
      position: relative;
      ul {
        padding: 0 20px;
        li {
          height: 66px;
          border-bottom: 1px dashed #E7EAEC;
          margin-top: 24px;
          .title {
            font-size: 14px;
            color: #333333;
            margin-bottom: 5px;
            position: relative;
            i {
              position: absolute;
              top: 0;
              right: 0;
            }
          }
          .detailed {
            font-size: 12px;
            color: #999999;
            position:relative;
            height:1.5em;
            overflow:hidden;
            padding-right: 10px;
            &::after {
                content:"";
                font-weight:bold;
                position:absolute;
                bottom:0;
                right:0;
                padding:0 0px 1px 45px;
            }

          }
          &:last-child {
            border-bottom: none;
          }
        }
      }
    }

  }

  /*共享样式*/

  .t_h2 {
    height: 50px;
    line-height: 50px;
    padding-left: 38px;
    font-weight: 700;
    border-bottom: 1px solid #E6E6E6;
    i {
      width: 6px;
      height: 16px;
      background: #4DA9E4;
      display: inline-block;
      position: absolute;
      top: 16px;
      left: 20px;

    }
  }

  .order_statistics {
    background: #fff;
    position: relative;
    .order_conter {
      height: 490px;
      display: flex;
      .order_left {
        flex: 1;
        border-right: 1px solid #E6E6E6;
        text-align: center;
        ul {
          li {
            margin-top: 100px;
            .p1 {
              font-size: 16px;
              color: #777777;
            }
            .p2 {
              font-size: 40px;
              color: #4DA9E4;
            }
            .p3 {
              font-size: 14px;
              color: #777777;
              i {
                font-size: 14px;
                color: #63C187;
                margin-right: 5px;
                &.red {
                  color: #E7493E;
                }
              }
            }
          }
        }
      }
      .order_right {
        flex: 4;
        padding: 20px 0px 20px 30px;
      }
    }
    .order_btn {
      width: 570px;
      height: 36px;
      position: absolute;
      top: 5px;
      right: 0;
    }

  }

</style>
