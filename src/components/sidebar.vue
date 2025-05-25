<template>
  <aside class="sidebar">
     <router-link to="/" class="menu" exact-active-class="active">🏠 Home</router-link>   
     <router-link to="/harga" class="menu" exact-active-class="active">💰 Harga Sawit</router-link> 
     <router-link to="/profil" class="menu" exact-active-class="active">👤 Profil</router-link>
  </aside>
</template>

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
</style>

