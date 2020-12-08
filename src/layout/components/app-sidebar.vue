<template>
  <el-menu
    :default-active="currentRoute"
    @open="handleOpen"
    @close="handleClose"
    router
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>权限管理</span>
      </template>
      <el-menu-item index="/role">角色管理</el-menu-item>
      <el-menu-item index="/menu">菜单管理</el-menu-item>
      <el-menu-item index="/resource">资源管理</el-menu-item>
    </el-submenu>
    <el-menu-item index="/course">
      <i class="el-icon-menu"></i>
      <span slot="title">课程管理</span>
    </el-menu-item>
    <el-menu-item index="/user">
      <i class="el-icon-document"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-menu-item index="/advert">
      <i class="el-icon-setting"></i>
      <span slot="title">广告管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'AppSidebar',
  computed: {
    currentRoute () {
      return this.$route.fullPath
    }
  },
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
