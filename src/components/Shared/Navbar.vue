<template>
  <header class="navbar">
    <div class="left">
      <div class="logo">Meal Planner</div>
    </div>

    <div class="center">
      <input v-model="q" @input="onSearch" class="search" placeholder="Yemek ara (isim veya tarif)" />
    </div>

    <div class="right">
      <button v-if="!isAuth" @click="openRegister" class="btn">Register</button>
      <button v-if="!isAuth" @click="openLogin" class="btn">Login</button>

      <div v-if="isAuth" class="auth-area">
        <button @click="goProfile" class="btn">Profile</button>
        <button @click="logout" class="btn logout">Logout</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const q = ref(store.state.searchQuery || '')

const isAuth = computed(() => store.getters.isAuthenticated)

function onSearch() {
  store.commit('setSearchQuery', q.value)
}

function openLogin() { store.commit('setLoginModal', true) }
function openRegister() { store.commit('setRegisterModal', true) }

function goProfile() { router.push('/profile') }

function logout() {
  store.commit('logoutUser')
  // ensure modals closed
  store.commit('setLoginModal', false)
  store.commit('setRegisterModal', false)
  store.commit('setAddMealModal', false)
  // reload to reset UI state
  window.location.reload()
}
</script>

