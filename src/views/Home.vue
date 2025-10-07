<template>
  <div class="home">
    <div v-if="suggested" class="suggested">
      🎯 Önerilen: <strong>{{ suggested.name }}</strong> ({{ suggested.mealType }}) — {{ suggested.calories }} kcal
    </div>

    <MealList />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import MealList from '../components/Meals/MealList.vue'

const store = useStore()
const suggested = computed(() => store.getters.suggestedMeal)
</script>

<style scoped>
.home { max-width:900px; margin:0 auto; padding:10px 20px; }
.suggested { background:#fff8e1; padding:10px; border-radius:8px; margin-bottom:12px; border:1px solid #ffe08a; }
</style>
