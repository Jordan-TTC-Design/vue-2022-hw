import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
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
//路由跳轉後的頁面一率回頂端
router.beforeEach(() => {
  //chrome
  document.body.scrollTop = 0;
  //firefox
  document.documentElement.scrollTop = 0;
  //safari
  window.pageYOffset = 0;
});
export default router;
