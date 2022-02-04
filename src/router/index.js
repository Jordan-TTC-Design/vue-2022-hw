import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'FrontLayout',
      component: () => import('../views/FrontLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/front/Home.vue'),
        },
      ],
    },
    {
      path: '/admin',
      name: 'AdminLayout',
      component: () => import('../views/AdminLayout.vue'),
      children: [
        {
          path: 'login',
          component: () => import('../views/admin/AdminLogin.vue'),
        },
        {
          path: '',
          component: () => import('../views/admin/AdminProducts.vue'),
        },
      ],
    },
  ],
});

export default router;
