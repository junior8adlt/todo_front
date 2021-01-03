import React from "react";
import "./Todos.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllTodos,
  updateCompleted,
  filterByDate,
  setSelectedTodo,
} from "../../redux/todoDucks";
import { openSidebar, showGeneralAlert } from "../../redux/generalDucks";
import {
  CheckCircle,
  CheckCircleFill,
  PlusCircle,
} from "react-bootstrap-icons";
import Moment from "react-moment";
import useModal from "../../hooks/useModal";
import CRUDModal from "../CRUDModal";
import Sidebar from "../Sidebar/Sidebar";

const Todos = () => {
  const dispatch = useDispatch();
  const allTodos = useSelector((store) => store.todos.todos);
  const todoSelected = useSelector((store) => store.todos.todoSelected);
  const [filterDate, setFilterDate] = useState("");
  const [isOpenModal, openModal, closeModal] = useModal();
  useEffect(async () => {
    await dispatch(getAllTodos());
    if (allTodos) {
      dispatch(
        showGeneralAlert({
          msg: "TODOS loaded successful",
          show: true,
          type: "success",
        })
      );
    } else {
      dispatch(
        showGeneralAlert({
          msg: "Something goes wrong...",
          show: true,
          type: "error",
        })
      );
    }
  }, [dispatch]);

  const renderTodos = (todo) => {
    return (
      <tr
        className='pointer'
        key={todo.id}
        onClick={() => setTodoAndOpenSidebar(todo)}
      >
        <td onClick={(e) => handleCompletedClick(e, todo)}>
          {todo.completed ? (
            <CheckCircleFill className='completed pointer' />
          ) : (
            <CheckCircle className='pending pointer' />
          )}
        </td>
        <td>{todo.title}</td>
        <td>
          <Moment format='DD/MMM/YYYY'>{todo.createdAt}</Moment>
        </td>
        <td>{todo.description}</td>
      </tr>
    );
  };

  const handleCompletedClick = (e, todo) => {
    e.stopPropagation();
    dispatch(updateCompleted(todo));
  };
  const setTodoAndOpenSidebar = (todo) => {
    dispatch(setSelectedTodo(todo));
    dispatch(openSidebar());
  };

  return (
    <div className='todos'>
      <h1 className='mb-2'>My Tasks</h1>
      <div className='table-responsive todos-table'>
        <div className='row justify-content-between mb-3 align-items-center'>
          <div className='col-md-4 col-sm-12 col-xl-4'>
            <h4>Tasks</h4>
          </div>
          <div className='col-md-8 col-sm-12 col-xl-8 text-right'>
            <div className='actions'>
              <input
                type='date'
                className='mr-4'
                onChange={(e) => {
                  dispatch(filterByDate(e.target.value));
                  setFilterDate(e.target.value);
                }}
              />
              <span className='separation'></span>
              <button className='main-btn ml-4' onClick={openModal}>
                <PlusCircle /> Add Task
              </button>
            </div>
          </div>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'></th>
              <th scope='col'>Title</th>
              <th scope='col'>Created</th>
              <th scope='col'>Description</th>
            </tr>
          </thead>
          <tbody>{allTodos.map(renderTodos)}</tbody>
        </table>
      </div>
      <CRUDModal
        isOpenModal={isOpenModal}
        closeModal={closeModal}
        filterDate={filterDate}
        modalTitle='New Task'
        isEdit={false}
      />
      <Sidebar todoObject={todoSelected} />
    </div>
  );
};

export default Todos;
