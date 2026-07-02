import React from "react";
import "./AttendanceTable.css";

function AttendanceTable({
  students,
  updateAttendance,
  search,
}) {

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="attendance-card">

      <table>

        <thead>

          <tr>
            <th>Student</th>
            <th>ID</th>
            <th>Present</th>
            <th>Late</th>
            <th>Absent</th>
          </tr>

        </thead>

        <tbody>

          {filteredStudents.map((student) => (

            <tr key={student.id}>

              <td className="student-info">

                <img
                  src={`https://ui-avatars.com/api/?name=${student.name}&background=2563eb&color=fff`}
                  alt={student.name}
                />

                <span>{student.name}</span>

              </td>

              <td>{student.id}</td>

              <td>

                <button
                  className={
                    student.status === "Present"
                      ? "present active"
                      : "present"
                  }
                  onClick={() =>
                    updateAttendance(student.id, "Present")
                  }
                >
                  ✔
                </button>

              </td>

              <td>

                <button
                  className={
                    student.status === "Late"
                      ? "late active"
                      : "late"
                  }
                  onClick={() =>
                    updateAttendance(student.id, "Late")
                  }
                >
                  ⏰
                </button>

              </td>

              <td>

                <button
                  className={
                    student.status === "Absent"
                      ? "absent active"
                      : "absent"
                  }
                  onClick={() =>
                    updateAttendance(student.id, "Absent")
                  }
                >
                  ✖
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AttendanceTable;