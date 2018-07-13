import {http, api} from '@/common/http/http.js';

// 查询商品列表：说明请参考wiki：pageId=3245618
export const queryGoodsList = (params = {}) => {
  return http.post(api.goodsList, params);
}
// 查询商品上、下架数量：说明请参考wiki：pageId=3735585
export const queryGoodsCount = (params = {}) => {
  return http.post(api.goodsCount, params);
};

// 上下架商品: 说明请参考wiki：3245334
export const setGoodsUp = (params = {}) => {
  return http.post(api.goodsUp, params);
}
export const setGoodsDown = (params = {}) => {
  return http.post(api.goodsDown, params);
}
// 删除商品: 说明请参考wiki：3245385
export const deleteGoods = (params = {}) => {
  return http.post(api.goodsDel, params);
}
//
export const getGoodsStockAttrs = (params = {}) => {
  return http.get(api.goodsStockAttrs, {params});
}
//
export const goodsBindCode = (params = {}) => {
  return http.post(api.goodsBindCode, params);
}
//企业贴息信息是否完善查询
export const subsidyValid = (params = {}) => {
  return http.get(api.subsidyValid, {params});
}

export const saveInventory = (params = {}) => {
  return http.get(api.saveInventory, {params});
}


