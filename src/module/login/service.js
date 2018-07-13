import {http, api} from '@/common/http/http.js';
import  qs from 'qs';

export const getBrandRecommendList = (params = {}) => {
  return http.get(api.getbrandRecommendList, {params});
}

export const IMcheckIsRegister = (params = {}) => {
  return http.get(api.IMcheckIsRegister, {params});
}

export const delBrandRecommend = (params = {}) => {
  return http.get(api.delbrandRecommend+"/"+params.id);
}

export const login = (params = {}) => {
  return http.post(api.login, params);
}
export const logout = (params = {}) => {
  return http.post(api.logout, params);
}

export const getCheckcode = (params = {}) => {
  return http.post(api.getCheckcode, params);
}

export const getVcode = (params = {}) => {
 	return http.post(api.getVcode,qs.stringify(params),{
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	});
}
export const register = (params = {}) => {
 	return http.post(api.register,qs.stringify(params),{
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	});
}

//商家客服开关
export const isCheckService = (params = {}) => {
  return http.get(api.isCheckService, {params});
}

// 客服分配
export const IMdistribute = (params = {}) => {
  return http.get(api.IMdistribute, {params});
}



