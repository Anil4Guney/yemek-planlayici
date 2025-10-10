<template>
  <div class="favorites">
    <h2>Favori Yemekler</h2>
    <div v-if="fav.length" class="grid">
      <div v-for="m in fav" :key="m.id" class="grid-item">
        <MealCard :meal="m" />
      </div>
    </div>
    <p v-else class="empty">Henüz favori yok.</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import MealCard from '../components/Meals/MealCard.vue'

const store = useStore()
const user = store.getters.currentUser
const fav = computed(() => {
  if (!user) return []
  return store.getters.getFavoritesByUser(user.email)
})
</script>
