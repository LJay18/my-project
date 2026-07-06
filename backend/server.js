const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, "students.json");


function getStudents() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}


function saveStudents(students) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(students, null, 2));
}

app.get("/students", (req, res) => {
  res.json(getStudents());
});


app.post("/students", (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({
      message: "Student name is required.",
    });
  }

  const students = getStudents();

  const newStudent = {
    id: Date.now(),
    name: name.trim(),
    status: "Absent",
  };

  students.push(newStudent);

  saveStudents(students);

  res.status(201).json(newStudent);
});


app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  const students = getStudents();

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  student.status = status;

  saveStudents(students);

  res.json(student);
});


app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const students = getStudents();

  const updatedStudents = students.filter(
    (student) => student.id !== id
  );

  saveStudents(updatedStudents);

  res.json({
    message: "Student removed successfully",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});