import React, { useState } from "react";
import "./StudentForm.css";

function StudentForm({ students, setStudents }) {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");

  const addStudent = async (e) => {
    e.preventDefault();

    if (!name.trim() || !studentId.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const newStudent = {
      name,
      studentId,
      status: "Absent",
    };

    try {
      const res = await fetch(
        "https://my-project-n7ac.onrender.com/students",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newStudent),
        }
      );

      const data = await res.json();

      setStudents([...students, data]);

      setName("");
      setStudentId("");
    } catch (err) {
      console.log(err);
      alert("Failed to add student.");
    }
  };

  return (
    <div className="student-form">
      <h2>Add Student</h2>

      <form onSubmit={addStudent}>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Student ID / Matric Number"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />

        <button type="submit">
          Add Student
        </button>

      </form>
    </div>
  );
}

export default StudentForm;