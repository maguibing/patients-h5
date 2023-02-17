import { useUserStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
      meta: { title: '登录' }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Register.vue'),
      meta: { title: '注册' }
    },
    {
      path: '/',
      name: 'Layout',
      component: () => import('@/views/Layout.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import('@/views/Home.vue'),
          meta: { title: '首页' }
        },
        {
          path: '/user',
          name: 'User',
          component: () => import('@/views/User.vue'),
          meta: { title: '个人中心' }
        },
        {
          path: '/article',
          name: 'Article',
          component: () => import('@/views/Article.vue'),
          meta: { title: '健康百科' }
        },
        {
          path: '/notify',
          name: 'Notify',
          component: () => import('@/views/Notify.vue'),
          meta: { title: '消息通知' }
        }
      ]
    }
  ]
})

router.beforeEach((to, from) => {
  document.title = `优医问诊-${to.meta.title || ''}`
  const store = useUserStore()
  const whiteList = ['/login', '/register']
  if (!store.user?.token && !whiteList.includes(to.path)) return '/login'
})
export default router
