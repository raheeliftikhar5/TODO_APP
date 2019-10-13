import { addItem, updateItem, deleteItem, restoreItem, markComplete, markInComplete } from '../actions';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();
const store = mockStore();

describe("actions.test.js", () => {
  afterEach(() => {
    store.clearActions();
  })

  it("should trigger CREATE_ITEM action on adding todo", () => {
    const todo = {
      id: null,
      text: 'Hello World',
    }
    const expectedPayload = { item: {...todo}, type: "CREATE_ITEM" };
    store.dispatch(addItem(todo));
    expect(store.getActions()).toEqual([expectedPayload]);
  })
  it("should trigger EDIT_ITEM action on updaing todo", () => {
    const todo = {
      id: 1,
      text: 'Hello World',
    }
    const expectedPayload = { item: {...todo}, type: "EDIT_ITEM" };
    store.dispatch(updateItem(todo));
    expect(store.getActions()).toEqual([expectedPayload]);
  })
  it("should trigger DELETE_ITEM action on deleting todo", () => {
    const todo = {
      id: 1,
      text: 'Hello World',
    }
    const expectedPayload = { id: todo.id, is_deleted: true, type: "DELETE_ITEM" };
    store.dispatch(deleteItem(todo.id));
    expect(store.getActions()).toEqual([expectedPayload]);
  })
  it("should trigger RESTORE_ITEM action on restoring todo", () => {
    const todo = {
      id: 1,
      text: 'Hello World',
    }
    const expectedPayload = { id: todo.id, is_deleted: false, type: "RESTORE_ITEM" };
    store.dispatch(restoreItem(todo.id));
    expect(store.getActions()).toEqual([expectedPayload]);
  })
  it("should trigger MARK_COMPLETE action on adding todo", () => {
    const todo = {
      id: 1,
      text: 'Hello World',
    }
    const expectedPayload = { id: todo.id, is_completed: true, type: "MARK_COMPLETE" };
    store.dispatch(markComplete(todo.id));
    expect(store.getActions()).toEqual([expectedPayload]);
  })
  it("should trigger MARK_INCOMPLETE action on adding todo", () => {
    const todo = {
      id: 1,
      text: 'Hello World',
    }
    const expectedPayload = { id: todo.id, is_completed: false, type: "MARK_INCOMPLETE" };
    store.dispatch(markInComplete(todo.id));
    expect(store.getActions()).toEqual([expectedPayload]);
  })
})