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
  const [errorTitle, setErrorTitle] = useState(null);
  const [errorDesc, setErrorDesc] = useState(null);

  useEffect(() => {
    if (isEdit) {
      setTitle(todoSelected.title);
      setDesc(todoSelected.description);
    }
  }, [todoSelected, isEdit]);
  const closeAndCleanModal = () => {
    closeModal();
    setErrorTitle(null);
    setErrorDesc(null);

    if (isEdit) {
      dispatch(closeSidebar());
    } else {
      setTitle("");
      setDesc("");
    }
  };

  const createEdit = async (e) => {
    e.preventDefault();
    try {
      const params = {
        title,
        description: desc,
      };
      if (isEdit) {
        if (!title.trim()) {
          setErrorTitle("Required");
          return;
        } else {
          setErrorTitle(null);
        }
        if (!desc.trim()) {
          setErrorDesc("Required");
          return;
        } else {
          setErrorDesc(null);
        }
        await dispatch(updateTodo(params));
        closeAndCleanModal();
      } else {
        if (!title.trim()) {
          setErrorTitle("Required");
          return;
        } else {
          setErrorTitle(null);
        }
        if (!desc.trim()) {
          setErrorDesc("Required");
          return;
        } else {
          setErrorDesc(null);
        }

        await dispatch(createTodo(params, filterDate));

        closeAndCleanModal();
      }
    } catch (error) {
      console.log(error);
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
          <p className='text-error'>{errorTitle && errorTitle}</p>
          <label htmlFor='text_description'>Description</label>
          <textarea
            cols='20'
            id='text_description'
            name='text_description'
            rows='5'
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <p className='text-error'>{errorDesc && errorDesc}</p>
          <div className=' buttons d-flex mt-3 justify-content-end'>
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
