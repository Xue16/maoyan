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
    proxy:{
      '/mmdb/movie/v2': {
        target: 'https://wx.maoyan.com',
        changeOrigin: true
      },
      '/api':{
        target:"https://i.maoyan.com",
        changeOrigin: true
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