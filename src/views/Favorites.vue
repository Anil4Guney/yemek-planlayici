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

<style scoped>
.favorites { max-width:1100px; margin:0 auto; padding:8px 16px; }
.grid { display:grid; grid-template-columns: repeat(3,1fr); gap:12px; }
.grid-item { height:220px; }
@media (max-width:1000px) { .grid { grid-template-columns: repeat(2,1fr); } }
@media (max-width:600px) { .grid { grid-template-columns: 1fr; } }
.empty { color:#6b7280; margin-top:12px; }
</style>
