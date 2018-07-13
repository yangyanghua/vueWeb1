// import {imHttpService,httpService} from '@/common/http/http.js';
// import {imHttpService,httpService} from './http.js';
// import * as info from '@/common/http/http.js';
// 直接引入imHttpService和httpService失败
// setTimeout(()=>{
// 	console.log('155151!0',imHttpService,httpService,info);
// },10)
// console.log('155151!0',imHttpService,httpService,info);
let httpService = '';
let imHttpService = '';
var currentHost = location.host;



if (currentHost == 'localhost:8090' || currentHost == 'localhost:9090' || currentHost == '192.168.9.243:8380' || currentHost == '192.168.9.218:8380' || currentHost == '192.168.9.76:9090') {

   //httpService = 'http://192.168.9.250:8092'; //杨顺

   // httpService = 'http://192.168.9.252:8092'; //梓峰
  //httpService = 'http://192.168.9.202:8092'; //龙展鹏

  // httpService = 'http://192.168.9.226:8092'; //余艳芬
  // imHttpService = 'http://192.168.9.226:8089';

  httpService = 'http://tsgmerchant-api.iflashbuy.com:8383'; //闪购測試/預生產
  imHttpService = 'http://192.168.5.106:8089';

  //imHttpService = 'http://192.168.5.106:8089';
  //httpService = 'http://192.168.9.239:8092'; //
 // httpService = 'http://192.168.9.221:8092';//
 // httpService = 'http://tsgmerchant-api.iflashbuy.com:8383'; //測試/預生產

  //imHttpService = 'http://192.168.5.106:8089';
  //httpService = 'http://192.168.9.239:8092'; //
  // httpService = 'http://192.168.9.206:8092';//
  // httpService = 'http://tsgmerchant-api.iflashbuy.com:8383'; //測試/預生產

  // imHttpService = 'http://192.168.5.106:8089';

  // httpService = 'http://192.168.9.239:8092'; //
  // httpService = 'http://192.168.9.226:8092';//
  // httpService = 'http://tsgmerchant-api.iflashbuy.com:8383'; //測試/預生產

  // httpService = 'http://192.168.9.239:8092'; //
  //httpService = 'http://192.168.9.206:8092';//
 // httpService = 'http://tsgmerchant-api.iflashbuy.com:8383'; //測試/預生產
 // httpService = 'http://192.168.9.206:8092'; //


} else if (currentHost == 'tsgmerchant-web.iflashbuy.com:8383' || currentHost == '192.168.5.177:8090') {
  httpService = 'http://tsgmerchant-api.iflashbuy.com:8383'; //闪购測試/預生產
  imHttpService = 'http://192.168.5.106:8089';
}else if(currentHost == 'ysgmerchant-web.z-code.cn'){
  httpService = 'http://ysgmerchant-api.z-code.cn'; //码上花測試/預生產
  imHttpService = 'http://chat.z-code.cn';   //闪聊预生产
}else if (currentHost == 'sgmerchant-web.iflashbuy.com') {
  httpService = 'http://sgmerchant-api.iflashbuy.com'; //闪购生產
} else if (currentHost == 'sgmerchant-web.z-code.cn' || currentHost== 'sgmerchant-web.z-code.cn:8381') {
  httpService = 'http://sgmerchant-api.z-code.cn'; //码上花生產
  imHttpService = 'http://chat.z-code.cn';
}


//导航管理
export const navigation_getAll = '/admin/api/navigation/search';
// 上传图片
export const uploadImg = '/api/v1/goods/uploadImg';

//订单模块
export const getOrderList = '/api/v1/order/list';//订单列表
export const orderDeliver = '/api/v1/order/deliver';//发货
export const orderRemark = '/api/v1/order/remark';//备注
export const update = '/api/v1/order/update';//修改订单
export const updatefreight = '/api/v1/order/updatefreight';//修改运费
export const orderCancel = '/api/v1/order/cancel';//取消
export const orderAudit = '/api/v1/order/audit';//审核
export const orderExport  = '/api/v1/order/export';//导出文件
export const batchexport  = '/api/v1/order/batchexport';//根据订单号批量导出文件
export const orderDownload = '/api/v1/order/download';//下载导出订单信息
export const exportByTab  = '/api/v1/order/exportByTab';//订单导出接口
export const orderSign = '/api/v1/order/sign';//签收
export const orderDetail = '/api/v1/order/info';//详情
export const deliverInfo = '/api/v1/order/deliverInfo';//发货详情
export const commonexpress = '/api/v1/express/commonexpress/all';//快递商列表
export const deliver = '/api/v1/order/deliver';//确认发货
export const orderRefuse = '/api/v1/order/refuse';//拒签
export const logisticsinfo = '/api/v1/order/logisticsinfo';//拒签
export const updateInvoice = '/api/v1/order/updateinvoice';//修改发票
export const snapshot = '/api/v1/order/snapshot';//历史快照
export const showTrace = '/api/v1/express/commonexpress/getOrderCode';//查看物流
export const orderCode = 'api/v1/order/checkDeliver' // 订单发货状态校验

//店铺模块
//店铺分类模块
export const storeAddCategory = '/api/v1/store/category/save';//新增店铺分类
export const storeUpdateCategory = '/api/v1/store/category/update';//编辑
export const storeDelCategory = '/api/v1/store/category/del/';//删除
export const getStoreCategory = '/api/v1/store/category/list';//分类列表
export const getCategoryChild = '/api/v1/store/category/{id}/listChild';//获取分类下的子类信息
export const categorySort = '/api/v1/store/category/sort';//排序
export const getStoreProduct = '/api/v1/store/product/list';//获取店铺所有商品列表
export const getStoreCanChiose= '/api/v1/store/template/default/product/all/get';//获取店铺所有可选商品列表
export const getStoreChiosedPro = '/api/v1/store/template/default/product/list';//获取店铺所有已选择的商品列表
export const chioseProUpdate = '/api/v1/store/template/default/product/update';//选品保存
export const getStoreTemplate = '/api/v1/store/template/get'; //获取店铺模板类型

export const getCategoryProduct = '/api/v1/store/category/listProduct';//获取分类下的商品列表接口
export const addUpdateProduct  = '/api/v1/store/category/product/update';//新增分类下的商品关联接口
//店铺资料
export const storeInfo = '/api/v1/store/info';//店铺资料
export const storeSave = '/api/v1/store/save';//新增或者修改店铺资料



// 商品模块
export const goodsList = '/api/v1/goods/list';//查询商品列表
export const goodsCount = '/api/v1/goods/getCount';//查询全部、上下架商品数量
export const goodsUp = '/api/v1/goods/up';//上架商品
export const goodsDown = '/api/v1/goods/down';//下架商品
export const goodsDel = '/api/v1/goods/delGoods';//删除商品
export const goodsStockAttrs = '/api/v1/goods/getGoodsStockAttrs';//商品库存属性信息
export const goodsQueryCode = '/api/v1/goods/delGoods';//商品
export const goodsBindCode= '/api/v1/bindCode';//商品
export const goodsBindCodeList= '/api/v1/binCode/list';//查看商品已绑码信息
export const goodsBindCodeCheck= '/api/v1/bindCode/check';//查看商品已绑码信息
export const saveInventory= '/api/v1/goods/saveInventory';//修改商品库存


// 商品发布相关
export const goodsCategoryList = '/api/v1/goods/category/list';//商品类目一二三级查询
export const goodsRecentCategory = '/api/v1/goods/category/recent';//商品最近使用类目查询
export const goodsKeyCategory = '/api/v1/goods/category/search';//商品类目关键字查询
export const goodsToCreate = '/api/v1/goods/category/add';//商品创建时查询当前类目下的属性规格等相关信息
export const goodsSave = '/api/v1/goods/category/save';//商品创建后保存
export const brandList = '/api/v1/brand/list';//品牌下拉选项搜索接口
export const goodsDetail = '/api/v1/goods/category/update';//查看商品详情接口


// 物流模块
export const templateList = '/api/v1/express/template/list';//查询运费模板列表
export const templateDelete = '/api/v1/express/template/deleteById';//物流模版删除
export const templateAdd = '/api/v1/express/template/save';//物流模版新增
export const templateUpdate = '/api/v1/express/template/update';//物流模版修改
export const templateCopy = '/api/v1/express/template/copy';//物流模版复制
export const templategetById = '/api/v1/express/template/getById';//物流模版取单个模板信息
export const getTocity = '/api/v1/district/get/tocity';//获取各大省区
export const getcityDistrict = '/api/v1/district/get/city/district';//获取各大省区
export const templateItemById = '/api/v1/express/template/item/get/id';//获取模板小项用ID


export const addressList = '/api/v1/express/address/list';//自提地址列表
export const addressDelete = '/api/v1/address/deleteById';//自提地址删除
export const addressSave = '/api/v1/express/address/save';//自提地址新增/修改

//登录模块
export const login = '/api/v1/user/login';//查询运费模板列表
export const logout = '/api/v1/user/logout';//查询运费模板列表
export const getCheckcode = '/api/v1/user/login/checkcode';//获取验证码图片

//账户管理
export const managementList = '/api/v1/user/listAccountByPage';//查询账户列表
export const managementFind = '/api/v1/user/find';//查询指定账户
export const managementDelete = '/api/v1/user/delete';//删除账户
export const managementDisable = '/api/v1/user/disable';//禁用账户
export const managementIsable = '/api/v1/user/isable';//开启账户
export const managementSave = '/api/v1/user/save';//新增和修改账户
export const passwordUpdate = '/api/v1/user/password/update';//修改密码
export const entInfo = '/api/v1/base/ent/info';//查看指定企业信息
export const entUpdate = '/api/v1/base/ent/update';//修改指定企业信息
export const ccbGet = '/api/v1/pay/ccb/get';//建行支付  获取详情
export const ccbEdit = '/api/v1/pay/ccb/edit';//建行支付  新增修改
export const subsidyEdit = '/api/v1/subsidy/edit';//店铺贴息  编辑修改
export const subsidyGet = '/api/v1/subsidy/get';//店铺贴息  获取贴息详情
export const subsidyValid = '/api/v1/pay/ccb/valid';//验证银行填写信息接口
export const ccbValid = '/api/v1/pay/ccb/valid';// 弹窗 验证银行填写信息
export const isCheckService = '/api/v1/user/isCheckService';// 商家客服开关



//首页

export const getIndexTotalData = '/api/v1/index/getIndexTotalData';//获取展示的总数据
export const getOrderNumByDate = '/api/v1/data/orderData/getOrderNumByDate';//订单统计
export const getOrderSalesNumByDate = '/api/v1/data/orderData/getOrderSumByDate';//销售统计

export const getPreHandleData = '/api/v1/index/getPreHandleData';//获取待处理事务
export const noticeList = '/api/v1/notice/list';//公告列表列表
export const noticeInfo = '/api/v1/notice/info';//公告列表详细
export const businessSchoolList = '/api/v1/businessSchool/list';//闪购商学院列表
export const businessSchoolInfo = '/api/v1/businessSchool/info';//闪购商学院详细

export const EntcheckEntMsg = '/api/v1/base/ent/checkEntMsg';//校验企业信息






// 溯源模块
export const sourceInfo = '/api/v1/trace/info'; // 获取详情
export const sourceAdd = '/api/v1/trace/add'; // 增加溯源信息
export const sourceUpdate = '/api/v1/trace/update'; // 更新溯源信息
export const sourceDownCode = '/api/v1/trace/downCode'; // 下载码图
export const sourceDownAllCode = '/api/v1/trace/downAllCode'; // 下载该账号所有商品码图
export const sourceDownGoodsCode = '/api/v1/trace/downGoodsCode'; // 下载指定商品的码图
export const viewCode = '/api/v1/trace/viewCode'; // 查看码图

//在线入驻模块
export const getVcode = '/api/v1/register/smsvcode'; // 获取手机验证
export const register = '/api/v1/register/register'; // 注册
export const join = '/api/v1/base/ent/join'; // 入驻资料填写
export const getEntInfo = '/api/v1/base/ent/joininfo'; // 获取企业信息
export const updateEntInfo = '/api/v1/base/ent/updatejoininfo'; //更新入驻企业信息
export const singContract = '/api/v1/contract/add'; // 合同签署
export const reaudit = '/api/v1/base/ent/reaudit'; // 重新发起审核
export const payOrder = '/api/v1/alipayPagePay/tradePay';//跳到支付宝支付页
export const exportpdf = '/api/v1/contract/export.pdf';//导出pdf
export const payWXOrder = '/api/v1/wxpay/prepay'; //微信支付页所需信息查询
export const queryPayStatus = '/api/v1/contract/queryContractPayInfo'; //查询支付信息
export const payYinlianOrder = '/api/v1/unionPay/tradePay'; //跳到银联支付页

//开店
export const oneleve = '/api/v1/goods/category/oneleve'; //店铺类目
export const sbrandList = '/api/v1/brand/lists'; //品牌列表
export const storeAdd = '/api/v1/store/add'; //提交审核
export const storeReaudit = '/api/v1/store/reaudit'; //重新提交审核
export const storeLists = '/api/v1/store/lists'; //店铺列表
export const storeDetail = '/api/v1/store/detail'; //获取店铺审核资料
export const updatestoreInfo = '/api/v1/store/edit'; //更新店铺审核信息
export const storeAudit = '/admin/store/audit'; //店铺审核

//促销活动模块
export const promoteList = '/api/v1/promote/list'; //活动列表数据
export const promoteAdd = '/api/v1/promote/add'; //创建活动接口
export const promoteUpdate = '/api/v1/promote/update'; //修改活动接口
export const promoteInfo = '/api/v1/promote/info'; //查看活动接口
export const promoteDel = '/api/v1/promote/del'; //删除活动接口
export const promoteCheckname = '/api/v1/promote/checkname'; //检查活动名称接口

//维权订单
export const getRefundList = '/api/v1/refund/getList'; //维权订单列表 post
export const getRefundInfo = '/api/v1/refund/info'; //维权订单详情 get
export const passRefund = '/api/v1/refund/pass'; //同意退款（未打款） post status => 2
export const getStoreRefundResume = '/api/v1/refund/getStoreRefundInfo';//店铺退货地址信息
export const agreeAndSendAddr = '/api/v1/refund/agreeAndSendAddr'; //同意退货并发送退货地址(未打款) psot status =>2
export const confirmPassRefund = '/api/v1/refund/toRefund'; //同意退款（要打款） get status =>5
export const refuseRefund = '/api/v1/refund/refuse'; //拒绝退款 post status => 1
export const rejectGoods = '/api/v1/refund/rejectGoods'; //未收到货拒绝退款 get status => 4
export const setCloseRefund = '/api/v1/refund/closeRefund'; //关闭退款订单 get
export const getLogistics = '/api/v1/refundLogistics/getByRefundNo'; //查询售后单物流 get
export const getLogisticsResume = '/api/v1/refundLogistics/get'; //返回物流公司、物流单号、寄件人联系方式 get
// export const getConsultList = '/api/v1/refundConsult/list'; //协商历史接口 get


/* im 闪聊模块 start */
export const IMgetRecentUsers = imHttpService + '/chat/v1/user/getRecentUsers';//获取最近联系人
export const IMgetInfo = imHttpService + '/chat/v1/customerService/getInfo';//获取客服信息
export const IMupdateInfo = imHttpService + '/chat/v1/customerService/updateInfo';//修改客服信息
export const IMsaveInfo = imHttpService + '/chat/v1/chatMessage/save';//保存聊天记录
export const IMgetConfigInfos = imHttpService + '/chat/v1/customerService/getConfigInfos';//获取客服配置信息
export const IMupdateAndAddConfigInfo = imHttpService + '/chat/v1/customerService/updateAndAddConfigInfo';//修改客服配置信息
export const IMgetHistory = imHttpService + '/chat/v1/chatMessage/getHistory';//获取聊天记录
export const IMdeleteQickReply = imHttpService + '/chat/v1/customerService/deleteQickReplyConfigInfo';//批量删除快捷回复
export const IMgetUserAccountInfo = imHttpService + '/chat/v1/user/getUserAccountInfo';//获取闪聊列表用户的头像和昵称等信息
export const IMcheckIsRegister = imHttpService + '/chat/v1/user/checkIsRegister';//检测是否注册闪聊
export const IMgetToken = imHttpService + '/chat/v1/user/getToken';//获取聊天token
export const IMdistribute = imHttpService + '/chat/v1/customerService/distribute';//获取聊天token


//锦峰
// export const IMgetRecentUsers = 'http://192.168.9.252:8089' + '/chat/v1/user/getRecentUsers';//获取最近联系人
// export const IMgetInfo = 'http://192.168.9.252:8089' + '/chat/v1/customerService/getInfo';//获取客服信息
// export const IMupdateInfo = 'http://192.168.9.252:8089' + '/chat/v1/customerService/updateInfo';//修改客服信息
// export const IMsaveInfo = 'http://192.168.9.252:8089' + '/chat/v1/chatMessage/save';//保存聊天记录
// export const IMgetConfigInfos = 'http://192.168.9.252:8089' + '/chat/v1/customerService/getConfigInfos';//获取客服配置信息
// export const IMupdateAndAddConfigInfo = 'http://192.168.9.252:8089' + '/chat/v1/customerService/updateAndAddConfigInfo';//修改客服配置信息
// export const IMgetHistory = 'http://192.168.9.252:8089' + '/chat/v1/chatMessage/getHistory';//获取聊天记录
// export const IMdeleteQickReply = 'http://192.168.9.252:8089' + '/chat/v1/customerService/deleteQickReplyConfigInfo';//批量删除快捷回复
// export const IMgetUserAccountInfo = 'http://192.168.9.252:8089' + '/chat/v1/user/getUserAccountInfo';//获取闪聊列表用户的头像和昵称等信息
// export const IMcheckIsRegister = 'http://192.168.9.252:8089' + '/chat/v1/user/checkIsRegister';//检测是否注册闪聊

/* im 闪聊模块 end */

// 物流模块
// export const templateList = httpService + '/api/v1/express/template/list';//查询运费模板列表
// export const templateDelete = httpService + '/api/v1/express/template/deleteById';//物流模版删除
// export const templateAdd = httpService + '/api/v1/express/template/save';//物流模版新增
// export const templateUpdate = httpService + '/api/v1/express/template/update';//物流模版修改
// export const templateCopy = httpService + '/api/v1/express/template/copy';//物流模版复制
// export const templategetById = httpService + '/api/v1/express/template/getById';//物流模版取单个模板信息
// export const getTocity = httpService + '/api/v1/district/get/tocity';//获取各大省区
// export const getcityDistrict = httpService + '/api/v1/district/get/city/district';//获取各大省区
// export const templateItemById = httpService + '/api/v1/express/template/item/get/id';//获取模板小项用ID

// export const addressList = 'http://192.168.9.252:8092' + '/api/v1/express/address/list';//自提地址列表
// export const addressDelete = 'http://192.168.9.252:8092' + '/api/v1/address/deleteById';//自提地址删除
// export const addressSave = 'http://192.168.9.252:8092' + '/api/v1/express/address/save';//自提地址新增/修改

export const trailExpress = '/api/v1/refundLogistics/getByRefundNo'; //查询物流轨迹 get
export const getConsultList = '/api/v1/refundConsult/list'; //协商历史接口 get
export const exportRefundList = '/api/v1/refund/export'; //导出订单 post
export const refundListDownload = '/api/v1/refund/download'; //导出订单2 post
export const batchexportByid = '/api/v1/order/batchexportByid'; //根据订单号导出订单

export const getOrderAccountList = '/api/v1/orderAccount/list';
export const batchExportOrderAccount = '/api/v1/orderAccount/exportList';

