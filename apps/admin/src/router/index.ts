import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  { 
    path: '/', 
    component: () => import('../pages/home/index.vue'),
    name: 'home',
    children: [
      {
        path: 'userManager',
        meta: {
          title: '用户管理'
        },
        component: () => import('../pages/user/userManager.vue')
      },
      {
        path: 'user', 
        component: () => import('../pages/user/index.vue'),
        meta: {
          title: '用户中心'
        },
        children: [
          {
            path: 'info',
            meta: {
              title: '个人信息'
            },
            component: () => import('../pages/user/info.vue')
          }, {
            path: 'safe',
            meta: {
              title: '安全中心'
            },
            component: () => import('../pages/user/safe.vue')
          }
        ],
      },
      {
        path: 'article', 
        meta: {
          title: "文章中心"
        },
        component: () => import('../pages/article/index.vue'),
        children: [
          {
            path: 'info',
            meta: {
              title: '文章详情',
              hidden: true
            },
            name: 'articleInfo',
            component: () => import('../pages/article/info.vue')
          },
          {
            path: 'list',
            meta: {
              title: '文章列表'
            },
            component: () => import('../pages/article/list.vue')
          },
          {
            path: 'category',
            meta: {
              title: '类别管理'
            },
            component: () => import('../pages/article/category.vue')
          }, {
            path: 'tag',
            meta: {
              title: '标签管理'
            },
            component: () => import('../pages/article/tag.vue')
          }
        ]
      }
    ],
    redirect: '/userManager'
  },
  { 
    path: '/login', 
    component: () =>  import('../pages/login/index.vue'),
  },
  { 
    path: '/:pathMatch(.*)', 
    redirect: '/login' 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router