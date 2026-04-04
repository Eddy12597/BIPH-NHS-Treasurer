import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import NotFound from '../pages/NotFound.vue'

const routes = [ 
  {
    path: '/',
    name: 'Home',
    component: Home  // No arrow function
  },
  {
    path: '/about',
    name: 'About',
    component: About  // No arrow function
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound  // No arrow function
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router