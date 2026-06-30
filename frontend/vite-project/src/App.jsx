
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState("attendance");
  const [search, setSearch] = useState("");
  
  useEffect(() => {
    fetch("http://localhost:5000/students")
    .then((res) => res.json())
    .then((data) => setStudents(data))
    .catch((err) => console.error(err));
  }, []);

  const updateAttendance = (id, status) => {
    fetch(`http://localhost:5000/students/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    setStudents((prev) => 
      prev.map((student) =>
       student.id === id ? { ...student, status } : student
      )
    );
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  const presentCount = students.filter(
    (s) => s.status === "Present"
  ).length;

  const absentCount = students.filter(
    (s) => s.status === "Absent"
  ).length;

  return (
    <div className="container">
      <aside className="sidebar">
        <h2>Attendance</h2>

        <ul>
          <li onClick={() => setPage("attendance")}>
            Students
          </li>

          <li onClick={() => setPage("dashboard")}>
            Dashboard
          </li>

          <li onClick={() => setPage("reports")}>
            Reports
          </li>
        </ul>
      </aside>

      <main className="main">

        <div clasName="topbar">

          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>
        {page === "attendance" && (

          <div className="card">
            <h2>Students Attendance</h2>

            <table>

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Present</th>
                  <th>Absent</th>
                </tr>

              </thead>

              <tbody>

                {filteredStudents.map((student) => (

                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>

                    <td>
                      <input
                      type="radio"
                      checked={student.status === "Present"}
                      onChange={() => updateAttendance(student.id, "Present")}
                      />
                    </td>
                    <td>
                      <input
                      type="radio"
                      checked={student.status === "Absent"}
                      onChange={() => updateAttendance(student.id, "Absent")}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

        {page === "dashboard" && (

          <div className="card">
            <h2>Dashboard</h2>

            <h3>Total Students: {students.length}</h3>
            <h3>Present Today: {presentCount}</h3>
            <h3>Absent Today: {absentCount}</h3>
          </div>
        )}

        {page === "reports" && (

          <div className="card">

            <h2>Reports</h2>

            <p>Total Students: {students.length}</p>
            <p>Present Today: {presentCount}</p>
            <p>Absent Today: {absentCount}</p>
          </div>
        )}
      </main>  
    </div>
  );
}

export default App;