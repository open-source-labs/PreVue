import { shallowMount, mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { describe, it, expect } from 'vitest';
import RouteDisplay from '@/components/RouteDisplay.vue';
import Routes from '@/components/Routes.vue';

describe('RouteDisplay', () => {
  const store = createStore({
    state() {
        return {
          routes: {
            test: ["test"],
          },
        };
      },
    });
  it('properly renders HTML elements', () => {
    const wrapper = shallowMount(RouteDisplay, {
      global: { plugins: [store] },
    });

    expect(wrapper.find('strong').exists()).toBeTruthy();
  });

  it('properly renders children component', () => {
    const wrapper = mount(RouteDisplay, {
      components: { Routes },
      global: { plugins: [store] },
    });
    expect(
      wrapper.findComponent({ name: 'Routes' }).exists()
    ).toBeTruthy();
  });
});
