import React, { useState } from "react";
import "./StudentForm.css";

function StudentForm({ students, setStudents }) {
  const [name, setName] = useState("");

  const addStudent = async (e) => {
    e.preventDefault();

    if (!name) {
      alert("Please enter a name.");
      return;
    }

    const newStudent = {
      name,
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


        <button type="submit">
          Add Student
        </button>

      </form>
    </div>
  );
}

export default StudentForm;