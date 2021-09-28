import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import index from '../views/Index/index.vue'
import manageIndex from '../views/manageSystem/index.vue'
import markdown from '../views/manageSystem/components/markdown.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: ' index',
    component: index
  },
  {
    path: '/manageIndex',
    name: 'manageIndex',
    component: manageIndex,
    children:[
      {
        path: '',
        name: 'manageMain',
        component: () => import('../views/manageSystem/main.vue'),
      },
      {
        path: 'blog',
        name: 'manageBlog',
        component: () => import('../views/manageSystem/blog.vue'),
      }
    ]
  },
  {
    path: '/manageIndex/markdown',
    name: ' markdown',
    component: markdown
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
