const App = () => {

  const uploadImage = () => {

  }

  return (
    <div className="app">
      <div className="upload-image">
        <span>
          <label htmlFor="files">Upload an Image </label>
          <input onChange={uploadImage} id="files" accept="image/*" type="file" hidden />
          to edit
        </span>
      </div>
    </div>
  );
}

export default App;
