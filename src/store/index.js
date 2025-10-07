import { createStore } from 'vuex'

const store = createStore({
  state: {
    users: JSON.parse(localStorage.getItem('users') || '[]'),
    loggedInUser: JSON.parse(localStorage.getItem('loggedInUser') || 'null'),
    meals: JSON.parse(localStorage.getItem('meals') || '[]'),

    // UI
    showLoginModal: false,
    showRegisterModal: false,
    showAddMealModal: false,
    searchQuery: '',
    suggestedMeal: null
  },

  mutations: {
    // Auth
    registerUser(state, user) {
      const exists = state.users.find(u => u.email === user.email)
      if (exists) throw new Error('Bu email zaten kayıtlı.')
      state.users.push(user)
      localStorage.setItem('users', JSON.stringify(state.users))
    },

    loginUser(state, { email, password }) {
      const user = state.users.find(u => u.email === email && u.password === password)
      if (!user) throw new Error('Email veya şifre hatalı.')
      state.loggedInUser = user
      localStorage.setItem('loggedInUser', JSON.stringify(user))
    },

    logoutUser(state) {
      state.loggedInUser = null
      localStorage.removeItem('loggedInUser')
    },

    // Meals
    addMeal(state, meal) {
      state.meals.push(meal)
      localStorage.setItem('meals', JSON.stringify(state.meals))
    },

    toggleFavorite(state, mealId) {
      const meal = state.meals.find(m => m.id === mealId)
      if (meal) {
        meal.isFavorite = !meal.isFavorite
        localStorage.setItem('meals', JSON.stringify(state.meals))
      }
    },

    // UI modals
    setLoginModal(state, v) { state.showLoginModal = !!v },
    setRegisterModal(state, v) { state.showRegisterModal = !!v },
    setAddMealModal(state, v) { state.showAddMealModal = !!v },

    // search & suggestion
    setSearchQuery(state, q) { state.searchQuery = q || '' },
    setSuggestedMeal(state, meal) { state.suggestedMeal = meal || null }
  },

  getters: {
    isAuthenticated: state => !!state.loggedInUser,
    currentUser: state => state.loggedInUser,
    getMealsByUser: state => email => state.meals.filter(m => m.userEmail === email),
    getFavoritesByUser: state => email => state.meals.filter(m => m.userEmail === email && m.isFavorite),

    // UI getters
    loginModalVisible: state => state.showLoginModal,
    registerModalVisible: state => state.showRegisterModal,
    addMealModalVisible: state => state.showAddMealModal,
    searchQuery: state => state.searchQuery,
    suggestedMeal: state => state.suggestedMeal
  }
})

export default store
