import {
  http,
  api
} from '@/common/http/http.js';
import qs from 'qs';

export const getOrderAccountList = (params = {}) => {
  return http.get(api.getOrderAccountList, {
    params
  });
}
