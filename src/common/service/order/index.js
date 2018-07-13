import {http, api,httpService} from '@/common/http/index.js';
import  qs from 'qs';

// 常用基本接口参数ids，逗号隔开

// 获取展示的总数据  说明请参考wiki：pageId=3245189
export const getIndexTotalData = (params = {}) => {
  return http.get(api.getIndexTotalData, {params});
}

export const getOrderList = (params = {}) => {
  return http.get(api.getOrderList, {params});
}

export const expressList = (params = {}) => {
  return http.get(api.expressList, {params});
}
export const orderDetail = (params = {}) => {
  return http.get(api.orderDetail, {params});
}

export const orderExport = (params = {}) => {
  return http.get(api.orderExport, {params});
}
export const orderbatchExport = (params = {}) => {
  return http.get(api.orderbatchExport, {params});
}

export const orderExportDownload = api.orderExportDownload;

export const deliverInfo = (params = {}) => {
  return http.get(api.deliverInfo, {params});
}
export const deliverSubmit = (params = {}) => {
  return http.get(api.deliverSubmit, {params});
}

export const orderRemark = (params = {}) => {
  return http.get(api.orderRemark, {params});
}

export const getProvince = (params = {}) => {
  return http.get(api.getProvince, {params});
}

export const getCity = (params = {}) => {
  return http.get(api.getCity, {params});
}
export const getDistrict = (params = {}) => {
  return http.get(api.getDistrict, {params});
}

export const getOrderCode = (params = {}) => {
  return http.get(api.orderCode, {params});
}

export const updateinvoice = (params = {}) => {
   	return http.post(api.updateinvoice,qs.stringify(params),{
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	});
}

export const orderUpdate = (params = {}) => {
   	return http.post(api.orderUpdate,qs.stringify(params),{
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	});
}


export const freightUpdate = (params = {}) => {
   	return http.post(api.freightUpdate,qs.stringify(params),{
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	});
}

