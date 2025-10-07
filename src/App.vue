<template>
  <div id="app">
    <Navbar />
    <div class="app-layout">
      <Sidebar />
      <main class="main-content">
        <router-view />
      </main>
    </div>

    <!-- Global modals controlled by store -->
    <LoginModal v-if="showLoginModal" />
    <RegisterModal v-if="showRegisterModal" />
    <AddMealModal v-if="showAddMealModal" />
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
const showLoginModal = computed(() => store.getters.loginModalVisible)
const showRegisterModal = computed(() => store.getters.registerModalVisible)
const showAddMealModal = computed(() => store.getters.addMealModalVisible)
</script>

<style>
/* layout */
.app-layout {
  display: flex;
  min-height: calc(100vh - 56px); /* navbar height */
}
.main-content {
  flex: 1;
  padding: 20px;
  background: #fbfdff;
}
</style>
