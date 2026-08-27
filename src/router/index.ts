import {
  createRouter,
  createWebHistory
} from 'vue-router';

import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import TanStack from "@/views/TanStack.vue";


const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/tan',
      name: 'tanstack',
      component: TanStack
    }
  ]
})

export default router;
