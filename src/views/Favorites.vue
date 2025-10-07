<template>
  <div class="favorites">
    <h2>Favori Yemekler</h2>

    <div v-if="favorites.length === 0" class="empty">
      Henüz favori yemek yok 😢
    </div>

    <div v-else class="meal-list">
      <div v-for="meal in favorites" :key="meal.id" class="meal-card">
        <MealCard :meal="meal" @toggleFavorite="toggleFavorite" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import MealCard from '../components/Meals/MealCard.vue'

const store = useStore()
const user = store.getters.currentUser

const favorites = computed(() => (user ? store.getters.getFavoritesByUser(user.email) : []))

function toggleFavorite(id) { store.commit('toggleFavorite', id) }
</script>

<style scoped>
.favorites { max-width:900px; margin:0 auto; padding:10px 20px; }
.meal-card { margin-bottom:10px; }
.empty { color:#777; padding:20px; text-align:center; }
</style>
