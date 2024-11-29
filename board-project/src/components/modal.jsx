import { useState } from "react";

const Modal = ({ children, isEditing, checkModalStatus }) => {
  const [close, setClose] = useState(isEditing);
  const handleCloseModal = () => {
    setClose(false);
    checkModalStatus(false);
  };
  return (
    <>
      <div className="modal-dimmed" onClick={() => handleCloseModal()}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-inner">{children}</div>
        </div>
      </div>
    </>
  );
};
export default Modal;
