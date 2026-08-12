import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import teachers from "../../data/teachers";

function ManageTeachers() {
  const [allTeachers, setAllTeachers] = useState([]);

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = () => {
    const savedTeachers =
      JSON.parse(localStorage.getItem("teachers")) || [];

    setAllTeachers([
      ...teachers,
      ...savedTeachers,
    ]);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this teacher?"
    );

    if (!confirmed) {
      return;
    }

    const savedTeachers =
      JSON.parse(localStorage.getItem("teachers")) || [];

    const updatedTeachers = savedTeachers.filter(
      (teacher) => teacher.id !== id
    );

    localStorage.setItem(
      "teachers",
      JSON.stringify(updatedTeachers)
    );

    loadTeachers();

    alert("Teacher deleted successfully!");
  };

  return (
    <div className="manage-teachers-page">

      {/* Header */}
      <div className="manage-teachers-header">

        <div>
          <h1>Manage Teachers</h1>

          <p>
            View and manage all teachers on TuitionWeb.
          </p>
        </div>

        <Link
          to="/admin/dashboard"
          className="back-admin-button"
        >
          ← Dashboard
        </Link>

      </div>


      {/* Add Teacher */}
      <div className="manage-teachers-actions">

        <Link
          to="/admin/add-teacher"
          className="add-teacher-button"
        >
          + Add Teacher
        </Link>

      </div>


      {/* Teacher List */}
      <div className="admin-teacher-list">

        {allTeachers.map((teacher) => (

          <div
            className="admin-teacher-card"
            key={teacher.id}
          >

            {/* Avatar */}
            <div className="admin-teacher-avatar">
              {teacher.avatar}
            </div>


            {/* Information */}
            <div className="admin-teacher-info">

              <h2>
                {teacher.name}
              </h2>

              <p>
                {teacher.subject}
              </p>

              <span>
                {teacher.experience}
              </span>

            </div>


            {/* Fee */}
            <div className="admin-teacher-fee">

              <strong>
                ₹{teacher.fee}
              </strong>

              <span>
                / month
              </span>

            </div>


            {/* Actions */}
            <div className="admin-teacher-actions">

             <Link
  to={`/admin/teacher/${teacher.id}`}
  className="view-teacher-button"
>
  View
</Link> 
              {/* Only allow deleting teachers added by Admin */}
              {teacher.id > 1000000000000 && (
                <button
                  className="delete-teacher-button"
                  onClick={() => handleDelete(teacher.id)}
                >
                  Delete
                </button>
              )}

            </div>

          </div>

        ))}

      </div>


      {/* Empty */}
      {allTeachers.length === 0 && (

        <div className="no-teachers">

          <h2>
            No teachers found
          </h2>

          <p>
            Add your first teacher.
          </p>

        </div>

      )}

    </div>
  );
}

export default ManageTeachers;