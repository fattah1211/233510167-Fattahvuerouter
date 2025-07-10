<template>
  <aside class="sidebar" :class="{ 'collapsed': !isMenuOpen }">
    <button @click="toggleMenu" class="hamburger-btn">
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>
    <div class="menu-items" v-show="isMenuOpen">
      <router-link to="/" class="menu" exact-active-class="active">Home</router-link>
      <router-link to="/hargaSawit" class="menu" exact-active-class="active">Harga Sawit</router-link>
      <router-link to="/jenissawit" class="menu" exact-active-class="active">Jenis Sawit</router-link> 
      <router-link to="/berita" class="menu" exact-active-class="active">Berita</router-link>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 220px;
  background-color: #effaf1;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  box-shadow: inset -1px 0 0 #ddd;
  transition: width 0.3s ease;
}

.sidebar.collapsed {
  width: 60px;
}

.hamburger-btn {
  background: none;
  border: none;
  padding: 0.75rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin: 0 0.75rem;
  border-radius: 6px;
  transition: background 0.2s;
}

.hamburger-btn:hover {
  background-color: #d7f5da;
}

.hamburger-line {
  width: 20px;
  height: 2px;
  background-color: #165c26;
  transition: all 0.3s ease;
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.menu {
  display: block;
  padding: 0.75rem 1.5rem;
  color: #165c26;
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.2s;
}

.menu:hover {
  background-color: #d7f5da;
}

.active {
  background-color: #b6e5bc;
  font-weight: bold;
}
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  
  .sidebar.collapsed {
    width: 100%;
    height: 60px;
  }
  
  .hamburger-btn {
    align-self: flex-start;
  }
}
</style>