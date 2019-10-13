import React from 'react';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import Pending from './Pending';

const mockStore = configureStore();

function mountComponent(list = []) {
  const state = {
    list: list,
  }
  const store = mockStore(state);
  const wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <Pending/>
      </BrowserRouter>
    </Provider>
  );
  return wrapper;
}

describe('Pending.test.js', () => {
  it('should render pending page', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('.pending-page')).toBeDefined();
  });

  it('shoule render list of pending todo items', () => {
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
    expect(wrapper.find('.todo-item').length).toBe(list.length);
  });

  it('shoule not render list if there are no pending items', () => {
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
    expect(wrapper.find('.todo-item').length).toBe(0);
  });
});
