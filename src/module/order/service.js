import {http, api} from '@/common/http/http.js';
import  qs from 'qs';

export const getOrderList = (params = {}) => {
  return http.get(api.getOrderList, {params});
}


export const orderDetail = (params = {}) => {
  return http.get(api.orderDetail, {params});
}

//export const orderDetail = (params = {}) => {
//return http.post(api.orderDetail, params);
//}

export const remark= (params = {})=>{
	return http.post(api.orderRemark,qs.stringify(params),{
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	});
}

export const cancel= (params = {})=>{
	return http.post(api.orderCancel,qs.stringify(params),{
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	});
}

export const deliverInfo = (params = {}) => {
  return http.get(api.deliverInfo, {params});
}


export const commonexpress = (params = {}) => {
  return http.get(api.commonexpress, {params});
}

export const deliver= (params = {})=>{
	return http.post(api.deliver,qs.stringify(params),{
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		}		
	});
}


export const sign= (params = {})=>{
	return http.post(api.orderSign,qs.stringify(params),{
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	});
}

export const refuse= (params = {})=>{
	return http.post(api.orderRefuse,qs.stringify(params),{
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	});
}

export const exportOrder= (params = {})=>{
	return http.get(api.orderExport,{params});
}
 
export const getProvinceCity= ()=>{
	return http.get(api.getTocity);
}


export const getCityDistrict= (params={})=>{
	return http.get(api.getcityDistrict,{params});
}

export const updateConsigneeInfo = (params={})=>{
	return http.post(api.update,qs.stringify(params),{
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	});;
}

export const batchExport = (params={})=>{
	return http.get(api.batchexport,{params});
}

export const logisticsinfo = (params={})=>{
	return http.get(api.logisticsinfo,{params});
}
export const showTrace = (params={})=>{
	return http.get(api.showTrace,{params});
}


export const updateInvoice = (params={})=>{
	return http.post(api.updateInvoice,qs.stringify(params),{
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	});
}

export const updateFreight = (params={})=>{
	return http.post(api.updatefreight,qs.stringify(params),{
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	});
}

export const viewSnapshot = (params={})=>{
	return http.post(api.snapshot,qs.stringify(params),{
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	});
}

export const exportByTab = (params={})=>{
	return http.get(api.exportByTab,{params});
}

export const batchexportByid = (params={})=>{
	return http.get(api.batchexportByid,{params});
}

export const getOrderCode = (params = {}) => {
  return http.get(api.orderCode, {params});
}

