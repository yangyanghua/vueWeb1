// import { http, api, httpService } from '@/common/http/index.js';
import { http, api } from '@/common/http/http.js';
import qs from 'qs';


export const getRefundInfo = (params = {}) => {
  return http.get(api.getRefundInfo, { params });
}

export const getLogistics = (params = {}) => {
  return http.get(api.getLogistics, { params });
}

export const getLogisticsResume = (params = {}) => {
  return http.get(api.getLogisticsResume, { params });
}

export const trailExpress = (params = {}) => { 
  return http.get(api.trailExpress, { params });
}


export const getConsultList = (params = {}) => {
  return http.get(api.getConsultList, { params });
}

export const confirmPassRefund = (params = {}) => {
  return http.get(api.confirmPassRefund, { params });
}

export const setCloseRefund = (params = {}) => {
  return http.get(api.setCloseRefund, { params });
}

export const rejectGoods = (params = {}) => {
  return http.get(api.rejectGoods, { params });
}

export const exportRefundList = (params = {}) => {
  return http.get(api.exportRefundList, { params });
}

export const getStoreRefundResume = (params = {}) => {
  return http.get(api.getStoreRefundResume, { params });
}

export const getRefundList = (params = {}) => {
  return http.post(api.getRefundList, params);
}

export const agreeAndSendAddr = (params = {}) => {
  return http.post(api.agreeAndSendAddr, qs.stringify(params), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

export const passRefund = (params = {}) => {
  return http.post(api.passRefund, qs.stringify(params), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

export const refuseRefund = (params = {}) => {
  return http.post(api.refuseRefund, qs.stringify(params), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}



// export const getRefundList = (params = {}) => {
//   return http.post(api.getRefundList, qs.stringify(params), {
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//   });
// }