import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyClasses() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = () => {
    const loggedInTeacher =
      JSON.parse(localStorage.getItem("loggedInTeacher"));

    const savedClasses =
      JSON.parse(localStorage.getItem("classes")) || [];

    if (!loggedInTeacher) {
      setClasses([]);
      return;
    }

    const teacherClasses = savedClasses.filter(
      (item) =>
        String(item.teacherId) === String(loggedInTeacher.id) ||
        item.teacher === loggedInTeacher.name
    );

    setClasses(teacherClasses);
  };

  return (
    <div className="teacher-dashboard">

      {/* SIDEBAR */}
      <aside className="teacher-sidebar">

        <div className="teacher-logo">
          TuitionWeb
        </div>

        <nav className="teacher-nav">

          <Link to="/teacher/dashboard">
            Dashboard
          </Link>

          <Link to="/teacher/students">
            My Students
          </Link>

          <Link
            to="/teacher/classes"
            className="active"
          >
            My Classes
          </Link>

          <Link to="/teacher/schedule">
            Schedule
          </Link>

          <Link to="/teacher/payments">
            Payments
          </Link>

          <Link to="/teacher/messages">
            Messages
          </Link>

          <Link to="/teacher/profile">
            Profile
          </Link>

          <Link to="/teacher/settings">
            Settings
          </Link>

        </nav>

        <div className="teacher-logout">
          <Link to="/login">
            Logout
          </Link>
        </div>

      </aside>


      {/* MAIN */}
      <main className="teacher-main">

        <div className="teacher-topbar">

          <h1>
            My Classes
          </h1>

          <p>
            View and manage your classes.
          </p>

        </div>


        {/* CLASS COUNT */}

        <div className="teacher-statistics">

          <div className="teacher-stat-card">

            <span>📚</span>

            <div>

              <p>
                Total Classes
              </p>

              <h2>
                {classes.length}
              </h2>

            </div>

          </div>

        </div>


        {/* CLASSES */}

        {classes.length === 0 ? (

          <div className="teacher-welcome-card">

            <div style={{ fontSize: "45px" }}>
              📚
            </div>

            <h2>
              No Classes Yet
            </h2>

            <p>
              Classes assigned to you will appear here.
            </p>

          </div>

        ) : (

          <div className="teacher-class-list">

            {classes.map((item) => (

              <div
                className="teacher-class-card"
                key={item.id}
              >

                <div className="teacher-class-icon">
                  📚
                </div>

                <div className="teacher-class-info">

                  <h2>
                    {item.name ||
                      item.className ||
                      "Class"}
                  </h2>

                  <p>
                    Subject:{" "}
                    {item.subject || "Not specified"}
                  </p>

                  <p>
                    Student:{" "}
                    {item.student ||
                      item.studentName ||
                      "Not assigned"}
                  </p>

                  <p>
                    Schedule:{" "}
                    {item.schedule ||
                      item.date ||
                      "Not scheduled"}
                  </p>

                </div>

                <div className="teacher-class-status">

                  <span>
                    {item.status || "Active"}
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  );
}

export default MyClasses;