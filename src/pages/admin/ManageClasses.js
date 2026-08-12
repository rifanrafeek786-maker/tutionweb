import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ManageClasses() {
  const [classes, setClasses] = useState([]);

  const loadClasses = () => {
    const savedClasses =
      JSON.parse(localStorage.getItem("classes")) || [];

    setClasses(savedClasses);
  };

  useEffect(() => {
    loadClasses();
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this class?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedClasses = classes.filter(
      (item) => item.id !== id
    );

    localStorage.setItem(
      "classes",
      JSON.stringify(updatedClasses)
    );

    setClasses(updatedClasses);
  };

  return (
    <div className="manage-classes-page">

      {/* Header */}

      <div className="manage-classes-header">

        <div>
          <h1>Manage Classes</h1>

          <p>
            View and manage classes on TuitionWeb.
          </p>
        </div>

        <Link
          to="/admin/dashboard"
          className="back-admin-button"
        >
          ← Dashboard
        </Link>

      </div>


      {/* Statistics */}

      <div className="class-stat-card">

        <div className="class-stat-icon">
          📚
        </div>

        <div>
          <span>
            Active Classes
          </span>

          <strong>
            {classes.length}
          </strong>
        </div>

      </div>


      {/* Empty State */}

      {classes.length === 0 ? (

        <div className="no-classes">

          <div className="no-classes-icon">
            📚
          </div>

          <h2>
            No Classes Yet
          </h2>

          <p>
            Classes created on the platform will
            appear here.
          </p>

        </div>

      ) : (

        /* Classes */

        <div className="admin-class-list">

          {classes.map((item) => (

            <div
              className="admin-class-card"
              key={item.id}
            >

              {/* Icon */}

              <div className="admin-class-icon">
                📚
              </div>


              {/* Information */}

              <div className="admin-class-info">

                <h2>
                  {item.subject || "Class"}
                </h2>

                <p>
                  Teacher:{" "}
                  {item.teacher || "Not assigned"}
                </p>

                <p>
                  Student:{" "}
                  {item.student || "Not assigned"}
                </p>

                <div className="class-meta">

                  <span>
                    {item.schedule || "Schedule not set"}
                  </span>

                  <span>
                    {item.status || "Active"}
                  </span>

                </div>

              </div>


              {/* Delete */}

              <button
                className="delete-class-button"
                onClick={() =>
                  handleDelete(item.id)
                }
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default ManageClasses;