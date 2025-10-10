<template>
  <div class="profile">
    <h2>Profil</h2>

    <div v-if="user" class="card">
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Ekli Yemek Sayısı:</strong> {{ userMeals.length }}</p>
      <p><strong>Favori Yemek Sayısı:</strong> {{ favoriteCount }}</p>
      <p><strong>Toplam Kalori:</strong> {{ totalCalories }} kcal</p>
      <p><strong>Toplam Protein:</strong> {{ totalProtein }} g</p>
      <p><strong>Toplam Yağ:</strong> {{ totalFat }} g</p>
      <p><strong>Toplam Karb:</strong> {{ totalCarb }} g</p>
    </div>

    <div v-else class="no">
      <p>Henüz giriş yapılmamış.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const user = store.getters.currentUser

const userMeals = computed(() => user ? store.getters.getMealsByUser(user.email) : [])
const favoriteCount = computed(() => userMeals.value.filter(m => m.isFavorite).length)
const totalCalories = computed(() => userMeals.value.reduce((s,m)=> s + (m.calories||0), 0))
const totalProtein = computed(() => userMeals.value.reduce((s,m)=> s + (m.protein||0), 0))
const totalFat = computed(() => userMeals.value.reduce((s,m)=> s + (m.fat||0), 0))
const totalCarb = computed(() => userMeals.value.reduce((s,m)=> s + (m.carbs||0), 0))
</script>

<style scoped>
/*
.profile { max-width:900px; margin:24px auto; padding:12px; }
.card { background:#fff; border:1px solid #e6e6e6; padding:16px; border-radius:10px; }
.no { color:#6b7280; text-align:center; margin-top:20px; }
*/
</style>
