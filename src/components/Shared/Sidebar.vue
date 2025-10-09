<template>
  <aside class="sidebar">
    <div class="navs">
      <button class="side-btn" @click="goHome">Home</button>
      <button class="side-btn" @click="goFavorites">Favorites</button>
    </div>

    <hr />

    <div class="random">
      <label>Öğün seç</label>
      <select v-model="selectedType" class="sel">
        <option value="">Tümü</option>
        <option value="sabah">Sabah</option>
        <option value="öğle">Öğle</option>
        <option value="akşam">Akşam</option>
      </select>

      <button class="side-btn" @click="suggest">🎲 Rastgele Öner</button>
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
const selectedType = ref('')

function goHome() { router.push('/home') }
function goFavorites() { router.push('/favorites') }

function suggest() {
  const user = store.getters.currentUser
  if (!user) {
    store.commit('setLoginModal', true)
    return
  }
  let list = store.getters.getMealsByUser(user.email)
  if (selectedType.value) list = list.filter(m => m.mealType === selectedType.value)
  if (!list.length) {
    alert('Bu kriterde yemek yok.')
    return
  }
  const item = list[Math.floor(Math.random() * list.length)]
  store.commit('setSuggestedMeal', item)
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
  width:240px;
  background:#fafafa;
  border-right:1px solid #eee;
  padding:16px;
  box-sizing:border-box;
  min-height: calc(100vh - 64px);
}
.side-btn { display:block; width:100%; margin-bottom:8px; padding:8px; border-radius:8px; border:1px solid #e5e7eb; background:#fff; cursor:pointer; text-align:left; }
.side-btn.add { background:#ffd95c; font-weight:600; }
.sel { width:100%; padding:8px; border-radius:6px; border:1px solid #ddd; margin-top:6px; }
hr { border:none; border-top:1px solid #eee; margin:12px 0; }
</style>
