import { createRouter, createWebHashHistory } from "vue-router";
import Home from '../views/home.vue'
import Harga from '../views/harga.vue'
import Profil from '../views/profil.vue'

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/harga', name: 'harga', component: Harga},
    {path: '/profil', name: 'profil', component: Profil}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router