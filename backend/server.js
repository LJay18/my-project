const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let students = [
  { id: 101, name: "Sowunmi Nifemi", status: "Present" },
  { id: 102, name: "Sarah James", status: "Absent" },
  { id: 103, name: "Michael Smith", status: "Present" },
  { id: 104, name: "LJay", status: "Present" }
];

// GET all students
app.get("/students", (req, res) => {
  res.json(students);
});

// ADD student
app.post("/students", (req, res) => {
  const { name } = req.body;

  const newStudent = {
    id: Date.now(),
    name,
    status: "Present"
  };

  students.push(newStudent);

  res.status(201).json(newStudent);
});

// UPDATE attendance
app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  students = students.map((student) =>
    student.id === id
      ? { ...student, status }
      : student
  );

  res.json({
    message: "Attendance updated"
  });
});

// DELETE student
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  students = students.filter(
    (student) => student.id !== id
  );

  res.json({
    message: "Student deleted"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});