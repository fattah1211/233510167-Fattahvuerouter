<template>
  <nav class="navbar">
    <div class="logo-container">
      <span class="logo">🌴</span>
      <span class="brand">SAWIT</span>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>
.navbar {
  background-color: #7fd687;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  height: 60px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

.brand {
  font-weight: bold;
  font-size: 1.25rem;
  color: #fff;
}
</style>
