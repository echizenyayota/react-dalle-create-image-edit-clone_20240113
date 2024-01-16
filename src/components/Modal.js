import { useState } from "react";

const Modal = ({ setModalOpen, setSelectedImage}) => {

  const [error, setError] = useState(null);

  const closeModal = () => {
    setModalOpen(null);
    setSelectedImage(null);
  }

  return (
    <div className="modal">
      <div onClick={closeModal}>X</div>
    </div>
  );
}

export default Modal;