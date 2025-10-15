import { createStore } from 'vuex'

const STORAGE_KEYS = {
  USERS: 'meal_users',
  LOGGED: 'meal_logged',
  MEALS: 'meal_meals'
}

function load(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback))
  } catch {
    return fallback
  }
}

const store = createStore({
  state: {
    users: load(STORAGE_KEYS.USERS, []),
    loggedInUser: load(STORAGE_KEYS.LOGGED, null),
    meals: load(STORAGE_KEYS.MEALS, []),

    showLoginModal: false,
    showRegisterModal: false,
    showAddMealModal: false,
    searchQuery: '',
    suggestedMeal: null
  },

  mutations: {
    registerUser(state, user) {
      const exists = state.users.find(u => u.email === user.email)
      if (exists) throw new Error('Bu email zaten kayıtlı.')
      state.users.push(user)
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(state.users))

      state.loggedInUser = user
      localStorage.setItem(STORAGE_KEYS.LOGGED, JSON.stringify(user))
    },

    loginUser(state, { email, password }) {
      const user = state.users.find(u => u.email === email && u.password === password)
      if (!user) throw new Error('Email veya şifre hatalı.')
      state.loggedInUser = user
      localStorage.setItem(STORAGE_KEYS.LOGGED, JSON.stringify(user))
    },

    logoutUser(state) {
      state.loggedInUser = null
      localStorage.removeItem(STORAGE_KEYS.LOGGED)
      state.meals = []
      localStorage.setItem(STORAGE_KEYS.MEALS, JSON.stringify(state.meals))
    },

    addMeal(state, meal) {
      state.meals.push(meal)
      localStorage.setItem(STORAGE_KEYS.MEALS, JSON.stringify(state.meals))
    },

    removeMeal(state, mealId) {
      state.meals = state.meals.filter(m => m.id !== mealId)
      localStorage.setItem(STORAGE_KEYS.MEALS, JSON.stringify(state.meals))
    },

    toggleFavorite(state, mealId) {
      const m = state.meals.find(x => x.id === mealId)
      if (m) {
        m.isFavorite = !m.isFavorite
        localStorage.setItem(STORAGE_KEYS.MEALS, JSON.stringify(state.meals))
      }
    },

    clearMeals(state) {
      state.meals = []
      localStorage.setItem(STORAGE_KEYS.MEALS, JSON.stringify(state.meals))
    },

    setLoginModal(state, v) { state.showLoginModal = !!v },
    setRegisterModal(state, v) { state.showRegisterModal = !!v },
    setAddMealModal(state, v) { state.showAddMealModal = !!v },

    setSearchQuery(state, q) { state.searchQuery = q || '' },
    setSuggestedMeal(state, meal) { state.suggestedMeal = meal || null }
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
