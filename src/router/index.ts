import { createRouter, createWebHistory } from 'vue-router';
import { useCartStore } from '../stores/cartStore';
import HomeView from '@/views/HomeView.vue';
import CheckoutView from '../views/CheckoutView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutView,
    beforeEnter: (to:any, from: any, next: any) => {
      const cartStore = useCartStore();
      if (cartStore.hasCart) {
        next();
      } else {
        next({ name: 'home' });
      }
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;