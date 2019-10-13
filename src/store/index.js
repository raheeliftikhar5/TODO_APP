import { createStore } from 'redux';
import reducer from './reducers';
import { loadState, saveState } from './localstorage';

let initialState = {
  items_count: 0,
  list: [],
};

const stateLS = loadState();
if (stateLS) {
  initialState = stateLS;
}

const store = createStore(
  reducer,
  initialState,
);

store.subscribe(() => {
  saveState(store.getState())
})
export default store;