import { shallowMount, mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex';
import App from '@/App.vue';
import NavBar from '@/components/NavBar.vue';

describe('App.vue', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        component: App,
        meta: {
          hideNavbar: true
        }
      }
    ]
  });

  const store = createStore({
    state() {
      return {};
    }
  });

  it('contains v-main element that wraps router-view', () => {
    const wrapper = shallowMount(App, {
      global: {
        plugins: [router, store]
      }
    });
    expect(wrapper.find('v-main')).toBeTruthy();
    expect(wrapper.find('v-main > router-view')).toBeTruthy();
  });
});

describe('App.vue', () => {
  //create store with fake properties
  //before each it, when passing in arguments, pass in
  const store = createStore({
    state() {
      return {
        store1: '',
        store2: '',
        componentNameInputValue: '',
      };
    },
  });

    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/',
          component: App,
          meta: {
            hideNavbar: true
          }
        }
      ]
    });
  it('should renders elements found in children', () => {
    const wrapper = mount(App, {
      components: {
        NavBar,
      },
      global: {
        plugins: [store, router],
      },
    });
    expect(wrapper.find('h1').exists()).toBeTruthy();
  });

  it('should renders elements found in children', () => {
    const wrapper = mount(App, {
      components: {
        NavBar,
      },
      global: {
        plugins: [store, router],
      },
    });
    expect(wrapper.findComponent({ name: 'NavBar' }).exists()).toBeTruthy();
  });
});
