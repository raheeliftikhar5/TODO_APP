import actionTypes from './types'

const addItem = (item) => {
  return {
    type: actionTypes.CREATE_ITEM,
    item: item,
  };
}

const updateItem = (item) => {
  return {
    type: actionTypes.EDIT_ITEM,
    item: item,
  }
}

const deleteItem = (id) => {
  return {
    type: actionTypes.DELETE_ITEM,
    id: id,
    is_deleted: true,
  }
}

const restoreItem = (id) => {
  return {
    type: actionTypes.RESTORE_ITEM,
    id: id,
    is_deleted: false,
  }
}

const markComplete = (id) => {
  return {
    type: actionTypes.MARK_COMPLETE,
    id: id,
    is_completed: true,
  }
}

const markInComplete = (id) => {
  return {
    type: actionTypes.MARK_INCOMPLETE,
    id: id,
    is_completed: false,
  }
}

export {
  addItem,
  updateItem,
  deleteItem,
  restoreItem,
  markComplete,
  markInComplete,
}