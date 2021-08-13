import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/iconfont/iconfont.css'
import '@/assets/scss/index.scss'
import 'element-plus/lib/theme-chalk/index.css'
import { components, plugins } from './plugins/element'
const app = createApp(App)
// 按需导入Element Plus组件和插件
components.forEach(component => {
  app.component(component.name, component)
})
plugins.forEach(plugin => {
  app.use(plugin)
})
app.use(store).use(router).mount('#app')