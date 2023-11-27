import * as VueRouter from 'vue-router';
import Home from './views/HomeView.vue';
import Splash from './views/SplashView.vue';
// flagged due to linting configuration, remains functional
const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Splash,
      meta: {
        hideNavbar: true
      }
    },
    {
      path: '/tree',
      name: 'tree',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/TreeView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }
  ]
});

export default router;
