<template>
  <div class="card">
    <div class="card-top">
      <h4>{{ meal.name }}</h4>
      <div class="card-actions">
        <button @click="toggleFav" class="fav">{{ meal.isFavorite ? '★' : '☆' }}</button>
        <button @click="del" class="del">🗑️</button>
      </div>
    </div>

    <div class="card-body">
      <p><strong>Öğün:</strong> {{ meal.mealType }}</p>
      <p><strong>Kalori:</strong> {{ meal.calories }} kcal</p>
      <p><strong>Protein:</strong> {{ meal.protein }} g</p>
      <p><strong>Yağ:</strong> {{ meal.fat }} g</p>
      <p><strong>Karb:</strong> {{ meal.carbs }} g</p>
      <p v-if="meal.recipe"><strong>Tarif:</strong> {{ meal.recipe }}</p>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
const props = defineProps({ meal: Object })
const store = useStore()

function toggleFav() {
  store.commit('toggleFavorite', props.meal.id)
}

function del() {
  if (confirm('Bu yemeği silmek istediğine emin misin?')) {
    store.commit('removeMeal', props.meal.id)
  }
}
</script>

