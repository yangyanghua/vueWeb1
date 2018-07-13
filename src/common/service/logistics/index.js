import {http, api} from '@/common/http/http.js';


// 常用基本接口参数ids，逗号隔开

// 查询运费模板列表：说明请参考wiki：pageId=3245177
export const templateList = (params = {}) => {
  return http.post(api.templateList, params);
}
// 物流模版删除：说明请参考wiki：pageId=3245808
export const templateDelete = (params = {}) => {
  return http.post(api.templateDelete, params);
}
// 物流模版复制：说明请参考wiki：pageId=3735642
export const templateCopy = (params = {}) => {
  return http.post(api.templateCopy, params);
}
// 物流模版取单个模板信息：说明请参考wiki：pageId=3735795
export const templategetById = (params = {}) => {
return http.post(api.templategetById, params);
}
// 物流模版小项用ID
export const templateItemById = (params = {}) => {
return http.get(api.templateItemById, {params});
}

// 物流模版新增：说明请参考wiki：pageId=3245783
export const templateAdd = (params = {}) => {
  return http.post(api.templateAdd, params);
}
// 物流模版修改：说明请参考wiki：pageId=3245803
export const templateUpdate = (params = {}) => {
  return http.post(api.templateUpdate, params);
}

// 自提地址列表：说明请参考wiki：pageId=3245831
export const addressList = (params = {}) => {
  return http.post(api.addressList, params);
}
// 自提地址删除：说明请参考wiki：pageId=3245839
export const addressDelete = (params = {}) => {
  return http.post(api.addressDelete, params);
}
//自提地址新增/修改：说明请参考wiki：pageId=3245839
export const addressSave = (params = {}) => {
  return http.post(api.addressSave, params);
}



