import { shallowMount, mount, get } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import App from '@/App.vue';
import NavBar from '@/components/NavBar.vue';

describe('App.vue', () => {
  it('renders App correctly', () => {
    const wrapper = shallowMount(App);
    expect(wrapper.element).toMatchSnapshot();
  }),
    it('contains v-main element that wraps router-view', () => {
      const wrapper = shallowMount(App, {});
      expect(wrapper.get('v-main')).toBeTruthy();
      expect(wrapper.get('v-main > router-view')).toBeTruthy();
    });
});

describe('App.vue', () => {
  it('should renders elements found in children', () => {
    const wrapper = mount(App, {
      components: {
        NavBar,
      },
    });
    expect(wrapper.find('h1').exists()).toBeTruthy();
    expect(wrapper.find('i').exists()).toBeTruthy();
    expect(wrapper.find('button').exists()).toBeTruthy();
  });
});
