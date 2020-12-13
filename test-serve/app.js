/* eslint-disable */
const express = require('express')
const path = require('path')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()

// 托管了 dist 目录
app.use(express.static(path.join(__dirname, '../dist')))

app.use('/boss', createProxyMiddleware({
  target: 'http://eduboss.lagou.com',
  changeOrigin: true
}))

app.use('/front', createProxyMiddleware({
  target: 'http://edufront.lagou.com',
  changeOrigin: true
}))

app.listen(3000, () => {
  console.log('running...')
})