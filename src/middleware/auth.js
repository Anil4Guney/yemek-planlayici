import store from '../store'

export default function auth({ next }) {
  if (!store.getters.isAuthenticated) {
    // open login modal and cancel navigation
    store.commit('setLoginModal', true)
    return next(false)
  }
  return next()
}
