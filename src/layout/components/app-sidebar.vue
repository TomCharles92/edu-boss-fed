<template>
  <el-menu
    default-active="2"
    @open="handleOpen"
    @close="handleClose">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>权限管理</span>
      </template>
      <el-menu-item index="1-1">角色管理</el-menu-item>
      <el-menu-item index="1-1">菜单管理</el-menu-item>
      <el-menu-item index="1-1">资源管理</el-menu-item>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">课程管理</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-document"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">广告管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'AppSidebar',
  methods: {
    handleOpen (key: string, keyPath: string): void {
      console.log(key, keyPath)
    },
    handleClose (key: string, keyPath: string): void {
      console.log(key, keyPath)
    }
  }
})
</script>

<style lang="scss" scoped>
.el-menu {
  min-height: 100vh;
}
</style>
