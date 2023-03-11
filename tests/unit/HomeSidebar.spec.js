import { shallowMount, mount, createVuexStore } from '@vue/test-utils';
import { createStore } from 'vuex';
import HomeSidebar from '@/components/HomeSidebar.vue';
import Icons from '@/components/Icons.vue';
import ChildrenMultiselect from '@/components/ChildrenMultiselect.vue';

describe('HomeSidebar.vue', () => {

  const store = createStore({
    state() {
      return {
        store1: "",
        store2: "",
        componentNameInputValue: ""
      };
    },
  });
  it('properly renders elements and checks to see proper wrapping', () => {
    const wrapper = shallowMount(HomeSidebar, {
      components: {
        ChildrenMultiselect,
        Icons
      },
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.find('v-card')).toBeTruthy();
    expect(wrapper.find('v-card-actions > router-view')).toBeTruthy();
  });


  it('renders the ChildrenMultiselect component', () => {
    const wrapper = shallowMount(HomeSidebar, {
      components: {
        ChildrenMultiselect,
        Icons
      },
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.findComponent({ name: 'ChildrenMultiselect' }).exists()).toBeTruthy();
  })
});

// describe('HomeSideBar.vue', () => {
//   it('properly renders the html element of children', () => {
//     const store = createStore({
//       state() {
//         return {
//           selectedElementList: [{ id: 1, name: 'Element 1' }],
//           componentNameInputValue: 'mock value',
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
//       computed: {
//         validateInput() {
//           componentNameInputValue: "";
//         },
//       },
//     });
//     expect(wrapper.find('div').exists()).toBeTruthy();

//   });
// });

// describe('HomeSidebar.vue', () => {
//   it('renders the ChildrenMultiselect component', () => {
// const store = createStore({
//   state() {
//     return {
//       selectedElementList: [{ id: 1, name: 'Element 1' }],
//       componentNameInputValue: 'mock value',
//     };
//   },
// });

// const wrapper = mount(HomeSidebar, {
//   components: {
//     ChildrenMultiselect,
//   },
//   global: {
//     plugins: [store],
//   },
//   computed: {
//     validateInput() {
//       componentNameInputValue: "";
//     },
//   },
// });
//     expect(wrapper.findComponent({ name: 'ChildrenMultiselect' }).exists()).toBeTruthy();
//   });

// });
