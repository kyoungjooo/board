import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Button from "./button";
const Alert = ({ children, alert, checkModalStatus }) => {
  const [close, setClose] = useState(alert);
  const handleCloseModal = () => {
    setClose(false);
    checkModalStatus(false);
  };
  return (
    <>
      <div className="modal-dimmed" onClick={() => handleCloseModal()}>
        <div
          className="modal-content alert-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-btn" onClick={handleCloseModal}>
            <IoCloseOutline />
          </button>
          <div className="modal-inner">{children}</div>
        </div>
      </div>
    </>
  );
};
export default Alert;
