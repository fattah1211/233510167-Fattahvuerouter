<template>
  <div class="app-container">
    <template v-if="!isAuthPage">
      <Navbar />
      <div class="main-layout">
        <Sidebar class="sidebar" />
        <main class="main-content">
          <router-view />
        </main>
      </div>
    </template>
    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<script>
import Navbar from './components/navbar.vue';
import Sidebar from './components/sidebar.vue';
export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar
  },
  computed: {
    isAuthPage() {
      const authPages = ['/login', '/signup'];
      return authPages.includes(this.$route.path);
    }
  }
};
</script>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #47bc6e;
  color: #0a0a0a;
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
  overflow-y: auto;
  background-color: #ebf4ee;
}

.sidebar {
  width: 260px;
  background-color: #6e7973;
  border-right: 1px solid #edf5f0;
  flex-shrink: 0;
}
@media (max-width: 768px) {
  .main-layout {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    max-height: 60px;
    border-right: none;
    border-bottom: 1px solid #244031;
  }

  .main-content {
    padding: 1rem;
  }
}
.main-content {
  transition: padding 0.3s ease;
}

@media (prefers-reduced-motion: reduce) {
  .main-content {
    transition: none;
  }
}
</style>