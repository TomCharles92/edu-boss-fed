<template>
  <el-card>
    <div slot="header">分配菜单</div>

    <!-- 树形菜单 -->
    <el-tree
      ref="tree"
      :data="menuNodeList"
      :props="defaultProps"
      node-key="id"
      show-checkbox
      default-expand-all
      :default-checked-keys="checkedKeys"
    ></el-tree>

    <!-- 按钮 -->
    <div style="text-align: center;">
      <el-button @click="reset">重置</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </div>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getMenuNodeList, getRoleMenus, allocateRoleMenus, Menu } from '@/services/menu'
import { Tree } from 'element-ui'

export default Vue.extend({
  name: 'AllotMenu',
  props: {
    roleId: {
      type: [String, Number]
    }
  },
  data () {
    return {
      menuNodeList: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      checkedKeys: [], // 已选中的 key
    }
  },
  created () {
    this.loadMenuNodeList()
    this.loadRoleMenus()
  },
  methods: {
    async loadMenuNodeList () {
      const { data } = await getMenuNodeList()
      this.menuNodeList = data.data
    },

    async loadRoleMenus () {
      const { data: { data } } = await getRoleMenus(this.roleId)
      const arr: never[] = []
      data.forEach((item: Menu) => {
        if (item.selected) {
          arr.push(item.id as never)
        }
        if (item.subMenuList && item.subMenuList.selected) {
          arr.push(item.subMenuList.id as never)
        }
      })
      this.checkedKeys = arr
    },

    reset () {
      (this.$refs.tree as Tree).setCheckedKeys([])
    },

    async handleSave () {
      const menuIdList = (this.$refs.tree as Tree).getCheckedKeys()
      const { data } = await allocateRoleMenus(this.roleId, menuIdList)
      if (data.code === '000000') {
        this.$message.success('提交成功')
        this.$router.push({ name: 'role' })
      }
    },
  }
})
</script>

<style lang="scss" scoped>

</style>
