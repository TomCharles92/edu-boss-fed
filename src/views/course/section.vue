<template>
  <el-card>
    <div slot="header">
      <span>{{ course.courseName }}</span>
      <el-button type="primary" @click="addSection">添加阶段</el-button>
    </div>
    <el-tree
      :data="sections"
      :props="defaultProps"
      draggable
      :expand-on-click-node="false"
      :allow-drop="handleAllowDrop"
      @node-drop="handleSort"
    >
      <div class="node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <!-- section -->
        <span v-if="data.sectionName">
          <el-button @click="editSection(data)">编辑</el-button>
          <el-button type="primary" @click="addLession(data)">添加课时</el-button>
          <el-select
            v-model="data.status"
            @change="changeSectionStatus(data)"
            style="margin-left: 10px; width: 100px;"
          >
            <el-option label="已隐藏" :value="0"></el-option>
            <el-option label="待更新" :value="1"></el-option>
            <el-option label="已发布" :value="2"></el-option>
          </el-select>
        </span>
        <!-- lession -->
        <span v-else>
          <el-button @click="editLession(data, node)">编辑</el-button>
          <el-button type="success" @click="$router.push({
            name: 'course-video',
            params: { courseId },
            query: {
              sectionId: data.sectionId,
              lessonId: data.id
            }
          })">上传视频</el-button>
          <el-select
            v-model="data.status"
            @change="changeLessionStatus(data)"
            style="margin-left: 10px; width: 100px;"
          >
            <el-option label="已隐藏" :value="0"></el-option>
            <el-option label="待更新" :value="1"></el-option>
            <el-option label="已发布" :value="2"></el-option>
          </el-select>
        </span>
      </div>
    </el-tree>

    <!-- 添加、编辑阶段 -->
    <el-dialog
      :title="isSectionEdit ? '编辑阶段': '添加阶段'"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <SectionCreateOrUpdate
        v-if="dialogVisible"
        :course="course"
        :isEdit="isSectionEdit"
        :sectionId="sectionId"
        @success="handleSectionSuccess"
        @cancel="dialogVisible = false"
      />
    </el-dialog>

    <!-- 添加、编辑课时 -->
    <el-dialog
      :title="isSectionEdit ? '编辑课时': '添加课时'"
      :visible.sync="dialogVisible2"
      width="50%"
    >
      <LessionCreateOrUpdate
        v-if="dialogVisible2"
        :isEdit="isLessionEdit"
        :sessionInfo="sessionInfo"
        :lessionId="lessionId"
        @success="handleLessionSuccess"
        @cancel="dialogVisible2 = false"
      />
    </el-dialog>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getCourseById } from '@/services/course'
import { getSectionAndLesson, saveOrUpdateSection, saveOrUpdateLession } from '@/services/course-section'
import SectionCreateOrUpdate from './components/SectionCreateOrUpdate.vue'
import LessionCreateOrUpdate from './components/LessionCreateOrUpdate.vue'

export default Vue.extend({
  name: 'CourseSection',
  components: { SectionCreateOrUpdate, LessionCreateOrUpdate },
  props: {
    courseId: {
      type: [Number, String]
    }
  },
  data () {
    return {
      course: {
        id: 0,
        courseName: ''
      },
      sections: [],
      defaultProps: {
        children: 'lessonDTOS',
        label: (data: any) => {
          if (data.sectionName) return data.sectionName
          else if (data.theme) return data.theme
        }
      },
      dialogVisible: false,
      isSectionEdit: false,
      sectionId: 0,
      dialogVisible2: false,
      isLessionEdit: false,
      lessionId: 0,
      sessionInfo: {}
    }
  },
  created () {
    this.loadCourse()
    this.loadSectionAndLesson()
  },
  methods: {
    async loadCourse () {
      const { data } = await getCourseById(this.courseId)
      this.course = data.data
    },

    async loadSectionAndLesson () {
      const { data } = await getSectionAndLesson(this.courseId)
      this.sections = data.data
    },

    handleAllowDrop (draggingNode: any, dropNode: any, type: any) {
      // draggingNode 拖动的节点
      // dropNode 放置的目标节点
      // type: 'prev', ’inner‘, 'next' 表示前面、里面、后面
      return draggingNode.data.sectionId === dropNode.data.sectionId &&
      type !== 'inner'
    },

    // 修改排序
    async handleSort (draggingNode: any, dropNode: any) {
      // draggingNode: any, dropNode: any, type: any, event: Function
      try {
        this.$message.success('排序成功')
        await Promise.all(dropNode.parent.childNodes.map((item: any, index: number) => {
          if (draggingNode.data.lessonDTOS) {
            // 阶段
            return saveOrUpdateSection({ id: item.data.id, orderNum: index + 1 })
          } else {
            // 课时
            return saveOrUpdateLession({ id: item.data.id, orderNum: index + 1 })
          }
        }))
      } catch (error) {
        console.log(error)
        this.$message.error('排序失败')
      }
    },

    async changeSectionStatus (section: any) {
      await saveOrUpdateSection(section)
      this.$message.success('状态更新成功')
    },

    // 添加阶段
    addSection () {
      this.dialogVisible = true
      this.isSectionEdit = false
    },

    editSection (data: any) {
      this.dialogVisible = true
      this.isSectionEdit = true
      this.sectionId = data.id
    },

    handleSectionSuccess () {
      this.dialogVisible = false
      this.loadSectionAndLesson()
    },

    async changeLessionStatus (lession: any) {
      await saveOrUpdateLession(lession)
      this.$message.success('状态更新成功')
    },

    // 添加课时
    addLession (data: any) {
      this.sessionInfo = {
        courseId: this.course.id,
        courseName: this.course.courseName,
        sectionId: data.id,
        sectionName: data.sectionName
      }
      this.dialogVisible2 = true
      this.isLessionEdit = false
    },

    editLession (data: any) {
      this.sessionInfo = {
        courseId: this.course.id,
        courseName: this.course.courseName,
        sectionId: data.sectionId,
        // sectionName: data.sectionName // 没有这个值
      }
      this.lessionId = data.id
      this.dialogVisible2 = true
      this.isLessionEdit = true
    },

    handleLessionSuccess () {
      this.dialogVisible2 = false
      this.loadSectionAndLesson()
    },
  }

})
</script>

<style lang="scss" scoped>
.el-card__header div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

::v-deep .el-tree-node__content {
    height: auto;
    padding: 5px;
}

.node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px dotted lightgray;
  padding-bottom: 5px;
}
</style>
