import React from 'react';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import Deleted from './Deleted';

const mockStore = configureStore();

function mountComponent(list = []) {
  const state = {
    list: list,
  }
  const store = mockStore(state);
  const wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <Deleted/>
      </BrowserRouter>
    </Provider>
  );
  return wrapper;
}

describe('Deleted.test.js', () => {
  it('should render deleted page', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('.deleted-page')).toBeDefined();
  });

  it('shoule render list of deleted todo items', () => {
    let list = [];
    for (let i = 0; i < 5; i++) {
      list.push({
        id: i+1,
        text: 'Todo Item',
        due_date: '2019-10-3',
        is_completed: false,
        is_deleted: true
      });
    }
    const wrapper = mountComponent(list);
    expect(wrapper.find('.todo-item').length).toBe(list.length);
  });

  it('shoule not render list if there are no deleted items', () => {
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
