import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteItem, restoreItem, markComplete, markInComplete} from '../../store/actions';
import './TodoItem.scss';

class TodoItem extends Component {
  constructor() {
    super();
    this.state = {
      todo: {},
    };

    this.toggleComplete = this.toggleComplete.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
  }

  static getDerivedStateFromProps(props) {
    return {
      todo: props.todo,
    };
  }

  toggleComplete() {
    const {todo} = this.state;
    todo.is_completed = !todo.is_completed;
    this.setState({todo: todo});
    
    if (todo.is_completed) {
      this.props.markComplete(todo.id);
    } else {
      this.props.markInComplete(todo.id);
    }
  }

  toggleDelete() {
    const {todo} = this.state;
    todo.is_deleted = !todo.is_deleted;
    this.setState({todo: todo});
    if (todo.is_deleted) {
      this.props.deleteItem(todo.id);
    } else {
      this.props.restoreItem(todo.id);
    }
  }

  render() {
    const {todo} = this.state;
    return (
      <div className="todo-item row no-gutters align-items-start">
        <div className="form-check">
          <input className="status-checkbox" type="checkbox" checked={todo.is_completed} onChange={this.toggleComplete}/>
        </div>
        <div className="col todo-item__content">
          <p>{todo.text}</p>
          <div>
            <small>Due: {todo.due_date}</small>
            { todo.completed_date ? <small className="ml-4">Completed: {todo.completed_date}</small> : '' }
          </div>
        </div>
        <div className="todo-item__actions">
          <Link  className="edit-icon icon" to={`/edit/${todo.id}`}>✎</Link>
          {!todo.is_deleted && <span className="delete-icon icon ml-3" onClick={this.toggleDelete}>×</span>}
          {todo.is_deleted && <span className="restore-icon icon ml-3" onClick={this.toggleDelete}>↻</span>}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  deleteItem,
  restoreItem,
  markComplete,
  markInComplete,
}

export default connect(null, mapDispatchToProps)(TodoItem);
