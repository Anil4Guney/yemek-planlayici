import store from '../store'

export default function auth({ next }) {
  if (!store.getters.isAuthenticated) {
    store.commit('setLoginModal', true)
    return next(false)
  }
  return next()
}
