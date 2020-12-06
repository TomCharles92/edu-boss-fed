<template>
  <el-container class="layout">
    <el-aside width="200px"><Siderbar /></el-aside>
    <el-container>
      <el-header><Header /></el-header>
      <el-main>
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Siderbar from './components/app-sidebar.vue'
import Header from './components/app-header.vue'
export default Vue.extend({
  name: 'LayoutIndex',
  components: { Siderbar, Header }
})
</script>

<style lang="scss" scoped>
.layout {
  min-width: 1100px;
}

.el-header {
  background-color: #fff;
}

.el-aside {
  background-color: #D3DCE6;
  height: 100vh;
}

.el-main {
  background-color: #E9EEF3;
}
</style>
