<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="课程名称">
        <el-input v-model="form.courseName" disabled></el-input>
      </el-form-item>
      <el-form-item label="章节名称">
        <el-input v-model="form.sectionName"></el-input>
      </el-form-item>
      <el-form-item label="章节描述">
        <el-input v-model="form.description" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="章节排序">
        <el-input-number v-model="form.orderNum" :min="1"></el-input-number>
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
import { saveOrUpdateSection, getBySectionId } from '@/services/course-section'

export default Vue.extend({
  name: 'SectionCreateOrUpdate',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    course: {
      type: Object,
      default: null
    },
    sectionId: {
      type: [Number],
      default: 0
    }
  },
  async created () {
    if (this.isEdit) await this.loadSection()
    this.form.courseName = this.course.courseName
    this.form.courseId = this.course.id
  },
  data () {
    return {
      form: {
        courseId: '',
        courseName: '',
        id: '',
        sectionName: '',
        description: '',
        orderNum: 0
      }
    }
  },
  methods: {
    async loadSection () {
      const { data } = await getBySectionId(this.sectionId)
      this.form = Object.assign(this.form, data.data)
    },

    async onSave () {
      const { data } = await saveOrUpdateSection(this.form)
      if (data.code === '000000') {
        this.$message.success('添加章节成功')
        this.$emit('success')
      }
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
