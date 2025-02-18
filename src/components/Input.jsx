import React, { useState } from "react";
import "./styles.css";

function Input({ onSubmit }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageData, setImageData] = useState({
    title: "",
    date: "",
    row: "",
    column: "",
    imageUrl: "",
    description:""
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        setImagePreview(base64Image);
        setImageData((prev) => ({ ...prev, imageUrl: base64Image }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setImageData({ ...imageData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imageData.title && imageData.date && imageData.imageUrl) {
      onSubmit(imageData);
      setImageData({
        title: "",
        date: "",
        column: "",
        row: "",
        imageUrl: "",
        description:""
      });
      setImagePreview(null);
    } else {
      alert("Please fill out all required fields.");
    }
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <div className="file-upload-container">
        <div className="file-upload">
          <input
            className="file-input"
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <label className="file-label" htmlFor="fileInput">
            <i className="upload-icon">📁</i>
            <p>Drag &amp; Drop your file here or click to upload</p>
          </label>
        </div>
      </div>
      {imagePreview && (
        <div className="horizontal-preview">
          <img
            src={imagePreview}
            alt="Uploaded Preview"
            className="preview-image"
          />
          <div className="inputs">
            <input
              type="text"
              name="title"
              value={imageData.title}
              onChange={handleInputChange}
              placeholder="Title"
              required
            />
            <input
              type="date"
              name="date"
              value={imageData.date}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="column"
              value={imageData.column}
              onChange={handleInputChange}
              placeholder="Width"
            />
            <input
              type="text"
              name="row"
              value={imageData.row}
              onChange={handleInputChange}
              placeholder="Height"
            />

            <input
              type="text"
              className="w-1/2 h-auto"
              name="description"
              value={imageData.description}
              onChange={handleInputChange}
              placeholder="Description"
            />
            <button
              type="submit"
              className="rounded-lg bg-blue-500 py-2 px-4 text-white"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

export default Input;
