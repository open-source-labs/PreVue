import { shallowMount, mount, createVuexStore } from '@vue/test-utils';
import { createStore } from 'vuex';
import { describe, it, expect, vi } from 'vitest';
import ChildrenMultiselect from '@/components/ChildrenMultiselect.vue';
import VueMultiselect from 'vue-multiselect';

describe('ChildrenMultiselect', () => {
  const store = createStore({
    state() {
      return {
        routes: {},
        componentMap: {}
      };
    }
  });
  it('properly renders div container', () => {
    const wrapper = mount(ChildrenMultiselect, {
      global: { plugins: [store] }
    });
    expect(wrapper.find('div').exists()).toBeTruthy();
  });

  it('properly renders children component', () => {
    const wrapper = mount(ChildrenMultiselect, {
      components: { VueMultiselect },
      global: { plugins: [store] }
    });
    expect(
      wrapper.findComponent({ name: 'VueMultiselect' }).exists()
    ).toBeTruthy();
  });
});
