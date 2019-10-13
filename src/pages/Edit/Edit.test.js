import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import {mount} from 'enzyme';
import EditPage from './Edit';
import { addItem, updateItem } from '../../store/actions';

const mockStore = configureStore();
let store;

function mountComponent(todo={}) {
  store = mockStore({list: [todo]});

  let match;
  if (todo && todo.id) {
    match = {path: `/edit/${todo.id}`, params: {id: 1}};
  } else {
    match = {path: `/create`, params: null};
  }
  const props = {
    match,
    history: {goBack: jest.fn()},
  }
  const wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <EditPage {...props}/>
      </BrowserRouter>
    </Provider>
  );
  return wrapper;
}
describe("Edit.test.js", () => {
  it("should render add todo form on /create route", () => {
    const wrapper = mountComponent();
    expect(wrapper.find({name: 'text'}).exists()).toBe(true);
    expect(wrapper.find({name: 'due_date'}).exists()).toBe(true);
    expect(wrapper.find({name: 'is_completed'}).exists()).not.toBe(true);
    expect(wrapper.find({name: 'is_deleted'}).exists()).not.toBe(true);
  })
  
  it("should trigger \'addItem\' action on adding new todo", () => {
    const todo = {
      id: null,
      text: 'Hello World',
      due_date: '2019-10-10',
      completed_date: null,
      is_deleted: false,
      is_completed: false,
    }
    const wrapper = mountComponent();
    expect(wrapper.find({name: 'text'}).exists()).toBe(true);
    expect(wrapper.find({name: 'due_date'}).exists()).toBe(true);
    expect(wrapper.find({name: 'is_completed'}).exists()).not.toBe(true);
    expect(wrapper.find({name: 'is_deleted'}).exists()).not.toBe(true);

    wrapper.find({name: 'text'}).simulate('change', {target: {name: 'text', value: todo.text}});
    wrapper.find({name: 'due_date'}).simulate('change', {target: {name: 'due_date', value: todo.due_date}});
    wrapper.find('form').simulate('submit');
    expect(store.getActions()).toContainEqual(addItem(todo));
  })
  
  it("should render edit todo form on /edit route", () => {
    const todo = {
      id: 1,
      text: 'Hello World',
      due_date: '2019-10-10',
      completed_date: null,
      is_completed: false,
      is_deleted: false,
    }
    const wrapper = mountComponent(todo);
    expect(wrapper.find({name: 'text'}).exists()).toBe(true);
    expect(wrapper.find({name: 'due_date'}).exists()).toBe(true);
    expect(wrapper.find({name: 'is_completed'}).exists()).toBe(true);
    expect(wrapper.find({name: 'is_deleted'}).exists()).toBe(true);
  })

  it("should trigger \'updateItem\' action on updating todo", () => {
    const todo = {
      id: 1,
      text: 'Hello World',
      due_date: '2019-10-10',
      completed_date: null,
      is_completed: false,
      is_deleted: false,
    }

    const updatedTodo = {...todo};
    updatedTodo.text = 'Hello World 2';
    updatedTodo.is_completed = true;

    const wrapper = mountComponent(todo);
    expect(wrapper.find({name: 'text'}).exists()).toBe(true);
    expect(wrapper.find({name: 'due_date'}).exists()).toBe(true);
    expect(wrapper.find({name: 'is_completed'}).exists()).toBe(true);
    expect(wrapper.find({name: 'is_deleted'}).exists()).toBe(true);

    wrapper.find({name: 'text'}).simulate('change', {target: {name: 'text', value: updatedTodo.text}});
    wrapper.find({name: 'is_completed'}).simulate('change', {target: {name: 'is_completed', checked: true}});
    wrapper.find('form').simulate('submit');
    expect(store.getActions()).toContainEqual(updateItem(updatedTodo));
  })
})