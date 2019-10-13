import React from 'react';
import {connect} from 'react-redux';
import TodoList from '../../components/TodoList/TodoList';
import './Completed.scss';

class Completed extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      listType: 'completed',
    };
  }

  static getDerivedStateFromProps(props) {
    return {list: props.list};
  }

  render() {
    const {list, listType} = this.state;
    return (
      <div className="completed-page">
        {list && !list.length && <h4 className="text-center mt-5">No Completed Todos</h4>}
        <TodoList list={list} listType={listType}></TodoList>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let {list} = state;
  list = list.filter(item => item.is_completed && !item.is_deleted);
  return {
    list,
  }
};

export default connect(mapStateToProps, {})(Completed);