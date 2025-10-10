<template>
  <div class="overlay" @click.self="close">
    <div class="modal">
      <h3>Kayıt Ol</h3>
      <form @submit.prevent="handleRegister">
        <label>Email</label>
        <input v-model="email" type="email" required />

        <label>Şifre</label>
        <input v-model="password" type="password" required />

        <div class="actions">
          <button type="submit" class="primary">Kayıt Ol</button>
          <button type="button" @click="openLogin">Giriş Yap</button>
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

function close() { store.commit('setRegisterModal', false); error.value = '' }
function openLogin() { store.commit('setRegisterModal', false); store.commit('setLoginModal', true) }

function handleRegister() {
  try {
    store.commit('registerUser', { email: email.value, password: password.value })
    // registerUser auto-logins (in store mutation) — we just close and go home
    store.commit('setRegisterModal', false)
    router.push('/home')
    email.value = ''; password.value = ''; error.value = ''
  } catch (err) {
    error.value = err.message
  }
}
</script>

