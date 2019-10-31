import { mount } from '@vue/test-utils'
import GoogleMap from '@/components/GoogleMap'

describe('GoogleMap', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(GoogleMap,{
      propsData: {
        apiKey: 'testapikeys',
        markers: []
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
