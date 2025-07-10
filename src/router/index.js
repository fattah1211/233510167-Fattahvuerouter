import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/home.vue';
import Harga from '../views/harga.vue';
import Profil from '../views/profil.vue';
import JenisSawit from '../views/jenisSawit.vue';
import Berita from '../views/berita.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/hargaSawit', name: 'harga', component: Harga },
  { path: '/profil', name: 'profil', component: Profil },
  { path: '/jenissawit', name: 'jenisSawit', component: JenisSawit },
  { path: '/berita', name: 'berita', component: Berita },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Signup', component: Signup }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
const publicPages = ['/login', '/signup'];
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!publicPages.includes(to.path) && !isLoggedIn) {
    next('/login');
  } else if (to.path === '/login' && isLoggedIn) {
    next('/');
  } else {
    next();
  }
});

export default router;
