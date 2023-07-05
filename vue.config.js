const path = require('path')
const { defineConfig } = require('@vue/cli-service')
// const proxy = require('http-proxy-middleware');
module.exports = defineConfig({
  // transpileDependencies: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.join(__dirname, './src'))
  },
  devServer:{
    // host:'localhost',
    // port:8080,
    proxy:{
      // '/mmbd':{
      //   target:'https://api.maoyan.com',
      //   // changeOrigin:true,
      //   // logLevel:'debug',
      //   // secure: false,
      // },
      '/mmdb/movie/v2': {
        target: 'https://wx.maoyan.com',
        changeOrigin: true
      },
      '/api':{
        target:"https://i.maoyan.com",
        changeOrigin: true
      }
      // '/api':{
      //   target:'http://gmall-h5-api.atguigu.cn',
      // },
    }
  }
})