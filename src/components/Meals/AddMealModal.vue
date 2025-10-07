<template>
  <div class="overlay" @click.self="close">
    <div class="modal">
      <h2>Yemek Ekle</h2>
      <form @submit.prevent="addMeal" class="form">
        <input v-model="name" placeholder="Yemek adı" required />
        <select v-model="mealType" required>
          <option value="">Öğün seç</option>
          <option value="sabah">Sabah</option>
          <option value="öğle">Öğle</option>
          <option value="akşam">Akşam</option>
        </select>
        <textarea v-model="recipe" placeholder="Tarif (opsiyonel)"></textarea>
        <div class="macro-row">
          <input v-model.number="protein" type="number" min="0" placeholder="Protein (g)" />
          <input v-model.number="carbs" type="number" min="0" placeholder="Karbonhidrat (g)" />
          <input v-model.number="fat" type="number" min="0" placeholder="Yağ (g)" />
        </div>
        <p>Kalori: <strong>{{ calories }}</strong> kcal</p>

        <div class="actions">
          <button type="submit" class="primary">Ekle</button>
          <button type="button" @click="close">İptal</button>
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

const calories = computed(() => protein.value*4 + carbs.value*4 + fat.value*9)

function close() { store.commit('setAddMealModal', false) }

function addMeal() {
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

  store.commit('setAddMealModal', false)
}
</script>

<style scoped>
.overlay { position:fixed; inset:0; background: rgba(0,0,0,0.45); display:flex; align-items:center; justify-content:center; z-index:999; }
.modal { background:white; padding:20px; border-radius:10px; width:520px; max-width:95%; box-shadow:0 10px 30px rgba(0,0,0,0.2); }
.form input, .form select, .form textarea { width:100%; margin:8px 0; padding:8px; border-radius:6px; border:1px solid #ddd; }
.macro-row { display:flex; gap:8px; }
.macro-row input { flex:1; }
.actions { display:flex; gap:8px; margin-top:8px; }
.primary { background:#2b7cff; color:white; padding:8px 12px; border:none; border-radius:6px; cursor:pointer;}
</style>
