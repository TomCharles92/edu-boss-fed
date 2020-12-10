<template>
  <CreateOrUpdate isEdit :courseId="courseId" />
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrUpdate from './components/CreateOrUpdate.vue'

export default Vue.extend({
  name: 'CourseEdit',
  components: { CreateOrUpdate },
  props: {
    courseId: {
      type: [Number, String]
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
