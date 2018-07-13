<template>
	<div class=" main">
  <!--面包屑-->
    <div class="crumbs">
      <span >订单详情</span>
      <span v-if="viewSnapshotShow.one">&nbsp;&nbsp;&nbsp;&nbsp;订单历史快照</span>
    </div>
     <!-- / 面包屑--> 
		<div class="de_content">
			     <!-- <div class="breadcrumb">
			      <el-breadcrumb separator="/">
			        <el-breadcrumb-item :to="{ path: '/order/' }">订单管理</el-breadcrumb-item>
			        <el-breadcrumb-item >订单详情</el-breadcrumb-item>
              <el-breadcrumb-item v-if="viewSnapshotShow.one">订单历史快照</el-breadcrumb-item>
			      </el-breadcrumb>
			    </div> 	 -->		
		  <div class="detailHeader">

      <div v-if="viewSnapshotShow.alertShow" class="orderSnapt" style="width:98%; margin-left:1%">
         <div id="tips" style="margin:10px auto; padding: 10px 20px; border: 1px solid #EED97C; background:#FFFCEB">
            您当前查看的是订单快照，订单<font style="color: #ff0000; font-weight:700;">{{orderData.orderCode}}</font>，最后编辑于
            <font style="color: #ff0000; " >{{orderData.lastModifiedTime}}</font>，操作人：{{orderData.lastModified}}
            </div>
      </div>

			<div v-if="stepShow" style="margin-top: 40px;margin-bottom: 40px;" >
          <el-steps :active="activeStatus" align-center finish-status="success">
          <el-step title="下单" :description="orderData.orderTime"></el-step>
          <el-step title="付款" :description="orderData.payTime"></el-step>
          <el-step title="发货" :description="orderData.deliveryTime"></el-step>
          <el-step title="签收" :description="orderData.signTime"></el-step>
        </el-steps> 
			</div>
			
			<div class="orderinfoConten">
				<div class="cTop">
					<h1 style="width: 30%;display: inline-block;"><i class="el-icon-warning" style="padding-right: 10px;"></i>当前订单状态：{{orderData.orderStatus}}</h1>
					<p v-if="viewSnapshotShow.two" style="float: right;height: 60px;line-height: 60px;padding-right: 20px;">
            <el-button size="mini" style="disply:none" v-if="orderData.orderStatus=='签收'"  @click="signShow()">签收</el-button>
            <el-button size="mini" v-if="orderData.orderStatus=='已支付'"  @click="deliveryShow()">订单发货</el-button>
						<el-button size="mini" v-if="orderData.orderStatus=='已支付' || orderData.orderStatus=='未支付'" @click="updateInvoice">修改发票信息</el-button>
						<el-button size="mini" v-if="orderData.orderStatus=='未支付'" @click="updateFreight">修改运费</el-button>
						<el-button size="mini" v-if="orderData.orderStatus=='已支付' || orderData.orderStatus=='未支付'" @click="updateConsignee">修改收货人信息</el-button>
						<el-button size="mini" @click="remark">新增日志</el-button>
						<el-button size="mini" @click="cancel" v-if="orderData.orderStatus=='未支付'">取消订单</el-button>

					</p>
           <p v-if="viewSnapshotShow.backButtonShow" style="float: right;height: 60px;line-height: 60px;padding-right: 20px;">
               <el-button size="mini"  @click="init(orderData.orderCode)">返回详情</el-button>
          </p>
				</div>

 
<div class="allOrdernav" style="margin-top: 15px;" > 
<el-tabs v-model="activeIndex" class="el-menu-demo" @tab-click="handlemenu">
  <el-tab-pane name="1" label="订单信息"></el-tab-pane >
  <el-tab-pane name="2" label="收货及物流信息"></el-tab-pane>
  <el-tab-pane name="3" label="订单日志"  v-if="viewSnapshotShow.three"></el-tab-pane>
</el-tabs>      
</div>
<div class="orderInfo view1" v-if="activeIndex==1">
			<p class="tbTitle"><i class="el-icon-tickets" style="padding-right: 5px;"></i>买家信息</p>
			<p class="infodetail"><label>买家昵称：</label><span>{{orderData.consignee}}</span></p>
			<p class="infodetail"><label>联系电话：</label><span>{{orderData.consigneePhone}}</span></p>
			<p class="tbTitle hasBorder"><i class="el-icon-tickets" style="padding-right: 5px;"></i>订单概况</p>
			<p class="infodetail">
				<label>订单编号：</label><span>{{orderData.orderCode}}</span>
				<label style="margin-left: 100px;">支付单号：</label><span>{{orderData.payserialNumber}}</span>
				<label style="margin-left: 100px;">支付方式：</label><span>{{orderData.payMode}}</span>
			</p>
 
			<table class="infoTb pro" border="" width="95%" cellspacing="" cellpadding="">
				<tr><th width="40%">商品</th><th>价格</th><th>数量</th><th>商品合计 </th><th>订单状态 </th></tr>
				<tr v-for="item in orderData.orderItems">
					<td>
						<img style="width: 80px;float: left; width: 80px;float: left; margin-left: 10px;margin-top: 10px;" :src="item.images"/>
						<div class="porInfo" style="float: left; width: 70%;height: 100%;margin-left: 20px;padding-top: 10px;"  >
							<p style="height: 50px;overflow: hidden;text-align: left;">{{item.name}}</p>
							<p style="height: 50px;overflow: hidden;text-align: left;">{{item.productSku}}</p>	
						</div>				
					</td>				
					<td>¥{{item.unitPrice}}</td>
					<td>{{item.quantity}}</td>
					
					<td>¥{{item.amount}}</td>
					<td>{{orderData.orderStatus}}</td>
				</tr>								
			</table>			
			<div style="text-align: right;margin-top: -20px;font-size: 14px;border-bottom: 1px dashed gainsboro;width: 95%;margin-left: 30px;">
			<div class="priceInfo">	<label style="margin-left: 100px;width: 100px;text-align: right;">商品小计：</label><span style="display: inline-block;width: 80px;text-align: right;">¥{{orderData.goodAmount}}</span></div>
			<div class="priceInfo">	<label style="margin-left: 100px;width: 100px;text-align: right;">运费：</label><span style="display: inline-block;width: 80px;text-align: right;">¥{{orderData.freight}}</span></div>
			<div class="priceInfo">	<label style="margin-left: 100px;width: 100px;text-align: right;">优惠：</label><span style="display: inline-block;width: 80px;text-align: right;">¥{{orderData.discountAmount}}</span></div>
      <div class="priceInfo">
				<label style="margin-left: 100px;width: 100px;text-align: right;">应付款：</label><span style="display: inline-block;width: 80px;text-align: right;color: red;">¥{{orderData.orderAmount}}</span>
        </div>
			</div>
			
			<p class="tbTitle"><i class="el-icon-tickets" style="padding-right: 5px;"></i>发票信息</p>
			<div style="text-align: left;font-size: 14px;width: 95%;margin-left: 30px;">
				<div class="invoicInfo"><label style="width: 100px;text-align: left;">发票类型：</label><span style="display: inline-block;width: 80px;text-align: left;">{{orderData.invoiceType}}</span></div>
 
				<div class="invoicInfo" v-if="orderData.invoiceTypeCode!=0" ><label style="width: 100px;text-align: left;">发票抬头：</label><span style="display: inline-block;width: 600px;text-align: left;">{{orderData.invoiceContent}}</span></div>
				<div class="invoicInfo" v-if="orderData.invoiceTypeCode==2"><label style="width: 100px;text-align: left;">纳税人识别号：</label><span style="display: inline-block;width: 300px;text-align: left;">{{orderData.identification}}</span></div>
 
			</div>	
</div>
 
<div class="view2" v-if="activeIndex==2">
	
			<p class="tbTitle"><i class="el-icon-tickets" style="padding-right: 5px;"></i>物流信息</p>
			<div style="text-align: left;font-size: 14px;width: 95%;margin-left: 30px;">
				<div class="transferInfo"><label style=";width: 100px;text-align: left;">收货地址：</label><span style="display: inline-block;text-align: left;">{{orderData.address}}</span></div>
				<div class="transferInfo"><label style="width: 100px;text-align: left;">配送方式：</label><span style="display: inline-block;text-align: left;">{{orderData.deliveryMode}}</span></div>
				<div class="transferInfo"><label style="width: 100px;text-align: left;">物流公司：</label><span style="display: inline-block;text-align: left;">{{orderData.express}}</span></div>
				<div class="transferInfo"><label style="width: 100px;text-align: left;">物流单号：</label><span style="display: inline-block;text-align: left;">{{orderData.expressNo}}</span></div>
				<div class="transferInfo"><label style="width: 100px;text-align: left;">买家留言：</label><span style="display: inline-block;text-align: left;">{{orderData.remark}}</span></div>
			</div>		
</div>


<div class="view3" v-if="activeIndex==3">
      <div class="trackingBox" style="width:95%">
          <div class="trackingList">
            <ul v-for="item in orderData.orderProcess">
              <li class="time">{{item.operateTime}}</li>
              <li class="details">
    <td v-if="item.operateEvent==='confirm'" >[{{item.operator}}]  执行了【审核】操作。备注{{item.remark| dealEmpty}}</td>
    <td v-else-if="item.operateEvent==='consignment'" >[{{item.operator}}] 执行了【已发货】操作。备注 {{item.remark | dealEmpty}}</td>
    <td v-else-if="item.operateEvent==='sign_yes'" >[{{item.operator}}]  执行了【已签收】操作。备注 {{item.remark| dealEmpty}}</td>
    <td v-else-if="item.operateEvent==='sign_no'" >[{{item.operator}}]  执行了【已拒签】操作。备注 {{item.remark| dealEmpty}}</td>
    <td v-else-if="item.operateEvent==='cancel'" >[{{item.operator}}]  取消了订单。备注{{item.remark| dealEmpty}}</td>
    <td v-else-if="item.operateEvent==='add'" >[{{item.operator}}]  下单成功,订单号{{item.orderCode}}</td>
    <td v-else-if="item.operateEvent==='pay'" >[{{item.operator}}]  支付成功,订单号{{item.orderCode}}</td>
    <td v-else-if="item.operateEvent==='refund'" >[{{item.operator}}]  已退款,订单号{{item.orderCode}}</td>
    <td v-else-if="item.operateEvent==='modify'" >[{{item.operator}}]  修改了订单，备注{{item.remark| dealEmpty}} <a style="display:inline-block;"@click="viewSnapshot(item.id)">查看历史快照</a></td>
    <td v-else-if="item.operateEvent==='remark'" >[{{item.operator}}]  添加了备注，内容{{item.remark | dealEmpty}}</td>
    <td v-else>加载中</td>
              </li>
              <li class="operator">操作人：{{item.operator}}  </li>
            </ul>
            
          </div> 
      </div> 
</div><!-- view3 end -->
        
        <!-- <div v-if="viewSnapshotShow.backButtonShow" style="margin:20px auto; background:none; text-align:center; ">
          <el-button round v-if="viewSnapshotShow.backButtonShow" @click="init(orderData.orderCode)">返回详情</el-button>
        </div>  -->
	
			</div>	<!-- orderinfoConten tag eng -->

	</div>	<!-- detailHeader tag  eng -->

</div><!-- de_content  tag eng  -->



<el-dialog
  title="物流详情"
  :visible.sync="ViewLogisticsInfoDialog"
  size="large"
  :before-close="handleClose">
  <iframe :src="LogisticsInfoUrl" width="" id="LogisticsInfo" height=""></iframe>
   <span slot="footer" class="dialog-footer">
    <el-button @click="ViewLogisticsInfoDialog = false">关闭</el-button>
  </span>
</el-dialog>
 
 <el-dialog title="取消订单" :visible.sync="show_cancel">
    <el-form>
      <el-form-item label="订单编号:">
      <p>{{orderData.orderCode}}</p>
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
      <el-button size="small" type="primary" @click="doCancel()">确定</el-button>
       </span>
  </el-dialog>

  <!--
  作者：1063676593@qq.com
  时间：2018-01-23
  描述：发货弹窗=====
-->
<el-dialog title="发货"  :visible.sync="deliveryDialog"  width="70%"   >
    <div class="head" style="width: 100%;height: 30px;">
      <p style="float: left;">订单编号：<span>{{orderData.orderCode}}</span></p>
      <p style="color: #999999;float: right;">发货后15天用户没有确认收货，系统将自动签收！注：特殊节假日延长至20天！</p>
    </div>

    <div class="deliverOrderinfoContent">
        <table class="infoTb pro" border="" width="95%" cellspacing="" cellpadding="">
            <tr><th width="40%">商品</th><th>价格</th><th>数量</th><th>优惠金额</th><th>商品合计 </th><th>订单状态 </th></tr>
            <tr v-for="item in orderData.orderItems">
              <td>
                <img style="width: 80px;float: left; width: 80px;float: left; margin-left: 10px;margin-top: 10px;" :src="item.images"/>{{item.name}} <br>{{item.productSku}}
              </td>       
              <td>¥{{item.unitPrice}}</td>
              <td>{{item.quantity}}</td>
              <td>¥{{item.discountAmount}}</td>
              <td>¥{{item.amount}}</td>
              <td>{{orderData.orderStatus}}</td>
            </tr> 
             <tr style="100%"><th colspan="7" style="text-align: right;box-sizing: border-box;padding-right: 20px;" >合计：<span>{{orderData.goodAmount}}</span>￥</th></tr>       
          </table>
    </div>
    <el-form :model="deliverRuleForm" :rules="deliverRules" ref="deliverRuleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="送货方式：">
               <p>快递</p>
            </el-form-item>
            <el-form-item label="快递公司：" prop="venderId" style="width: 30%; display: inline-block;margin-right: 1%;">
              <el-select v-model="deliverRuleForm.venderId" placeholder="请选择快递公司">
                <el-option v-for="item in commonexpressOptons" :key="item.expressId" :label="item.name" :value="item.expressId"></el-option>
              </el-select>  
            </el-form-item>
            <el-form-item label="运单号：" prop="expressNo" style="width: 30%; display: inline-block;margin-right: 1%;" >
              <el-input v-model="deliverRuleForm.expressNo"></el-input>
            </el-form-item>
            <el-form-item label="实收运费：" prop="freight" style="width: 30%; display: inline-block;margin-right: 1%;" >
              <el-input v-model="deliverRuleForm.freight"></el-input>
            </el-form-item>

            <el-form-item label="备注：" prop="remark" style="width: 90%;">
              <el-input type="textarea" v-model="deliverRuleForm.remark"></el-input>
            </el-form-item>
     </el-form>


    <el-button @click="deliveryDialog = false">关闭</el-button>
    <el-button type="primary" :loading="sending" @click="submitDelivery('deliverRuleForm')">立即发货</el-button>
</el-dialog>
  <el-dialog title="修改运费" :visible.sync="show_update_freight">
    <el-form>
      <el-form-item label="运费">
        <el-input v-model="newFreight" style="width:150px;"></el-input>&nbsp;&nbsp;&nbsp;<el-button type="text" style="display:inline-block;" @click="newFreight=0">直接免运费</el-button>
      </el-form-item>

    </el-form>
         <span slot="footer" class="dialog-footer">
             <el-button size="small" @click="closeUpdateFreight()">关闭</el-button>
        <el-button size="small" type="primary" @click="doUpdateFreight()">保存</el-button>
      
       </span>
  </el-dialog>

  <el-dialog title="修改发票信息" :visible.sync="show_update_invoice">
    <el-form>
      <el-form-item label="发票类型:">
        <el-radio v-model='orderData.invoiceTypeCode' label='2' >单位</el-radio>
        <el-radio v-model='orderData.invoiceTypeCode' label='1' >个人</el-radio>
      </el-form-item>
      <el-form-item label="发票抬头:">
        <el-input v-model="orderData.invoiceContent" style="width:250px;margin-left:25px;" ></el-input>
      </el-form-item>
      <el-form-item  label="纳税人识别号:" v-if="orderData.invoiceTypeCode=='2'">
        <el-input v-model="orderData.identification" style="width:250px;"></el-input>
      </el-form-item>
      </el-form>
         <span slot="footer" class="dialog-footer">
                 <el-button size="small" @click="closeUpdateInvoice()">取消</el-button>
      <el-button type="primary" size="small" @click="doUpdateInvoice()">确定</el-button>

      </span>
  </el-dialog>

    <el-dialog title="修改收货人信息" :visible.sync="show_update_consignee_info">
      <el-form :rules="rules" ref="ruleForm" :model="ruleForm" >
        <el-form-item label="收货人姓名:" prop="consignee">
          <el-input v-model="ruleForm.consignee" style="width:250px;margin-left:25px;" ></el-input>
        </el-form-item>
        <el-form-item label="手机号码:" prop="phone">
          <el-input v-model="ruleForm.phone" style="width:250px;margin-left:25px;" ></el-input>
        </el-form-item>
        <el-form-item label="所在区域:" prop="province" style="width: 270px;display: inline-block;">
            <el-select v-model="ruleForm.province" style="width: 150px;margin-left:30px;" placeholder="省" @change="provinceModelChange">
              <el-option v-for="item in province"
                :key="item.provinceid"
                :value="item.provinceid"
                :label="item.provincename"
              ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="5px" prop="city" style="width: 155px;display: inline-block;">
          <el-select v-model="ruleForm.city" placeholder="市" style="width: 150px;" @change="cityModelChange">
            <el-option v-for="item in citys"
            :key="item.cityid"
            :value="item.cityid"
            :label="item.cityname"
          ></el-option>
        </el-select>
      </el-form-item>  
      <el-form-item label-width="5px" prop="district" style="width: 155px;display: inline-block;">
        <el-select v-model="ruleForm.district" placeholder="区" style="width: 150px;">
          <el-option  v-for="item in districts"
                   :key="item.countyId"
                   :label="item.countyName"
                   :value="item.countyId">
          </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="详情地址:" prop="address">
          <el-input v-model="ruleForm.address" style="width:468px;margin-left:37px;" ></el-input>
    </el-form-item>
     </el-form>
       <span slot="footer" class="dialog-footer">
           <el-button size="small" @click="closeUpdateConsignee()">取消</el-button>
        <el-button size="small" type="primary" @click="doUpdateConsignee()">确定</el-button>
      
       </span>
  </el-dialog>

  <el-dialog title="订单操作备注" :visible.sync="show_remark" >
    <el-form :rules="remarkRules" ref="remarkForm" :model="remarkContent">
      <el-form-item label="操作备注" prop="remark">
        <el-input v-model="remarkContent.remark" type="textarea" style="width:50%;"></el-input>
      </el-form-item>
    </el-form>
     <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeRemark()">取消</el-button>
          <el-button type="primary" size="small" @click="doRemark()">确定</el-button>
          </span>
  </el-dialog>

</div>
</template>

<script>

	import {
		orderDetail,getProvinceCity,getCityDistrict,update,sign, refuse,cancel,deliverInfo,commonexpress,deliver,batchExport,logisticsinfo,updateInvoice,updateFreight,updateConsigneeInfo,remark, viewSnapshot
	} from '../../service.js';

  export default {
    data() {
      return {
        //默认状态显示
        viewSnapshotShow:{
            one:false,//导航标签文字
            two:true,//按钮栏
            three:true,//订单日记
            alertShow:false,//弹出：说明编辑时间
            backButtonShow:false//快照返回按钮显示
        },
        sending:false,
        commonexpressOptons:[],
        deliveryDialog:false,
      	activeIndex:'1',
      	isEdit:false,
        ViewLogisticsInfoDialog:false,
        LogisticsInfoUrl:'http://www.baidu.com',      	
      	isSend:false,
      	orderStatus:'',
        stepShow: true,
      	sendMethod:'',
        activeStatus: 0,
      	orderData:{},
    		orderDatas:[],
    		tiemOutMsg:'',
    		province:[],
    		city:{},
    		citys:[],
    		district:{},
    		districts:[],
        show_cancel:false,
        cancelReason:'',
        newFreight:0,
        deliverRuleForm:{
          code: '',
          venderId: '',
          expressNo: '',
          remark:'',
          freight:''
        },
        deliverRules:{
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
        show_update_invoice:false,
        show_update_freight:false,
        show_update_consignee_info:false,
        show_remark:false,
        remarkContent:{},
        ruleForm: {
          code:'',
          consignee: '',
          freight:'',
          phone: '',
          province: '',
          city: '',
          district:'',
          address:'',
        },
        rules: {
          consignee: [
            { required: true, message: '请输入收货人姓名', trigger: 'blur' },
          ],
          phone: [
            {required: true, message: '请输入收货人手机号码', trigger: 'blur' },
          ],          
          province: [
            { required: true, message: '请选择省份', trigger: 'blur' }
          ],
          city: [
            { required: true, message: '请选择城市', trigger: 'blur' }
          ],          
          district: [
            { required:true, message: '请选择区域', trigger: 'blur' }
          ], 
          address:[
            {required:true,message:'请填写收货人详细地址',trigger:'blur'}
          ]              
        },cancelReasonList:[
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
      remarkRules:{//备注操作的表单验证
          remark:[
          { required:true,message:'请填写操作备注',trigger:'blur'},
          {min:1,max:511,message:'备注字数不能超过511个字符',trigger:'blur,change'}
          ]
        }
      };
    },
    filters: {
      //过滤空值问题
      dealEmpty: function(itemRemarkValue){

          console.log(itemRemarkValue);
          if( itemRemarkValue ===undefined || itemRemarkValue==null || itemRemarkValue === "null" || itemRemarkValue==="" ){
              return "无";
          }
          return itemRemarkValue;
      },
    	dealStatus: function(refundStatus){
    		let status = '';
    		switch (refundStatus){
    			case 0:
    			    status='退款中';
    			   
    				break;
    			case 1:
    			    status='退款成功';
    				break;
    			case 2:
    			    status='退款拒绝';
    				break;
    			case 3:
    			    status='待退货';
    				break;
    			case 4:
    			    status='介入处理中';
    				break; 
    			case 5:
    			    status='退款取消';
    				break;    				
    			default:
    				break;
    		}
    		return  status;
    	}
    },
    methods: {

      //历史快照页面和详情页面公用,故切换业务时，就隐藏.
      // 不要再继续抽象封装了，容易混淆了
      hideForSnapshotShow(showValue){
              if("hide"==showValue){
                  this.viewSnapshotShow.one=true;//标题出现
                  this.viewSnapshotShow.two=false;//按钮栏
                  this.viewSnapshotShow.three=false;//订单标签隐藏
                  this.viewSnapshotShow.alertShow=true;//弹出：说明编辑时间
                  this.stepShow=false;//step隐藏
                  this.viewSnapshotShow.backButtonShow=true;//显示返回按钮
              } else{
                  // 默认
                  this.viewSnapshotShow.one=false;//
                  this.viewSnapshotShow.two=true;//
                  this.viewSnapshotShow.three=true;//
                  this.viewSnapshotShow.alertShow=false;
                  this.stepShow=true;//step出现
                  this.viewSnapshotShow.backButtonShow=false;
              }
      }
      ,
      //历史快照信息补充
      viewSnapshot(historyId){
          console.log("历史快照查看:"+historyId);
          let opt = {id:historyId};
          viewSnapshot(opt).then((res)=>{
                        console.log(res);
                        this.activeIndex='1';//默认显示商品页
                        this.hideForSnapshotShow("hide");//隐藏
                        this.orderData = res;
                        this.$message({
                          type: 'success',
                          message: '返回成功'
                        });             
                    }).catch((res)=>{
                        console.error(res);
                        this.$message({
                          type: 'error',
                          message: res.message
                        }); 
                    })   
      } ,
      // 快递商
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
      deliveryShow(){
          this._commonexpress();
          this.deliveryDialog=true;
      }, 
      //确认发货
      submitDelivery(deliverRuleForm) {
        this.deliverRuleForm.code=this.orderData.orderCode;
        this.$refs[deliverRuleForm].validate((valid) => {
              if (valid) {
              	this.sending = true;
                    deliver(this.deliverRuleForm).then((res)=>{
                            this.getOrderDetais(this.orderData.orderCode);
                            this.deliveryDialog=false;
                            this.sending = false;
                            this.$message({
                              type: 'success',
                              message: '发货成功'
                            });             
                    }).catch((res)=>{
                          console.error(res);
                          this.sending = false;
                          this.$message({
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

      handlemenu(){
      },
      handleClose(){
    		console.log(123);

    	},
      handlemenu(){

      },
    	getPic(productImages){//获取商品图片
    		return productImages.split(";").filter(function(item){
    			return item!=''
    		})[0];
    	},
    	ViewLogisticsInfo(url){
    		this.ViewLogisticsInfoDialog=true; 	
			   this.LogisticsInfoUrl=url;
    	},  
    	cityModelChange(val){
    		var dis = this.district[val];
    		if(dis==undefined){
    			getCityDistrict({cityid:val}).then((res)=>{
        				this.district[val]=res;
        				this.districts= res;
        		        this.ruleForm.district = this.districts[0].countyId;		
    			}).catch(_=>{
    				this.$message({
        					type:'error',
        					message:'加载省市信息出错,请联系管理员'
    				})
    			})
    		}else{
    			this.districts=dis;
    		}
    		

    	},
    	provinceModelChange(val){
    		this.citys = this.city[val];
    		this.ruleForm.city = this.citys[0].cityid;
        this.cityModelChange(this.ruleForm.city);
    	},
    	getOrderDetais(code){
    		let opt = {code:code} 
    		orderDetail(opt).then((res) => {
    			let provinceid = res.province;
    			let cityid = res.city;
    			let districtid = res.district;
    			this.citys= this.getMapValue(this.city,provinceid);
    			this.cityModelChange(cityid);
    			var _this= this;
          this.newFreight = res.freight;
          console.info(this.newFreight);
    			setTimeout(function(){
      					_this.orderData = res;
                _this.ruleForm.consignee = res.consignee;
                _this.ruleForm.province = res.province;
                _this.ruleForm.city = res.city;
                _this.ruleForm.district = res.district;
                _this.ruleForm.phone = res.consigneePhone;
      					_this.showAddress(res.address);
                _this.showStepActiveStatus(res.orderStatusCode);// step 步骤 激活状态
    			},500);
			}).catch((res) => {
				  console.log('error ', res);
				  this.$message({
					      type: 'error',
					      message: res.message
				});
			})
    	},showAddress(address){//回填显示地址
    		var add = this.getAddress();
    		this.ruleForm.address =  this.orderData.address.substring(add.length);
    	},getAddress(){//获取当前的省市区字符串
    		var add = "";
        		var _this = this;
    		var provinceAdd = this.province.filter(function(item){
    			return item.provinceid==_this.ruleForm.province;
    		})
    		var cityAdd = this.citys.filter(function(item){
    			return item.cityid==_this.ruleForm.city;
    		})
    		var districtAdd = this.districts.filter(function(item){
    			return item.countyId==_this.ruleForm.district;
    		})
    		console.log(_this.ruleForm.district);
    		add= provinceAdd[0].provincename+cityAdd[0].cityname+districtAdd[0].countyName;
    		return add;
    	},getMapValue(map,key){//获取map某个key的值
    		for(var i in map){
    			if(i==key){
    				return map[i];
    			}
    		}
    	}, showStepActiveStatus(orderStatus)  {

        if(orderStatus ==11 || orderStatus ==5 ){  this.activeStatus=2};
        if(orderStatus ==12 ){  this.activeStatus=1};
        if(orderStatus ==14 || orderStatus ==2 ){  this.activeStatus=1};
        if(orderStatus ==8 ){  this.activeStatus=3};
        if(orderStatus ==9 ){  this.activeStatus=4};
        if(orderStatus ==31 ){  this.activeStatus=2};//拒签后就是待退款 
        if(orderStatus ==33 ){  this.activeStatus=4};//v

        if(orderStatus ==3 || orderStatus ==6 || orderStatus ==18 || orderStatus ==32   ){
            this.stepShow=false;
        };
      },cancel(orderCode){//打开取消窗口
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
              cancel({code:this.orderData.orderCode,remark:this.cancelReason}).then((res)=>{
                this.closeCancel();
                this.getOrderDetais(this.orderData.orderCode);
                this.$message({type:'success',
                  message:'操作成功'});

              }).catch(_=>{
                this.$message({type:'error',
                  message:'取消订单失败,请联系管理员'});
              })
          },updateInvoice(orderCode){//打开修改发票窗口
              this.show_update_invoice = true;
          },closeUpdateInvoice(){//关闭修改发票窗口
              this.show_update_invoice= false;
          },
          doUpdateInvoice(){//修改发票
              if(this.orderData.invoiceContent==''){
                this.$message({type:'error',
                  message:'请填写发票抬头'});
                return;
              }
              if(this.orderData.invoiceTypeCode=='2' && ( this.orderData.identification===undefined || this.orderData.identification=='')){
                 this.$message({type:'error',
                  message:'请填写纳税人识别号'});
                return;
              }
              var invoiceInfo ={code:this.orderData.orderCode,type:this.orderData.invoiceTypeCode=='2'?'COMPANY':'PERSON',receiptName:this.orderData.invoiceContent};
              if(this.orderData.invoiceTypeCode==='2'){
                invoiceInfo.identificationNumber= this.orderData.identification;
              }
              updateInvoice(invoiceInfo).then((res)=>{
                this.closeUpdateInvoice();
                this.$message({type:'success',
                  message:'修改成功'});

              }).catch(_=>{
                this.$message({type:'error',
                  message:'修改订单发票,请联系管理员'});
              })
          },updateFreight(orderCode){//打开修改运费窗口
              this.show_update_freight = true;
          },closeUpdateFreight(){//关闭修改运费窗口
              this.show_update_freight= false;
          },
          doUpdateFreight(){//修改运费
            var _this = this;
              if(this.newFreight===undefined){
                this.$message({type:'error',
                  message:'请填写运费金额'});
                return;
              }
              updateFreight({code:this.orderData.orderCode,freight:this.newFreight}).then((res)=>{
                _this.closeUpdateFreight();
                _this.getOrderDetais(_this.orderData.orderCode);
                _this.$message({type:'success',
                  message:'操作成功'});

              }).catch(_=>{
                this.$message({type:'error',
                  message:'修改订单运费失败,请联系管理员'});
              })
          },updateConsignee(orderCode){//打开修改收货人信息窗口
              this.show_update_consignee_info = true;
          },closeUpdateConsignee(){//关闭修改收货人信息窗口
              this.show_update_consignee_info= false;
          },
          doUpdateConsignee(){//修改收货人信息
            var _this = this;
              this.$refs["ruleForm"].validate((valid)=>{
                if(valid){
                    var obj = {code:this.orderData.orderCode,consignee:this.ruleForm.consignee,
                      phone:this.ruleForm.phone,province:this.ruleForm.province,
                      city:this.ruleForm.city,district:this.ruleForm.district
                      ,address:this.getAddress()+this.ruleForm.address};
                      updateConsigneeInfo(obj).then(_=>{
                      _this.closeUpdateConsignee();
                      _this.getOrderDetais(this.orderData.orderCode);
                      this.$message({
                        type:'success',
                        message:'修改收货人信息成功'
                      })
                }).catch((res)=>{
                    this.$message({
                    type:'success',
                    message:res
              })
            })
                }
              })
          },
          remark(orderCode){//备注订单
              this.show_remark = true;
          },
          closeRemark(){//关闭备注窗口
              this.remarkContent.remark="";
              this.show_remark= false;
          },
          doRemark(){//备注
              this.$refs["remarkForm"].validate((valid)=>{
                if(valid){
                  remark({code:this.orderData.orderCode,remark:this.remarkContent.remark}).then((res)=>{
                      this.getOrderDetais(this.orderData.orderCode);
                      this.closeRemark();
                      this.$message({type:'success',
                      message:'操作成功'});
                    }).catch((res)=>{
                        this.$message({type:'error',
                                      message:res.message});
                    })
                  }
              })
          },

          // 初始化页面
          init(initFlag){
            console.log(initFlag);
            if(initFlag != undefined){
                this.hideForSnapshotShow("show");//默认出现
            }
            var pro = getProvinceCity().then((res)=>{
                var _province = this.province;
                var _city = this.city;

                res.forEach(function(item,index){
                      for(var i=0;i<item.provinces.length;i++){
                        _province.push(item.provinces[i]);
                        var provinceId = item.provinces[i].provinceid;
                        _city[provinceId]=item.provinces[i].cities;
                      }
                });
                this.getOrderDetais(this.$route.query.orderCode);
           }).catch(_=>{
                        this.$message({
                        type:'error',
                        message:'加载省市信息出错'
                      });
                    })
           }
    },
 	mounted() {
 		//this.$route.query.orderId
			this.init();//初始化

			if(this.$route.query.isedit==1){//修改订单时加载省市区信息
				this.isEdit= true;
			}

			// provinceModelChange(thi);
			// cityModelChange(val);

	 },	   
    
  }

</script>


<style lang="scss" scoped>
	.content{
		margin-top: 0;
		width: 100%;
	}
	.BreadCrumbs{
		height: 30px;
		line-height: 30px;
		padding-left: 30px;
	}
	.infodetail{
		height: 30px;
    line-height: 30px;
    margin-bottom: 10px;
		margin-left: 30px;
		font-size: 14px;
	}
	.orderinfoConten{
		width: 98%;
		border: 1px solid gainsboro;
		margin-left: 1%;
		box-sizing: border-box;
    background: white;
    padding-bottom: 50px;
    margin-top: 20px;
		.cTop{
			height: 60px;
			border-bottom: 1px solid gainsboro;
			background: #FBFBFB;
			h1{
				height: 60px;
				line-height: 60px;
				font-size: 16px;
				color: $color-second;
				padding-left: 30px;
			}
		}
		.tbTitle{
				margin-left: 30px;
				font-size: 14px;
				font-weight: bold;
				color: #333333;
				height: 30px;
				line-height: 30px;
        margin-top: 10px;
        margin-bottom: 12px;
            &.hasBorder{
              padding-top: 12px;
          border-top: 1px dashed gainsboro;
          width: 90%;padding-bottom:30px;
        }
			}
		.infoTb{
			border-color:rgba(250,250,250,0.5) ;
			margin-left: 30px;
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
    .trackingBox{
      border-color:rgba(250,250,250,0.5) ;
      margin-left: 30px;
      margin-bottom: 30px;
      margin-right: 30px;
    }
		
	}
  .deliverOrderinfoContent {
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
	
.trackingList{ width:100%; overflow:hidden; border-color:rgba(250,250,250,0.5) ; background-color:#F8F2F2;  padding: 25px 20px; }
.trackingList ul{ height:28px; padding:0px; margin:0px; margin-left:10px; overflow:hidden; clear:both;background:url(/static/images/icon16.png) no-repeat left center;  padding-bottom: 12px;}
.trackingList ul li{ float:left; height:28px; line-height:28px; margin:0px; overflow:hidden; font-size:12px;}
.trackingList ul li.time{ width:200px; padding:0px 10px 0px 24px; background:url(/static/images/icon15.png) no-repeat left center;}
.trackingList ul li.details { width:55%;height:auto;  padding:0px 10px;}
.trackingList ul li.details a { color: #ff0000; text-decoration:none;}
.trackingList ul li.operator { width:180px; padding:0px 10px; }
.trackingList ul li a{ color:#BB1B21; text-decoration:underline; }

.allOrdernav{
  padding: 12px 30px 0 30px;
}

.priceInfo,{
  margin-bottom: 8px;
  font-style: 12px;
}
.invoicInfo{
  margin-bottom: 10px;
}
.transferInfo{
  margin-bottom: 15px;
}

</style>