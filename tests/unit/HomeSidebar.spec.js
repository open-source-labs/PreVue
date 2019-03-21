import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import HomeSidebar from '@/components/HomeSidebar.vue';
import Icons from '@/components/Icons.vue';

const localVue = createLocalVue();

localVue.use(Vuex);
describe('HomeSidebar.vue', () => {
  let actions;
  let store;
  beforeEach(() => {
    actions = {
      handleClick: jest.fn()
    };
    store = new Vuex.Store({
      actions
    });
  });
  it('contains an input field', () => {
    const onClose = jest.fn();
    const wrapper = shallowMount(HomeSidebar, {
      propsData: { onClose }
    });
    console.log(wrapper.html());
    // expect(wrapper.contains('#input')).toBe(true);
  }),
    it('contains a button that clicks', () => {
      const test = jest.fn();
      const wrapper = shallowMount(HomeSidebar);
      wrapper.setMethods({
        test: test
      });
      wrapper.find('button').trigger('click');
      expect(test).toBeCalled();
      // expect(wrapper.contains('button')).toBe(true);
    }),
    it('contains Icons', () => {
      const wrapper = shallowMount(HomeSidebar);
      expect(wrapper.contains(Icons));
    });

  it('button click calls store action "registerComponent" when clicked', () => {
    const wrapper = shallowMount(HomeSidebar, {
      store,
      localVue
    });
    // wrapper.find('[data-component-name]').setValue('Hubert');
    // input.debug();
    const button = wrapper.find('button');
    button.trigger('click');
    // expect(button).toHaveBeenClicked();
    expect(actions.handleClick).toHaveBeenCalled();
  });
});
