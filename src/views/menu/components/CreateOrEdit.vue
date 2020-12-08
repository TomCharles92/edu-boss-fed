<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      {{ isEdit ? '编辑菜单' : '新增菜单' }}
    </div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="菜单名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="菜单路径">
        <el-input v-model="form.href"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单">
        <el-select v-model="form.parentId">
          <el-option label="无上级菜单" :value="-1"></el-option>
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in parentMenuList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="菜单图标">
        <el-input v-model="form.icon"></el-input>
      </el-form-item>
      <el-form-item label="是否显示">
        <el-radio-group v-model="form.shown">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number v-model="form.orderNum"></el-input-number>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button v-if="!isEdit">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getEditMenuInfo, createOrUpdateMenu } from '@/services/menu'

export default Vue.extend({
  name: 'CreateOrEdit',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      parentMenuList: [],
      form: {
        name: '11',
        href: '22',
        parentId: -1, // -1 表示没有父菜单
        description: '44',
        icon: '33',
        shown: true,
        orderNum: 0,
      }
    }
  },
  created () {
    this.loadMenuInfo()
  },
  methods: {
    async loadMenuInfo () {
      const { data } = await getEditMenuInfo(this.$route.params.id || -1)
      if (data.code === '000000') {
        this.form = data.data.menuInfo
        this.parentMenuList = data.data.parentMenuList
      }
    },

    async onSubmit () {
      const { data } = await createOrUpdateMenu(this.form)
      if (data.code === '000000') {
        this.$message.success('菜单提交成功')
        this.$router.push({ name: 'menu' })
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.box-card {
  width: 400px;
}
</style>
