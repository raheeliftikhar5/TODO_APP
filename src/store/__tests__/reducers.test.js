import reducer from '../reducers';
const initialState = {
  items_count: 0,
  list: [],
};

describe("reducers.test.js", () => {
  it("should return intial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  })

  it("should add todo to list on CREATE_ITEM action", () => {
    const action = {
      type: 'CREATE_ITEM',
      item: {
        id: null,
        text: 'HELLO WORLD',
        due_date: '2019-10-10',
        is_completed: false,
        is_deleted: false,
      }
    };

    const updatedState = {
      items_count: 1,
      list: [{
        ...action.item,
        id: 1,
      }],
    };

    expect(reducer(initialState, action)).toEqual(updatedState);
  })

  it("should update todo in list on EDIT_ITEM action", () => {
    const action = {
      type: 'EDIT_ITEM',
      item: {
        id: 1,
        text: 'HELLO WORLD 2',
        due_date: '2019-10-10',
        is_completed: true,
        is_deleted: false,
      }
    };
    
    const initialState = {
      items_count: 1,
      list: [{
        ...action.item,
        text: 'HELLO WORLD',
        is_completed: false,
      }],
    };

    const updatedState = {
      items_count: 1,
      list: [{
        ...action.item,
        is_completed: true,
      }],
    };

    expect(reducer(initialState, action)).toEqual(updatedState);
  })

  it("should mark todo complete in list on MARK_COMPLETE action", () => {
    const todo = {
      id: 1,
      text: 'HELLO WORLD 2',
      due_date: '2019-10-10',
      is_completed: false,
      is_deleted: false,
    };

    const action = {
      type: 'MARK_COMPLETE',
      id: todo.id,
      is_completed: true,
    };
    
    const initialState = {
      items_count: 1,
      list: [{
        ...todo,
      }],
    };
    const date = new Date();
    const completed_date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const updatedState = {
      items_count: 1,
      list: [{
        ...todo,
        is_completed: true,
        completed_date: completed_date,
      }],
    }

    expect(reducer(initialState, action)).toEqual(updatedState);
  })

  it("should mark todo incomplete in list on MARK_INCOMPLETE action", () => {
    const todo = {
      id: 1,
      text: 'HELLO WORLD 2',
      due_date: '2019-10-10',
      is_completed: true,
      is_deleted: false,
    };

    const action = {
      type: 'MARK_INCOMPLETE',
      id: todo.id,
      is_completed: false,
    };
    
    const initialState = {
      items_count: 1,
      list: [{
        ...todo,
      }],
    };

    const updatedState = {
      items_count: 1,
      list: [{
        ...todo,
        is_completed: false,
        completed_date: null,
      }],
    }
    expect(reducer(initialState, action)).toEqual(updatedState);
  })

  it("should delete todo in list on DELETE_ITEM action", () => {
    const todo = {
      id: 1,
      text: 'HELLO WORLD 2',
      due_date: '2019-10-10',
      is_completed: false,
      is_deleted: false,
    };

    const action = {
      type: 'DELETE_ITEM',
      id: todo.id,
      is_deleted: true,
    };
    
    const initialState = {
      items_count: 1,
      list: [{
        ...todo,
      }],
    };

    const updatedState = {
      items_count: 1,
      list: [{
        ...todo,
        is_deleted: true,
      }],
    }
    expect(reducer(initialState, action)).toEqual(updatedState);
  })

  it("should restore todo in list on RESTORE_ITEM action", () => {
    const todo = {
      id: 1,
      text: 'HELLO WORLD 2',
      due_date: '2019-10-10',
      is_completed: false,
      is_deleted: true,
    };

    const action = {
      type: 'RESTORE_ITEM',
      id: todo.id,
      is_deleted: false,
    };
    
    const initialState = {
      items_count: 1,
      list: [{
        ...todo,
      }],
    };

    const updatedState = {
      items_count: 1,
      list: [{
        ...todo,
        is_deleted: false,
      }],
    }
    expect(reducer(initialState, action)).toEqual(updatedState);
  })
})