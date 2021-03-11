import React, { useState, useEffect } from "react";
import { X, Trash, Pencil } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import { closeSidebar } from "../../redux/actions/generalActions";
import { deleteTodo, updateCompleted } from "../../redux/actions/todosActions";
import Moment from "react-moment";
import Modal from "../Modal/Modal";
import useModal from "../../hooks/useModal";
import CRUDModal from "../CRUDModal";

function Sidebar({ todoObject }) {
  const isSidebarOpen = useSelector((store) => store.general.sidebarOpen);
  const dispatch = useDispatch();
  const [isOpenDeleteModal, openDeleteModal, closeDeleteModal] = useModal();
  const [isOpenModal, openModal, closeModal] = useModal();
  const [completed, setCompleted] = useState(false);
  const deleteAndCloseSidebar = () => {
    dispatch(deleteTodo(todoObject));
    dispatch(closeSidebar());
    closeDeleteModal();
  };
  useEffect(() => {
    setCompleted(todoObject.completed);
  }, [todoObject]);

  const handleSelectChange = (e) => {
    const boolValue = e.target.value === "true";
    setCompleted(boolValue);
    const newObj = {
      ...todoObject,
      completed: !boolValue,
    };
    dispatch(updateCompleted(newObj));
  };

  return (
    <div className={`sidebar ${isSidebarOpen && "active"}`}>
      <div className='sidebar__header'>
        <X
          className='close__sidebar pointer'
          onClick={() => dispatch(closeSidebar())}
        />
      </div>
      <div className='sidebar__content'>
        <h2>{todoObject ? todoObject.title : "No Title"}</h2>
        <div className='row w-100'>
          <div className='col-md-12 mt-3'>
            <select
              value={completed}
              onChange={(e) => {
                handleSelectChange(e);
              }}
            >
              <option value={false}>Pending</option>
              <option value={true}>Completed</option>
            </select>

            <div className='text__content mt-5'>
              <div className='created'>
                <p className='bolded'>Created</p>
                <p>
                  {todoObject ? (
                    <Moment format='DD/MMM/YYYY'>{todoObject.createdAt}</Moment>
                  ) : (
                    <span>No Date</span>
                  )}
                </p>
              </div>

              <div className='description'>
                <p className='bolded'>Description</p>
                <p>{todoObject ? todoObject.description : "No Desc"}</p>
              </div>

              <div className='updated'>
                <p>
                  Updated{" "}
                  <Moment format='DD/MMM/YYYY, hh:mm a'>
                    {todoObject.updatedAt}
                  </Moment>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='sidebar__footer'>
        <div className='sidebar__buttons'>
          <button className='cancel-btn' onClick={openModal}>
            <Pencil /> Edit
          </button>
          <button className='cancel-btn ml-3' onClick={openDeleteModal}>
            <Trash /> Delete
          </button>
        </div>
      </div>
      <CRUDModal
        isOpenModal={isOpenModal}
        closeModal={closeModal}
        modalTitle='Edit Task'
        isEdit={true}
        todoSelected={todoObject}
      />
      <Modal
        title='Attention!'
        isOpen={isOpenDeleteModal}
        closeModal={closeDeleteModal}
      >
        <h3>Are you sure to delete the following todo: {todoObject.title}</h3>
        <div className='d-flex mt-5 justify-content-center'>
          <button className='cancel-btn mr-3' onClick={closeDeleteModal}>
            Cancel
          </button>
          <button
            className='save-btn ml-2'
            onClick={() => deleteAndCloseSidebar()}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Sidebar;
