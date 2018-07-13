import {http, api} from '@/common/http/http.js';


// 活动列表数据
export const promoteList = (params = {}) => {
  return http.get(api.promoteList, {params});
}

// 创建活动
export const promoteAdd = (params = {}) => {
  return http.post(api.promoteAdd, params);
}
// 修改活动接口
export const promoteUpdate = (params = {}) => {
  return http.post(api.promoteUpdate, params);
}
// 查看活动接口
export const promoteInfo = (params = {}) => {
  return http.get(api.promoteInfo, {params});
}
// 删除活动接口
export const promoteDel = (params = {}) => {
  return http.get(api.promoteDel, {params});
}
// 检查活动名称接口
export const promoteCheckname = (params = {}) => {
  return http.get(api.promoteCheckname, {params});
}