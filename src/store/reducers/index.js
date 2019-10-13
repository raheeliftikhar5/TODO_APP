import actionTypes from '../actions/types';

const initialState = {
  items_count: 0,
  list: [],
};

const setCompletedDate = (item) => {
  const date = new Date();
  const completed_date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  if (item.is_completed) {
    item.completed_date = completed_date;
  } else {
    item.completed_date = null;
  }
  return item;
}
const addNewItem = (state, action) => {
  const newState = {...state};
  const todoItem = action.item;
  todoItem.id = ++newState.items_count;
  newState.list.push(todoItem);
  return newState;
}

const updateItem = (state, action) => {
  const newState = {...state};
  const todoItem = action.item;
  const {list} = newState;
  const itemIndex = list.findIndex(item => item.id === todoItem.id);
  if (itemIndex > -1) {
    list[itemIndex] = todoItem;
  }
  newState.list = list;
  return newState;
}

const toggleDelete = (state, action) => {
  const newState = {...state};
  const todoId = action.id;
  const {list} = newState;
  const itemIndex = list.findIndex(item => item.id === todoId);
  if (itemIndex > -1) {
    const item = list[itemIndex];
    item.is_deleted = action.is_deleted;
    list[itemIndex] = item;
  }
  newState.list = list;
  return newState;
}

const toggleComplete = (state, action) => {
  const newState = {...state};
  const todoId = action.id;
  const {list} = newState;
  const itemIndex = list.findIndex(item => item.id === todoId);
  if (itemIndex > -1) {
    let item = list[itemIndex];
    item.is_completed = action.is_completed;
    item = setCompletedDate(item);
    list[itemIndex] = item;
  }
  newState.list = list;
  return newState;
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.CREATE_ITEM:
      return addNewItem(state, action);
    case actionTypes.EDIT_ITEM:
      return updateItem(state, action);
    case actionTypes.DELETE_ITEM:
      return toggleDelete(state, action);
    case actionTypes.RESTORE_ITEM:
      return toggleDelete(state, action);
    case actionTypes.MARK_COMPLETE:
      return toggleComplete(state, action);
    case actionTypes.MARK_INCOMPLETE:
      return toggleComplete(state, action);
    default: 
      return state;
  }
}

export default reducer;
