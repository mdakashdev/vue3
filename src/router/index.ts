import {
  createRouter,
  createWebHistory
} from 'vue-router';

import AboutView from "@/views/AboutView.vue";
import TanStack from "@/views/TanStack.vue";
import Login from "@/views/auth/Login.vue";
import ComponentView from "@/views/ComponentView.vue";
import AppLayout from "@/layouts/AppLayout.vue"
import Dashboard from "@/components/Dashboard.vue"


const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '',
          component: Dashboard
        }
      ]
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
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/comp',
      name: 'component',
      component: ComponentView
    }
  ]
})

export default router;
