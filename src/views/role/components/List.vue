<template>
  <div>
    <el-card>
      <div slot="header">
        <el-button @click="createRole">新增角色</el-button>
      </div>
      <!-- 角色列表 -->
      <el-table :data="roles" v-loading="isLoading">
        <el-table-column type="index" label="编号"></el-table-column>
        <el-table-column prop="name" label="角色名称"></el-table-column>
        <el-table-column prop="description" label="角色描述"></el-table-column>
        <el-table-column prop="createdTime" label="创建时间">
          <template v-slot="scope">{{ scope.row.createdTime | dateF }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <div class="center">
              <el-button
                type="text"
                @click="$router.push({
                    name: 'allot-menu',
                    params: { roleId: scope.row.id }
                  })"
              >分配菜单</el-button>
              <el-button type="text">分配资源</el-button>
            </div>
            <div class="center">
              <el-button type="text" @click="editRole(scope.row.id)">编辑</el-button>
              <el-button type="text" @click="delRole(scope.row.id)">删除</el-button>
            </div>
          </template>
        </el-table-column>
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

      <!-- 新增角色、编辑角色 -->
      <el-dialog
        :title="isEdit ? '编辑角色' : '新增角色'"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
        <CreateOrEdit
          v-if="dialogVisible"
          @success="handleSuccess"
          @cancel="dialogVisible = false"
          :isEdit="isEdit"
          :roleId="roleId"
        />
      </el-dialog>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllRoles, deleteRole } from '@/services/role'
import CreateOrEdit from './CreateOrEdit.vue'

export default Vue.extend({
  name: 'RoleList',
  components: { CreateOrEdit },
  data () {
    return {
      form: {
        name: '',
        current: 1,
        size: 10
      },
      roles: [],
      total: 0,
      isLoading: false,
      dialogVisible: false,
      isEdit: false,
      roleId: 0
    }
  },
  created () {
    this.loadAllRoles()
  },
  methods: {
    async loadAllRoles () {
      try {
        this.isLoading = true
        const { data } = await getAllRoles(this.form)
        if (data.code === '000000') {
          this.roles = data.data.records
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
      this.loadAllRoles()
    },

    handleCurrentChange (val: number) {
      this.form.current = val
      this.loadAllRoles()
    },

    handleClose (done: Function) {
      this.$confirm('确认关闭？')
        .then(() => {
          done()
        })
        .catch((error) => {
          console.log(error)
        })
    },

    createRole () {
      this.dialogVisible = true
      this.isEdit = false
    },

    editRole (id: number) {
      this.dialogVisible = true
      this.isEdit = true
      this.roleId = id
    },

    handleSuccess () {
      this.dialogVisible = false
      this.loadAllRoles()
    },

    delRole (id: number) {
      this.$confirm('确定删除吗？', '角色删除', {})
        .then(async () => {
          const { data } = await deleteRole(id)
          if (data.code === '000000') {
            this.$message.success('角色删除成功')
            this.loadAllRoles()
          }
        })
        .catch(err => {
          console.log(err)
          this.$message.info('已取消删除')
        })
    },

  }
})
</script>

<style lang="scss" scoped>
.center {
  text-align: center;
}
</style>
