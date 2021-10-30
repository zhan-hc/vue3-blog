// let baseUrl = window.document.location.pathname
let baseUrl = '/api/'
if (process.env.NODE_ENV === 'development') {
  // 设置api代理接口
  baseUrl = 'http://localhost:3000'
}
export default baseUrl