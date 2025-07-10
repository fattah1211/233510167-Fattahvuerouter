<script setup>
import { useSearchStore } from '../stores/searchStore';
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const router = useRouter(); 
const route = useRoute();
const auth = useAuthStore();
function logout() {
  if (confirm('Apakah Anda yakin ingin logout?')) {
    auth.logout();
    router.push('/login');
  }
}
const searchStore = useSearchStore();
const keywordInput = ref('');
watch(() => route.fullPath, () => {
  keywordInput.value = '';
});
const submitSearch = () => {
  searchStore.setKeyword(keywordInput.value);
  if (route.path !== '/berita') {
    router.push('/berita');
  }
};
</script>

<template>
  <nav class="navbar">
    <div class="navbar-left">
      <div class="logo-container">
        <span class="logo">🌴</span>
        <span class="brand">SawitKu</span>
      </div>
    </div>
    <div class="navbar-center">
      <div class="search-container">
        <input
          type="text"
          v-model="keywordInput"
          @keyup.enter="submitSearch"
          placeholder="Cari berita..."
          class="search-input"
        />
        <button @click="submitSearch" class="search-button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="navbar-right">
      <router-link 
        to="/profil" 
        class="nav-profile-link" 
        exact-active-class="active-profile"
        title="Profil"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </router-link>
      <button @click="logout" class="logout-button" title="Logout">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16,17 21,12 16,7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #2d5a3d 0%, #1a3d28 100%);
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 999;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.navbar-left {
  flex: 0 0 auto;
  min-width: 180px;
  margin-left: -0.5rem;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo {
  font-size: 2rem;
  animation: sway 4s ease-in-out infinite;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

@keyframes sway {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(8deg); }
  75% { transform: rotate(-8deg); }
}

.brand {
  font-weight: 700;
  font-size: 1.5rem;
  color: #ffffff;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.navbar-center {
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 500px;
  margin: 0 2rem;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 420px;
}

.search-input {
  width: 100%;
  padding: 0.875rem 1.5rem;
  padding-right: 3.5rem;
  border-radius: 30px;
  border: 2px solid rgba(255, 255, 255, 0.15);
  font-size: 1rem;
  outline: none;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.65);
}

.search-input:focus {
  background-color: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.35);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.search-button {
  position: absolute;
  right: 0.75rem;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.search-button:hover {
  background-color: rgba(255, 255, 255, 0.25);
  color: white;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.navbar-right {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 90px;
  justify-content: flex-end;
  margin-right: -0.5rem;
}

.nav-profile-link {
  color: #fff;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-profile-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.active-profile {
  background-color: rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.2);
}

.logout-button {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  backdrop-filter: blur(10px);
}

.logout-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}
@media (max-width: 768px) {
  .navbar {
    padding: 0 1rem;
    height: 60px;
  }
  
  .navbar-left {
    min-width: auto;
    margin-left: -0.25rem;
  }
  
  .brand {
    display: none;
  }
  
  .navbar-center {
    margin: 0 1rem;
  }
  
  .search-input {
    font-size: 0.9rem;
    padding: 0.75rem 1.25rem;
    padding-right: 3rem;
  }
  
  .navbar-right {
    min-width: auto;
    gap: 0.5rem;
    margin-right: -0.25rem;
  }
  
  .nav-profile-link,
  .logout-button {
    width: 32px;
    height: 32px;
    padding: 0.5rem;
  }
}

@media (max-width: 480px) {
  .navbar {
    padding: 0 0.75rem;
  }
  
  .navbar-center {
    margin: 0 0.75rem;
  }
  
  .search-input {
    padding: 0.625rem 1rem;
    padding-right: 2.75rem;
  }
  
  .search-button {
    right: 0.5rem;
    padding: 0.4rem;
  }
  
  .nav-profile-link,
  .logout-button {
    width: 30px;
    height: 30px;
    padding: 0.4rem;
  }
  
  .navbar-right {
    gap: 0.4rem;
  }
}
</style>