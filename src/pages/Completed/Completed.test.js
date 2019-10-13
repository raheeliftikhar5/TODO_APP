import React from 'react';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import Completed from './Completed';

const mockStore = configureStore();

function mountComponent(list = []) {
  const state = {
    list: list,
  }
  const store = mockStore(state);
  const wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <Completed/>
      </BrowserRouter>
    </Provider>
  );
  return wrapper;
}

describe('Completed.test.js', () => {
  it('should render completed page', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('.completed-page')).toBeDefined();
  });

  it('shoule render list of completed todo items', () => {
    let list = [];
    for (let i = 0; i < 5; i++) {
      list.push({
        id: i+1,
        text: 'Todo Item',
        due_date: '2019-10-3',
        is_completed: true,
        is_deleted: false
      });
    }
    const wrapper = mountComponent(list);
    expect(wrapper.find('.todo-item').length).toBe(list.length);
  });

  it('shoule not render list if there are no completed items', () => {
    let list = [];
    for (let i = 0; i < 5; i++) {
      list.push({
        id: i+1,
        text: 'Todo Item',
        due_date: '2019-10-3',
        is_completed: false,
        is_deleted: false
      });
    }
    const wrapper = mountComponent(list);
    expect(wrapper.find('.todo-item').length).toBe(0);
  });
});
