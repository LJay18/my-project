const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let students = [
    { id: 101, name: "Sowunmi Nifemi", status: "Present"},
    { id: 102, name: "Sarah James", status: "Absent"},
    { id: 103, name: "michael smith", status: "Present"},
    { id: 104, name: "LJay", status: "Present"},
];

app.get("/students", (req, res) => {
    res.json(students);
});

app.put ("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;

    students = students.map((student) => 
    student.id === id ? { ...student, status } : student
);

res.json({ message: "Attendance updated" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});