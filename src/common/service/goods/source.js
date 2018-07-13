import {http, api} from '@/common/http/http.js';

// 溯源信息详情获取：id-溯源记录id，productId-商品id，两者必须有一个
export const sourceInfo = (params = {}) => {
	return http.get(api.sourceInfo, {params});
}

// 新增溯源信息 
export const sourceAdd = (params = {}) => {
	return http.post(api.sourceAdd, params);
}

// 更新溯源信息
export const sourceUpdate = (params = {}) => {
	return http.post(api.sourceUpdate, params);
}

// 根据码值下载码图
export const sourceDownCode = (params = {}) => {
	return http.get(api.sourceDownCode, {params});
}

// 下载该账号下所有商品码图
export const sourceDownAllCode = (params = {}) => {
	return http.get(api.sourceDownAllCode, {params});
}

// 根据商品id下载码图
export const sourceDownGoodsCode = (params = {}) => {
	return http.get(api.sourceDownGoodsCode, {params});
}

// 查看码图
export const viewCode = (params = {}) => {
	return http.get(api.viewCode, {params});
}
// 查看码值列表
export const viewCodeList = (params = {}) => {
	return http.get(api.goodsBindCodeList, {params});
}
// 检查码值是否可用
export const checkCode = (params = {}) => {
	return http.get(api.goodsBindCodeCheck, {params});
}