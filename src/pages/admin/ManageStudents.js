import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ManageStudents() {
  const [students, setStudents] = useState([]);

  // Load students from localStorage
  const loadStudents = () => {
    const savedStudents =
      JSON.parse(localStorage.getItem("students")) || [];

    setStudents(savedStudents);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // Delete student
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedStudents = students.filter(
      (student) => student.id !== id
    );

    localStorage.setItem(
      "students",
      JSON.stringify(updatedStudents)
    );

    setStudents(updatedStudents);
  };

  return (
    <div className="manage-students-page">

      {/* Header */}

      <div className="manage-students-header">

        <div>
          <h1>Manage Students</h1>

          <p>
            View and manage registered students.
          </p>
        </div>

        <Link
          to="/admin/dashboard"
          className="back-admin-button"
        >
          ← Dashboard
        </Link>

      </div>


      {/* Student Count */}

      <div className="student-count-card">

        <span>
          Total Students
        </span>

        <strong>
          {students.length}
        </strong>

      </div>


      {/* Students */}

      {students.length === 0 ? (

        <div className="no-students">

          <div className="no-students-icon">
            👨‍🎓
          </div>

          <h2>
            No Students Yet
          </h2>

          <p>
            Registered students will appear here.
          </p>

        </div>

      ) : (

        <div className="admin-student-list">

          {students.map((student) => (

            <div
              className="admin-student-card"
              key={student.id}
            >

              {/* Avatar */}

              <div className="admin-student-avatar">
                👨‍🎓
              </div>


              {/* Information */}

              <div className="admin-student-info">

                <h2>
                  {student.name}
                </h2>

                <p>
                  {student.email}
                </p>

                <span>
                  Student
                </span>

              </div>


              {/* Actions */}

              <div className="admin-student-actions">

                <button
                  className="delete-student-button"
                  onClick={() =>
                    handleDelete(student.id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default ManageStudents;