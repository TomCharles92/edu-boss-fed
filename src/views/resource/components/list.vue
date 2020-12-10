<template>
  <el-card>
    <!-- 筛选条件 -->
    <div slot="header">
      <el-form :model="form" ref="form" inline>
        <el-form-item prop="name" label="资源名称">
          <el-input v-model="form.name" clearable></el-input>
        </el-form-item>
        <el-form-item prop="url" label="资源路径">
          <el-input v-model="form.url" clearable></el-input>
        </el-form-item>
        <el-form-item prop="categoryId" label="资源分类">
          <el-select v-model="form.categoryId" clearable>
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in categories"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="isLoading" type="primary" @click="loadAllResources">查询</el-button>
          <el-button :disabled="isLoading" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 资源列表 -->
    <el-table :data="resources" v-loading="isLoading" style="width: 100%">
      <el-table-column type="index" label="编号"></el-table-column>
      <el-table-column prop="name" label="资源名称"></el-table-column>
      <el-table-column prop="url" label="资源路径"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column prop="updatedTime" label="更新时间">
        <template v-slot="scope">{{ scope.row.updatedTime | dateF }}</template>
      </el-table-column>
      <el-table-column prop="date" label="操作"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      style="margin-top: 20px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :disabled="isLoading"
      :current-page.sync="form.current"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="form.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllResources, getAllResourceCategories } from '@/services/resource'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'ResourcesList',
  data () {
    return {
      form: {
        name: '',
        url: '',
        categoryId: '',
        current: 1,
        size: 10,
      },
      total: 0,
      resources: [],
      categories: [],
      isLoading: false
    }
  },
  created () {
    this.loadAllResources()
    this.loadAllResourceCategories()
  },
  methods: {
    async loadAllResourceCategories () {
      const { data } = await getAllResourceCategories()
      if (data.code === '000000') {
        this.categories = data.data
      }
    },

    async loadAllResources () {
      try {
        this.isLoading = true
        const { data } = await getAllResources(this.form)
        if (data.code === '000000') {
          this.resources = data.data.records
          this.total = data.data.total
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },

    handleSizeChange (val: number) {
      this.form.size = val
      this.form.current = 1
      this.loadAllResources()
    },

    handleCurrentChange (val: number) {
      this.form.current = val
      this.loadAllResources()
    },

    reset () {
      (this.$refs.form as Form).resetFields()
      this.loadAllResources()
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
