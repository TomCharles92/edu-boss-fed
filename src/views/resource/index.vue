<template>
  <div>
    <ResourcesList />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ResourcesList from './components/list.vue'

export default Vue.extend({
  name: 'ResourceIndex',
  components: { ResourcesList }
})
</script>

<style lang="scss" scoped>

</style>
