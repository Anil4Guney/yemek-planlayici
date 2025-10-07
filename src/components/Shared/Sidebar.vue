<template>
  <aside class="sidebar">
    <div class="nav-group">
      <button @click="goHome" class="side-btn">Home</button>
      <button @click="goFavorites" class="side-btn">Favorites</button>
    </div>

    <hr />

    <div class="random-box">
      <label>Öğün seç</label>
      <select v-model="type" class="select">
        <option value="">Tümü</option>
        <option value="sabah">Sabah</option>
        <option value="öğle">Öğle</option>
        <option value="akşam">Akşam</option>
      </select>
      <button @click="suggest" class="side-btn">🎲 Rastgele Öner</button>
    </div>

    <hr />

    <button class="side-btn add" @click="openAddMeal">➕ Yemek Ekle</button>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const type = ref('')

function goHome() { router.push('/home') }
function goFavorites() { router.push('/favorites') }

function suggest() {
  const user = store.getters.currentUser
  if (!user) {
    store.commit('setLoginModal', true)
    return
  }
  let meals = store.getters.getMealsByUser(user.email)
  if (type.value) meals = meals.filter(m => m.mealType === type.value)
  if (!meals.length) {
    alert('Bu kriterle yemek bulunamadı.')
    return
  }
  const random = meals[Math.floor(Math.random() * meals.length)]
  store.commit('setSuggestedMeal', random)
  router.push('/home')
}

function openAddMeal() {
  const user = store.getters.currentUser
  if (!user) {
    store.commit('setLoginModal', true)
    return
  }
  store.commit('setAddMealModal', true)
  router.push('/home')
}
</script>

<style scoped>
.sidebar {
  width: 230px;
  background: #f8f9fb;
  border-right: 1px solid #e6e6e6;
  padding: 16px;
  box-sizing: border-box;
}
.nav-group { display:flex; flex-direction:column; gap:8px; margin-bottom:8px; }
.side-btn {
  background:#fff; border:1px solid #ddd; padding:8px; border-radius:8px; cursor:pointer; text-align:left;
}
.side-btn.add { background:#ffd95c; font-weight:600; margin-top:10px; }
.random-box { margin-top:12px; display:flex; flex-direction:column; gap:8px; }
.select { padding:8px; border-radius:6px; border:1px solid #ddd; }
hr { margin:12px 0; border: none; border-top:1px solid #eee; }
</style>
