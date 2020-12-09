<template>
  <el-form :model="form" ref="form">
    <el-form-item prop="name" label="角色名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item prop="code" label="角色编码">
      <el-input v-model="form.code"></el-input>
    </el-form-item>
    <el-form-item prop="description" label="角色描述">
      <el-input v-model="form.description"></el-input>
    </el-form-item>
    <el-form-item style="text-align: right">
      <el-button @click="$emit('cancel')">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { createOrEditRole, getRole } from '@/services/role'

export default Vue.extend({
  name: 'CreateOrEditRole',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    roleId: {
      type: Number,
    }
  },
  data () {
    return {
      form: {
        id: '',
        name: '',
        code: '',
        description: ''
      }
    }
  },
  created () {
    if (this.isEdit) this.loadRole()
  },
  methods: {
    async loadRole () {
      const { data } = await getRole(this.roleId)
      if (data.code === '000000') {
        this.form = data.data
      }
    },

    async onSubmit () {
      const { data } = await createOrEditRole(this.form)
      if (data.code === '000000') {
        this.$message.success('提交成功')
        this.$emit('success')
      }
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
