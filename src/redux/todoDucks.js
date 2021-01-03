import axios from "axios";
import moment from "moment";

//API URL
const apiUrl = "http://localhost:4000/v1/";
//Constantes
const data = {
  todos: [],
  todoSelected: {},
  originalTodos: [],
};
//Types
const GET_TODOS = "GET_TODOS";
const SET_TODO = "SET_TODO";
const SET_TODOS = "SET_TODOS";
const CREATE_TODO = "CREATE_TODO";
const DELETE_TODO = "DELETE_TODO";
//Reducers
export default function todoReducer(state = data, action) {
  switch (action.type) {
    case "GET_TODOS":
      return {
        ...state,
        todos: action.payload,
        originalTodos: action.payload,
      };
    case "SET_TODO":
      return {
        ...state,
        todoSelected: action.payload,
      };
    case "SET_TODOS":
      return {
        ...state,
        todos: action.payload,
      };
    case "CREATE_TODO":
      const initialTodos = state.todos;
      const origTodos = state.originalTodos;
      return {
        ...state,
        todos: [...initialTodos, action.payload.data],
        originalTodos: [...origTodos, action.payload.data],
      };
    case "DELETE_TODO":
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
}
//Actions

export const getAllTodos = () => async (dispatch, getState) => {
  try {
    const resp = await axios.get(`${apiUrl}/todos`);
    console.log(url);
    dispatch({
      type: GET_TODOS,
      payload: resp.data.todosResults,
    });
  } catch (error) {
    console.log(error);
  }
};

export const filterByDate = (date) => async (dispatch, getState) => {
  try {
    const todos = getState().todos.originalTodos;
    let todosFilter = todos;
    if (date) {
      todosFilter = todos.filter(
        (todo) => moment(todo.createdAt).format("YYYY-MM-DD") === date
      );
    }
    dispatch({
      type: SET_TODOS,
      payload: todosFilter,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setSelectedTodo = (todo) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SET_TODO,
      payload: todo,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createTodo = (params, date) => async (dispatch, getState) => {
  try {
    const resp = await axios({
      method: "post",
      url: `${apiUrl}/todos`,
      data: params,
    });

    dispatch({
      type: CREATE_TODO,
      payload: { data: resp.data.todo, date },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompleted = (todo) => async (dispatch, getState) => {
  try {
    const todos = getState().todos.todos;
    await axios({
      method: "patch",
      url: `${apiUrl}/todos/${+todo.id}`,
      data: {
        completed: !todo.completed,
      },
    });
    const editArray = todos.map((item) =>
      item.id === todo.id
        ? {
            ...item,
            completed: !todo.completed,
          }
        : item
    );
    dispatch({
      type: SET_TODOS,
      payload: editArray,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateTodo = (params) => async (dispatch, getState) => {
  try {
    const todos = getState().todos.todos;
    const todoSelected = getState().todos.todoSelected;
    await axios({
      method: "put",
      url: `${apiUrl}/todos/${+todoSelected.id}`,
      data: params,
    });
    const editArray = todos.map((item) =>
      item.id === todoSelected.id
        ? {
            ...item,
            title: params.title,
            description: params.description,
          }
        : item
    );
    dispatch({
      type: SET_TODOS,
      payload: editArray,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = (todo) => async (dispatch, getState) => {
  try {
    const todos = getState().todos.todos;
    await axios({
      method: "delete",
      url: `${apiUrl}/todos/${+todo.id}`,
    });
    dispatch({
      type: DELETE_TODO,
      payload: { data: todo },
    });
  } catch (error) {
    console.log(error);
  }
};
