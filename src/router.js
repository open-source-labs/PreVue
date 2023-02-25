// import Vue from 'vue'; // not being read
import * as VueRouter from 'vue-router';
import Home from './views/HomeView.vue';

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/tree',
      name: 'tree',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/TreeView.vue'),
    },
    // {
    //   path: '*',
    //   redirect: '/',
    // },
  ],
});

export default router;
