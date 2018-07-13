import {http, api} from '@/common/http/http.js';

export const getBrandRecommendList = (params = {}) => {
  return http.get(api.getbrandRecommendList, {params});
}

export const delBrandRecommend = (params = {}) => {
  return http.get(api.delbrandRecommend+"/"+params.id);
}

export const addBrandRecommend = (params = {}) => {
  return http.post(api.addbrandRecommend, params);
}


export const updateBrandRecommend = (params = {}) => {
  return http.post(api.updatebrandRecommend, params);
}

export const findBrandRecommendById = (params = {}) => {
  return http.get(api.brandRecommendUrl+"/"+params.id);
}

export const getstoreList = (params = {}) => {
  return http.get(api.getstoreList, {params});
}
