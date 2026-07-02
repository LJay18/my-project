import React, { useState } from "react";
import "./StudentForm.css";

function StudentForm({ students, setStudents }) {
  const [name, setName] = useState("");

  const addStudent = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    const newStudent = {
      id: students.length + 1,
      name,
      status: "Present",
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="student-form">

      <h2>Add Student</h2>

      <form onSubmit={addStudent}>

        <input
          type="text"
          placeholder="Student name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button>Add Student</button>

      </form>

    </div>
  );
}

export default StudentForm;