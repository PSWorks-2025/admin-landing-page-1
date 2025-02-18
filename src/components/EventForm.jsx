import React, { useState } from "react";

const EventForm = ({ addEvent }) => {
  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [description, setDescription] = useState(""); // State to hold the description
  const [base64Image, setBase64Image] = useState(""); // State to hold the Base64 image

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent({ year, title, day, month, description, image: base64Image }); // Pass the Base64 image and description to addEvent
    setYear("");
    setTitle("");
    setDay("");
    setMonth("");
    setDescription(""); // Reset the description
    setBase64Image(""); // Reset the Base64 image
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result); // Set the Base64 string to state
      };
      reader.readAsDataURL(file); // Convert the file to Base64
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Day"
        value={day}
        onChange={(e) => setDay(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)} // Handle description change
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange} // Handle file selection
      />
      <button type="submit">Add Event</button>
    </form>
  );
};

export default EventForm;