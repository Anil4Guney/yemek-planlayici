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
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const store = useStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

function close() {
  store.commit('setRegisterModal', false)
  error.value = ''
}

function openLogin() {
  store.commit('setRegisterModal', false)
  store.commit('setLoginModal', true)
}

async function handleRegister() {
  const auth = getAuth()
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user


    store.commit('setUser', { email: user.email, uid: user.uid })

    store.commit('setRegisterModal', false)
    router.push('/home')

    email.value = ''
    password.value = ''
    error.value = ''
  } catch (err) {
    if (err.code === 'auth/email-already-in-use') error.value = 'Bu e-posta zaten kayıtlı.'
    else if (err.code === 'auth/invalid-email') error.value = 'Geçersiz e-posta formatı.'
    else if (err.code === 'auth/weak-password') error.value = 'Şifre en az 6 karakter olmalı.'
    else error.value = 'Kayıt başarısız. Lütfen tekrar deneyin.'
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
