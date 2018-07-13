import {http, api} from '@/common/http/http.js';


// 常用基本接口参数ids，逗号隔开

// 查询指定账户：说明请参考wiki：pageId=3245374
export const managementFind = (params = {}) => {
  return http.get(api.managementFind, {params});
}
// 查询账户列表：说明请参考wiki：pageId=3245374
export const managementList = (params = {}) => {
  return http.get(api.managementList, {params});
}

// 删除账户：说明请参考wiki：pageId=3245374
export const managementDelete = (params = {}) => {
  return http.get(api.managementDelete, {params});
}
// 禁用账户：说明请参考wiki：pageId=3245374
export const managementDisable = (params = {}) => {
  return http.get(api.managementDisable, {params});
}
//开启账户：说明请参考wiki：pageId=3245374
export const managementIsable = (params = {}) => {
  return http.get(api.managementIsable, {params});
}
// 新增、编辑：说明请参考wiki：pageId=3245374
export const managementSave = (params = {}) => {
  return http.post(api.managementSave, params);
}
// 修改密码：说明请参考wiki：pageId=3245374
export const passwordUpdate = (params = {}) => {
  return http.get(api.passwordUpdate, {params});
}

// 查看指定企业信息：说明请参考wiki：pageId=3245374
export const entInfo = (params = {}) => {
  return http.get(api.entInfo, {params});
}
// 修改指定企业信息：说明请参考wiki：pageId=3245374
export const entUpdate = (params = {}) => {
  return http.post(api.entUpdate, params);
}

//获取验证码
export const getCheckcode = (params = {}) => {
  return http.get(api.getCheckcode, {params});
}


//建行支付

//获取详情
export const ccbGet = (params = {}) => {
  return http.get(api.ccbGet, {params});
}

//编辑修改
export const ccbEdit = (params = {}) => {
  return http.post(api.ccbEdit, params);
}

//店铺贴息  编辑修改
export const subsidyEdit = (params = {}) => {
  return http.post(api.subsidyEdit, params);
}
//店铺贴息  获取贴息详情
export const subsidyGet = (params = {}) => {
  return http.get(api.subsidyGet, {params});
}

//弹窗 验证银行填写信息
export const ccbValid = (params = {}) => {
  return http.get(api.ccbValid, {params});
}

//商家客服开关
export const isCheckService = (params = {}) => {
  return http.get(api.isCheckService, {params});
}