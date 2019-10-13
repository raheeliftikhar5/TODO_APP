import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.scss';

class TodoList extends React.Component {
  constructor() {
    super();

    this.state = {
      list: [],
    }
  }

  static getDerivedStateFromProps(props) {
    return {
      list: props.list,
    };
  }

  render() {
    const {list} = this.state;
    return (
      <ul className="todo-list list-group">
        {
          list.map(todo => {
            return <TodoItem todo={todo} key={todo.id}></TodoItem>
          })
        }
      </ul>
    );
  }
}

export default TodoList;