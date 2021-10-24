import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import index from '../views/Index/index.vue'
import manageIndex from '../views/manageSystem/index.vue'
import login from '../views/manageSystem/login/login.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: ' index',
    component: index
  },
  {
    path: '/manage',
    name: 'manage',
    component: manageIndex,
    children:[
      {
        path: '',
        name: 'main',
        component: () => import('../views/manageSystem/main.vue'),
      },
      {
        path: 'blogArticle',
        name: 'blogArticle',
        component: () => import('../views/manageSystem/blog/blogArticle.vue'),
      },
      {
        path: 'blogTag',
        name: 'blogTag',
        component: () => import('../views/manageSystem/blog/blogTag.vue'),
      },
      {
        path: 'markdown',
        name: 'markdown',
        component: () => import('../views/manageSystem/blog/components/markdown.vue'),
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
