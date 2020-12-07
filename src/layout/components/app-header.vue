<template>
  <div class="app-header">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 登录状态、退出 -->
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <el-avatar
          shape="square"
          :size="40"
          :src="user.portrait || require('@/assets/default-avatar.png')"
        ></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-plus">{{ user.userName }}</el-dropdown-item>
        <el-dropdown-item
          icon="el-icon-circle-plus"
          divided
          @click.native="handleLogout"
        >退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserInfo } from '@/services/user'

export default Vue.extend({
  name: 'AppHeader',
  data () {
    return {
      user: {}
    }
  },
  async created () {
    const { data } = await getUserInfo()
    this.user = data.content
  },
  methods: {
    handleLogout () {
      this.$confirm('确定退出？', '提示', {
        confirmButtonText: '退出',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('setUser', null)
        this.$router.push({ name: 'login' })
        this.$message({ type: 'success', message: '退出成功!' })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消退出' })
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.app-header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-dropdown {
    display: flex;
    align-items: center;
  }
}
</style>
