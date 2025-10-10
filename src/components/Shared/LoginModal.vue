<template>
  <div class="overlay" @click.self="close">
    <div class="modal">
      <h3>Giriş Yap</h3>
      <form @submit.prevent="handleLogin">
        <label>Email</label>
        <input v-model="email" type="email" required />

        <label>Şifre</label>
        <input v-model="password" type="password" required />

        <div class="actions">
          <button type="submit" class="primary">Giriş</button>
          <button type="button" @click="openRegister">Kayıt Ol</button>
        </div>

        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

function close() { store.commit('setLoginModal', false); error.value = '' }
function openRegister() { store.commit('setLoginModal', false); store.commit('setRegisterModal', true) }

function handleLogin() {
  try {
    store.commit('loginUser', { email: email.value, password: password.value })
    store.commit('setLoginModal', false)
    // go home after login
    router.push('/home')
    email.value = ''; password.value = ''; error.value = ''
  } catch (err) {
    error.value = err.message
  }
}
</script>


