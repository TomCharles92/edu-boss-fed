<template>
  <div>
    <el-card>
      <!-- <div slot="header">User</div> -->
      <!-- 用户列表 -->
      <el-table :data="users" v-loading="isLoading">
        <el-table-column type="index" label="编号"></el-table-column>
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="createTime" label="注册时间">
          <template v-slot="scope">{{ format(scope.row.createTime) }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="text" @click="allotRole(scope.row.id)">分配角色</el-button>
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

      <!-- 分配角色 -->
      <el-dialog
        title="分配角色"
        :visible.sync="dialogVisible"
        width="50%">
        <!-- 多选框 -->
        <el-select v-model="roleIdList" multiple placeholder="请选择">
          <el-option
            v-for="item in roles"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSave">保 存</el-button>
        </span>
      </el-dialog>

    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserPages, getUserRole } from '@/services/user'
import { getAllRoles, allocateUserRoles } from '@/services/role'
import dayjs from 'dayjs'

export default Vue.extend({
  name: 'UserIndex',
  data () {
    return {
      form: {
        currentPage: 1,
        pageSize: 10,
        phone: '',
        // userId: 0,
        startCreateTime: '',
        endCreateTime: ''
      },
      total: 0,
      isLoading: false,
      users: [],
      dialogVisible: false,
      userId: 0,
      roles: [],
      roleIdList: []
    }
  },
  created () {
    this.loadUserPage()
    this.loadAllRoles()
  },
  methods: {
    async loadUserPage () {
      try {
        this.isLoading = true
        const { data } = await getUserPages(this.form)
        if (data.code === '000000') {
          this.users = data.data.records
          this.total = data.data.total
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },

    async loadAllRoles () {
      const { data } = await getAllRoles({})
      if (data.code === '000000') {
        this.roles = data.data.records
      }
    },

    handleSizeChange (val: number) {
      this.form.pageSize = val
      this.form.currentPage = 1
      this.loadUserPage()
    },

    handleCurrentChange (val: number) {
      this.form.currentPage = val
      this.loadUserPage()
    },

    format (createTime: string) {
      return dayjs(createTime).format('YYYY-MM-DD HH:mm:ss')
    },

    // 分配角色
    async allotRole (id: number) {
      this.userId = id
      this.dialogVisible = true

      const { data } = await getUserRole(this.userId)
      if (data.code === '000000') {
        this.roleIdList = []
        for (const { id } of data.data) {
          this.roleIdList.push(id as never)
        }
      }
    },

    async onSave () {
      const { data } = await allocateUserRoles(this.userId, this.roleIdList)
      if (data.code === '000000') {
        this.$message.success('分配角色成功')
        this.dialogVisible = false
      }
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
