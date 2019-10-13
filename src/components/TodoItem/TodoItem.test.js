import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import TodoItem from './TodoItem';
import { deleteItem, restoreItem, markComplete, markInComplete} from '../../store/actions';

const mockStore = configureStore();
let store = null;

function mountComponent(todo={}) {
  store = mockStore();
  const wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <TodoItem todo={todo}/>
      </BrowserRouter>
    </Provider>
  );
  return wrapper;
}

describe("TodoItem.test.js", () => {
  it("should render todo item as pending", () => {
    const todo = {
      id: 1,
      text: 'Hello World',
      due_date: '2019-10-10',
      completed_date: null,
      is_completed: false,
      is_deleted: false,
    }
    const wrapper = mountComponent(todo);
    expect(wrapper.find('.todo-item')).toBeDefined();
    expect(wrapper.find('.status-checkbox').props().checked).toEqual(false);
  })

  it("should render todo item as completed", () => {
    const todo = {
      id: 1,
      text: 'Hello World',
      due_date: '2019-10-10',
      completed_date: null,
      is_completed: true,
      is_deleted: false,
    }
    const wrapper = mountComponent(todo);
    expect(wrapper.find('.todo-item')).toBeDefined();
    expect(wrapper.find('.status-checkbox').props().checked).toEqual(true);
  })

  it("should render todo item as deleted", () => {
    const todo = {
      id: 1,
      text: 'Hello World',
      due_date: '2019-10-10',
      completed_date: null,
      is_completed: true,
      is_deleted: true,
    }
    const wrapper = mountComponent(todo);
    expect(wrapper.find('.todo-item')).toBeDefined();
    expect(wrapper.find('.restore-icon')).toBeDefined();
  })

  it("should render todo item as deleted", () => {
    const todo = {
      id: 1,
      text: 'Hello World',
      due_date: '2019-10-10',
      completed_date: null,
      is_completed: true,
      is_deleted: false,
    }
    const wrapper = mountComponent(todo);
    expect(wrapper.find('.todo-item')).toBeDefined();
    expect(wrapper.find('.deleted-icon')).toBeDefined();
  })

  it("should trigger \'markComplete\' action", () => {
    const todo = {
      id: 1,
      text: 'Hello World',
      due_date: '2019-10-10',
      completed_date: null,
      is_completed: false,
      is_deleted: false,
    }
    const wrapper = mountComponent(todo);
    const checkbox = wrapper.find('.status-checkbox');
    expect(wrapper.find('.todo-item')).toBeDefined();
    expect(checkbox.props().checked).toEqual(false);
    checkbox.props().onChange({target: {checked: true}});
    expect(store.getActions()).toContainEqual(markComplete(todo.id));
  })

  it("should trigger \'markInComplete\' action", () => {
    const todo = {
      id: 1,
      text: 'Hello World',
      due_date: '2019-10-10',
      completed_date: null,
      is_completed: true,
      is_deleted: false,
    }
    const wrapper = mountComponent(todo);
    const checkbox = wrapper.find('.status-checkbox');
    expect(wrapper.find('.todo-item')).toBeDefined();
    expect(checkbox.props().checked).toEqual(true);
    checkbox.props().onChange({target: {checked: true}});
    expect(store.getActions()).toContainEqual(markInComplete(todo.id));
  })

  it("should trigger \'deleteItem\' action", () => {
    const todo = {
      id: 1,
      text: 'Hello World',
      due_date: '2019-10-10',
      completed_date: null,
      is_completed: false,
      is_deleted: false,
    }
    const wrapper = mountComponent(todo);
    const deleteIcon = wrapper.find('.delete-icon');
    expect(wrapper.find('.todo-item')).toBeDefined();
    deleteIcon.simulate('click');
    expect(store.getActions()).toContainEqual(deleteItem(todo.id));
  })

  it("should trigger \'restoreItem\' action", () => {
    const todo = {
      id: 1,
      text: 'Hello World',
      due_date: '2019-10-10',
      completed_date: null,
      is_completed: false,
      is_deleted: true,
    }
    const wrapper = mountComponent(todo);
    const deleteIcon = wrapper.find('.restore-icon');
    expect(wrapper.find('.todo-item')).toBeDefined();
    deleteIcon.simulate('click');
    expect(store.getActions()).toContainEqual(restoreItem(todo.id));
  })
})