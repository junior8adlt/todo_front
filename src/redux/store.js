import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import {todosReducer} from "./reducers/todosReducer";
import {generalReducer} from "./reducers/generalReducer";
const rootReducer = combineReducers({
  todos: todosReducer,
  general: generalReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
}
