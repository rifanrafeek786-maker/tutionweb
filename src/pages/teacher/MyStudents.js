import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  // =========================================
  // LOAD MY STUDENTS
  // =========================================

  const loadStudents = () => {
    const loggedInTeacher =
      JSON.parse(
        localStorage.getItem("loggedInTeacher")
      );

    const teacherStudents =
      JSON.parse(
        localStorage.getItem("teacherStudents")
      ) || [];

    if (!loggedInTeacher) {
      setStudents([]);
      return;
    }

    // Only students connected to this teacher
    const myStudents =
      teacherStudents.filter(
        (student) =>
          String(student.teacherId) ===
          String(loggedInTeacher.id)
      );

    setStudents(myStudents);
  };

  // =========================================
  // STATISTICS
  // =========================================

  const activeStudents =
    students.filter(
      (student) =>
        student.status === "Active"
    ).length;

  const uniquePlans =
    new Set(
      students.map(
        (student) => student.plan
      )
    ).size;

  // =========================================
  // PAGE
  // =========================================

  return (
    <div className="teacher-dashboard">

      {/* =====================================
          SIDEBAR
      ===================================== */}

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


      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <main className="teacher-main">

        {/* HEADER */}

        <div className="teacher-topbar">

          <div>

            <h1>
              My Students
            </h1>

            <p>
              Students who are currently
              learning with you.
            </p>

          </div>

        </div>


        {/* =====================================
            STATISTICS
        ===================================== */}

        <div className="teacher-statistics">

          {/* TOTAL STUDENTS */}

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


          {/* ACTIVE STUDENTS */}

          <div className="teacher-stat-card">

            <span>
              ✅
            </span>

            <div>

              <p>
                Active Students
              </p>

              <h2>
                {activeStudents}
              </h2>

            </div>

          </div>


          {/* PLANS */}

          <div className="teacher-stat-card">

            <span>
              📦
            </span>

            <div>

              <p>
                Active Plans
              </p>

              <h2>
                {uniquePlans}
              </h2>

            </div>

          </div>

        </div>


        {/* =====================================
            STUDENTS
        ===================================== */}

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
              Students who purchase a plan
              with you will automatically
              appear here.
            </p>

          </div>

        ) : (

          <div className="teacher-students-list">

            {students.map(
              (student) => (

                <div
                  className="teacher-student-card"
                  key={student.id}
                >

                  {/* =================================
                      AVATAR
                  ================================= */}

                  <div className="teacher-student-avatar">
                    👨‍🎓
                  </div>


                  {/* =================================
                      STUDENT INFORMATION
                  ================================= */}

                  <div className="teacher-student-info">

                    <h2>
                      {student.student}
                    </h2>

                    <p>
                      Subject:{" "}
                      {student.subject ||
                        "Not specified"}
                    </p>


                    {/* PLAN */}

                    <div
                      style={{
                        marginTop: "12px",
                        marginBottom: "12px",
                      }}
                    >

                      <span
                        style={{
                          display: "inline-block",
                          padding:
                            "7px 14px",
                          borderRadius:
                            "20px",
                          background:
                            "#eef2ff",
                          color:
                            "#4f46e5",
                          fontWeight:
                            "600",
                          fontSize:
                            "14px",
                        }}
                      >
                        📦{" "}
                        {student.plan ||
                          "No Plan"}
                      </span>

                    </div>


                    {/* META */}

                    <div className="teacher-student-meta">

                      <span>
                        📚{" "}
                        {student.classes ||
                          "Classes not specified"}
                      </span>

                      <span>
                        Status:{" "}
                        <strong>
                          {student.status ||
                            "Active"}
                        </strong>
                      </span>

                    </div>

                  </div>


                  {/* =================================
                      PLAN INFORMATION
                  ================================= */}

                  <div
                    className="teacher-student-payment"
                    style={{
                      minWidth: "150px",
                    }}
                  >

                    <strong>
                      📦 Plan Selected
                    </strong>

                    <span>
                      {student.plan ||
                        "Not selected"}
                    </span>

                    <small>
                      Joined:{" "}
                      {student.joinedDate ||
                        "Not available"}
                    </small>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </main>

    </div>
  );
}

export default MyStudents;