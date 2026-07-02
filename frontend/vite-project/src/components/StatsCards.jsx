import React from "react";
import "./StatsCards.css";

function StatsCards({ students, presentCount, absentCount }) {
  const attendanceRate =
    students.length === 0
      ? 0
      : Math.round((presentCount / students.length) * 100);

  return (
    <div className="stats-grid">

      <div className="stat-card total">
        <div className="icon">👨‍🎓</div>
        <h3>Total Students</h3>
        <h1>{students.length}</h1>
      </div>

      <div className="stat-card present">
        <div className="icon">✅</div>
        <h3>Present</h3>
        <h1>{presentCount}</h1>
      </div>

      <div className="stat-card absent">
        <div className="icon">❌</div>
        <h3>Absent</h3>
        <h1>{absentCount}</h1>
      </div>

      <div className="stat-card percentage">
        <div className="icon">📈</div>
        <h3>Attendance</h3>
        <h1>{attendanceRate}%</h1>
      </div>

    </div>
  );
}

export default StatsCards;