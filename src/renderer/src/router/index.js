import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/view/login/index.vue')
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/view/Layout/index.vue'),
    children: [
      {
        path: '',
        name: 'chat',
        component: () => import('@/view/chatPage/index.vue'),
      },
      {
        path: 'friendPage',
        name: 'friendPage',
        component: () => import('@/view/friendPage/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
