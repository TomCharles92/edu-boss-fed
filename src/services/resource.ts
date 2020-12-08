/**
 * 资源相关请求模块
 */
import request from '@/utils/request'

export interface Resource {
  id?: number;
  name?: string;
  startCreateTime?: string;
  url?: string;
  categoryId?: number | string;
  endCreateTime?: string;
  current?: number;
  size?: number;
}

export const getAllResources = (data: Resource) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

export const getAllResourceCategories = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}
