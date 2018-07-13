import {http, api} from '@/common/http/index.js';
import  qs from 'qs';
// console.log('api.IMgetRecentUsers----',api.IMgetRecentUsers)
// 说明请参考wiki：pageId=5374044
export const IMgetInfo = (params = {}) => {
    return http.get(api.IMgetInfo, {params});
  }

export const IMgetRecentUsers = (params = {}) => {
  return http.get(api.IMgetRecentUsers, {params});
}


export const IMgetToken = (params = {}) => {
  return http.get(api.IMgetToken, {params});
}

export const IMupdateInfo = (params = {}) => {
    return http.post(api.IMupdateInfo, params);
  }

  
export const IMsaveInfo = (params = {}) => {
  return http.post(api.IMsaveInfo, qs.stringify(params),	{headers:{
    'Content-Type':'application/x-www-form-urlencoded'
  }});
}
//获取和修改客服配置信息
export const IMgetConfigInfos = (params = {}) => {
  return http.get(api.IMgetConfigInfos, {params});
}
export const IMupdateAndAddConfigInfo = (params = {}) => {
  return http.post(api.IMupdateAndAddConfigInfo, params);
}
//获取聊天记录
export const IMgetHistory = (params = {}) => {
  return http.get(api.IMgetHistory, {params});
}

//批量删除快捷回复
export const IMdeleteQickReply = (params = {}) => {
  return http.post(api.IMdeleteQickReply, params);
}

//获取闪聊列表用户的头像和昵称等信息
export const IMgetUserAccountInfo = (params = {}) => {
  return http.get(api.IMgetUserAccountInfo, {params});
}

//商家客服开关
export const isCheckService = (params = {}) => {
  return http.get(api.isCheckService, {params});
}