import {http, api} from '@/common/http/http.js';


// 常用基本接口参数ids，逗号隔开

// 获取展示的总数据  说明请参考wiki：pageId=3245189
export const getIndexTotalData = (params = {}) => {
  return http.get(api.getIndexTotalData, {params});
}
// 获取待处理事务 
export const getPreHandleData = (params = {}) => {
  return http.get(api.getPreHandleData, {params});
}
//公告列表
export const noticeList = (params = {}) => {
  return http.get(api.noticeList, {params});
}
//公告详细
export const noticeInfo = (params = {}) => {
  return http.get(api.noticeInfo, {params});
}
//闪购商学院列表
export const businessSchoolList = (params = {}) => {
  return http.get(api.businessSchoolList, {params});
}
//闪购商学院详细
export const businessSchoolInfo = (params = {}) => {
  return http.get(api.businessSchoolInfo, {params});
}
//获取店铺头像和名字
export const storeInfo = (params = {}) => {
  return http.get(api.storeInfo, {params});
}
//订单统计
export const getOrderNumByDate = (params = {}) => {
  return http.get(api.getOrderNumByDate, {params});
}
//销售统计
export const getOrderSalesNumByDate = (params = {}) => {
  return http.get(api.getOrderSalesNumByDate, {params});
}

//弹窗 验证银行填写信息
export const EntcheckEntMsg = (params = {}) => {
  return http.get(api.EntcheckEntMsg, {params});
}