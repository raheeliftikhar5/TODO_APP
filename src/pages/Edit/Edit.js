import React from 'react';
import {connect} from 'react-redux';
import { addItem, updateItem } from '../../store/actions';
import './Edit.scss';

class Edit extends React.Component {
  constructor() {
    super();
    this.state = {
      editMode: true,
      todo: {
        id: null,
        text: '',
        due_date: '',
        completed_date: null,
        is_deleted: false,
        is_completed: false,
      },
    };

    this.onChange = this.onChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.checkEditOrCreate(this.props);
  }

  static getDerivedStateFromProps(props) {
    if (props.match.path === '/create') {
      return {editMode: false};
    }
    if (props.todo) {
      return {
        editMode: true,
        todo: props.todo,
      }
    }
    return {editMode: false};
  }
  
  checkEditOrCreate(props) {
    if (props.match.path === '/create') {
      this.setState({editMode: false});
    }
  }

  onChange(e) {
    const {todo} = this.state;
    if(e.target.name === 'is_completed' || e.target.name === 'is_deleted') {
      todo[e.target.name] = e.target.checked;
    } else {
      todo[e.target.name] = e.target.value;
    }
    this.setState(todo);
  }

  onCancel() {
    this.props.history.goBack();
  }

  onSubmit(e) {
    e.preventDefault();
    const {todo} = this.state;
    if (!todo.id) {
      this.props.addItem(todo);
    } else {
      this.props.updateItem(todo);
    }
    this.props.history.goBack();
  }

  render() {
    const { editMode, todo } = this.state;
    return (
      <div className="edit-page">
        <h3> {editMode ? 'Edit Item' : 'Add New Item'} </h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Description</label>
            <input type="text" className="form-control" required placeholder="Enter task description" name="text" value={todo.text} onChange={this.onChange}/>
          </div>
          <div className="row no-gutters align-items-end justify-content-between">
            <div className="form-group col-md-4">
              <label>Due Date</label>
              <input type="date" className="form-control" required name="due_date" value={todo.due_date} onChange={this.onChange}/>
            </div>
            {
              editMode && <span>
              <div className="form-group col-md-3">
                <input type="checkbox" className="form-check-input" name="is_completed" checked={todo.is_completed} onChange={this.onChange}/>
                <label className="form-check-label">Completed</label>
              </div>
              <div className="form-group col-md-3">
                <input type="checkbox" className="form-check-input" name="is_deleted" checked={todo.is_deleted} onChange={this.onChange}/>
                <label className="form-check-label">Deleted</label>
              </div>
              </span>
            }
          </div>
          <div className="row no-gutters">
            <button type="submit" className="btn btn-primary">{editMode ? 'Update': 'Save'} Changes</button>
            <button type="button" className="btn ml-2" onClick={this.onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  if (!ownProps || !ownProps.match || !ownProps.match.params) {
    return {
      todo: null,
    }
  }
  const {id} = ownProps.match.params;
  const {list} = state;
  const todo = list.find(item => item.id === parseInt(id));
  return {
    todo,
  } 
}

export default connect(mapStateToProps, {addItem, updateItem})(Edit);