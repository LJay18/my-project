const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// No default students
let students = [];

// GET all students
app.get("/students", (req, res) => {
  res.json(students);
});

// ADD student
app.post("/students", (req, res) => {
  const { name, studentId } = req.body;

  const newStudent = {
    id: Date.now(),
    name,
    studentId,
    status: "Absent",
  };

  students.push(newStudent);

  res.status(201).json(newStudent);
});

// UPDATE attendance
app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  student.status = status;

  res.json(student);
});

// DELETE student 
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  students = students.filter((s) => s.id !== id);

  res.json({ message: "Student removed" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});