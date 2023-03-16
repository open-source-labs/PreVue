import { shallowMount, mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { describe, it, expect } from 'vitest';
import TreeGraph from '@/components/TreeGraph.vue';
import VueTree from '@ssthouse/vue3-tree-chart';

describe('TreeGraph', () => {
  const store = createStore({
    state() {
      return {
        componentMap: {},
      };
    },
  });
  it('properly renders HTML element', () => {
    const wrapper = shallowMount(TreeGraph, {
      global: { plugins: [store] },
    });

    expect(wrapper.find('div').exists()).toBeTruthy();
  });

  it('properly renders children component', () => {
    const wrapper = mount(TreeGraph, {
      components: { VueTree },
      global: { plugins: [store] },
    });
    expect(wrapper.findComponent({ name: 'VueTree' }).exists()).toBeTruthy();
  });
});
