<template>
  <header class="navbar">
    <div class="nav-left">
      <!-- placeholder for logo -->
    </div>

    <div class="nav-center">
      <input 
        v-model="q"
        @input="onSearch"
        class="search-input"
        placeholder="Yemek ara... (isim veya tarif)" />
    </div>

    <div class="nav-right">
      <button v-if="!isAuth" @click="openLogin" class="btn">Login</button>
      <button v-if="!isAuth" @click="openRegister" class="btn">Register</button>
      <button v-if="isAuth" @click="logout" class="btn logout">Logout</button>
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

function logout() {
  store.commit('logoutUser')
  router.push('/home')
}
</script>

<style scoped>
.navbar {
  height:56px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 18px;
  background:#fafafa;
  border-bottom:1px solid #eee;
}
.search-input {
  width:400px;
  max-width:60vw;
  padding:8px 12px;
  border-radius:8px;
  border:1px solid #ddd;
}
.nav-right { display:flex; align-items:center; gap:8px; }
.btn {
  padding:6px 10px;
  border-radius:8px;
  background:#fff;
  border:1px solid #d0d0d0;
  cursor:pointer;
}
.btn.logout { background:#ff6b6b; color:#fff; border:none; }
</style>
