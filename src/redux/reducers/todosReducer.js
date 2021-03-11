import {types} from '../types/types';

const initialState = {
    todos: [],
    todoSelected: {},
    originalTodos: [],
};
export const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.getTodos:
          return {
            ...state,
            todos: action.payload,
            originalTodos: action.payload,
          };
        case types.setTodo:
          return {
            ...state,
            todoSelected: action.payload,
          };
        case types.setTodos:
          return {
            ...state,
            todos: action.payload,
          };
        case types.createTodo:
          const initialTodos = state.todos;
          const origTodos = state.originalTodos;
          return {
            ...state,
            todos: [...initialTodos, action.payload.data],
            originalTodos: [...origTodos, action.payload.data],
          };
        case types.deleteTodo:
          const initialArray = state.todos;
          const origArray = state.originalTodos;
          const newInitialTodos = initialArray.filter(
            (todo) => action.payload.data.id !== todo.id
          );
          const newOrigTodos = origArray.filter(
            (todo) => action.payload.data.id !== todo.id
          );
          return {
            ...state,
            todos: newInitialTodos,
            originalTodos: newOrigTodos,
          };
        default:
          return state;
      }
};
