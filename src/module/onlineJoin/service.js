import {http, api,httpService} from '@/common/http/http.js';
import  qs from 'qs';

const getToken = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export const getCheckcode = (params = {}) => {
  return http.post(api.getCheckcode, params);
}

export const getProvinceCity= ()=>{
	return http.get(api.getTocity);
}

export const getCityDistrict= (params={})=>{
	return http.get(api.getcityDistrict,{params});
}

export const join = (params = {}) => {
   	return http.post(api.join,qs.stringify(params),{
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	});
}

//export const singContract = (params = {}) => {
// 	return http.get(api.singContract,qs.stringify(params),{
//		headers:{
//			'Content-Type':'application/x-www-form-urlencoded'
//		}
//	});
//}

export const singContract= (params={})=>{
	return http.get(api.singContract,{params});
}



export const getEntInfo = (params = {}) => {
   	return http.get(api.getEntInfo,qs.stringify(params),{
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	});
}
export const updateEntInfo = (params = {}) => {
   	return http.post(api.updateEntInfo,qs.stringify(params),{
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	});
}
export const reaudit = (params = {}) => {
   	return http.get(api.reaudit,qs.stringify(params),{
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	});
}

export const exportpdf = httpService;

export const getWXPayInfo = (params = {}) => {
  return http.get(api.payWXOrder, {
          params: params
      })
      .then(function(response) {
          return response;
      });
};

// 获取合同支付信息  contractNo:outTradeNo
export const getPayInfo = (params = {}) => {
  return http.get(api.queryPayStatus, {
          params: params
      })
      .then(function(response) {
          return response;
      });
};

export const oneleve = (params = {}) => {
   	return http.get(api.oneleve,qs.stringify(params),{
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	});
}

export const sbrandList = (params = {}) => {
   	return http.post(api.sbrandList,qs.stringify(params),{
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	});
}

export const storeAdd = (params = {}) => {
  return http.post(api.storeAdd, params);
}
export const updatestoreInfo = (params = {}) => {
  return http.post(api.updatestoreInfo, params);
}




export const storeLists = (params = {}) => {
   	return http.get(api.storeLists,qs.stringify(params),{
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	});
}




export const storeDetail = (params = {}) => {
   	return http.post(api.storeDetail,qs.stringify(params),{
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	});
}
export const storeReaudit = (params = {}) => {
   	return http.post(api.storeReaudit,qs.stringify(params),{
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	});
}
