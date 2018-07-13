import {http, api} from '@/common/http/http.js';

export const storeInfo = (params = {}) => {
  return http.get(api.storeInfo, {params});
}

export const storeSave = (params = {}) => {
  return http.post(api.storeSave, params);
}

export const getStoreCategory = (params = {}) => {
  return http.get(api.getStoreCategory, {params});
}

export const storeAddCategory = (params = {}) => {
  return http.post(api.storeAddCategory, params);
}

export const storeDelCategory = (params = {}) => {
  return http.get(api.storeDelCategory+params, {params});
}
export const categorySort = (params = {}) => {
  return http.post(api.categorySort, params);
}

export const getCategoryProduct = (params = {}) => {
  return http.post(api.getCategoryProduct, params);
}
export const addUpdateProduct = (params = {}) => {
  return http.post(api.addUpdateProduct, params);
}
export const getStoreCanChiose = (params = {}) => {
  return http.post(api.getStoreCanChiose, params);
}
export const getStoreChiosedPro = (params = {}) => {
  return http.post(api.getStoreChiosedPro, params);
}
export const chioseProUpdate = (params = {}) => {
  return http.post(api.chioseProUpdate, params);
}

export const getStoreTemplate = (params = {}) => {
  return http.post(api.getStoreTemplate, params);
}

export const storeUpdateCategory = (params = {}) => {
  return http.post(api.storeUpdateCategory, params);
}
