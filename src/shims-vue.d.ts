// 用于 TypeScript 识别 .vue 文件模块
// .vue 文件模块都按 VueConstructor<vue> 类型识别处理
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

interface Window {
  AliyunUpload: any;
}
