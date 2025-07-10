import { defineStore } from 'pinia';
export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    user: JSON.parse(localStorage.getItem('userData')) || null
  }),
  actions: {
    login(username, password) {
      const user = JSON.parse(localStorage.getItem('userData'));
      if (user && user.username === username && user.password === password) {
        this.isLoggedIn = true;
        this.user = user;
        localStorage.setItem('isLoggedIn', 'true');
        return true;
      }
      return false;
    },
    logout() {
      this.isLoggedIn = false;
      this.user = null;
      localStorage.removeItem('isLoggedIn');
    },
    register(username, password) {
      const newUser = { username, password };
      localStorage.setItem('userData', JSON.stringify(newUser));
    }
  }
});
