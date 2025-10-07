import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Favorites from '../views/Favorites.vue'

import auth from '../middleware/auth'
import guest from '../middleware/guest'

// only home and favorites routes — login/register handled by modals
const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home, meta: { middleware: [auth] } },
  { path: '/favorites', component: Favorites, meta: { middleware: [auth] } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// middleware helper
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index]
  if (!subsequentMiddleware) return context.next

  return (...parameters) => {
    context.next(...parameters)
    const nextMiddleware = nextFactory(context, middleware, index + 1)
    subsequentMiddleware({ ...context, next: nextMiddleware })
  }
}

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) return next()

  const middleware = Array.isArray(to.meta.middleware)
    ? to.meta.middleware
    : [to.meta.middleware]

  const context = { from, next, router, to }
  const nextMiddleware = nextFactory(context, middleware, 1)
  return middleware[0]({ ...context, next: nextMiddleware })
})

export default router
