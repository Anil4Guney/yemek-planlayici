<template>
  <div>
    <div class="filters">
      <button @click="filterType = ''" :class="{active: filterType==='' }">Tümü</button>
      <button @click="filterType = 'sabah'" :class="{active: filterType==='sabah'}">Sabah</button>
      <button @click="filterType = 'öğle'" :class="{active: filterType==='öğle'}">Öğle</button>
      <button @click="filterType = 'akşam'" :class="{active: filterType==='akşam'}">Akşam</button>
    </div>

    <div v-if="filteredMeals.length === 0" class="empty">Henüz yemek yok</div>

    <div v-for="meal in filteredMeals" :key="meal.id" class="meal-card">
      <MealCard :meal="meal" @toggleFavorite="toggleFavorite" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import MealCard from './MealCard.vue'

const store = useStore()
const user = store.getters.currentUser
const filterType = ref('')
const search = computed(() => store.state.searchQuery || '')

const userMeals = computed(() => {
  if (!user) return []
  return store.getters.getMealsByUser(user.email)
})

const filteredMeals = computed(() => {
  let arr = userMeals.value.slice().reverse() // show newest first
  if (filterType.value) arr = arr.filter(m => m.mealType === filterType.value)
  if (search.value) {
    const q = search.value.toLowerCase()
    arr = arr.filter(m => m.name.toLowerCase().includes(q) || (m.recipe && m.recipe.toLowerCase().includes(q)))
  }
  return arr
})

function toggleFavorite(id) { store.commit('toggleFavorite', id) }
</script>

<style scoped>
.filters { display:flex; gap:8px; margin-bottom:12px; }
.filters button { padding:6px 10px; border-radius:8px; border:1px solid #ddd; background:#fff; cursor:pointer; }
.filters button.active { background:#2b7cff; color:white; }
.meal-card { margin-bottom:10px; }
.empty { color:#777; padding:20px; text-align:center; }
</style>
