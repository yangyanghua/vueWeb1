import qs from 'qs';
import {
  api,
  httpService,
  http
} from '@/common/http/http.js';

const getToken = () => {
  return JSON.parse(localStorage.getItem('user'));
};

//获取菜单内容
// export const getNavList = (params = {}) => {
//   params.service = location.origin+location.pathname;
//   let promise = new Promise(function(resolve,reject){
//     http.post(api.getNavList+location.search,qs.stringify(params),{
//       headers:{
//             'Content-Type': 'application/x-www-form-urlencoded'
//       }}).then((res)=>{
//         // history.replace(location.origin+location.pathname);
//         //如果匹配到ticket参数
//         if(location.search.match('ticket')){
//         history.pushState({}, "", location.origin+location.pathname);
//         }
//         resolve(res);
//         // window.location.href = location.origin+location.pathname+'#/';
//     }).catch((res)=>{
//       reject(res);
//     });
//   });
//   return promise;
// }
export const getNavList = (params = {}) => {
  params.service = location.origin+location.pathname;
  let promise = new Promise(function(resolve,reject){
    let data = {
      userName: '用户名',
      navList: [
        {id: 1, name: '首页', completeName: '系统首页', icon: 'home',
      child:[
        {id: 11, pid: 1, name: "系统首页", link:"/index"},
      ]},
        {id: 3, name: '商品', completeName: '商品管理', icon: 'commodity', child:[
          {id: 31, pid: 3, name: "商品列表", link:"/goods/list"},
//        {id: 32, pid: 3, name: "发布商品", link:"/goods/publish"}
        ]},
        {id: 2, name: '订单', completeName: '订单管理', icon: 'order',child:[
         // {id: 21, pid: 2, name: "商家清算管理", link:"/order/entLiquidation"},
          {id: 21, pid: 2, name: "订单列表", link:"/order"},
          { id: 22, pid: 2, name: "维权订单", link: "/refund" },
        ]},

        {id: 4, name: '店铺', completeName: '店铺管理', icon: 'shop', child:[
          {id: 41, pid: 4, name: "店铺资料", link:"/store/info"},
        //  {id: 42, pid: 4, name: "店铺装修", link:"/store/storeTemplate"},
         // {id: 43, pid: 4, name: "店铺分类", link:"/store/storeCategory"},
//        {id: 44, pid: 4, name: "店铺列表", link:"/join/storelist"},
          // {id: 44, pid: 4, name: "财务结算", link:"/store/FinalSett"},
        ]},
        {id: 5, name: '物流', completeName: '物流管理', icon: 'logistics', child:[
          {id: 51, pid: 5, name: "运费模板", link:"/logistics/"},
          // {id: 52, pid: 5, name: "自提地址管理", link:"/logistics/address"}
        ]},
        // {id: 6, name: '营销', child:[
        //   {id: 61, pid: 6, name: "促销活动", link:"/sales/"},
        //   {id: 62, pid: 6, name: "新建活动", link:"sales.html#/detail"}
        // ]},
        // {id: 7, name: '数据', child:[
        //   {id: 71, pid: 7, name: "经营数据", link:"data.html#/"}
        // ]},
        {id: 8, name: '设置', completeName: '设置', icon: 'setUp', child:[
          {id: 81, pid: 8, name: "修改密码", link:"/account/password"},
          {id: 82, pid: 8, name: "账户管理", link:"/account/management"},
          {id: 83, pid: 8, name: "企业信息", link:"/account/entInfo"},
          // {id: 84, pid: 8, name: "柜台信息", link:"/account/constructionBank"},
         // {id: 85, pid: 8, name: "分期设置", link:"/account/subsidy"},
        ]},
        {id: 9, name: '营销', completeName: '营销中心', icon: 'setUp', child:[
          {id: 91, pid: 9, name: "促销管理", link:"/salesPromotion/"},
        ]},
        {id: 15, name: '客服', completeName: '聊天管理', icon: 'order', link:"/im",child:[]},
        {id: 10, name: '财务', completeName: '财务管理', icon: 'setUp', child:[
          {id: 101, pid: 10, name: "对帐单", link:"/finance/"},
        ]},
      ]
    };
      resolve(data);
  });
  return promise;
}



//获取上传图片接口
export const getUploadImg = (params = {}) => {
  return http.post(api.uploadImg,params,{
    headers:{
          'Content-Type': 'multipart/form-data'
    }});
}

export const getUploadImgSrc = (file) => {
  let formdata = new FormData();
  formdata.append('file',file);
  let promise = new Promise(function(resolve, reject){
    getUploadImg(formdata).then(res => {
      console.log('img res ', res);
      resolve(res.ftpUrl);
    }).catch(res => {
      reject(res);
    });
  });
  return promise;
};

//打开支付宝收银平台
export const openAliPay = function (outTradeNo, openInCurrentPage) {
  console.log('ali ')
  let accessToken = getToken() ? getToken().accessToken : '';
  let openUrl = httpService + api.payOrder + '?outTradeNo=' + outTradeNo + '&accessToken=' + accessToken;
  // let openUrl ="http://192.168.9.222:8080/api/v1/alipayPagePay/tradePay?outTradeNo=20171017101010&tradeNo=20171017101010order";

if (openInCurrentPage) {
    window.location.href = openUrl;
} else {
    window.open(openUrl);
}
};

//打开银联收银平台
export const openYLPay = function (outTradeNo, openInCurrentPage) {
  console.log('yinlian ')
  let accessToken = getToken() ? getToken().accessToken : '';
  let openUrl = httpService + api.payYinlianOrder + '?gateId=2000&orderId=' + outTradeNo + '&accessToken=' + accessToken;
  // let openUrl ="http://192.168.9.222:8080/api/v1/alipayPagePay/tradePay?outTradeNo=20171017101010&tradeNo=20171017101010order";
  if (openInCurrentPage) {
    window.location.href = openUrl;
  } else {
    window.open(openUrl);
  }
};


