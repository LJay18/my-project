import React from "react";
import "./Calendar.css";

function Calendar({ date, setDate }) {
  const previousDay = () => {
    const d = new Date(date);
    d.setDate(d.getDate() - 1);
    setDate(d.toISOString().split("T")[0]);
  };

  const nextDay = () => {
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    setDate(d.toISOString().split("T")[0]);
  };

  const today = () => {
    setDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <div className="calendar">

      <button onClick={previousDay}>⬅ Previous</button>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button onClick={nextDay}>Next ➡</button>

      <button className="today-btn" onClick={today}>
        Today
      </button>

    </div>
  );
}

export default Calendar;