import { shallowMount, mount, createVuexStore } from '@vue/test-utils';
import { createStore } from 'vuex';
import HomeSidebar from '@/components/HomeSidebar.vue';
import Icons from '@/components/Icons.vue';
import ChildrenMultiselect from '@/components/ChildrenMultiselect.vue';


describe('HomeSidebar.vue', () => {
  it('renders the ChildrenMultiselect component', () => {
    const store = createStore({
      state() {
        return {
          selectedElementList: [{ id: 1, name: 'Element 1' }],
          componentNameInputValue: 'mock value',
        };
      },
    });

    const wrapper = mount(HomeSidebar, {
      components: {
        ChildrenMultiselect,
      },
      global: {
        plugins: [store],
      },
      computed: {
        validateInput() {
          componentNameInputValue: "";
        },
      },
    });
    expect(wrapper.findComponent({ name: 'ChildrenMultiselect' }).exists()).toBeTruthy();
  });

});