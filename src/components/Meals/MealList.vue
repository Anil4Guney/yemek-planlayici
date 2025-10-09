<template>
  <section>
    <div class="filters">
      <button @click="filterType = ''" :class="{active: filterType===''}">Tümü</button>
      <button @click="filterType = 'sabah'" :class="{active: filterType==='sabah'}">Sabah</button>
      <button @click="filterType = 'öğle'" :class="{active: filterType==='öğle'}">Öğle</button>
      <button @click="filterType = 'akşam'" :class="{active: filterType==='akşam'}">Akşam</button>
    </div>

    <div v-if="filtered.length === 0" class="empty">Henüz yemek yok</div>

    <div class="grid">
      <div class="grid-item" v-for="m in filtered" :key="m.id">
        <MealCard :meal="m" />
      </div>
    </div>
  </section>
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

const filtered = computed(() => {
  let arr = userMeals.value.slice().reverse()
  if (filterType.value) arr = arr.filter(x => x.mealType === filterType.value)
  if (search.value) {
    const q = search.value.toLowerCase()
    arr = arr.filter(x => (x.name || '').toLowerCase().includes(q) || (x.recipe || '').toLowerCase().includes(q))
  }
  return arr
})
</script>

<style scoped>
/*
.filters { display:flex; gap:8px; margin-bottom:12px; flex-wrap:wrap; }
.filters button { padding:6px 10px; border-radius:8px; border:1px solid #e5e7eb; background:#fff; cursor:pointer; }
.filters button.active { background:#2563eb; color:#fff; }
.grid {
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  gap:12px;
}
.grid-item { height:220px; }
@media (max-width:1000px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width:600px) {
  .grid { grid-template-columns: 1fr; }
}
.empty { color:#6b7280; text-align:center; padding:24px 0; }
*/
</style>
