import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    const loggedInTeacher =
      JSON.parse(localStorage.getItem("loggedInTeacher"));

    const teacherStudents =
      JSON.parse(
        localStorage.getItem("teacherStudents")
      ) || [];

    if (!loggedInTeacher) {
      setStudents([]);
      return;
    }

    // Get only students connected to this teacher
    const myStudents = teacherStudents.filter(
      (student) =>
        String(student.teacherId) ===
        String(loggedInTeacher.id)
    );

    setStudents(myStudents);
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

          <Link
            to="/teacher/students"
            className="active"
          >
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


      {/* MAIN CONTENT */}

      <main className="teacher-main">

        <div className="teacher-topbar">

          <h1>
            My Students
          </h1>

          <p>
            Students who are currently learning with you.
          </p>

        </div>


        {/* STATISTICS */}

        <div className="teacher-statistics">

          <div className="teacher-stat-card">

            <span>
              👨‍🎓
            </span>

            <div>

              <p>
                Total Students
              </p>

              <h2>
                {students.length}
              </h2>

            </div>

          </div>


          <div className="teacher-stat-card">

            <span>
              ✅
            </span>

            <div>

              <p>
                Active Students
              </p>

              <h2>
                {
                  students.filter(
                    (student) =>
                      student.status === "Active"
                  ).length
                }
              </h2>

            </div>

          </div>

        </div>


        {/* STUDENTS */}

        {students.length === 0 ? (

          <div className="teacher-welcome-card">

            <div
              style={{
                fontSize: "45px",
                marginBottom: "15px",
              }}
            >
              👨‍🎓
            </div>

            <h2>
              No Students Yet
            </h2>

            <p>
              Students who purchase a plan with
              you will automatically appear here.
            </p>

          </div>

        ) : (

          <div className="teacher-students-list">

            {students.map((student) => (

              <div
                className="teacher-student-card"
                key={student.id}
              >

                {/* AVATAR */}

                <div className="teacher-student-avatar">
                  👨‍🎓
                </div>


                {/* INFORMATION */}

                <div className="teacher-student-info">

                  <h2>
                    {student.student}
                  </h2>

                  <p>
                    Subject: {student.subject}
                  </p>

                  <div className="teacher-student-meta">

                    <span>
                      Plan: {student.plan}
                    </span>

                    <span>
                      Classes: {student.classes}
                    </span>

                    <span>
                      Status:{" "}
                      <strong>
                        {student.status}
                      </strong>
                    </span>

                  </div>

                </div>


                {/* PAYMENT */}

                <div className="teacher-student-payment">

                  <strong>
                    ₹
                    {Number(
                      student.amount || 0
                    ).toLocaleString("en-IN")}
                  </strong>

                  <span>
                    / month
                  </span>

                  <small>
                    Joined: {student.joinedDate}
                  </small>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  );
}

export default MyStudents;