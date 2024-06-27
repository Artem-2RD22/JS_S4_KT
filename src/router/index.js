import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import ProductPage from '@/views/ProductPage.vue';
import CategoryPage from '@/views/CategoryPage.vue';
import CartPage from '@/views/CartPage.vue';
import FavoritesPage from '@/views/FavoritesPage.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/product/:id',
    name: 'ProductPage',
    component: ProductPage
  },
  {
    path: '/category/:id',
    name: 'CategoryPage',
    component: CategoryPage,
    props: true,
  },
  { 
    path: '/cart',
    name: 'Cart',
    component: CartPage 
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: FavoritesPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
