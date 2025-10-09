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

// Filtreleme (öğün türüne göre)
const filteredMeals = computed(() => {
  if (selectedType.value === 'Tümü') return meals.value
  return meals.value.filter(meal => meal.mealType === selectedType.value.toLowerCase())
})

// Vuex mutation
function deleteMeal(id) {
  store.commit('removeMeal', id)
}
</script>

<style scoped>
.home {
  padding: 24px;
}


/* 🔘 Filtre butonları */
.meal-filters {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.meal-filters button {
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 6px 12px;
  cursor: pointer;
  font-weight: 500;
  color: #374151;
  transition: all 0.2s;
}

.meal-filters button:hover {
  background: #e5e7eb;
}

.meal-filters button.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}

/* 🍽 Yemek kartları alanı */
.meal-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}
</style>
