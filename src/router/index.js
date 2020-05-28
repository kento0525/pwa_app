import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Bocs from '../views/Bocs.vue'
import Padoa from '../views/Padoa.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/Padoa',
    component: Padoa
  },
  {
    path: '/Bocs',
    component: Bocs
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
