<template>
  <div class="overlay" @click.self="close">
    <div class="modal">
      <h2>Kayıt Ol</h2>
      <form @submit.prevent="handleRegister" class="form">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Şifre" required />
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

function close() { store.commit('setRegisterModal', false) }
function openLogin() { store.commit('setRegisterModal', false); store.commit('setLoginModal', true) }

function handleRegister() {
  try {
    store.commit('registerUser', { email: email.value, password: password.value })
    store.commit('setRegisterModal', false)
    router.push('/login') // optional: push to login route or just show login modal
  } catch (err) {
    error.value = err.message
  }
}
</script>

<style scoped>
.overlay { position:fixed; inset:0; background: rgba(0,0,0,0.45); display:flex; align-items:center; justify-content:center; z-index:999; }
.modal { background:white; padding:20px; border-radius:10px; width:420px; max-width:90%; box-shadow:0 10px 30px rgba(0,0,0,0.2); }
.form input { width:100%; margin:8px 0; padding:8px; border-radius:6px; border:1px solid #ddd; }
.actions { display:flex; gap:8px; margin-top:8px; }
.primary { background:#2b7cff; color:white; padding:8px 12px; border:none; border-radius:6px; cursor:pointer;}
.error { color:red; margin-top:8px; }
</style>
