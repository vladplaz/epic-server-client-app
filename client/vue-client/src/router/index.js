import Vue from 'vue'
import VueRouter from 'vue-router'
import {getToken} from '@/helpers/token.helper'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: () => import('../views/Auth')
  },
  {
    path: '/todos',
    name: 'Todos',
    component: () => import('../views/Todos')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(getToken()) {
    if(to.name === 'Auth') {
      next({name: 'Todos'})
    } else {
      next()
    }
  } else {
    if(to.name !== 'Auth') {
      next({name: 'Auth'})
    } else {
      next()
    }
  }
})

export default router
