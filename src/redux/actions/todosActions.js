import axios from "axios";
import moment from "moment";
import {types} from '../types/types';


const apiUrl = "http://localhost:4000/v1/";

export const getAllTodos = () => async (dispatch) => {
    try {
      const resp = await axios.get(`${apiUrl}/todos`);
      dispatch({
        type: types.getTodos,
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
        type: types.setTodos,
        payload: todosFilter,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const setSelectedTodo = (todo) => async (dispatch) => {
    try {
      dispatch({
        type: types.setTodo,
        payload: todo,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const createTodo = (params, date) => async (dispatch) => {
    try {
      const resp = await axios({
        method: "post",
        url: `${apiUrl}/todos`,
        data: params,
      });
  
      dispatch({
        type: types.createTodo,
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
        type: types.setTodos,
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
        type: types.setTodos,
        payload: editArray,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const deleteTodo = (todo) => async (dispatch) => {
    try {
      await axios({
        method: "delete",
        url: `${apiUrl}/todos/${+todo.id}`,
      });
      dispatch({
        type: types.deleteTodo,
        payload: { data: todo },
      });
    } catch (error) {
      console.log(error);
    }
  };
  
