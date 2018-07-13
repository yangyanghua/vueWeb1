<template>
  <div class="main">
   <!--面包屑-->
    <div class="crumbs">
      订单列表
    </div>
     <!-- / 面包屑--> 
  <div class=" subject ">
    <div class="filter_query mat20">
        <h2 class="s_h2"><i></i>筛选查询</h2>     
        <el-form  label-width="100px" :model="searchForm" ref="searchForm" style="margin-top:20px" >
          <el-row>
            <el-col :span="8">
                <el-form-item label="订单编号:" style="display: inline-block;margin-bottom: 10px;" >
              <el-input size="medium" v-model="searchForm.code" style="width: 250px;" placeholder="请输入订单编号"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="商品名称:" style="display: inline-block;margin-bottom: 10px;" >
              <el-input size="medium" v-model="searchForm.goodName" style="width: 350px;" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
                <el-form-item label="买家信息:" style="display: inline-block;margin-bottom: 10px;" >
              <el-input size="medium" v-model="searchForm.consignee" style="width: 250px;" placeholder="请输入买家信息"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="下单时间:" style="display: inline-block;margin-bottom: 10px;" >
                <el-date-picker size="medium"
                  v-model="orderTime"
                  type="daterange"
                  align="left"
                  placeholder="选择日期范围"
                  :picker-options="pickerBeginDateAfter"
                  range-separator=" ~ "
                  @change="orderTime_select">
                </el-date-picker>         
            </el-form-item>
            </el-col>

          </el-row>
          <el-row>
           <!--  <el-col :span="8">
                 <el-form-item label="付款方式:" size="medium" style="display: inline-block;" >
                    <el-select v-model="searchForm.payMethod" placeholder="全部" style="width:250px;">
                    <el-option label="微信支付" value="0"></el-option>
                    <el-option label="支付宝支付" value="1"></el-option>
                    <el-option label="银联支付" value="2"></el-option>
                    </el-select>          
                </el-form-item> 
            </el-col> -->
            <el-col :span="18" style="margin-bottom:20px">
                 <el-form-item style="margin-bottom: 0; " label="" label-width="30px">
                  <el-button size="medium" plain type="primary" icon="el-icon-download" @click="exportall()">导出订单</el-button>
                  <el-button size="medium" icon="el-icon-search"  type="primary"  @click="submitForm('searchForm')">搜索</el-button>
                  <el-button size="medium" icon="el-icon-refresh"  @click="resetForm('searchForm')">重置</el-button>
                </el-form-item>
            </el-col>
          </el-row>
        </el-form>  
      </div>    
    </div>
<div class="subject " style="margin-top: 20px;"> 
<div class="allOrdernav"> 
<el-tabs v-model="activeIndex" type="card" @tab-click="handlemenu" class="tabs">
  <el-tab-pane name="-1" label="全部订单"></el-tab-pane >
  <el-tab-pane name="12" label="待付款"></el-tab-pane>
  <el-tab-pane name="11" label="待发货"></el-tab-pane>
  <el-tab-pane name="8" label="已发货"></el-tab-pane>
  <el-tab-pane name="9" label="已完成"></el-tab-pane>
  <el-tab-pane name="3,18" label="已关闭"></el-tab-pane>
</el-tabs>      
</div>
<div class="orderTable">  
  <div class="orderTitle list">
    <ul>
      <li class="checkbox">
        <el-checkbox :indeterminate="isIndeterminate" v-model="multiOperationAll" @change="selectAll">
        </el-checkbox>
      </li>
      <li class="commodity">商品</li>
      <li class="flex">单价/数量</li>
      <li class="flex">买家信息</li>
      <li class="flex">下单时间</li>
      <li class="flex">订单状态</li>
      <li class="flex">实付金额 </li>
    </ul>
  </div>
  <div class="orderMian" v-for="(order,index) in tableData">
      <div class="number_0">
        <div class="title_1"></div>
        <div class="title_2">
          <p class="p1">
            订单编号：{{order.orderCode}}  <span>支付方式：{{order.payMethod}}</span>
          </p>
          <p class="p2">
          	<el-button type="text"  v-if="order.orderStatus=='已支付'"   @click="delivery(order)">发货</el-button>
            <el-button style="" type="text" class="info" @click="$router.push({path:'/order/detail',query:{orderCode:order.orderCode}})" >查看详情</el-button> 
            <el-button style="" type="text"  class="info" v-if="order.orderStatus=='未支付'" title="取消订单" @click="cancel(order.orderCode)" >取消订单</el-button>
          </p>
        </div>
      </div>
      <div class="list dateList" v-for="item in order.orderItems">
         <ul>
           <li class="checkbox radio">
            <el-checkbox v-model="multiGoodsStatus[index]"></el-checkbox>
           </li>
            <li class="commodity titleImg line">
              <p class="lImg" v-bind:style="{backgroundImage: 'url(' + item.images + ')'}"></p>
              <p class="rZi">
                <span class="s1">{{item.name}}</span>
                <span class="s2">{{item.productSku}}</span>
              </p>
             <p class="proStatus" v-if="item.status==0">待处理退款申请</p>
             <p class="proStatus" v-if="item.status==2||item.status==5" >该商品已退款</p>
            </li>
            <li class="flex line">
              <p class="mat10">¥{{item.amount}}</p>
              <p class="mat20">数量：{{item.quantity}}</p>
            </li>
            <li class="flex line">
              <p class="mat10">{{order.consignee}}</p>
              <p class="mat20">{{order.phone}}</p>
            </li>
            <li class="flex line">
              <p class="mat10">{{order.orderTime.split(' ')[0]}}</p>
              <p class="mat20">{{order.orderTime.split(' ')[1]}} </p>
            </li>
            <li class="flex line">
              <p class="mat10"> {{order.orderStatus}}</p>
              <p class="mat20">
        			<el-button type="text" v-if="order.orderStatus=='已出库' || order.orderStatus=='已签收'"  @click="ViewLogisticsInfo(order.orderCode)">查看物流</el-button>
              <el-button type="text" @click="remark(order.orderCode)">新增日志</el-button>
              </p>
            </li>
            <li class="flex">
              <p class="mat10">¥{{order.orderAmount}}</p>
              <p class="mat20">(运费：&nbsp;{{order.freight}} )</p>
            </li>
         </ul>

      </div>
        
  </div>
  <div class="ao_btn" v-if="tableData.length==0" >暂无数据</div>


    <!--分页-->
    <div class="pagination" >
      <!--<div style="float:left;display:inline-block; margin-left:20px;">
      <el-checkbox :indeterminate="isIndeterminate" v-model="multiOperationAll" @change="selectAll"></el-checkbox>&nbsp;&nbsp;&nbsp;
      <el-button style="padding-top:9px ;" @click="batchexport" type="text" >批量导出订单</el-button>
      </div>-->
        <el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :current-page="searchForm.pageNo" :page-sizes="[10, 20, 30, 40]" :page-size="searchForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalRecord" style="display:inline-block;">
        </el-pagination>
      
    </div>  

  <el-dialog title="订单操作备注" :visible.sync="show_remark">
    <el-form :rules="remarkRules" ref="remarkForm" :model="remarkContent">
      <el-form-item label="操作备注:" prop="remark">
        <el-input  v-model="remarkContent.remark" type="textarea" style="width:50%;"></el-input>
      </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="closeRemark()">取消</el-button>              
          <el-button type="primary" size="small" @click="doRemark()">确定</el-button>
      </span>
  </el-dialog>

  <el-dialog title="签收" :visible.sync="show_sign">
    <el-form>
      <el-form-item label="订单编号">
      <p>{{updateOrderCode}}</p>
      </el-form-item>
      <el-form-item label="订单备注">
        <el-input  v-model=remarkContent></el-input>
      </el-form-item>   
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="closeSign()">关闭</el-button>        
      <el-button size="small" @click="doSign()">保存</el-button>
       </span>
  </el-dialog>

   <el-dialog title="取消订单" :visible.sync="show_cancel">
    <el-form>
      <el-form-item label="订单编号:">
      <p>{{updateOrderCode}}</p>
      </el-form-item>
      <el-form-item label="取消原因" required>
        <el-select v-model="cancelReason" placeholder="请选择取消原因">
          <el-option v-for="item in cancelReasonList" 
            :key="item.value" 
            :label="item.value" 
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      </el-form>
           <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="closeCancel()">取消</el-button>             
      <el-button type="primary"  size="small" @click="doCancel()">确定</el-button>
      </span>
  </el-dialog>
</div>


<!--
  作者：1063676593@qq.com
  时间：2018-01-23
  描述：拒签
-->
<el-dialog
  title="拒签"
  :visible.sync="RefusedDialog"
  size="large"
  >
    <el-form>
      <el-form-item label="订单编号">
      <p>{{updateOrderCode}}</p>
      </el-form-item>
      <el-form-item label="拒签原因">
        <el-select v-model="remarkContent" placeholder="请选择取消原因">
          <el-option v-for="item in refuseReasonList" 
            :key="item.value" 
            :label="item.value" 
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
    </el-form>
     <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeRefuse()">关闭</el-button>       
        <el-button size="small" @click="doRefuse()">保存</el-button>
    </span>
</el-dialog>


<el-dialog
  title="物流详情"
  :visible.sync="ViewLogisticsInfoDialog"
  size="large">

<el-container>
  <el-main v-loading="loading" >
	 				<div class="tabbox">
						<div class="orderlog">
							<table border="0" cellspacing="" cellpadding="">
								<tr class="logItem" v-for="item in exData">
									<td class="logInfo logdate" width="70" style="text-align: right;border: none;">								
										<p class="logInfo logdate">
											<span class="dates">{{item.time.split(' ')[0]}}</span>
											<span class="tiems">{{item.time.split(' ')[1]}}</span>
									   </p>
									</td>
									<td width="20" class="pointLine">
									<i class="wb"></i>
									<p class="point">
										<span></span>
									</p>									
									</td>
									<td width="360" class="logInfotxt">
										<p class="logInfo" style="overflow: hidden;" >
											{{item.context}}
										</p>
									</td>
								</tr>
							</table>					
						</div>
					</div> 	
  </el-main>
</el-container>




 <span slot="footer" class="dialog-footer">
    <el-button @click="ViewLogisticsInfoDialog = false">关闭</el-button>
  </span>
</el-dialog>
</div>
<!--
  作者：1063676593@qq.com
  时间：2018-01-23
  描述：发货弹窗 
-->
  <el-dialog   title="发货"  :visible.sync="deliveryDialog"   width="70%"  >
    <div class="head" style="width: 100%;height: 30px;">
      <p style="float: left;">订单编号：<span>{{orderData.orderCode}}</span></p>
      <p style="color: #999999;float: right;">发货后15天用户没有确认收货，系统将自动签收！注：特殊节假日延长至20天！</p>
    </div>
    <div class="deliverOrderinfoContent">
        <table class="infoTb pro" border="" width="95%" cellspacing="" cellpadding="">
          <tr><th width="40%">商品</th><th>价格</th><th>数量</th><th>优惠金额</th><th>商品合计 </th><th>订单状态 </th></tr>
          <tr v-for="item in orderData.orderItems">
            <td style="position: relative;"><img style="width: 80px;float: left; width: 80px;float: left; margin-left: 10px;margin-top: 10px;" :src="item.images"/>{{item.name}} 
            	<p>{{item.productSku}}</p>
	             <p class="proStatus" v-if="item.status==0" style="bottom: 10px;left: 176px;" >待处理退款申请</p>
	             <p class="proStatus"   v-if="item.status==2||item.status==5" style="bottom: 10px;left: 176px;" >该商品已退款</p>
            </td>
            <td>¥{{item.unitPrice}}</td>
            <td>{{item.quantity}}</td>
            <td>¥{{item.discountAmount}}</td>
            <td>¥{{item.amount}}</td>
            <td>{{orderData.orderStatus}}</td>
          </tr>               
          <tr style="100%"><th colspan="7" style="text-align: right;box-sizing: border-box;padding-right: 20px;" >合计：<span>{{orderData.goodAmount}}</span>￥</th></tr>
        </table>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="送货方式：">
           <p>快递</p>
          </el-form-item>
          <el-form-item label="快递公司：" prop="venderId" style="width: 30%; display: inline-block;margin-right: 1%;">
            <el-select v-model="ruleForm.venderId" placeholder="请选择快递公司">
              <el-option v-for="item in commonexpressOptons" :key="item.expressId" :label="item.name" :value="item.expressId"></el-option>
            </el-select>  
          </el-form-item>
          <el-form-item label="运单号：" prop="expressNo" style="width: 30%; display: inline-block;margin-right: 1%;" >
            <el-input v-model="ruleForm.expressNo"></el-input>
          </el-form-item>
          <el-form-item label="实收运费：" prop="freight" style="width: 30%; display: inline-block;margin-right: 1%;" >
            <el-input v-model="ruleForm.freight"></el-input>
          </el-form-item>

          <el-form-item label="订单备注：" prop="remark" style="width: 93%;">
            <el-input type="textarea" v-model="ruleForm.remark"></el-input>
          </el-form-item>
        </el-form>  
        
    </div>
     <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="deliveryDialog = false">关闭</el-button>
      <el-button size="small" type="primary" :loading="sending" @click="submitDelivery('ruleForm')">立即发货</el-button> </span>
  </el-dialog>

<!--导出订单 选择要导出的内容-->
        <el-dialog title="导出订单" :visible.sync="brandAudit" width="1000px">
          <el-form :model="orderForm" ref="orderForm">
             <el-form-item label="订单信息：" class="orderids" required>
                <div class="">&nbsp;</div>
                 <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2" style="color:#F76B69" class="orderid_hover" @change="handleCheckAllChange2">全选</el-checkbox>
                <div class="item" style="position: relative;" v-for="(item,index) in orderMuendata">
                  <el-checkbox :indeterminate="item.isIndeterminate" v-model="item.checkAll" @change="handleCheckAllOrder(index)" style="border-right: 1px solid #999999; position: absolute;top:0 ;left: 0;height: 45px; color:#3E74B3" class="item_hover" >{{item.name}}</el-checkbox>
                  <el-checkbox-group style="margin-left: 133px;" v-model="item.check" @change="handleCheckedCitiesChange2(index)">
                      <el-checkbox v-for="(item1,index1) in item.chi" :label="item1.value" :key="index1" ref = "xxj">{{item1.name}}</el-checkbox>
                  </el-checkbox-group>               	
                </div>
            </el-form-item>
           <el-form-item label="商品明细信息：" class="goodsids" required>
                 <div class="">&nbsp;</div>
                 <el-checkbox :indeterminate="isIndeterminate3" v-model="checkAll3" @change="handleCheckAllChange3" class="orderid_hover" style="color:#F76B69">全选</el-checkbox>
                <div class="item" style="position: relative;" v-for="(item,index) in proMuendata">
                  <el-checkbox :indeterminate="item.isIndeterminate" v-model="item.checkAll" @change="handleCheckAllPro(index)" style="position: absolute;top: 0;left: 0;border-right: 1px solid #999999;height: 45px; color:#3E74B3" class="item_hover">{{item.name}}</el-checkbox>
                  <el-checkbox-group style="margin-left: 133px;" v-model="item.check" @change="handleCheckedCitiesChange3(index)">
                      <el-checkbox v-for="(item1,index1) in item.chi" :label="item1.value" :key="index1" ref = "xxj">{{item1.name}}</el-checkbox>
                  </el-checkbox-group>               	
                </div>                    
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" style="text-align: center;">
          	<el-button type="primary" @click="submitCity(0)">合并导出</el-button>
          	<el-button type="primary" @click="submitCity(1)">非合并导出</el-button>
            <el-button @click="brandAudit = false">取 消</el-button>
           
          </div>
        </el-dialog>

</div>



</div>
  
  </div>
</template>

<script>
 import {getOrderList,modifyfreight,exportOrder,remark,sign, refuse,cancel,deliverInfo,commonexpress,deliver,batchExport,logisticsinfo,exportByTab,showTrace,batchexportByid,getOrderCode} from '../../service.js';
 import {httpService,api} from '@/common/http/http.js';

  /*列表全选*/
  const getMultiStatus = (num, setVal = false) => {
    return new Array(num).fill(setVal);
  };
  export default {
    data() {
      return {
      	sending:false,
      	loading:true,
      	exData:[],
        /*导出订单 选择要导出的内容*/
        brandAudit:false,
        /*1*/
       isIndeterminate2:false,
       orderMuendata:[
       {name:'下单信息',checkAll:false,isIndeterminate:false,check:[],chi:[{name:'订单号',value:'orderId'},{name:'下单昵称',value:'orderUserName'},{name:'下单账号',value:'orderUserId'},{name:'下单时间',value:'orderTime'},{name:'备注',value:'remark'}]},
       {name:'支付信息',checkAll:false,isIndeterminate:false,check:[],chi:[{name:'支付方式',value:'payTaye'},{name:'支付流水号',value:'payId'},{name:'支付时间',value:'payTime'}]},
       {name:'金额信息',checkAll:false,isIndeterminate:false,check:[],chi:[{name:'商品总金额',value:'amount'},{name:'订单实付金额',value:'realAmount'}]},
       {name:'收货信息',checkAll:false,isIndeterminate:false,check:[],chi:[{name:'收货人',value:'consignee'},{name:'电话',value:'phone'},{name:'收货地址',value:'address'},{name:'物流公司',value:'logName'},{name:'物流单号',value:'logId'}]},
       {name:'发票信息',checkAll:false,isIndeterminate:false,check:[],chi:[{name:'发票类型',value:'billType'},{name:'发票抬头',value:'billName'}]},
       {name:'状态信息',checkAll:false,isIndeterminate:false,check:[],chi:[{name:'订单状态',value:'orderState'},{name:'维权订单状态',value:'refund'}]},
				],
				proMuendata:[
					{name:'商品信息',checkAll:false,isIndeterminate:false,check:[],chi:[{name:'商品名称',value:'goodsName'},{name:'SKU的特征值',value:'SKUid'},{name:'商品编号',value:'goodsId'},{name:'销售价格',value:'price'},{name:'国内市场价',value:'inlandPrice'}]},
					{name:'库存信息',checkAll:false,isIndeterminate:false,check:[],chi:[{name:'库存',value:'inventory'},{name:'销售数据',value:'sales'}]},
					{name:'订单信息',checkAll:false,isIndeterminate:false,check:[],chi:[{name:'数量',value:'count'},{name:'单价',value:'univalence'},{name:'商品金额',value:'goodsAmount'}]},
				],
        checkAll2:false,
        /*2*/
        isIndeterminate3:false,
        //muendata2:['商品信息','库存信息','订单信息'],
        checkAll3:false,

        orderForm:{
          orderIds:[],
          goodsIds:[]
        },

        /*列表全选*/
        multiOperationAll: false,
        multiGoodsStatus: getMultiStatus(10),
        isIndeterminate: false,

        deliveryDialog:false,
        RefusedDialog:false,
        activeIndex: '-1',
        totalRecord:0,
        ViewLogisticsInfoDialog:false,
        isEditing:0,
        isSubmitQuery:1,//是否是表单时间查询  1:表单查询  0:三个月查询
        orderTime:'',
        signTime:'',
        status:'',
        updateOrderCode:'',
        remarkContent:{},

        refuseReasonList:[
                          {value:'运输时，导致包装破损'},
                          {value:'发错商品'},
                          {value:'商品少发漏发了'},
                          {value:'无理由拒签'},
                          {value:'其他'}
        ],

        show_sign:false,
        show_remark:false,
        show_cancel:false,
        cancelReason:'',
        cancelReasonList:[
                          {value:'买家不想买了'},
                          {value:'买家信息填写错误'},
                          {value:'买家拍错了'},
                          {value:'付款不成功'},
                          {value:'库存不足'},
                          {value:'物流无法到达'},
                          {value:'发货时间长'},
                          {value:'价格不正确'},
                          {value:'商品召回'},
                          {value:'其他'}
                          ],
        orderData:{},
        commonexpressOptons:[],
        multipleSelection:[],//表格已经选中的行的数据数组
        pickerBeginDateAfter:{
                disabledDate: (time) => {
                    let beginDateVal = new Date().getTime();
                    return time.getTime() > beginDateVal;
                }
            } ,
        searchForm: {
           code:'',
           consignee:'',
           orderTime: '',
           status:'',
           pageNo:1,
           goodName:'',
           pageSize:10,
           payMethod:''
        },
        updater:{},
        ruleForm: {
          code: '',
          venderId: '',
          expressNo: '',
          remark:'',
          freight:'',
        },
        rules: {
          code: [
            { required: true, message: '请输入订单号', trigger: 'blur' },        
          ],
          venderId: [
            { required: true, message: '请选择发货快递商', trigger: 'blur' }
          ],
          expressNo: [
            { required: true, message: '请输入快递单号', trigger: 'blur' }
          ],          
          remark: [
            { required: false, message: '请填写备注', trigger: 'blur' }
          ]
        },
        remarkRules:{//备注操作的表单验证
          remark:[
          { required:true,message:'请填写操作备注',trigger:'blur'},
          {min:1,max:511,message:'备注字数不能超过511个字符',trigger:'blur,change'}
          ]
        },        
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
        tableData:[],
      }
    },
    /*列表全选*/
    watch: {
      multiGoodsStatus: function (val) {
        if (val.every(x => x === true)) {
          this.multiOperationAll = true;
          this.isIndeterminate = false;
        } else if (val.every(x => x === false)) {
          this.multiOperationAll = false;
          this.isIndeterminate = false;
        } else {
          this.isIndeterminate = true;
          this.multiOperationAll = false;
        }
      }
    },
    methods: {
    //提交确认
      submitCity(isMarge){      	
		          let vm = this;
		          let codes = [];
		          if(!this.multiGoodsStatus.some(x=>x)){
				           console.log('没选订单')
				         }else{
				            this.multiGoodsStatus.map(function(item,index){
				              if(item===true){
				                codes.push(vm.tableData[index].orderCode);
				              }
				            });
      					}
              let arr = [];
              this.orderMuendata.forEach((item)=>{
              	arr = arr.concat(item.check);
              })
              this.proMuendata.forEach((item)=>{
              	arr = arr.concat(item.check);
              })
              if(arr.length==0){
                this.$message.error('请选择要导出的信息');
                return false;
              }else{
              	this.$loading();
              	let opt = {
              		tabs:arr.join(','),
              		isMarge:isMarge,
              		codes:codes.join(',')
              	}
              	if(codes.length>0){
              		batchexportByid(opt).then((res)=>{
	              		 this.$loading().close();
	              		 window.location.href=httpService+api.orderDownload+"?accessToken="+this.getToken();              			
              		}).catch((res)=>{
                    this.$message({
                          type: 'error',
                          message: res.message
                        });               			
              			this.$loading().close();
              		})
              		
              	}else{
	              	exportByTab(opt).then((res)=>{
	              		 this.$loading().close();
	              		 window.location.href=httpService+api.orderDownload+"?accessToken="+this.getToken();
	              	}).catch((res)=>{
	              		this.$loading().close();
	              	})              		
              	}
              }
            },    	
			 handleCheckAllOrder(index){
			 	let vm = this;
			 	let a = this.orderMuendata.every(item=>item.checkAll===true);
			 	let b = this.orderMuendata.every(item=>item.checkAll===false);
			 	if(!a){
			 		this.isIndeterminate2 = true;
			 		this.checkAll2 = false;
			 	}else{
			 		this.isIndeterminate2 = false;
			 		this.checkAll2 = true;
			 	}
			 	if(b){
			 		this.isIndeterminate2 = false;
			 	}
			 	 if(this.orderMuendata[index].checkAll){			 	 	
							 vm.orderMuendata[index].chi.forEach((item1)=>{
								vm.orderMuendata[index].check.push(item1.value);
							});						 	

			 	 		this.orderMuendata[index].isIndeterminate = false;
			 	 }else{
			 	 		this.orderMuendata[index].check = [];
			 	 }

			 },
			 handleCheckAllPro(index){
			 	let vm = this; 
			 	let a = this.proMuendata.every(item=>item.checkAll===true);
			 	let b = this.proMuendata.every(item=>item.checkAll===false);
			 	if(!a){
			 		this.isIndeterminate3 = true;
			 		this.checkAll3 = false;
			 	}else{
			 		this.isIndeterminate3 = false;
			 		this.checkAll3 = true;
			 	}
			 	if(b){
			 		this.isIndeterminate3 = false;
			 	}
			 	 if(this.proMuendata[index].checkAll){
							vm.proMuendata[index].chi.forEach((item1)=>{
								vm.proMuendata[index].check.push(item1.value);
							});					 	 			 	 	
			 	 		this.proMuendata[index].isIndeterminate = false;
			 	 }else{
			 	 		this.proMuendata[index].check = [];
			 	 }

			 },			 
      //1change 全选 方法
      handleCheckAllChange2(val) { 
      	let vm = this;
      	this.isIndeterminate2 = false;
				if(val){
					vm.orderMuendata.forEach((item,index)=>{
						 setTimeout(function(){
							 item.chi.forEach((item1)=>{
								item.check.push(item1.value);
								});						 	
						 },1)
						item.checkAll = true;
						item.isIndeterminate = false;
					})			
				}else{
					vm.orderMuendata.forEach((item,index)=>{
						item.check = [];
						item.checkAll = false;
						item.isIndeterminate = false;
					})						
				}
      },
      //1change 单选 方法
      handleCheckedCitiesChange2(index) {
        if(this.orderMuendata[index].chi.length>this.orderMuendata[index].check.length){
        	this.orderMuendata[index].isIndeterminate = true;
        }else if(this.orderMuendata[index].chi.length==this.orderMuendata[index].check.length){
        	this.orderMuendata[index].isIndeterminate = false;
        	this.orderMuendata[index].checkAll = true;
        }
        if(this.orderMuendata[index].check.length==0){
        	this.orderMuendata[index].isIndeterminate = false;
        	this.orderMuendata[index].checkAll = false;
        }

				let a = this.orderMuendata.every(item=>item.checkAll===false);
			  let c = this.orderMuendata.every(item=>item.isIndeterminate===false);
			 	console.log(a,c);
				 	if(!c||!a){
				 		this.isIndeterminate2 = true;
				 	}else{
				 		this.isIndeterminate2 = false;
				 	}
      }, 
       //2change 全选 方法
      handleCheckAllChange3(val) {  
      	let vm = this;
      	this.isIndeterminate3 = false;
				if(val){
					vm.proMuendata.forEach((item,index)=>{
							 setTimeout(function(){
								 item.chi.forEach((item1)=>{
									item.check.push(item1.value);
									});						 	
							 },1)
						item.checkAll = true;
						item.isIndeterminate = false;
					})			
				}else{
					vm.proMuendata.forEach((item,index)=>{
						item.check = [];
						item.checkAll = false;
						item.isIndeterminate = false;
					})						
				}
      },
      //2change 单选 方法
      handleCheckedCitiesChange3(index) {
        if(this.proMuendata[index].chi.length>this.proMuendata[index].check.length){
        	this.proMuendata[index].isIndeterminate = true;
        }else if(this.proMuendata[index].chi.length==this.proMuendata[index].check.length){
        	this.proMuendata[index].isIndeterminate = false;
        	this.proMuendata[index].checkAll = true;
        }
        if(this.proMuendata[index].check.length==0){
        	this.proMuendata[index].isIndeterminate = false;
        	this.proMuendata[index].checkAll = false;
        }
				let a = this.proMuendata.every(item=>item.checkAll===false);
			  let c = this.proMuendata.every(item=>item.isIndeterminate===false);
				 	if(!c||!a){
				 		this.isIndeterminate3 = true;
				 	}else{
				 		this.isIndeterminate3 = false;
				 	}
     }, 
       /*列表全选*/
      selectAll(val) {
        console.log('全选： ', val);
        this.multiGoodsStatus = getMultiStatus(this.tableData.length, val);
      },
      //确认发货
      submitDelivery(formName) {
        this.ruleForm.code=this.orderData.orderCode;
        var _this = this;
        this.$refs[formName].validate((valid) => {

          if (valid) {
          	this.sending = true;
                  deliver(this.ruleForm).then((res)=>{
                            _this.submitForm();
                            _this.deliveryDialog = false;
                            this.sending = false;
                            _this.$message({
                              type: 'success',
                              message: '发货成功'
                            });             
                  }).catch((res)=>{
                        console.error(res);
                        this.sending = false;
                        _this.$message({
                          type: 'error',
                          message: res.message
                        }); 
                  })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },      
      getPic(productImages){//获取商品图片
        return productImages.split(";").filter(function(item){
          return item!=''
        })[0];
      },
      ViewLogisticsInfo(code){//查看物流信息
				this.loading = true;
				this.exData = [];
				this.ViewLogisticsInfoDialog=true; 
	      showTrace({orderCode:code}).then((res)=>{
	        		if(res.data){
	        			this.exData = res.data;
	        		}
	        		this.loading = false;
	        	}).catch((res)=>{
	        		this.$message({
	        			type:'error',
	        			message:res.message
	        		})	
	        		this.ViewLogisticsInfoDialog=false; 
	        	}) 	
      },
      handleSizeChange(val) {
        this.searchForm.pageSize = val;
        	this.multiGoodsStatus = getMultiStatus(this.tableData.length, false);
        	this.isIndeterminate = false;   	
          let params = Object.assign({},this.searchForm);
          if(params.orderTime){
            let orderStart = params.orderTime.split(',')[0];
            let orderEnd = parseInt(params.orderTime.split(',')[1])+24*60*60*1000;
            params.orderTime = orderStart + ',' + orderEnd;
          }                       
        getOrderList(params).then((res)=>{
        		this.multiOperationAll = false;  
              this.tableData= res.content;
              this.totalRecord= res.totalElements;
            }).catch((res)=>{
              console.error(res);
        this.$message({
          type: 'error',
          message: res.message
        }); 
            })
      },
      handleCurrentChange(val) {
      	this.multiGoodsStatus = getMultiStatus(this.tableData.length, false);
      	this.isIndeterminate = false; 
        this.searchForm.pageNo = val;
          let params = Object.assign({},this.searchForm);
          if(params.orderTime){
            let orderStart = params.orderTime.split(',')[0];
            let orderEnd = parseInt(params.orderTime.split(',')[1])+24*60*60*1000;
            params.orderTime = orderStart + ',' + orderEnd;
          }        
        getOrderList(params).then((res)=>{
        	this.multiOperationAll = false;
              this.tableData= res.content;
              this.totalRecord= res.totalElements;
            }).catch((res)=>{
              console.error(res);
        this.$message({
          type: 'error',
          message: res.message
        }); 
            })
      },      
        handlemenu(obj) {	
        	this.multiGoodsStatus = getMultiStatus(this.tableData.length, false);
        	this.isIndeterminate = false;   	
          let index = obj.name;
          this.searchForm.status= index;
          let params = Object.assign({},this.searchForm);
          if(params.orderTime){
            let orderStart = params.orderTime.split(',')[0];
            let orderEnd = parseInt(params.orderTime.split(',')[1])+24*60*60*1000;
            params.orderTime = orderStart + ',' + orderEnd;
          }          
            getOrderList(params).then((res)=>{
              this.tableData= res.content;
              this.multiOperationAll = false; 
              for(let i=0;i<this.tableData.length;i++){
                this.tableData[i].isEditing=0;
              }
              this.totalRecord= res.totalElements;
            }).catch((res)=>{
              console.error(res);
        this.$message({
          type: 'error',
          message: res.message
        });             
            })
         },

        //关闭对话框
        // handleClose(done) {
        //     this.$confirm('确认关闭？')
        //       .then(_ => {
        //         done();
        //       })
        //       .catch(_ => {});
        //   } ,
        //提交  
        submitForm(formName) {
          console.log('form name ', this.searchForm);
          let params = Object.assign({},this.searchForm);
          if(params.orderTime){
            let orderStart = params.orderTime.split(',')[0];
            let orderEnd = parseInt(params.orderTime.split(',')[1])+24*60*60*1000;
            params.orderTime = orderStart + ',' + orderEnd;
          }
         console.log('params ', params);
            getOrderList(params).then((res)=>{
              this.tableData= res.content;
              // for(let i=0;i<this.tableData.length;i++){
              //   this.tableData[i].isEditing=0;
              // }             
              this.totalRecord= res.totalElements;
            }).catch((res)=>{
              console.error(res);
        this.$message({
          type: 'error',
          message: res.message
        }); 
            })
          },
        //重置搜索条件
          resetForm(formName) {
              for(var i in this.searchForm){
                if(i=='pageSize'){
                  this.searchForm[i]=10;
                }else if(i=='pageNo'){
                  this.searchForm[i]=1;
                }else{
                  this.searchForm[i]='';
                }
              }
              this.orderTime='';
              this.submitForm();
          },

          orderTime_select(val){
            this.searchForm.orderTime=val[0].getTime()+","+val[1].getTime();
            this.isSubmitQuery = 1;
          },
           signTime_select(val){
            this.searchForm.signTime=val[0].getTime()+","+val[1].getTime();
            this.isSubmitQuery = 1;
          }, 

          /*  拒签  */
          refuse(orderCode){
            this.updateOrderCode = orderCode;//拒签
            this.RefusedDialog = true;//
          }, 
          doRefuse(){//拒签保存
              if(this.remarkContent===''){
                this.$message({type:'error',
                  message:'请选择原因后再进行保存'});
                return;
              }
              refuse({code:this.updateOrderCode,remark:this.remarkContent}).then(_=>{
                closeRefuse();
                this.$message({type:'success',
                  message:'操作成功'});
              }).catch(_=>{
                this.$message({type:'error',
                  message:'拒签订单失败,请联系管理员'});
              })
          },
          closeRefuse(){//拒签取消
             this.RefusedDialog = false;//
             this.remarkContent = "";
          },


          /*  签收   */
          sign(orderCode){
              this.updateOrderCode = orderCode;//签收
              this.show_sign = true;
          },
          closeSign(){
            this.show_sign = false;
            this.remarkContent = "";
          },
          doSign(){//签收
              if(this.remarkContent===''){
                this.$message({type:'error',
                  message:'请输入备注后再进行保存'});
                return;
              }
              sign({code:this.updateOrderCode,remark:this.remarkContent}).then(_=>{
                closeSign();
                this.$message({type:'sucess',
                  message:'操作成功'});
              }).catch(_=>{
                this.$message({type:'error',
                  message:'备注订单失败,请联系管理员'});
              })
          },
          allCheckChange(val){//全选按钮事件
              var _this = this;
              if(val){
                this.tableData.forEach(function(item,index){
                  _this.$refs.multipleTable.toggleRowSelection(item,true);
                })
              }else{
                this.$refs.multipleTable.clearSelection();//清空用户的选择
              }
          },
          handleSelectionChange(val){//表格选中项发生变化时回调事件
            this.multipleSelection = val;
          },
          remark(orderCode){//备注订单
              this.updateOrderCode = orderCode;
              this.show_remark = true;
          },
          closeRemark(){//关闭备注窗口
              this.remarkContent.remark="";
              this.show_remark= false;
          },
          doRemark(){//订单备注
               this.$refs["remarkForm"].validate((valid)=>{
                 if(valid){
                   remark({code:this.updateOrderCode,remark:this.remarkContent.remark}).then((res)=>{
                            this.closeRemark();
                            this.$message({type:'success',
                                          message:'操作成功'});
                  }).catch((res)=>{
                          this.$message({type:'error',
                                        message:res.message});
                          })
                 }
               });
              
          },
          cancel(orderCode){//打开取消窗口
              this.updateOrderCode = orderCode;
              this.show_cancel = true;
          },closeCancel(){//关闭取消窗口
              this.show_cancel= false;
          },
          doCancel(){//取消
              if(this.cancelReason==''){
                this.$message({type:'error',
                  message:'请选择取消原因后再进行保存'});
                return;
              }
              cancel({code:this.updateOrderCode,remark:this.cancelReason}).then((res)=>{
                this.closeCancel();
                this.submitForm();
                this.$message({type:'success',
                  message:'操作成功'});

              }).catch(_=>{
                this.$message({type:'error',
                  message:'取消订单失败,请联系管理员'});
              })
          },
          exportall(){//导出订单 
            
            this.brandAudit = true;
            // exportOrder(this.searchForm).then((res)=>{
            // 
            //       window.location.href=httpService+api.orderDownload+"?accessToken="+this.getToken();
            //    
            //     
            //       }).catch((res)=>{
            //       console.error(res);
            //       this.$message({
            //         type:'error',
            //         message:'导出订单失败,请联系管理员'
            //       })
            //     });
             },

        _commonexpress(){
          commonexpress().then((res) => {
          this.commonexpressOptons = res;
        }).catch((res) => {
          console.log('error ', res);
          this.$message({
            type: 'error',
            message: res.message
          });
        })
        },                  
          //列表获取发货详情同内容
        getOrderDetaisForDelivery(code){
                  let opt = {code:code} 
                  deliverInfo(opt).then((res) => {
                  this.orderData = res;
        }).catch((res) => {
              console.log('error ', res);
              this.$message({
                type: 'error',
                message: res.message
              });
            })
        },          
          //发货
        delivery(row){
          getOrderCode({orderCode:row.orderCode}).then(res=>{
            this.getOrderDetaisForDelivery(row.orderCode);
            this._commonexpress();
            this.deliveryDialog = true;
          }).catch(res=>{
            this.$message({
              type: 'error',
              message: res.message
            });
          })      
        },
        batchexport(){//批量导出订单
          let vm = this;
          if(!this.multiGoodsStatus.some(x=>x)){
            this.$message({
              type:'error',
              message:'请选择要导出的订单'
            })
            return;
          }else{
            let codes = [];
            this.multiGoodsStatus.map(function(item,index){
              if(item===true){
                codes.push(vm.tableData[index].orderCode);
              }
            });
            batchExport({codes:codes.join(",")}).then(_=>{
                window.location.href=httpService+api.orderDownload+"?accessToken="+this.getToken();
            }).catch((res)=>{
              this.$message({
                type:'error',
                message:'批量导出订单错误'+res
              })
            })
          }
        },getToken(){//获取当前用户token
          var user = JSON.parse(localStorage.getItem("user"));
          return user.accessToken;

        },
     
    },mounted(){
      /*判断首页待处理订单传过来是什么参数 订单切换跳转*/
      let status = this.$route.query.status
      if(status){
          this.handlemenu({name: status});
          this.activeIndex = status+'';

      }else{
        this.handlemenu({name:"-1"});//默认加载所有订单
      }
    }
}
</script>

<style lang="scss" scoped>
@import url("./commonstyle.css");

    .orderid_hover{
        .el-checkbox__input.is-checked + .el-checkbox__label{
          color:red;
        }
    }

.orderids{

    .el-checkbox + .el-checkbox:nth-child(8){
      margin-left:0;
    }
    .el-checkbox + .el-checkbox:nth-child(12){
      margin-right: 200px;
    }
    .el-checkbox + .el-checkbox:nth-child(13){
      margin-left:0;
    }
    .el-checkbox + .el-checkbox:nth-child(16){
      margin-right: 340px;
    }
    .el-checkbox + .el-checkbox:nth-child(17){
      margin-left:0;
    }
    .el-checkbox + .el-checkbox:nth-child(24){
      margin-left:0;
    }
    .el-checkbox + .el-checkbox:nth-child(27){
      margin-right:340px;
    }
    .el-checkbox + .el-checkbox:nth-child(28){
      margin-left:0;
    }
    .el-checkbox{
      width:110px;
    }
  }
  .goodsids{
    .el-checkbox + .el-checkbox:nth-child(6){
      margin-right: 150px;
    }
    .el-checkbox + .el-checkbox:nth-child(7){
      margin-left:0;
    }
    .el-checkbox + .el-checkbox:nth-child(10){
      margin-right: 400px;
    }
    .el-checkbox + .el-checkbox:nth-child(11){
      margin-left:0;
    }
    .el-checkbox{
      width:110px;
    }
  }

.proStatus{
	position: absolute;
	font-size: 12px;
	color: #E7493E;
	z-index: 10;
  bottom: -17px;
  left: 139px;
}

.orderInfo .editBtn{
    position: absolute;
    top: 33px;
    right: 90px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 22px;
    width: 30px;
    cursor: pointer;
  }

  .deliverOrderinfoContent{
    box-sizing: border-box;
    background: white;
    margin-top: 20px;
    .tbTitle{
        font-size: 14px;
        font-weight: bold;
        color: #333333;
        height: 30px;
        line-height: 30px;
        margin-top: 10px;
      }
    .infoTb{
      border-color:rgba(250,250,250,0.5) ;
      margin-bottom: 30px;
      &.pro{
        tr{
          td{
            height: 100px;
          }
        }
      }
      tr{
        height: 40px;
        border-color:gainsboro ;
        th{
          background: #FBFBFB;
          border-color:gainsboro ;
        }
        
        td{
          text-align: center;
          border-color:gainsboro ;        
        }
      }
    }
    
  }

.el-table_1_column_11  {
  width:100px;
}

.buyerInfo{
	span{
		display: block;
		width: 100%;
		margin-bottom: 5px;
		line-height: 16px;
		overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;
	}
}

	.orderlog {
		padding: 30px;
	}
	
	.orderlog table{
		width: 90%;
		
		td{
			position: relative;
			border-bottom: 1px solid #e1e1e1;
			padding: 18px 0;
			line-height: 18px;
			p.logInfo {				
				margin-right:30px;
				&.logdate {
					padding-top: 10px;
					line-height: 18px;
					margin-right: 0;
					span {
						display: block;
						text-align: right;
						font-size: 14px;
						&.dates {
							color: #666666;
						}
						&.tiems {
							color: #666666;
						}
					}
				}
			}
			.point {
				position: relative;
				width: 100%;
				height: 100%;
				span {
					display: block;
					height: 100%;
					width: 8px;
					height: 8px;
					border-radius: 50%;
					background: #e1e1e1;
					position: absolute;
					top: 50%;
					left: 100%;
					margin-left: -4px;
					margin-top: -5px;
					z-index: 10;
				}
			}
			
		}		
			.pointLine{
				position: relative;
				border-bottom: none;
				border-right:1px  solid #e1e1e1;
				.wb{
					display: block;
					height: 100%;
					width: 20px;
					height: 8px;
					position: absolute;
					bottom: -4px;
					left: 25px;
					z-index: 10;
					background: #FFFFFF;						
				}
			}
			.logInfotxt{
				padding-left: 20px;
			}

			
			
	}

		tr.logItem:first-child {

			span {
					&.dates {
						color: #099FDE !important;
					}
					&.tiems {
						color: #099FDE !important;
					}
			}
			.logInfotxt {
				p{
					color: #099FDE;
				}
			}
			
			
			.point {
				span {
					background: #099FDE;
				}
				span::before {
					content: '';
					width: 16px;
					height: 16px;
					position: absolute;
					top: 50%;
					margin-top: -9px;
					left: 50%;
					margin-left: -9px;
					border-radius: 50%;
					background: rgba(62, 116, 179, 0.2);
					border: 1px solid rgba(62, 116, 179, 0.3);
				}
			}
		}



</style>
