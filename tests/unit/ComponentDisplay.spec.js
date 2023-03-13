import { shallowMount, mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { describe, it, expect } from 'vitest';
import ComponentDisplay from '@/components/ComponentDisplay.vue';
import Vue3DraggableResizable from 'vue3-draggable-resizable';

describe('ComponentDisplay', () => {
  const store = createStore({
    state() {
      return {
        activeComponent: 'active',
        activeRoute: 'test',
        routes: {
          test: ["test"],
        },
        componentMap: {
          active: {
            children: [],
          },
        },
      };
    },
  });
  it('properly renders HTML element', () => {
    const wrapper = shallowMount(ComponentDisplay, {
      global: { plugins: [store] },
    });

    expect(wrapper.find('div').exists()).toBeTruthy();
  });

  it('properly renders children component', () => {
    const wrapper = mount(ComponentDisplay, {
      components: { Vue3DraggableResizable },
      global: { plugins: [store] },
    });
    expect(
      wrapper.findComponent({ name: 'Vue3DraggableResizable' }).exists()
    ).toBeTruthy();
  });
});
