<template>
  <div class="app-container">
    <Navbar />
    <div class="main-layout">
      <Sidebar />
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import Navbar from './components/navbar.vue'
import Sidebar from './components/sidebar.vue'

export default {
  components: {
    Navbar,
    Sidebar
  }
}
</script>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}

.main-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.main-content {
  flex: 1;
  padding: 2rem;
  background-color: #f9fdfb; 
  overflow-y: auto;
}
</style>
