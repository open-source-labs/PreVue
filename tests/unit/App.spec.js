import { shallowMount, mount } from '@vue/test-utils';
import App from '@/App.vue';

describe('App.vue', () => {
  it('renders correct', () => {
    const wrapper = shallowMount(App);
    expect(wrapper.element).toMatchSnapshot();
  }),
    it('contains a section that wraps router-view', () => {
      const wrapper = shallowMount(App, {});
      expect(wrapper.contains('section')).toBe(true);
    });
});
