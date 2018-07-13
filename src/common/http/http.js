import axios from 'axios';
import * as api from './api.js';
let httpService = '';
let imHttpService = '';
var currentHost = location.host;



if (currentHost == 'localhost:8090' || currentHost == 'localhost:9090' || currentHost == '192.168.9.243:9090' || currentHost == '192.168.9.218:8380' || currentHost == '192.168.9.76:9090') {

   // httpService = 'http://192.168.9.250:8092'; //杨顺

  //httpService = 'http://192.168.9.202:8092'; //龙展鹏
  
  // httpService = 'http://192.168.9.226:8092'; //余艳芬
  // imHttpService = 'http://192.168.9.226:8089'; 

  httpService = 'http://tsgmerchant-api.iflashbuy.com:8383'; //闪购測試/預生產
  imHttpService = 'http://192.168.5.106:8089';  

  //httpService = 'http://192.168.9.239:8092'; //
  //httpService = 'http://192.168.9.206:8092';//

  // imHttpService = 'http://192.168.9.226:8089';

  // httpService = 'http://192.168.9.239:8092'; //
  // httpService = 'http://192.168.9.226:8092';//
  // httpService = 'http://tsgmerchant-api.iflashbuy.com:8383'; //測試/預生產
  // httpService = 'http://192.168.9.250:8092'; //杨顺
   // httpService = 'http://tsgmerchant-api.iflashbuy.com:8383'; //測試/預生產
   httpService = 'http://192.168.9.206:8092';   //陈瑞栋 

} else if (currentHost == 'tsgmerchant-web.iflashbuy.com:8383' || currentHost == '192.168.5.177:8090') {
  httpService = 'http://tsgmerchant-api.iflashbuy.com:8383'; //闪购測試/預生產
  imHttpService = 'http://192.168.5.106:8089';
}else if(currentHost == 'ysgmerchant-web.z-code.cn'){
  httpService = 'http://ysgmerchant-api.z-code.cn'; //码上花測試/預生產
  imHttpService = 'http://chat.z-code.cn';		
}else if (currentHost == 'sgmerchant-web.iflashbuy.com') {
  httpService = 'http://sgmerchant-api.iflashbuy.com'; //闪购生產
} else if (currentHost == 'sgmerchant-web.z-code.cn' || currentHost== 'sgmerchant-web.z-code.cn:8381') {
  httpService = 'http://sgmerchant-api.z-code.cn'; //码上花生產
  imHttpService = 'http://chat.z-code.cn';	
}

// httpService = 'http://192.168.5.53:8081'; //测试/预生产
// imHttpService = 'http//192.168.9.226:8083'; //測試/預生產
// imHttpService = 'http://192.168.9.252:8089'; //測試/預生產







// if(process.env.NODE_ENV === 'development'){
//   httpService = 'http://tsgmerchant-api.iflashbuy.com:8383'; //生產
// } else {
//   //生产环境
//   httpService = 'http://sgmerchant-api.z-code.cn'; //生產
//   httpService = 'http://tsgmerchant-api.iflashbuy.com:8383'; //测试 本地用
// }
const getToken = () => {
  return JSON.parse(localStorage.getItem('user'));
};
let http = axios.create({
  baseURL: httpService,
  //   headers:{
  //     'Content-Type':'application/x-www-form-urlencoded'
  // },
  //   transformRequest: [function (data) {
  //     data = Qs.stringify(data);
  //     return data;
  // }],
  // withCredentials: true //加了这段就可以跨域了
});
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
//axios.defaults.timeout =  3000;
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  let accessToken = getToken() ? getToken().accessToken : '';
  let params = {
    accessToken
  };
  config.params = Object.assign(config.params || {}, params);
  return config;
});


http.interceptors.response.use(function (response) {

  let data = response.data || {};
  if (data.code == '0') {
    console.log("请求成功：" + data.message);
    return response.data.data;
  }
	
  if (data.code == '3') {
    location.href = "http://" + location.host + '/#/login';
  }
  let tipMessage = {
    code: data.code,
    message: data.message
  }
  return Promise.reject(tipMessage);
}, function (error) {
  let tipMessage = {
    code: '-1',
    message: '网络或系统错误'
  }

  return Promise.reject(tipMessage);
});
export default http;


// console.log('imHttpService-----',imHttpService)
export {
  api,
  http,
  httpService,
  currentHost,
  imHttpService
};
