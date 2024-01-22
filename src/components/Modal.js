import { useRef, useState } from "react";

const Modal = ({ setModalOpen, setSelectedImage, selectedImage, generatedEditImage }) => {

  const [error, setError] = useState(null);
  const ref = useRef(null);

  const closeModal = () => {
    setModalOpen(null);
    setSelectedImage(null);
  }

  const checkSize = () => {
    if (ref.current.width === 256 && ref.current.height === 256) {
      generatedEditImage();
    } else {
      setError('Error: Choose 256 * 256')
    }
  }

  return (
    <div className="modal">
      <div onClick={closeModal}>X</div>
      <div className="image-container">
        {selectedImage && <img ref={ref} src={URL.createObjectURL(selectedImage)} alt="uploaded Image"/>}
      </div>
      <p>{error || "* An Image must be 256 * 256!"}</p>
      {!error && <input />}
      {!error && <button onClick={checkSize}>Send</button>}
      {error && <button onClick={closeModal}>Close this and try again</button>}
    </div>
  );
}

export default Modal;