/**
 * 用户相关请求模块
 */

import request from '@/utils/request'
import qs from 'qs'

interface LoginUser {
  phone: string;
  password: string;
}

interface User {
  currentPage?: number;
  pageSize?: number;
  phone?: string;
  userId?: number;
  startCreateTime?: string;
  endCreateTime?: string;
}

export const login = (data: LoginUser) => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo',
  })
}

export const getUserPages = (data: User) => {
  return request({
    method: 'POST',
    url: '/boss/user/getUserPages',
    data
  })
}

// 查询用户角色
export const getUserRole = (userId: number) => {
  return request({
    method: 'GET',
    url: `/boss/role/user/${userId}`
  })
}
