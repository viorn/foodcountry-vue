import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'is-active',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'main',
      component: () => import("./views/Main.vue"),
      children: [{
          path: '',
          redirect: 'ingredients'
        }, {
          path: 'about',
          component: () => import('./views/About.vue')
        },
        {
          path: 'ingredients',
          component: () => import('./views/Ingredients.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("./views/Login.vue")
    }
  ]
})