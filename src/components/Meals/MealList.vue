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

