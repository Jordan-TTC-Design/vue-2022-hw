import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'frontLayout',
      component: () => import('../views/frontLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/front/Home.vue'),
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/front/About.vue'),
        },
      ],
    },
  ],
});

export default router;
