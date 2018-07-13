import {http, api} from '@/common/http/http.js';

// 查询商品类目一二三级查询：说明请参考wiki：pageId=3245903
export const goodsCategoryList = (params = {}) => {
  return http.get(api.goodsCategoryList, {params});
}
// 商品最近使用类目查询
export const goodsRecentCategory = (params = {}) => {
  return http.get(api.goodsRecentCategory, {params});
};

// 商品类目关键字查询
export const goodsKeyCategory = (params = {}) => {
  return http.get(api.goodsKeyCategory, {params});
}
//商品创建时查询当前类目下的属性规格等相关信息
export const goodsToCreate = (params = {}) => {
  return http.get(api.goodsToCreate, {params});
}
//商品创建后保存
export const goodsSave = (params = {}) => {
  return http.post(api.goodsSave, params);
}

//品牌下拉选项搜索接口
export const brandList = (params = {}) => {
  return http.post(api.brandList, params);
}

//商品详情查询
export const goodsDetail = (params = {}) => {
  return http.get(api.goodsDetail, {params});
}
//企业贴息信息是否完善查询
export const subsidyValid = (params = {}) => {
  return http.get(api.subsidyValid, {params});
}
