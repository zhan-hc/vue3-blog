import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMarkdownEditor from '@kangc/v-md-editor'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import Prism from 'prismjs'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import '@/assets/iconfont/iconfont.css'
import '@/assets/scss/index.scss'
import 'element-plus/lib/theme-chalk/index.css'
import { components, plugins } from './plugins/element'
import { Request } from '@/utils/request';
import VueAxios from 'vue-axios'
import dayjs from 'dayjs'


const app = createApp(App)

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
})
// 按需导入Element Plus组件和插件
components.forEach(component => {
  app.component(component.name, component)
})
plugins.forEach(plugin => {
  app.use(plugin)
})
app.config.globalProperties.$dayjs=dayjs
app.use(store).use(router).use(VueAxios, Request.init()).use(VueMarkdownEditor).mount('#app')