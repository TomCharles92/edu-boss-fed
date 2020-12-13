<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="课程名称">
        <el-input v-model="lession.courseName" disabled></el-input>
      </el-form-item>
      <el-form-item label="章节名称">
        <el-input v-model="lession.sectionName" disabled></el-input>
      </el-form-item>
      <el-form-item label="课时名称">
        <el-input v-model="lession.theme"></el-input>
      </el-form-item>
      <el-form-item label="时长">
        <el-input v-model.number="lession.duration">
          <template slot="append">分钟</template>
        </el-input>
      </el-form-item>
      <el-form-item label="是否开放试听">
        <el-switch
          v-model="lession.isFree"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="课时排序">
        <el-input-number v-model="lession.orderNum"></el-input-number>
      </el-form-item>
    </el-form>
    <div style="text-align: center;">
      <el-button @click="$emit('cancel')">取消</el-button>
      <el-button type="primary" @click="onSave">保存</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { saveOrUpdateLession, getByLessionId } from '@/services/course-section'

export default Vue.extend({
  name: 'LessionCreateOrUpdate',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    sessionInfo: {
      type: Object,
      default: null
    },
    lessionId: {
      type: Number
    }
  },
  data () {
    return {
      lession: {
        courseId: 0,
        courseName: '',
        sectionId: 0,
        sectionName: '',
        id: null,
        theme: '',
        duration: 0,
        isFree: true,
        orderNum: 0,
        status: 0
      }
    }
  },
  async created () {
    if (this.isEdit) await this.loadLession()
    for (const [key, value] of Object.entries(this.sessionInfo)) {
      (this.lession as any)[key] = value
    }
  },
  methods: {
    async loadLession () {
      const { data } = await getByLessionId(this.lessionId)
      this.lession = Object.assign(this.lession, data.data)
    },

    async onSave () {
      await saveOrUpdateLession(this.lession)
      if (!this.isEdit) this.$message.success('添加课时成功')
      else this.$message.success('编辑课时成功')
      this.$emit('success')
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
