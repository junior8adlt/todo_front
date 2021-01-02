import React, { useState, useEffect } from "react";
import Modal from "./Modal/Modal";
import { createTodo, updateTodo } from "../redux/todoDucks";
import { useDispatch } from "react-redux";
import { closeSidebar } from "../redux/generalDucks";

const CRUDModal = ({
  isOpenModal,
  closeModal,
  filterDate,
  modalTitle,
  isEdit,
  todoSelected,
}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  useEffect(() => {
    if (isEdit) {
      setTitle(todoSelected.title);
      setDesc(todoSelected.description);
    }
  }, [todoSelected, isEdit]);
  const closeAndCleanModal = () => {
    closeModal();
    if (isEdit) {
      dispatch(closeSidebar());
    } else {
      setTitle("");
      setDesc("");
    }
  };

  const createEdit = async (e) => {
    e.preventDefault();
    const params = {
      title,
      description: desc,
    };
    if (isEdit) {
      if (!title.trim()) {
        console.log("titulo no puede estar vacio");
        return;
      }
      if (!desc.trim()) {
        console.log("descripcion no puede estar vacio");
        return;
      }
      await dispatch(updateTodo(params));
      closeAndCleanModal();
    } else {
      console.log("entre");
      if (!title.trim()) {
        console.log("titulo no puede estar vacio");
        return;
      }
      if (!desc.trim()) {
        console.log("descripcion no puede estar vacio");
        return;
      }
      console.log(filterDate);
      await dispatch(createTodo(params, filterDate));
      closeAndCleanModal();
    }
  };

  return (
    <div>
      <Modal title={modalTitle} isOpen={isOpenModal} closeModal={closeModal}>
        <form
          onSubmit={createEdit}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label htmlFor='input_title'>Title (Required)</label>
          <input
            type='text'
            id='input_title'
            name='input_title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor='text_description'>Description</label>
          <textarea
            cols='20'
            id='text_description'
            name='text_description'
            rows='5'
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <div className=' buttons d-flex mt-5 justify-content-end'>
            <button
              className='cancel-btn mr-4'
              onClick={() => closeAndCleanModal()}
              type='button'
            >
              Cancel
            </button>
            <button type='submit' className='save-btn'>
              {isEdit ? "Edit" : "Save"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CRUDModal;
