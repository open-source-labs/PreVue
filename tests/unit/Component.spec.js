import { shallowMount, mount, createVuexStore } from '@vue/test-utils';
import { createStore } from 'vuex';
import { describe, it, expect, vi } from 'vitest';
import Vue3DraggableResizable from 'vue3-draggable-resizable';
import Component from '@/components/Component.vue';

describe('Component.vue', () => {
  it('properly renders the htlm element of children', () => {
    const wrapper = mount(Component);
    expect(wrapper.find('h3').exists()).toBeTruthy();
    expect(wrapper.find('h1').exists()).toBeFalsy();
    expect(wrapper.find('div').exists()).toBeTruthy();
    expect(wrapper.find('h5').exists()).toBeFalsy();
  });
});

describe('Component.vue', () => {
  it('properly imports Vue3Draggable and renders the component', () => {
    const store = createStore({
      state() {
        return {
          selectedElementList: [{ id: 1, name: 'Element 1' }],
        };
      },
    });

    const wrapper = mount(Component, {
      components: {
        Vue3DraggableResizable,
      },
      global: {
        plugins: [store],
      },
    });
    expect(
      wrapper.findComponent({ name: 'Vue3DraggableResizable' }).exists()
    ).toBeTruthy();
    // expect(wrapper.findComponent({ name: 'HomeQueue' }).exists()).toBeTruthy();
  });
});
