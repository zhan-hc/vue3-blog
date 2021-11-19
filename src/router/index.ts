import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import index from '../views/Index/index.vue'
import manageIndex from '../views/manageSystem/index.vue'
import blogDetail from '../views/Index/blogDetail.vue'
import upload from '../components/base/uploadFile.vue'
import login from '../views/manageSystem/login/login.vue'
import {addArticleReading} from '@/api/article'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/blog',
    name: ' blog',
    component: index
  },
  {
    path: '/blog/blogDetail',
    name: 'blogDetail',
    component: blogDetail
  },
  {
    path: '/upload',
    name: 'upload',
    component: upload
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
        path: 'blogCategory',
        name: 'blogCategory',
        component: () => import('../views/manageSystem/blog/blogCategory.vue'),
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


router.beforeEach(async (to, from, next) => {
  // 得到本地存储的token  想要进其他页面，就要带token
  const token = sessionStorage.getItem('token')
  console.log(to.path,'=>',to.path)
  if (token) {
    if (to.path === '/login') {
      next({ path: '/manage' });
    } else {
      next();
    }
  } else {
    if (to.path !== '/login' && to.path.indexOf('/blog') === -1) {
      next({ path: '/login' });
    } else {
      // 增加阅读量 如果不是刷新页面并且是详情页则增加阅读量
      if (from.matched && from.matched.length !== 0 && to.path === '/blog/blogDetail') {
        await addArticleReading({...to.query,check: 0})
      }
      next();
    }
  }
})

export default router
