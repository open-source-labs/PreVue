import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { describe, it, expect, vi } from 'vitest';
import Icons from '@/components/Icons.vue';

describe('Icons', () => {
  const store = createStore({
    state() {
      return {
        icons: { elementName: 'previousElement' },
      };
    },
  });

  it('after button, elementName is changed to newElement', () => {
    const wrapper = shallowMount(Icons, {
      global: { plugins: [store] },
    });

    //wrapper.vm is vue instance of mounted component, contains changeState function
    //spy will be object of changeState's metadata


    const spy = vi.spyOn(wrapper.vm,'changeState');
    const button = wrapper.find('button');
    button.trigger('click');

    
    expect(spy.called).toBeTruthy();
    expect(spy.callCount).toEqual(1)
    
    button.trigger('click');
    expect(spy.callCount).toEqual(2)

    
    vi.restoreAllMocks()

    expect(spy.callCount).toEqual(0)

  });
});


