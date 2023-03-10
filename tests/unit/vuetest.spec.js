import { shallowMount, mount, createVuexStore } from '@vue/test-utils';
import { createStore } from 'vuex';
import { describe, it, expect, vi } from 'vitest';
import Vue3DraggableResizable from 'vue3-draggable-resizable';
import Component from '@/components/Component.vue';
import HomeSidebar from '@/components/HomeSidebar.vue';
import ChildrenMultiselect from '@/components/ChildrenMultiselect.vue';

describe('Testing for elements', () => {
  it('should render', () => {
    const wrapper = mount(Component, {
      components: {
        Vue3DraggableResizable,
      },
    });
    expect(wrapper.find('h3').exists()).toBeTruthy();
    expect(wrapper.find('h1').exists()).toBeFalsy();
    expect(wrapper.find('div').exists()).toBeTruthy();
    expect(wrapper.find('h5').exists()).toBeFalsy();
  });
});

describe('Component.vue properly renders children', () => {
  it('should render', () => {
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

// describe('HomeSidebar.vue properly renders children', () => {
//   it('should render', () => {
//     const store = createStore({
//       state() {
//         return {
//           selectedElementList: [{ id: 1, name: 'Element 1' }],
//           componentNameInputValue: '',
//         };
//       },
//     });

//     const wrapper = mount(HomeSidebar, {
//       components: {
//         ChildrenMultiselect,
//       },
//       global: {
//         plugins: [store],
//       },
//     });
//     expect(wrapper.find('.children-multiselect').exists()).toBeTruthy();
//   });
// });
