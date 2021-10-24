module.exports = {
  devServer: {
    open: true, // auto open brower 项目启动后自动打开浏览器...
    disableHostCheck: false,
    host: "0.0.0.0",
    port: 8099, // 修改端口号
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {// 匹配所有以 '/api'开头的请求路径
        target: 'http://localhost:3000',// 代理目标的基础路径
        ws: true,// 支持跨域
        changeOrigin: true,
        pathRewrite: {// 重写路径: 去掉路径中开头的'/api'
          '^/api': '/'
        }
      }
    }
  }
}