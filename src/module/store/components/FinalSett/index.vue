<template>
	
	<section  style="background: none;">
		<div class="content">
			     <div class="breadcrumb">
			      <el-breadcrumb separator="/">
			        <el-breadcrumb-item :to="{ path: '/' }">店铺管理</el-breadcrumb-item>
			        <el-breadcrumb-item>财务结算</el-breadcrumb-item>
			      </el-breadcrumb>
			    </div>				
			<div class="f_header">
	<div style="width: 45%;float:left ;">
		<el-form :inline="true"  >
		  <el-form-item label="待结算订单">
		    <el-select style="width: 80px;" placeholder="年">
		      <el-option label="2018" value="shanghai"></el-option>
		      <el-option label="2017" value="beijing"></el-option>
		    </el-select>
		    <el-select style="width: 80px;" placeholder="月">
		      <el-option label="01" value="shanghai"></el-option>
		      <el-option label="02" value="beijing"></el-option>
		    </el-select>    
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary">我要结算</el-button>
		  </el-form-item>
		</el-form>			
	</div>
	<div style="float: right;width: 55%;" class="f_infoc" >
		<a>有效订单总额：<span style="color: #F04134;">12000.00￥</span>；</a>
		<a>有效订单总数：<span style="color: #F04134;">1200</span></a>
		<el-button type="primary" icon="el-icon-edit" @click="$router.push({path:'/collectionInfo',query:{id:'123123'}})" style="float: right;">收款信息</el-button>
	</div>
	</div>
<section class="content orderc" style="background: none;">
<div class="ao_orderContent" style="margin-top: 15px;">	

<div class="orderTable">	
  <el-table
    :data="tableData"
    border
    style="width: 100%"> 
    <el-table-column
      label="商品名称"
      width="200"
      >
      <template slot-scope="scope">
		<div class="productBox">
			<div class="orderInfo">
				<span class="line"></span>
				<p class="left_line" style="width: 300px;">订单编号：{{scope.row.orderCod}}</p>
				<p style="width: 200px;">创建时间：{{scope.row.orderDateStr}}</p>
				<p class="right_line">买家昵称：<span style="font-size: 12px;color: #4A90E2 ;text-align: left;width: auto;padding-right: 10px;">{{scope.row.entName}}</span><i class="lianxiBtn"></i> </p>
			</div>
		<div class="products" >
			<div class="product" v-for="item in scope.row.orderItems">
			<div class="productImg" v-bind:style="{backgroundImage: 'url(' + item.imgUrl + ')'}"></div>
			<div class="oproductInfo" >
				<p class="productName" style="display: block;" >{{item.productName}}</p>
				<p class="skulist">
					<span>{{item.productSku}}</span>
				</p>
				<!--<p v-if="item.refundStatus!='-1'" style="position: absolute;left: 100%;top: 42%; width: 80px;height: 30px;z-index: 99;color: #FF3D4F;">{{item.refundStatus==0?'退款中':(item.refundStatus==1?'退款成功':(item.refundStatus==2?'退款拒绝':(item.refundStatus==3?'待退货':(item.refundStatus==4?'介入处理中':(item.refundStatus==5?'退款撤销':'退款逾期撤销')))))}}</p>-->
			</div>					
			</div>
		</div>
		</div>
      </template>      
    </el-table-column>
    <el-table-column
      label="成交价（元）">
      <template slot-scope="scope">
      	<div style="padding-top: 75px;">
		<p v-for="item in scope.row.orderItems" style="width: 100%;height: 100px;line-height: 100px;border-bottom: 1px solid  #F0F0F0;margin-top: 10px;padding-bottom: 20px;" >
			{{item.amount}}
		</p>
      	</div>

      </template>           
    </el-table-column>
    <el-table-column label="佣金率">
      <template slot-scope="scope">
      	<div style="padding-top: 75px;">
		<p v-for="item in scope.row.orderItems" style="width: 100%;height: 100px;line-height: 100px;border-bottom: 1px solid  #F0F0F0;margin-top: 10px;padding-bottom: 20px;" >
			<span >{{item.commissionRate}}%</span>
		</p> 
      	</div>
      </template>       
    </el-table-column>
    
    <el-table-column
      label="数量">
      <template slot-scope="scope">
      	<div style="padding-top: 75px;">
		<p v-for="item in scope.row.orderItems" style="width: 100%;height: 100px;line-height: 100px;border-bottom: 1px solid  #F0F0F0;margin-top: 10px;padding-bottom: 20px;" >
			{{item.quantity}}
		</p>      		
      	</div>      		
      </template> 
    </el-table-column>  
 
    <el-table-column
      label="实收款"  width="155">
      <template slot-scope="scope">
	<div class="realpayAmount">

	<p style="margin-top: 60px;">
			{{scope.row.orderAmount}}
		</p>		
		<p style="font-size: 12px;color: gray;" class="expressage" >
			（含运费 
			<input type="text" :readonly="scope.row.isEditing==0" v-model="scope.row.fastmailFee" />
			元）</p>
		<div class="ao_btn" v-if="scope.row.orderStatus=='0'" >
			<el-button type="text"  size="mini"  @click="handleEdit(scope.$index)" class="editBtn"  ></el-button>	
			<el-button type="text" size="mini"  @click="handleEdit(scope.$index)" class="saveBtn" >保存</el-button>	
		</div>
</div>		
      </template>         
    </el-table-column>   
   <el-table-column
      label="订单状态">
      <template slot-scope="scope" >
		<p style="color: #FF3D4F;font-size: 12px;margin-top: 60px;">
			{{scope.row.orderStatus==0?'待付款':(scope.row.orderStatus==1?'待发货':(scope.row.orderStatus==2?'待收货':(scope.row.orderStatus==3?'已收货':(scope.row.orderStatus==4?'逾期取消':'交易关闭'))))}}
		</p>
		<a style="width: auto;font-size: 12px;cursor: pointer;" @click="$router.push({path:'/orderDetails',query:{orderId:scope.row.id}})" >订单详情</a>
		<a  style="width: auto;font-size: 12px;margin: 0;cursor: pointer;" @click="ViewLogisticsInfo(scope.row.showlogisticsInfo)" >查看物流</a>
      </template>       
    </el-table-column>  
   <el-table-column
      label="操作">
      <template slot-scope="scope">    	
      	<p style="padding-top: 65px;"><a>备注</a></p>
      <div class="line1">
      	
      </div>
      </template>       
    </el-table-column>  
  </el-table>		
</div>
		<!--分页-->
		<div class="pagination" style="text-align: center;">
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :current-page="searchForm.p" :page-sizes="[10, 20, 30, 40]" :page-size="searchForm.pSize" layout="total, sizes, prev, pager, next, jumper" :total="50">
			</el-pagination>
		</div>

</div>

	</section>
	
	
	
			
		</div>

	</section>
</template>

<script>
var getOrderList='',modifyfreight='',exportOrder='';
//import {getOrderList,modifyfreight,exportOrder} from './service.js';
  export default {
    data() {
      return {
        activeIndex: '-1',
        totalRecord:0,
        ViewLogisticsInfoDialog:false,
        LogisticsInfoUrl:'http://www.baidu.com',
        isEditing:0,
        isSubmitQuery:1,//是否是表单时间查询  1:表单查询  0:三个月查询
        orderTime:'',
        status:'',
        searchForm: {
           orderCode:'',
           consignee:'',
           consigneePhone: '',
           orderTime: '',
           nickName:'',
           status:'',
           p:1,
           pSize:10
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
        tableData:[{
	city:0,
	count:0,
	county:0,
	customsType:0,
	dataType:"1",
	dz_status:0,
	entName:"广州宽度信息技术有限公司",
	enterpriseCode:"00000000",
	fastmailFee:"1.00",
	flag:false,
	id:"44917",
	leaguerId:1234567930912827,
	linkman:"啊e l",
	maintainLegalId:0,
	orderAmount:"2400.00",
	orderCod:"20170104143443227985",
	orderDate:null,
	orderDateStr:"2017-01-04 14:34:43",
	orderId:"5a0dd143427a48a093f1d1864bfa7a1a",
	orderItems:[
{
amount:2399,
commission:201.52,
commissionRate:21,
disAmount:100,
discount:0,
goodsId:364363,
imgUrl:"http://img01.sys.iflashbuy.com:8282/group2/M00/07/0F/wKgF-ld8pzKATyzHAAFynF6Ry-0583_720x720.png",
integral:0,
orderId:"5a0dd143427a48a093f1d1864bfa7a1a",
orderItemI:"50199",
oriAmount:0,
prefeprice:0,
productCss:"产品颜色:玫瑰金",
productId:"1301169",
productName:"OPPO R9plus 4GB+64GB内存版 玫瑰金 全网通4G手机 双卡双待",
productSize:"OPPO R9plus 4GB+64GB内存版 玫瑰金 全网通4G手机 双卡双待",
productSku:"产品颜色:玫瑰金",
productVersionId:0,
quantity:1,
skProId:0,
unitPrice:2399}	
	],
	orderState:9,
	orderType:0,
	province:0,
	remindSendTime:0,
	sendMethodType:0,
	sgActyId:0,
	sysid:2,
       },
{

	baseExpressList:[],
	city:0,
	count:0,
	county:0,
	couponDiscount:0,
	customsType:0,
	dataType:"1",
	dz_status:0,
	entName:"广州宽度信息技术有限公司",
	enterpriseCode:"00000000",
	fastmailFee:"1.00",
	flag:false,
	leaguerId:1234567930912827,
	leaguerName:null,
	linkman:"啊e l",
	maintainLegalId:0,
	orderAmount:"2400.00",
	orderCod:"20170104143443227985",
	orderDateStr:"2017-01-04 14:34:43",
	orderId:"5a0dd143427a48a093f1d1864bfa7a1a",
	orderItems:[{
amount:2399,
commission:201.52,
commissionRate:21,
disAmount:100,
goodsId:364363,
imgUrl:"http://img01.sys.iflashbuy.com:8282/group2/M00/07/0F/wKgF-ld8pzKATyzHAAFynF6Ry-0583_720x720.png",
integral:0,
isGift:"0",
isSend:0,
orderId:"5a0dd143427a48a093f1d1864bfa7a1a",
orderItemI:"50199",
oriAmount:0,
prefeprice:0,
productCss:"产品颜色:玫瑰金",
productId:"1301169",
productName:"OPPO R9plus 4GB+64GB内存版 玫瑰金 全网通4G手机 双卡双待",
productSize:"OPPO R9plus 4GB+64GB内存版 玫瑰金 全网通4G手机 双卡双待",
productSku:"产品颜色:玫瑰金",
productVersionId:0,
quantity:1,
unitPrice:2399},
{
amount:2399,
commission:201.52,
commissionRate:21,
disAmount:100,
discount:0,
goodsId:364363,
imgUrl:"http://img01.sys.iflashbuy.com:8282/group2/M00/07/0F/wKgF-ld8pzKATyzHAAFynF6Ry-0583_720x720.png",
integral:0,
orderId:"5a0dd143427a48a093f1d1864bfa7a1a",
orderItemI:"50199",
oriAmount:0,
prefeprice:0,
productCss:"产品颜色:玫瑰金",
productId:"1301169",
productName:"OPPO R9plus 4GB+64GB内存版 玫瑰金 全网通4G手机 双卡双待",
productSize:"OPPO R9plus 4GB+64GB内存版 玫瑰金 全网通4G手机 双卡双待",
productSku:"产品颜色:玫瑰金",
productVersionId:0,
quantity:1,
skProId:0,
unitPrice:2399}	
	],
      },         
        ],
      }
    },
    methods: {
    	getPic(productImages){//获取商品图片
    		return productImages.split(";").filter(function(item){
    			return item!=''
    		})[0];
    	},

			handleSizeChange(val) {
				this.searchForm.pSize = val;
				getOrderList(this.searchForm).then((res)=>{
		        	this.tableData= res.data;
		        	this.totalRecord= res.totalRecord;
		        }).catch((res)=>{
		        	console.error(res);
				this.$message({
					type: 'error',
					message: res.message
				});	
		        })
			},
			handleCurrentChange(val) {
				this.searchForm.p = val;
				getOrderList(this.searchForm).then((res)=>{
		        	this.tableData= res.data;
		        	this.totalRecord= res.totalRecord;
		        }).catch((res)=>{
		        	console.error(res);
				this.$message({
					type: 'error',
					message: res.message
				});	
		        })
			},     	

		    //提交  
		    submitForm(formName) {
		    	this.searchForm.status=this.status;
		    	 if(this.isSubmitQuery == 0){//清除近三个月的搜索条件
		    	 	this.searchForm.orderTime='';
		    	 }
		        getOrderList(this.searchForm).then((res)=>{
		        	this.tableData= res.data;
		        	for(let i=0;i<this.tableData.length;i++){
		        		this.tableData[i].isEditing=0;
		        	}		        	
		        	this.totalRecord= res.totalRecord;
		        }).catch((res)=>{
		        	console.error(res);
				this.$message({
					type: 'error',
					message: res.message
				});	
		        })
		      },
		    //重置
		      resetForm(formName) {
		        for(var i in this.searchForm){
		        	if(i=='p'){
		        		this.searchForm[i]=1;
		        	}else if(i=='pSize'){
		        		this.searchForm[i]=10;
		        	}else{
		        		this.searchForm[i]='';
		        	}
		        }
		        this.orderTime='';
		        this.status = '';
		        
		       // this.handlemenu('-1');

		    		var end = new Date();
		    		var start = new Date(end.getTime() - 3600 * 1000 * 24 * 90);
		    		this.searchForm.orderTime=start.Format('yyyy-MM-dd')+','+end.Format('yyyy-MM-dd');
		    		this.isSubmitQuery = 0;
		        getOrderList(this.searchForm).then((res)=>{
		        	this.tableData= res.data;
		        	for(let i=0;i<this.tableData.length;i++){
		        		this.tableData[i].isEditing=0;
		        	}
		        	this.totalRecord= res.totalRecord;
		        }).catch((res)=>{
		        	console.error(res);
				this.$message({
					type: 'error',
					message: res.message
				});		        	
		        })

		       
		      },


    },mounted(){
    
//  	if(this.$route.query.status){
//  		this.handlemenu(this.$route.query.status);
//  		this.activeIndex = this.$route.query.status;
//  	}else{
//  		this.handlemenu("-1");//默认加载近三个月的订单
//  	}
    	
    	

    }
  }
</script>

<style lang="scss" scoped>
@import url("./commonstyle.css");
	
	.BreadCrumbs{
		height: 30px;
		line-height: 30px;
	}
	.content{
		width: 100%;
		background: white;
		border: 1px solid gainsboro;
		padding: 30px;
	
	}
	.f_header{
		font-size: 16px;
		height: 50px;
		width: 100%;
		.f_infoc{
			height: 50px;
			line-height: 40px;
			
		}
	}


.el-form-item{
	float: left;
}
 .editBtn{
	height: 30px;
	width: 30px;
	border-radius:0 ;
	/*background: url(../../../assets/ic_list_editprice.png) no-repeat center center;*/
	background-size:12px 12px ;
 }
 .lianxiBtn{
 	display: inline-block;
 	width: 17px;
 	height: 17px;
 	/*background: url(../../../assets/ic_list_conectbuyer.png) no-repeat center center;*/
 	background-size:17px 17px ;
 	cursor: pointer;
 }
 .products{
 	width: 100%; 	
 	min-height: 80px;
 	height: auto;
 }
 .products .product{
 	position: relative;
 	display: flex;
 	height: 100px;
 	margin-top: 10px;
 	padding-bottom: 20px;
 	border-bottom: 1px solid  #F0F0F0;
 }
  .product .productImg{
  	margin-left: 15px;
  	height: 80px;
  	flex: 0 0 80px;
  	background-repeat:no-repeat ;
  	background-position:center center;
  	background-size:cover ; 
  	border: 1px solid  #F0F0F0;
  }
  .product .oproductInfo{
  	padding:0 10px;
  	flex: 1;
  	height: 80px;
  }
   .products .product .oproductInfo .productName{
   	line-height: 20px;
   	font-size: 12px;
    height: 40px;
  	width: 100%;
  	color: #333333;
  	text-align: left;
  	overflow: hidden;
	/*white-space: nowrap;
	text-overflow:ellipsis;
	overflow-x:hidden ; 	*/
  }
 .products .product .oproductInfo .skulist{
 	float: left;
 	width: 100%;
 	height: 22px;
 	line-height: 22px;
 	font-size: 12px;
 	text-align: left;
 	color: #999999;
 }
.products .product .oproductInfo .qitian{
		color:#E94D4D ;
		text-align: left;
		font-size: 12px;
		height: 22px;
		line-height: 22px;
		padding-left: 20px;	
		margin-top: 18px;
		/*background: url(../../../assets/ic_forgetcode_questionmark.png) no-repeat left 100%;*/
		background-size:15px 15px ;
}
 .expressage input{
 	width: 40px;
 	background: none;
 	border: none;
 	/*border: 1px solid rgb(1,1,1,0);*/

 }
  .expressage input.active{
  	border: 1px solid gainsboro;
  	background: white;
  }



.el-form-item__content{
	line-height: 0;
}

.ao_orderContent{
	max-width: 1140px;
	background: white;
	border-radius:5px;
	margin-top: 15px;
	padding-bottom: 30px;
}

.allOrdernav{
	margin-top: 0 !important;
	padding: 0 30px;
}



.orderTable{
	width: 98%;
	margin: auto;
	margin-top: 10px;
}
 .ao_orderContent .el-table{
 	border: none;
 } 

.productBox{
	min-height: 100px;
	position: relative;	
	padding-top: 75px;
}
.productBox .orderInfo{
	top: 0;
	position: absolute;
	width: 1150px;
	height: 67px;
	line-height: 100px;
	background: white !important;
	font-size: 12px;
	font-weight: bold;
	left: -64px;
	border: 1px solid gainsboro;
	border-left:none ;
	z-index: 1000;
}
.productBox .orderInfo .line{
	position: absolute;
	height: 30px;
	top: 0;
	left: 20px;
	width: 976px;
	background: white;
	border-bottom: 1px solid gainsboro;
}

.productBox .orderInfo p{
	min-width: 200px;
	text-align: left;
	padding-left: 14px;
	margin-right: 30px;
	float: left;
}
.line1{
	position: absolute;
	height: 100%;
	width: 1px;
	background: gainsboro;
	right: 1px;
	top: 0;
}



.productBox .orderInfo .left_line{
	margin-left: 53px;
	border-left:1px solid gainsboro ;
}
.productBox .orderInfo .right_line{
	border-right:1px solid gainsboro ;
	width: 378px;
}
</style>