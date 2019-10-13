import React from 'react';
import {connect} from 'react-redux';
import TodoList from '../../components/TodoList/TodoList';
import './Pending.scss';

class Pending extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      listType: 'pending',
    };
  }

  static getDerivedStateFromProps(props) {
    return {list: [...props.list]};
  }

  render() {
    const {list, listType} = this.state;
    return (
      <div className="pending-page">
        {list && !list.length && <h4 className="text-center mt-5">No Pending Todos</h4>}
        <TodoList list={list} listType={listType}></TodoList>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let {list} = state;
  list = list.filter(item => !item.is_completed && !item.is_deleted);
  return {
    list,
  }
};

export default connect(mapStateToProps, {})(Pending);