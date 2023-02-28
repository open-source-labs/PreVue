// import Vue from 'vue'; // not being read
import * as VueRouter from 'vue-router';
import '{{ component }}' from '{{ filename }}';

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  base: import.meta.env.BASE_URL,
  routes: {{ routes }},
});

export default router;