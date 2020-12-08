/**
 * 用户相关请求模块
 */
import request from '@/utils/request'

interface Role {
  code?: string;
  id?: number | string;
  name?: string;
  startCreateTime?: string;
  endCreateTime?: string;
  current?: number;
  size?: number;
}

export const getAllRoles = (data: Role) => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}

export const createOrEditRole = (data: Role) => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}

export const deleteRole = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`,
  })
}

export const getRole = (id: number) => {
  return request({
    method: 'GET',
    url: `/boss/role/${id}`
  })
}
