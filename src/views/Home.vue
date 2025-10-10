<template>
  <div class="home">
    <!-- Filtre butonları -->
    <div class="meal-filters">
      <button
        v-for="type in mealTypes"
        :key="type"
        :class="{ active: selectedType === type }"
        @click="selectedType = type"
      >
        {{ type }}
      </button>
    </div>

    <!-- Yemek kartları -->
    <div class="meal-list">
      <MealCard
        v-for="meal in filteredMeals"
        :key="meal.id"
        :meal="meal"
        @delete="deleteMeal(meal.id)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import MealCard from '../components/Meals/MealCard.vue'

const store = useStore()
const selectedType = ref('Tümü')

const mealTypes = ['Tümü', 'Sabah', 'Öğle', 'Akşam']

// Kullanıcıya ait yemekleri getir
const meals = computed(() => {
  const user = store.getters.currentUser
  return user ? store.getters.getMealsByUser(user.email) : []
})

const search = computed(() => store.state.searchQuery || '')

const filteredMeals = computed(() => {
  let result = meals.value

  // Filtreleme
  if (selectedType.value !== 'Tümü') {
    result = result.filter(meal => meal.mealType === selectedType.value.toLowerCase())
  }

  // Arama filtrelemesi
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    result = result.filter(m =>
      (m.name || '').toLowerCase().includes(q) ||
      (m.recipe || '').toLowerCase().includes(q)
    )
  }

  return result
})


// Vuex mutation
function deleteMeal(id) {
  store.commit('removeMeal', id)
}
</script>

