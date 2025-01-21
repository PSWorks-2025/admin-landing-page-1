import React, { useState } from "react";

const EventForm = ({ addEvent }) => {
  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent({ year, title, day, month });
    setYear("");
    setTitle("");
    setDay("");
    setMonth("");
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
      <button type="submit">Add Event</button>
    </form>
  );
};

export default EventForm;
