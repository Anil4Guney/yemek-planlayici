import { createStore } from 'vuex'
import { db, auth } from '../firebase'
import { 
  collection, addDoc, getDocs, query, where, deleteDoc, doc, updateDoc 
} from 'firebase/firestore'
import { 
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut 
} from 'firebase/auth'

const store = createStore({
  state: {
    loggedInUser: JSON.parse(localStorage.getItem('meal_logged')) || null,
    meals: [],
    showLoginModal: false,
    showRegisterModal: false,
    showAddMealModal: false,
    searchQuery: '',
    suggestedMeal: null
  },

  mutations: {
    setUser(state, user) {
      state.loggedInUser = user
      localStorage.setItem('meal_logged', JSON.stringify(user))
    },
    logoutUser(state) {
      state.loggedInUser = null
      localStorage.removeItem('meal_logged')
      state.meals = []
    },
    setMeals(state, meals) {
      state.meals = meals
    },
    setLoginModal(state, v) { state.showLoginModal = !!v },
    setRegisterModal(state, v) { state.showRegisterModal = !!v },
    setAddMealModal(state, v) { state.showAddMealModal = !!v },
    setSearchQuery(state, q) { state.searchQuery = q || '' },
    setSuggestedMeal(state, meal) { state.suggestedMeal = meal || null }
  },

  actions: {
    async registerUser({ commit }, { email, password }) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        commit('setUser', { email: user.email, uid: user.uid })
        alert('Kayıt başarılı!')
      } catch (err) {
        alert('Kayıt hatası: ' + err.message)
      }
    },

    async loginUser({ commit }, { email, password }) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        commit('setUser', { email: user.email, uid: user.uid })
        alert('Giriş başarılı!')
      } catch (err) {
        alert('Giriş hatası: ' + err.message)
      }
    },

    async logoutUser({ commit }) {
      await signOut(auth)
      commit('logoutUser')
      alert('Çıkış yapıldı!')
    },


    async addMeal({ state, dispatch }, meal) {
      if (!state.loggedInUser) throw new Error('Giriş yapılmamış.')
      await addDoc(collection(db, 'meals'), {
        ...meal,
        userEmail: state.loggedInUser.email
      })
      await dispatch('fetchMeals')
    },

    async fetchMeals({ state, commit }) {
      if (!state.loggedInUser) return
      const q = query(collection(db, 'meals'), where('userEmail', '==', state.loggedInUser.email))
      const snapshot = await getDocs(q)
      const meals = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      commit('setMeals', meals)
    },

    async removeMeal({ dispatch }, mealId) {
      await deleteDoc(doc(db, 'meals', mealId))
      await dispatch('fetchMeals')
    },

    async toggleFavorite({ dispatch, state }, mealId) {
      const meal = state.meals.find(m => m.id === mealId)
      if (!meal) return
      const ref = doc(db, 'meals', mealId)
      await updateDoc(ref, { isFavorite: !meal.isFavorite })
      await dispatch('fetchMeals')
    }
  },

  getters: {
    isAuthenticated: state => !!state.loggedInUser,
    currentUser: state => state.loggedInUser,
    getMealsByUser: state => (email) => state.meals.filter(m => m.userEmail === email),
    getFavoritesByUser: state => (email) => state.meals.filter(m => m.userEmail === email && m.isFavorite),
    loginModalVisible: state => state.showLoginModal,
    registerModalVisible: state => state.showRegisterModal,
    addMealModalVisible: state => state.showAddMealModal,
    searchQuery: state => state.searchQuery,
    suggestedMeal: state => state.suggestedMeal
  }
})

export default store
