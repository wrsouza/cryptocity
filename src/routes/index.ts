import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('~/views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('~/views/About.vue')
  },
  {
    path: '/crypto',
    name: 'Crypto',
    component: () => import('~/views/Crypto.vue')
  },
  {
    path: '/',
    redirect: '/crypto'
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('~/views/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
