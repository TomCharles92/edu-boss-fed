module.exports = {
  devServer: {
    proxy: {
      '/boss': {
        // http://eduboss.lagou.com
        // http://edufront.lagou.com
        target: 'http://eduboss.lagou.com',
        changeOrigin: true // 把请求中的 host 配置为 target
      }
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/styles/variables.scss";'
      }
    }
  }
}
