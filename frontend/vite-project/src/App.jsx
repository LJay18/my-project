import React, { useEffect, useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import Calendar from "./components/Calendar";
import Dashboard from "./components/Dashboard";
import Reports from "./components/Reports";
import AttendanceTable from "./components/AttendanceTable";
import StudentForm from "./components/StudentForm";

function App() {
  const API = "https://my-project-n7ac.onrender.com";

  const [students, setStudents] = useState([]);
  const [page, setPage] = useState("attendance");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    fetch(`${API}/students`)
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch(console.error);
  }, []);

  const updateAttendance = async (id, status) => {
    await fetch(`${API}/students/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? { ...student, status }
          : student
      )
    );
  };

  const presentCount = students.filter(
    (s) => s.status === "Present"
  ).length;

  const absentCount = students.filter(
    (s) => s.status === "Absent"
  ).length;

  return (
    <div className="container">

      <Sidebar
        page={page}
        setPage={setPage}
        menuOpen={menuOpen}
      />

      <main className="main">

        <div className="topbar">

          <input
            type="text"
            placeholder="🔍 Search Student..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <Calendar
            date={date}
            setDate={setDate}
          />

        </div>

        {page === "attendance" && (
          <>
            <StudentForm
              students={students}
              setStudents={setStudents}
            />

            <AttendanceTable
              students={students}
              updateAttendance={updateAttendance}
              search={search}
            />
          </>
        )}

        {page === "dashboard" && (
          <Dashboard
            students={students}
            presentCount={presentCount}
            absentCount={absentCount}
            date={date}
          />
        )}

        {page === "reports" && (
          <Reports
            students={students}
            date={date}
          />
        )}

        {page === "settings" && (
          <div className="card">
            <h1>⚙ Settings</h1>
            <p>This is the Settings Page</p>
          </div>
        )}

      </main>

    </div>
  );
}

export default App;