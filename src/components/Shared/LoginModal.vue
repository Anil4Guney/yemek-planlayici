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
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const store = useStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

function close() {
  store.commit('setLoginModal', false)
  error.value = ''
}

function openRegister() {
  store.commit('setLoginModal', false)
  store.commit('setRegisterModal', true)
}

async function handleLogin() {
  const auth = getAuth()
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user

    store.commit('setUser', { email: user.email, uid: user.uid }) 
    store.commit('setLoginModal', false)
    router.push('/home')

    email.value = ''
    password.value = ''
    error.value = ''
  } catch (err) {
    if (err.code === 'auth/user-not-found') error.value = 'Kullanıcı bulunamadı.'
    else if (err.code === 'auth/wrong-password') error.value = 'Şifre hatalı.'
    else error.value = 'Giriş yapılamadı. Lütfen tekrar deneyin.'
  }
}
</script>

<style>
.error {
  color: #e11d48;
  margin-top: 8px;
  font-size: 14px;
}
</style>
