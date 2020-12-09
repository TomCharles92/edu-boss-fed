/**
 * 菜单相关请求模块
 */

import request from '@/utils/request'

export interface Menu {
  id?: number;
  name: string;
  href: string;
  parentId: number;
  description?: string;
  icon?: string;
  shown?: boolean;
  orderNum?: number;
  selected?: boolean;
  subMenuList?: Menu;
}

export const createOrUpdateMenu = (data: Menu) => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

export const getEditMenuInfo = (id: string | number = -1) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}

export const getAllMenus = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}

export const deleteMenu = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}

export const getMenuNodeList = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getMenuNodeList'
  })
}

export const getRoleMenus = (roleId: number | string) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getRoleMenus',
    params: {
      roleId
    }
  })
}

export const allocateRoleMenus = (roleId: number | string, menuIdList: Array<number>) => {
  return request({
    method: 'POST',
    url: '/boss/menu/allocateRoleMenus',
    data: {
      roleId,
      menuIdList
    }
  })
}
