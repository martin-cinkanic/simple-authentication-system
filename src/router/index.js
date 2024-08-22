import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';
import { useAuthStore } from '../stores/authStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'dashboard',
      meta: { requiresAuth: true },
      component: () => DashboardView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' });
  } else if (
    authStore.isAuthenticated &&
    (to.name === 'login' || to.name === 'register')
  ) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
});

export default router;
