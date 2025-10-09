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

<style scoped>
/* reuse styles similar to login */
.overlay { position:fixed; inset:0; background: rgba(0,0,0,0.45); display:flex; align-items:center; justify-content:center; z-index:1000; }
.modal { background:#fff; padding:18px; border-radius:10px; width:420px; max-width:95%; box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
label { display:block; margin-top:8px; font-weight:600; }
input { width:100%; padding:8px; margin-top:6px; border-radius:6px; border:1px solid #e5e7eb; }
.actions { display:flex; gap:8px; margin-top:12px; }
.primary { background:#2563eb; color:#fff; border:none; padding:8px 12px; border-radius:8px; cursor:pointer; }
.error { color:#e11d48; margin-top:8px; }
</style>
