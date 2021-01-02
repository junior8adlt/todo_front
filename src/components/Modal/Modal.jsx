import React from "react";
import "./Modal.css";

const Modal = ({ title, isOpen, closeModal, children }) => {
  const handeModalDialogClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div
      className={`dynamic-modal ${isOpen && "modal-isopen"}`}
      onClick={closeModal}
    >
      <div className='modal__dialog' onClick={handeModalDialogClick}>
        <div className='modal__content'>
          <h2>{title}</h2>
          <hr />
          <div className='modal__body'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
