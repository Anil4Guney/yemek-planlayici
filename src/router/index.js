import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Favorites from '../views/Favorites.vue'
import Profile from '../views/Profile.vue'

import auth from '../middleware/auth'
import guest from '../middleware/guest'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home, meta: { middleware: [auth] } },
  { path: '/favorites', component: Favorites, meta: { middleware: [auth] } },
  { path: '/profile', component: Profile, meta: { middleware: [auth] } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// middleware helper
function nextFactory(context, middleware, index) {
  const subsequent = middleware[index]
  if (!subsequent) return context.next
  return (...args) => {
    context.next(...args)
    const nextM = nextFactory(context, middleware, index + 1)
    subsequent({ ...context, next: nextM })
  }
}

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) return next()
  const m = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware]
  const context = { from, next, router, to }
  const nextMiddleware = nextFactory(context, m, 1)
  return m[0]({ ...context, next: nextMiddleware })
})

export default router
