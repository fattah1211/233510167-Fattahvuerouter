<template>
  <div class="signup-container">
    <div class="signup-card">
      <div class="signup-header">
        <div class="logo-section">
          <div class="logo-icon">🌴</div>
        </div>
        <h2 class="signup-title">Buat Akun Baru</h2>
      </div>
      <form @submit.prevent="handleSignup" class="signup-form">
        <div class="input-group">
          <div class="input-wrapper">
            <i class="fas fa-user input-icon"></i>
            <input
              v-model="username"
              type="text"
              placeholder="Username"
              required
              class="signup-input"
              :class="{ 'error': errorMessage && errorMessage.includes('username') }"
            />
          </div>
        </div>
        <div class="input-group">
          <div class="input-wrapper">
            <i class="fas fa-lock input-icon"></i>
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              required
              class="signup-input"
              :class="{ 'error': errorMessage && errorMessage.includes('Password') }"
            />
          </div>
        </div>
        <div class="input-group">
          <div class="input-wrapper">
            <i class="fas fa-lock input-icon"></i>
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="Konfirmasi Password"
              required
              class="signup-input"
              :class="{ 'error': errorMessage && errorMessage.includes('cocok') }"
            />
          </div>
        </div>
        <button type="submit" class="signup-button" :disabled="isLoading">
          <span class="button-text">
            <span v-if="isLoading">Mendaftar...</span>
            <span v-else>Daftar Sekarang</span>
          </span>
          <i class="fas fa-arrow-right button-icon" v-if="!isLoading"></i>
          <i class="fas fa-spinner loading-spinner" v-else></i>
        </button>
        <div v-if="errorMessage" class="error-message">
          <i class="fas fa-exclamation-circle error-icon"></i>
          {{ errorMessage }}
        </div>
        <div class="divider">
          <span class="divider-text">atau</span>
        </div>

        <p class="login-redirect">
          Sudah punya akun?
          <router-link to="/login" class="login-link">Masuk di sini</router-link>
        </p>
      </form>
    </div>
    <div class="background-decoration">
      <div class="decoration-circle circle-1"></div>
      <div class="decoration-circle circle-2"></div>
      <div class="decoration-circle circle-3"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const router = useRouter();
const auth = useAuthStore();
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const isLoading = ref(false);
const handleSignup = async () => {
  errorMessage.value = '';

  if (username.value.length < 3) {
    errorMessage.value = 'Username minimal 3 karakter!';
    return;
  }
  if (password.value.length < 6) {
    errorMessage.value = 'Password minimal 6 karakter!';
    return;
  }
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Password tidak cocok!';
    return;
  }
  try {
    isLoading.value = true;
    await auth.register(username.value, password.value);
    router.push('/login');
  } catch (error) {
    errorMessage.value = 'Terjadi kesalahan saat mendaftar. Silakan coba lagi.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.signup-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(135deg, #2e7d32 0%, #4caf50 50%, #66bb6a 100%);
  position: relative;
  overflow: hidden;
}

.background-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}
.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.circle-1 {
  width: 200px;
  height: 200px;
  top: -100px;
  left: -100px;
  animation: float 6s ease-in-out infinite;
}

.circle-2 {
  width: 300px;
  height: 300px;
  top: 50%;
  right: -150px;
  animation: float 8s ease-in-out infinite reverse;
}

.circle-3 {
  width: 150px;
  height: 150px;
  bottom: -75px;
  left: 30%;
  animation: float 7s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.signup-card {
  background: linear-gradient(145deg, #ffffff 0%, #f8fffe 100%);
  padding: 3rem 2.5rem;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 450px;
  text-align: center;
  position: relative;
  z-index: 2;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.signup-header {
  margin-bottom: 2rem;
}

.logo-section {
  margin-bottom: 1.5rem;
}

.logo-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  display: block;
}

.signup-title {
  font-size: 2rem;
  font-weight: 600;
  color: #2e7d32;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  position: relative;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  color: #2e7d32;
  font-size: 1.1rem;
  z-index: 1;
}

.signup-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  box-sizing: border-box;
}

.signup-input:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  transform: translateY(-1px);
}

.signup-input.error {
  border-color: #f44336;
  background: rgba(255, 245, 245, 0.9);
}

.signup-input.error:focus {
  box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
}

.signup-input::placeholder {
  color: #999;
}

.signup-button {
  background: linear-gradient(135deg, #4caf50, #2e7d32);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
  margin-top: 0.5rem;
}

.signup-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
}

.signup-button:active {
  transform: translateY(0);
}

.signup-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.button-text {
  font-size: 1.1rem;
}

.button-icon {
  font-size: 1rem;
  transition: transform 0.3s ease;
}

.signup-button:hover .button-icon {
  transform: translateX(3px);
}

.loading-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.error-message {
  color: #d32f2f;
  font-size: 0.9rem;
  background: linear-gradient(145deg, #ffebee, #fce4ec);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #ffcdd2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-align: left;
}

.error-icon {
  font-size: 1rem;
  color: #d32f2f;
}

.divider {
  position: relative;
  margin: 1rem 0;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, #e0e0e0, transparent);
}

.divider-text {
  background: linear-gradient(145deg, #ffffff 0%, #f8fffe 100%);
  padding: 0 1rem;
  color: #999;
  font-size: 0.9rem;
  position: relative;
  z-index: 1;
}

.login-redirect {
  margin: 0;
  font-size: 1rem;
  color: #666;
  line-height: 1.4;
}

.login-link {
  color: #2e7d32;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
}

.login-link:hover {
  color: #1b5e20;
}

.login-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(135deg, #4caf50, #2e7d32);
  transition: width 0.3s ease;
}

.login-link:hover::after {
  width: 100%;
}

@media (max-width: 768px) {
  .signup-container {
    padding: 1rem;
  }
  
  .signup-card {
    padding: 2rem 1.5rem;
    max-width: 100%;
  }
  
  .signup-title {
    font-size: 1.6rem;
  }
  
  .signup-input {
    padding: 0.8rem 0.8rem 0.8rem 2.5rem;
  }
  
  .input-icon {
    left: 0.8rem;
  }
  
  .signup-button {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
  
  .circle-1, .circle-2, .circle-3 {
    opacity: 0.5;
  }
}

@media (max-width: 480px) {
  .signup-card {
    padding: 1.5rem 1rem;
    border-radius: 16px;
  }
  
  .logo-icon {
    font-size: 2.5rem;
  }
  
  .signup-title {
    font-size: 1.4rem;
  }
  
  .signup-form {
    gap: 1.2rem;
  }
}

.fas {
  font-family: "Font Awesome 5 Free", sans-serif;
  font-weight: 900;
}

.input-icon::before {
  content: "👤";
}

.input-wrapper:nth-child(1) .input-icon::before {
  content: "👤";
}

.input-wrapper:nth-child(2) .input-icon::before {
  content: "🔒";
}

.input-wrapper:nth-child(3) .input-icon::before {
  content: "🔒";
}

.button-icon::before {
  content: "→";
}

.error-icon::before {
  content: "⚠";
}
</style>