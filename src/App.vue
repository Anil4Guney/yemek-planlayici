<template>
  <div id="app">
    <Navbar />

    <div class="app-layout">
      <Sidebar />

      <main class="main-content">
        <h1 class="app-heading">Meal Planner</h1>
        <router-view />
      </main>
    </div>

    <!-- global modals -->
    <LoginModal v-if="loginModalVisible" />
    <RegisterModal v-if="registerModalVisible" />
    <AddMealModal v-if="addMealModalVisible" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Navbar from './components/Shared/Navbar.vue'
import Sidebar from './components/Shared/Sidebar.vue'
import LoginModal from './components/Shared/LoginModal.vue'
import RegisterModal from './components/Shared/RegisterModal.vue'
import AddMealModal from './components/Meals/AddMealModal.vue'

const store = useStore()
const loginModalVisible = computed(() => store.getters.loginModalVisible)
const registerModalVisible = computed(() => store.getters.registerModalVisible)
const addMealModalVisible = computed(() => store.getters.addMealModalVisible)
</script>

<style>
/* layout */
/*
.app-layout {
  display: flex;
  min-height: calc(100vh - 64px);
}
.main-content {
  flex: 1;
  padding: 20px;
  background: #f5f7fb;
  min-height: calc(100vh - 64px);
}
.app-heading {
  margin: 0 0 16px 0;
  font-size: 28px;
  color: #1f2937;
}
  */
</style>
