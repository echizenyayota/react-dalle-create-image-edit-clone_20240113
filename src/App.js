import { useState } from "react";
import Modal from "./components/Modal";

const App = () => {

  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const uploadImage = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    setModalOpen(true);
    setSelectedImage(e.target.files[0]);

    try {
      const options = {
        method: "POST",
        body: formData,
      }
      const response = await fetch('http://localhost:8000/upload', options);
      const data = await response.json();
      console.log(data);
    } catch(error) {
      console.error(error);
    }

  }

  const generatedEditImage = async () => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: "Make the background in the picture a beach"
        }),
        headers: {
          "Content-type": "application/json"
        },
      }
      const response = await fetch('http://localhost:8000/editImage', options);
      const data = await response.json();
      console.log(data);
      const imageUrl = data.data[0].url;
      setImages(imageUrl);
      setError(null);
      setModalOpen(false);
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div className="app">
      <div className="upload-image">
        <span>
          <label htmlFor="files">Upload an Image </label>
          <input onChange={uploadImage} id="files" accept="image/*" type="file" hidden />
          to edit
        </span>
        <div className="edit-image">
          {images && <img src={images} alt="Edited Image"/>}
        </div>
        {modalOpen && <div className="overlay">
          <Modal 
            setModalOpen={setModalOpen}
            setSelectedImage={setSelectedImage}
            selectedImage={selectedImage}
            generatedEditImage={generatedEditImage}
          />
        </div>}
      </div>
    </div>
  );
}

export default App;
