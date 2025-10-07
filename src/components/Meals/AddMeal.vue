<template>
  <div class="add-meal">
    <h2>Yemek Ekle</h2>

    <form @submit.prevent="addMeal">
      <input v-model="name" type="text" placeholder="Yemek adı" class="input" required />
      
      <select v-model="mealType" class="input" required>
        <option value="">Öğün Seç</option>
        <option value="sabah">Sabah</option>
        <option value="öğle">Öğle</option>
        <option value="akşam">Akşam</option>
      </select>

      <textarea v-model="recipe" placeholder="Tarif" class="input"></textarea>

      <input v-model.number="protein" type="number" placeholder="Protein (g)" class="input" />
      <input v-model.number="carbs" type="number" placeholder="Karbonhidrat (g)" class="input" />
      <input v-model.number="fat" type="number" placeholder="Yağ (g)" class="input" />

      <p class="calorie-info">Kalori: {{ calories }} kcal</p>

      <button type="submit" class="default-button">Ekle</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const name = ref('')
const mealType = ref('')
const recipe = ref('')
const protein = ref(0)
const carbs = ref(0)
const fat = ref(0)

const calories = computed(() => protein.value * 4 + carbs.value * 4 + fat.value * 9)

function addMeal() {
  const user = store.getters.currentUser
  if (!user) return alert('Giriş yapmalısınız.')

  const meal = {
    id: Date.now(),
    name: name.value,
    mealType: mealType.value,
    recipe: recipe.value,
    protein: protein.value,
    carbs: carbs.value,
    fat: fat.value,
    calories: calories.value,
    isFavorite: false,
    userEmail: user.email
  }

  store.commit('addMeal', meal)

  name.value = ''
  mealType.value = ''
  recipe.value = ''
  protein.value = 0
  carbs.value = 0
  fat.value = 0
}
</script>
