<template>
  <div>
    <!-- 筛选条件 -->
    <div class="screen-field">
      <el-form :model="form" ref="form" inline>
        <el-form-item prop="courseName" label="课程名称">
          <el-input v-model="form.courseName" clearable></el-input>
        </el-form-item>
        <el-form-item prop="status" label="上架状态">
          <el-select v-model="form.status" clearable>
            <el-option value="1" label="上架"></el-option>
            <el-option value="0" label="下架"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="loadCourses">查询</el-button>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        @click="$router.push({ name: 'course-create' })"
      >新增</el-button>
    </div>
    <el-card>
      <div slot="header">
        <span>查询结果</span>
      </div>
      <!-- 课程列表 -->
      <el-table :data="courses" v-loading="isLoading" style="width: 100%">
        <el-table-column type="index" label="编号"></el-table-column>
        <el-table-column prop="courseName" label="课程名称"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="sortNum" label="排序"></el-table-column>
        <el-table-column prop="status" label="上架状态">
          <template slot-scope="scope">
            <el-switch
              :disabled="scope.row.isStatusLoading"
              v-model="scope.row.status"
              @change="changeStatus(scope.row)"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button
              type="text"
              @click="$router.push({
                name: 'course-edit',
                params: { courseId: scope.row.id }
              })"
            >编辑</el-button>
            <el-button
              type="text"
              @click="$router.push({
                name: 'course-section',
                params: { courseId: scope.row.id }
              })"
            >内容管理</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        style="margin-top: 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :disabled="isLoading"
        :current-page.sync="form.currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="form.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getQueryCourses, changeState } from '@/services/course'

export default Vue.extend({
  name: 'CourseList',
  data () {
    return {
      form: {
        currentPage: 1,
        pageSize: 10,
        courseName: '',
        status: ''
      },
      total: 0,
      courses: [],
      isLoading: false
    }
  },
  created () {
    this.loadCourses()
  },
  methods: {
    async loadCourses () {
      try {
        this.isLoading = true
        const { data } = await getQueryCourses(this.form)
        if (data.code === '000000') {
          data.data.records.forEach((item: any) => {
            item.isStatusLoading = false
          })
          this.courses = data.data.records
          this.total = data.data.total
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },

    async changeStatus (course: any) {
      try {
        course.isStatusLoading = true
        const { data } = await changeState(course.id, course.status)
        if (data.code === '000000') {
          this.$message.success(`${course.status === 1 ? '上架' : '下架'}`)
        }
      } catch (error) {
        console.log(error)
      } finally {
        course.isStatusLoading = false
      }
    },

    handleSizeChange (val: number) {
      this.form.pageSize = val
      this.form.currentPage = 1
      this.loadCourses()
    },

    handleCurrentChange (val: number) {
      this.form.currentPage = val
      this.loadCourses()
    },
  }
})
</script>

<style lang="scss" scoped>
.screen-field {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
</style>
