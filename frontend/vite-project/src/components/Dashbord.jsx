import React from "react";
import StatsCards from "./StatsCards";
import "./Dashboard.css";

function Dashboard({
  students,
  presentCount,
  absentCount,
  date,
}) {

  const attendanceRate =
    students.length === 0
      ? 0
      : Math.round((presentCount / students.length) * 100);

  return (
    <div className="dashboard">

      <div className="dashboard-header">

        <div>
          <h1>Dashboard</h1>
          <p>Attendance Overview</p>
        </div>

        <div className="date-box">
          📅 {date}
        </div>

      </div>

      <StatsCards
        students={students}
        presentCount={presentCount}
        absentCount={absentCount}
      />

      <div className="summary-card">

        <h2>Today's Attendance</h2>

        <div className="progress">

          <div
            className="progress-fill"
            style={{
              width: `${attendanceRate}%`,
            }}
          ></div>

        </div>

        <h3>{attendanceRate}% Present</h3>

      </div>

      <div className="quick-info">

        <div className="info-card">
          🎉 Great Job!
          <p>Attendance has been recorded successfully.</p>
        </div>

        <div className="info-card">
          📚 Keep Monitoring
          <p>Check reports to view attendance history.</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;