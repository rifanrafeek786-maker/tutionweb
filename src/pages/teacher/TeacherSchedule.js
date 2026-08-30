import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TeacherSchedule() {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    loadSchedules();

    const handleFocus = () => {
      loadSchedules();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  // =========================================
  // LOAD TEACHER SCHEDULE
  // =========================================

  const loadSchedules = () => {
    const loggedInTeacher = JSON.parse(
      localStorage.getItem("loggedInTeacher")
    );

    const savedClasses =
      JSON.parse(localStorage.getItem("classes")) || [];

    if (!loggedInTeacher) {
      setSchedules([]);
      return;
    }

    const mySchedules = savedClasses.filter(
      (item) =>
        String(item.teacherId) ===
          String(loggedInTeacher.id) &&
        item.scheduleDate &&
        item.startTime &&
        item.endTime
    );

    mySchedules.sort((a, b) => {
      const first =
        a.scheduleDate + " " + a.startTime;

      const second =
        b.scheduleDate + " " + b.startTime;

      return first.localeCompare(second);
    });

    setSchedules(mySchedules);
  };

  // =========================================
  // FORMAT DATE
  // =========================================

  const formatDate = (date) => {
    if (!date) {
      return "Not scheduled";
    }

    const selectedDate =
      new Date(date + "T00:00:00");

    return selectedDate.toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  // =========================================
  // GET UNIQUE STUDENTS
  // =========================================

  const uniqueStudents = new Set(
    schedules.map(
      (item) => item.studentId
    )
  ).size;

  // =========================================
  // GET UNIQUE SUBJECTS
  // =========================================

  const uniqueSubjects = new Set(
    schedules.map(
      (item) => item.subject
    )
  ).size;

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

          <Link to="/teacher/students">
            My Students
          </Link>

          <Link to="/teacher/classes">
            My Classes
          </Link>

          <Link
            to="/teacher/schedule"
            className="active"
          >
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
              My Schedule
            </h1>

            <p>
              View your upcoming classes and
              teaching schedule.
            </p>

          </div>

        </div>


        {/* =====================================
            STATISTICS
        ===================================== */}

        <div className="teacher-statistics">

          <div className="teacher-stat-card">

            <span>
              📅
            </span>

            <div>

              <p>
                Scheduled Classes
              </p>

              <h2>
                {schedules.length}
              </h2>

            </div>

          </div>


          <div className="teacher-stat-card">

            <span>
              👨‍🎓
            </span>

            <div>

              <p>
                Students
              </p>

              <h2>
                {uniqueStudents}
              </h2>

            </div>

          </div>


          <div className="teacher-stat-card">

            <span>
              📚
            </span>

            <div>

              <p>
                Subjects
              </p>

              <h2>
                {uniqueSubjects}
              </h2>

            </div>

          </div>

        </div>


        {/* =====================================
            EMPTY STATE
        ===================================== */}

        {schedules.length === 0 ? (

          <div className="teacher-welcome-card">

            <div
              style={{
                fontSize: "50px",
                marginBottom: "15px",
              }}
            >
              📅
            </div>

            <h2>
              No Classes Scheduled
            </h2>

            <p>
              Your scheduled classes will appear
              here after you set a schedule in
              My Classes.
            </p>

            <Link
              to="/teacher/classes"
              className="auth-button"
              style={{
                display: "inline-block",
                marginTop: "20px",
                textDecoration: "none",
              }}
            >
              Go to My Classes
            </Link>

          </div>

        ) : (

          /* ===================================
             SCHEDULE LIST
          =================================== */

          <div
            className="teacher-students-list"
            style={{
              marginTop: "30px",
            }}
          >

            {schedules.map((schedule) => (

              <div
                className="teacher-student-card"
                key={schedule.id}
              >

                {/* ICON */}

                <div className="teacher-student-avatar">
                  📚
                </div>


                {/* INFORMATION */}

                <div className="teacher-student-info">

                  <h2>
                    {schedule.subject ||
                      "Class"}
                  </h2>

                  <p>
                    👨‍🎓 Student:{" "}
                    <strong>
                      {schedule.student ||
                        "Student"}
                    </strong>
                  </p>

                  <p>
                    📖 Subject:{" "}
                    <strong>
                      {schedule.subject ||
                        "Not specified"}
                    </strong>
                  </p>


                  {/* DATE + TIME */}

                  <div
                    className="teacher-student-meta"
                  >

                    <span>
                      📅{" "}
                      {formatDate(
                        schedule.scheduleDate
                      )}
                    </span>

                    <span>
                      🕐{" "}
                      {schedule.startTime}
                      {" - "}
                      {schedule.endTime}
                    </span>

                  </div>


                  {/* MEETING LINK */}

                  {schedule.meetingLink ? (

                    <a
                      href={
                        schedule.meetingLink
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display:
                          "inline-block",
                        marginTop: "15px",
                        padding:
                          "10px 18px",
                        background:
                          "#2563eb",
                        color:
                          "#ffffff",
                        borderRadius:
                          "8px",
                        textDecoration:
                          "none",
                        fontWeight:
                          "600",
                      }}
                    >
                      🎥 Join Meeting
                    </a>

                  ) : (

                    <p
                      style={{
                        marginTop: "15px",
                        color: "#64748b",
                      }}
                    >
                      🎥 Meeting link not
                      available.
                    </p>

                  )}

                </div>


                {/* RIGHT SIDE */}

                <div
                  className="teacher-student-payment"
                >

                  <strong>
                    Scheduled
                  </strong>

                  <small>
                    Set by Teacher
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

export default TeacherSchedule;