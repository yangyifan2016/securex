import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/',
      redirect: '/dataAssetConnection'
    },
    {
      path: '/dataAssetConnection',
      name: 'dataAssetConnection',
      component: () => import(/* webpackChunkName: "dataAssetConnection" */ '../views/DataAssetConnection.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
    },
  ]
})

export default router