import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/home', component: () => import('@/pages/home/index.vue') },
  { path: '/login', component: () =>  import('@/pages/login/index.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router