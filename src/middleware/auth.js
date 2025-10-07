import store from '../store'

export default function auth({ next }) {
  if (!store.getters.isAuthenticated) {
    // aç login modal ve navigation'ı iptal et
    store.commit('setLoginModal', true)
    return next(false)
  }
  return next()
}
