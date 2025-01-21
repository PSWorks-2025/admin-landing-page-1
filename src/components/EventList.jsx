// src/components/EventList.jsx
import React from "react";

const EventList = ({ events, deleteEvent }) => {
  return (
    <div>
      {Object.keys(events).sort((a, b) => b - a).map((year) => (
        <div key={year}>
          <h3>{year}</h3>
          <ul>
            {Object.keys(events[year]).map(item => item.slice(6)).sort((a, b) => a - b).map((id) => {
              const eventId = "event_" + id;
              const event = events[year][eventId];
              return (
                <li key={eventId}>
                  {event.title} - {event.day}/{event.month}
                  <button
                    className="rounded-lg bg-blue-400 text-white px-4 py-1 ml-5"
                    onClick={() => deleteEvent(year, eventId)}
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default EventList;
