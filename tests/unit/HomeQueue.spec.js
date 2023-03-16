import { shallowMount, mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { describe, it, expect } from 'vitest';
import HomeQueue from '@/components/HomeQueue.vue';
import draggable from 'vuedraggable';

describe('HomeQueue', () => {
  const store = createStore({
    state() {
      return {};
    },
  });
  it('properly renders children component', () => {
    const wrapper = mount(HomeQueue, {
      components: { draggable },
      global: { plugins: [store] },
    });
    expect(wrapper.findComponent({ name: 'draggable' }).exists()).toBeTruthy();
  });
});
