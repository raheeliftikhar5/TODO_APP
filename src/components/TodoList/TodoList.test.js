import React from 'react';
import {mount} from 'enzyme';
import TodoList from './TodoList';

jest.mock('../TodoItem/TodoItem', () => () => {
  return <div className="todo-item"></div>
});

function mountComponent(list = []) {
  const wrapper = mount( <TodoList list={list}/>);
  return wrapper;
}

describe('TodoList.test.js', () => {
  it("should render todolist component", () => {
    const wrapper = mountComponent();
    expect(wrapper.find('.todo-list')).toBeDefined();
  })

  it("should render list items", () => {
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
  })
})
