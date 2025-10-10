<template>
  <div class="overlay" @click.self="close">
    <div class="modal">
      <h3>Yemek Ekle</h3>

      <form @submit.prevent="onSubmit">
        <label>Yemek Adı</label>
        <input v-model="name" type="text" required />

        <label>Öğün</label>
        <select v-model="mealType" required>
          <option value="">Öğün seç</option>
          <option value="sabah">Sabah</option>
          <option value="öğle">Öğle</option>
          <option value="akşam">Akşam</option>
        </select>

        <label>Tarif (opsiyonel)</label>
        <textarea v-model="recipe" rows="3"></textarea>

        <!-- Besin değerleri aynı hizada -->
        <div class="macros">
          <div class="macro">
            <label>Protein (g)</label>
            <input v-model.number="protein" type="number" min="0" />
          </div>
          <div class="macro">
            <label>Karbonhidrat (g)</label>
            <input v-model.number="carbs" type="number" min="0" />
          </div>
          <div class="macro">
            <label>Yağ (g)</label>
            <input v-model.number="fat" type="number" min="0" />
          </div>
          <div class="macro">
            <label>Kalori (kcal)</label>
            <input :value="calories" disabled />
          </div>
        </div>

        <div class="actions">
          <button type="submit" class="primary">Ekle</button>
          <button type="button" @click="close" class="secondary">İptal</button>
        </div>
      </form>
    </div>
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

const calories = computed(() => Math.round(protein.value * 4 + carbs.value * 4 + fat.value * 9))

function close() {
  store.commit('setAddMealModal', false)
  reset()
}

function reset() {
  name.value = ''
  mealType.value = ''
  recipe.value = ''
  protein.value = 0
  carbs.value = 0
  fat.value = 0
}

function onSubmit() {
  const user = store.getters.currentUser
  if (!user) {
    store.commit('setAddMealModal', false)
    store.commit('setLoginModal', true)
    return
  }
  const meal = {
    id: Date.now(),
    name: name.value,
    mealType: mealType.value,
    recipe: recipe.value,
    protein: protein.value,
    carbs: carbs.value,
    fat: fat.value,
    calories: calories.value,
    isFavorite: false, // kaldırdık ama default false kalabilir
    userEmail: user.email
  }
  store.commit('addMeal', meal)
  store.commit('setAddMealModal', false)
  reset()
}
</script>


