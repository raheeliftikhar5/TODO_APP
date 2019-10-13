import React from 'react';
import {shallow} from 'enzyme';
import App from './App';

describe('App.test.js', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(<App/>);
  })
  
  afterEach(() => {
    wrapper = null;
  })
  
  it('renders application without crashing', () => {
    expect(wrapper.find('.App')).toBeDefined();
  });
});
