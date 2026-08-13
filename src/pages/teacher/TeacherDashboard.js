import React from "react";
import { Link } from "react-router-dom";

function TeacherDashboard() {
  const teacher =
    JSON.parse(localStorage.getItem("loggedInTeacher")) || null;

  return (
    <div className="teacher-dashboard">

      {/* Sidebar */}
      <aside className="teacher-sidebar">

        <div className="teacher-logo">
          TuitionWeb
        </div>

        <nav className="teacher-nav">

          <Link
            to="/teacher/dashboard"
            className="active"
          >
            Dashboard
          </Link>

          <Link to="/teacher/students">
            My Students
          </Link>

          <Link to="/teacher/classes">
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


      {/* Main Content */}
      <main className="teacher-main">

        {/* Header */}
        <div className="teacher-topbar">

          <div>
            <h1>
              Teacher Dashboard
            </h1>

            <p>
              Welcome back,{" "}
              {teacher?.name || "Teacher"}!
            </p>
          </div>

        </div>


        {/* Statistics */}
        <div className="teacher-statistics">

          <div className="teacher-stat-card">
            <span>👨‍🎓</span>

            <div>
              <p>My Students</p>
              <h2>
                {teacher?.students || "0"}
              </h2>
            </div>
          </div>


          <div className="teacher-stat-card">
            <span>📚</span>

            <div>
              <p>My Classes</p>
              <h2>
                {teacher?.classes || "0"}
              </h2>
            </div>
          </div>


          <div className="teacher-stat-card">
            <span>📅</span>

            <div>
              <p>Today's Classes</p>
              <h2>0</h2>
            </div>
          </div>


          <div className="teacher-stat-card">
            <span>💰</span>

            <div>
              <p>Monthly Fee</p>

              <h2>
                ₹
                {Number(
                  teacher?.fee || 0
                ).toLocaleString("en-IN")}
              </h2>
            </div>
          </div>

        </div>


        {/* Welcome */}
        <div className="teacher-welcome-card">

          <h2>
            Welcome to TuitionWeb
          </h2>

          <p>
            Manage your students, classes,
            schedule and teaching activities
            from your dashboard.
          </p>

        </div>


        {/* Quick Actions */}
        <div className="teacher-section">

          <h2>
            Quick Actions
          </h2>

          <div className="teacher-quick-actions">

            <Link to="/teacher/students">
              <span>👨‍🎓</span>

              <strong>
                View Students
              </strong>

              <p>
                Manage your students
              </p>
            </Link>


            <Link to="/teacher/classes">
              <span>📚</span>

              <strong>
                My Classes
              </strong>

              <p>
                View your classes
              </p>
            </Link>


            <Link to="/teacher/schedule">
              <span>📅</span>

              <strong>
                Schedule
              </strong>

              <p>
                View your schedule
              </p>
            </Link>


            <Link to="/teacher/messages">
              <span>💬</span>

              <strong>
                Messages
              </strong>

              <p>
                Communicate with students
              </p>
            </Link>

          </div>

        </div>

      </main>

    </div>
  );
}

export default TeacherDashboard;    