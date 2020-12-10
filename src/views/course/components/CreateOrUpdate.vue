<template>
  <el-card>
    <!-- 步骤条 -->
    <div slot="header">
      <el-steps :active="activeStep" simple>
        <el-step
          v-for="(item, index) in steps"
          :key="index"
          @click.native="activeStep = index"
          :title="item.title"
          :icon="item.icon"
        ></el-step>
      </el-steps>
    </div>
    <!-- 将表单分为几块 -->
    <el-form label-position="left" label-width="100px" :model="course">
      <div v-show="activeStep === 0">
        <el-form-item prop="courseName" label="课程名称">
          <el-input v-model="course.courseName"></el-input>
        </el-form-item>
        <el-form-item prop="brief" label="课程简介">
          <el-input v-model="course.brief"></el-input>
        </el-form-item>
        <el-form-item prop="previewFirstField" label="课程概述">
          <el-input v-model="course.previewFirstField" type="textarea"></el-input>
          <el-input v-model="course.previewSecondField" type="textarea" style="margin-top: 15px"></el-input>
        </el-form-item>
        <el-form-item prop="teacherName" label="讲师姓名">
          <el-input v-model="course.teacherDTO.teacherName"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="讲师简介">
          <el-input v-model="course.teacherDTO.description"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="课程排序">
          <el-input-number v-model="course.sortNum"></el-input-number>
        </el-form-item>
      </div>
      <div v-show="activeStep === 1">
        <el-form-item label="课程封面">
          <CourseImage v-model="course.courseListImg" :limit="5" />
        </el-form-item>
        <el-form-item label="介绍封面">
          <CourseImage v-model="course.courseImgUrl" />
        </el-form-item>
      </div>
      <div v-show="activeStep === 2">
        <el-form-item prop="name" label="售卖价格">
          <el-input v-model="course.discounts"><template slot="append">元</template></el-input>
        </el-form-item>
        <el-form-item prop="name" label="商品原价">
          <el-input v-model="course.price"><template slot="append">元</template></el-input>
        </el-form-item>
        <el-form-item prop="name" label="销量">
          <el-input v-model="course.sales"><template slot="append">单</template></el-input>
        </el-form-item>
        <el-form-item prop="name" label="活动标签">
          <el-input v-model="course.discountsTag"></el-input>
        </el-form-item>
      </div>
      <div v-show="activeStep === 3">
        <el-form-item label="限时秒杀活动">
          <el-switch v-model="course.activityCourse" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <template v-if="course.activityCourse">
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="course.activityCourseDTO.beginTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="course.activityCourseDTO.endTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item prop="name" label="秒杀价">
            <el-input v-model="course.activityCourseDTO.amount"><template slot="append">元</template></el-input>
          </el-form-item>
          <el-form-item prop="name" label="秒杀库存">
            <el-input v-model="course.activityCourseDTO.stock"><template slot="append">个</template></el-input>
          </el-form-item>
        </template>
      </div>
      <div v-show="activeStep === 4">
        <el-form-item prop="status" label="是否上架">
          <el-switch
              v-model="course.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
        </el-form-item>
        <el-form-item prop="name" label="课程详情">
          <TextEditor v-model="course.courseDescriptionMarkDown" />
        </el-form-item>
      </div>
    </el-form>

    <footer>
      <el-button @click="activeStep++" v-if="activeStep < 4">下一步</el-button>
      <el-button type="primary" v-if="activeStep === 4" @click="onSave">保 存</el-button>
    </footer>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { saveOrUpdateCourse, getCourseById } from '@/services/course'
import CourseImage from './CourseImage.vue'
import TextEditor from '@/components/text-editor/index.vue'

export default Vue.extend({
  name: 'CreateOrUpdateCourse',
  components: { CourseImage, TextEditor },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    courseId: {
      type: [Number, String]
    }
  },
  data () {
    return {
      activeStep: 0,
      steps: [
        { title: '基本信息', icon: 'el-icon-edit' },
        { title: '课程封面', icon: 'el-icon-picture' },
        { title: '销售信息', icon: 'el-icon-upload' },
        { title: '秒杀活动', icon: 'el-icon-edit' },
        { title: '课程详情', icon: 'el-icon-edit' },
      ],
      course: {
        // id: 0,
        courseName: '',
        brief: '',
        teacherDTO: {
          // id: 0,
          // courseId: 0,
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          description: ''
        },
        courseDescriptionMarkDown: '',
        price: 0,
        discounts: 0,
        priceTag: '',
        discountsTag: '',
        isNew: true,
        isNewDes: '',
        courseListImg: '',
        courseImgUrl: '',
        sortNum: 0,
        previewFirstField: '',
        previewSecondField: '',
        status: 0,
        sales: 0,
        activityCourse: false,
        activityCourseDTO: {
          // id: 0,
          // courseId: 0,
          beginTime: '',
          endTime: '',
          amount: 0,
          stock: 0
        },
        autoOnlineTime: ''
      },
      isSecondKill: false,
    }
  },
  created () {
    if (this.isEdit) {
      this.loadCourse()
    }
  },
  methods: {
    async loadCourse () {
      const { data } = await getCourseById(this.courseId)
      this.course = data.data
    },

    async onSave () {
      const { data } = await saveOrUpdateCourse(this.course)
      console.log(data)
      if (data.code === '000000') {
        this.$router.push({ name: 'course' })
      }
    },
  }
})
</script>

<style lang="scss" scoped>

</style>
