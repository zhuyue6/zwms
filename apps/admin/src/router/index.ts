import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { 
    path: '/', component: () => import('../pages/home/index.vue'),
    children: [{
      path: 'user', component: () => import('../pages/user/index.vue'),
      children: [{
        path: 'info',
        component: () => import('../pages/user/info.vue')
      }, {
        path: 'safe',
        component: () => import('../pages/user/safe.vue')
      }]
    }],
    redirect: '/user'
  },
  { path: '/login', component: () =>  import('../pages/login/index.vue') },
  { path: '/:pathMatch(.*)', redirect: '/login' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router