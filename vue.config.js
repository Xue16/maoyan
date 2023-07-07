const path = require('path')
const { defineConfig } = require('@vue/cli-service')
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');
module.exports = defineConfig({
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.join(__dirname, './src'))
  },
  devServer:{
    // host:'10.16.81.232',
    // port:8080,
    proxy:{
      '/mmdb/movie/v2': {
        target: 'https://wx.maoyan.com',
        changeOrigin: true
      },
      '/api':{
        target:"https://i.maoyan.com",
        changeOrigin: true,
        // secure: false, 
      },
      '/ajax':{
        target:"https://i.maoyan.com",
        changeOrigin: true,
        // secure: false, 
      }
    }
  },
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
  
})