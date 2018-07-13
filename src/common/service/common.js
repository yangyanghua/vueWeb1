import qs from 'qs';
import {
  api,
  httpService,
  http
} from '@/common/http/index.js';

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
        {id: 1, name: '首页',code:"index", completeName: '系统首页', icon: 'home',link:"/index",
	      child:[
	        {id: 11, pid: 1, name: "系统首页", link:"/index"},
	      ]},
        {id: 3, name: '商品',code:"product", completeName: '商品管理', icon: 'commodity',  link:"/goods",child:[
          {id: 31, pid: 3, name: "商品列表", link:"/goods/list"},
          {id: 32, pid: 3, name: "发布商品", link:"/goods/detail"},
          {id: 34, pid: 3, name: "商品分类", link:"/goods/classification"},          
          {id: 33, pid: 3, name: "品牌管理", link:"/goods/brand"},
        ]},
        {id: 2, name: '订单',code:"order", completeName: '订单管理', icon: 'order',link:"/orders",child:[
         // {id: 21, pid: 2, name: "商家清算管理", link:"/order/entLiquidation"},
          {id: 21, pid: 2, name: "订单列表", link:"/orders"},
        ]},
        {id: 12, name: '媒体库', completeName: '我的媒体库', icon: 'order',link:"/media",child:[
        		{id: 121, pid: 12, name: "媒体库", link:"/media"},
        ]},

        {id: 4, name: '店铺', code:"store", completeName: '店铺管理', icon: 'shop',link:"/store",child:[
        		{id: 41, pid: 4, name: "店铺首页", link:"/store/storeIndex"},
        		{id: 42, pid: 4, name: "店铺资料", link:"/store/storeInfo"},
        		{id: 43, pid: 4, name: "优惠券", link:"/store/coupons"},
        ]},
        
         {id: 10, name: '员工', completeName: '员工管理', icon: 'order', link:"/management",child:[
           {id: 101, pid: 10, name: "员工管理", link:"/management"},
         ]},
         {id: 14, name: '物流', completeName: '物流管理', icon: 'order', link:"/template",child:[
           {id: 141, pid: 14, name: "运费模板", link:"/template"},
         ]},
         {id: 15, name: '客服', completeName: '聊天管理', icon: 'order', link:"/im"},
        //  {id: 13, name: '例子', completeName: '例子样式', icon: 'order', link:"/examples",child:[
        //   // {id: 21, pid: 2, name: "商家清算管理", link:"/order/entLiquidation"},
        //    {id: 113, pid: 13, name: "例子样式", link:"/examples"},
        //  ]},
      ]
    };
      resolve(data);
  });
  return promise;
}

export const getNavigation = (params = {}) => {
  return http.get(api.getNavigation, {params});
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




