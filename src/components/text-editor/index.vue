<template>
  <div ref="div1"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import E from 'wangeditor'
import { uploadImage } from '@/services/course'

export default Vue.extend({
  name: 'TextEditor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 参考文档：http://www.wangeditor.com/doc
    init () {
      const editor = new E(this.$refs.div1 as any)
      // 获取输入后的 Html
      editor.config.onchange = (newHtml: any) => {
        this.$emit('input', newHtml)
      }
      // 文件删除
      editor.config.customUploadImg = async function (resultFiles: any, insertImgFn: Function) {
        // resultFiles 是 input 中选中的文件列表
        // insertImgFn 是获取图片 url 后，插入到编辑器的方法
        const fd = new FormData()
        fd.append('file', resultFiles[0])
        const { data } = await uploadImage(fd)

        // 上传图片，返回结果，将图片插入到编辑器中
        insertImgFn(data.data.name)
      }
      editor.create()
      editor.txt.html(this.value)
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
