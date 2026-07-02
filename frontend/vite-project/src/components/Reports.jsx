import React from "react";
import "./Reports.css";

function Reports({ students, date }) {
  const present = students.filter(
    (s) => s.status === "Present"
  ).length;

  const absent = students.filter(
    (s) => s.status === "Absent"
  ).length;

  const late = students.filter(
    (s) => s.status === "Late"
  ).length;

  const attendanceRate =
    students.length === 0
      ? 0
      : Math.round((present / students.length) * 100);

  return (
    <div className="reports">

      <h2>Attendance Report</h2>

      <h4>{date}</h4>

      <div className="report-grid">

        <div className="report-card">
          <h3>Total Students</h3>
          <h1>{students.length}</h1>
        </div>

        <div className="report-card green">
          <h3>Present</h3>
          <h1>{present}</h1>
        </div>

        <div className="report-card orange">
          <h3>Late</h3>
          <h1>{late}</h1>
        </div>

        <div className="report-card red">
          <h3>Absent</h3>
          <h1>{absent}</h1>
        </div>

        <div className="report-card blue">
          <h3>Attendance Rate</h3>
          <h1>{attendanceRate}%</h1>
        </div>

      </div>

      <div className="export-buttons">

        <button>📄 Export PDF</button>

        <button>📊 Export Excel</button>

        <button>🖨 Print Report</button>

      </div>

    </div>
  );
}

export default Reports;