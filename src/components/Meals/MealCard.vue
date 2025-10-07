<template>
  <div class="card">
    <div class="row">
      <div>
        <h3>{{ meal.name }} <small>({{ meal.mealType }})</small></h3>
        <p class="meta">Kalori: {{ meal.calories }} kcal — Protein: {{ meal.protein }}g — Karb: {{ meal.carbs }}g — Yağ: {{ meal.fat }}g</p>
        <p v-if="meal.recipe"><strong>Tarif:</strong> {{ meal.recipe }}</p>
      </div>

      <div class="actions">
        <button @click="$emit('toggleFavorite', meal.id)" class="fav">
          {{ meal.isFavorite ? '★' : '☆' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ meal: Object })
</script>

<style scoped>
.card { background:#fff; border:1px solid #eee; padding:12px; border-radius:8px; display:block; }
.row { display:flex; justify-content:space-between; align-items:flex-start; gap:12px; }
.meta { color:#666; font-size:13px; margin-top:6px; margin-bottom:8px; }
.actions { display:flex; align-items:center; }
.fav { background:#ffd95c; border:none; padding:6px 10px; border-radius:8px; cursor:pointer; font-size:16px; }
</style>
