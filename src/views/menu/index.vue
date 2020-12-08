<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-button @click="$router.push({ name: 'menu-create' })">新增菜单</el-button>
    </div>

    <el-table :data="menus" style="width: 100%">
      <el-table-column type="index" label="编号"></el-table-column>
      <el-table-column prop="name" label="菜单名称"></el-table-column>
      <el-table-column prop="level" label="菜单级数"></el-table-column>
      <el-table-column prop="icon" label="前端图标"></el-table-column>
      <el-table-column prop="orderNum" label="排序"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllMenus, deleteMenu } from '@/services/menu'

export default Vue.extend({
  name: 'MenuIndex',
  data () {
    return {
      menus: []
    }
  },
  created () {
    this.loadAllMenus()
  },
  methods: {
    async loadAllMenus () {
      const { data } = await getAllMenus()
      if (data.code === '000000') {
        this.menus = data.data
      }
    },

    handleEdit (id: number) {
      this.$router.push({
        name: 'menu-edit',
        params: { id: id.toString() }
      })
    },

    handleDelete (id: number) {
      this.$confirm('确认删除吗？', '删除提示', {})
        .then(async () => {
          const { data } = await deleteMenu(id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadAllMenus()
          }
        })
        .catch(err => {
          console.log(err)
          this.$message.info('已取消删除')
        })
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
