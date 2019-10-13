import React from 'react';
import {connect} from 'react-redux';
import TodoList from '../../components/TodoList/TodoList';
import './Deleted.scss';

class Deleted extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      listType: 'deleted',
    };
  }

  static getDerivedStateFromProps(props) {
    return {list: props.list};
  }

  render() {
    const {list, listType} = this.state;
    return (
      <div className="deleted-page">
        {list && !list.length && <h4 className="text-center mt-5">No Deleted Todos</h4>}
        <TodoList list={list} listType={listType}></TodoList>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let {list} = state;
  list = list.filter(item => item.is_deleted);
  return {
    list,
  }
};

export default connect(mapStateToProps, {})(Deleted);