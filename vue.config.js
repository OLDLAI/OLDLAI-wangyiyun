const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  
  /* devServer: {
    open: true, //配置自动启动浏览器
    proxy: {
      '/api': {
        target: "http://localhost:3000",
        changeOrigin: true,
        ws:true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
  } */
})