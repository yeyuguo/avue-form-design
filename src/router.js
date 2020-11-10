import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/form-design',
    },
    {
      name: 'form-design',
      path: '/form-design',
      component: () => import(/* webpackChunkName: "form-design" */ '../packages/form-design-index.vue')
    },
    {
      path: '/crud-design',
      component: () => import(/* webpackChunkName: "crud-design" */ '../packages/crud/index.vue')
    },
    {
      path: '/test',
      component: () => import(/* webpackChunkName: "form-design-test" */ '../src/test/index.vue')
    },
  ]
})
