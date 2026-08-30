
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";

function StudentSchedule() {
  const [schedules, setSchedules] = useState([]);

  // =========================================
  // LOAD SCHEDULES
  // =========================================

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
  // GET STUDENT SCHEDULES
  // =========================================

  const loadSchedules = () => {
    const loggedInStudent = JSON.parse(
      localStorage.getItem("loggedInStudent")
    );

    const savedClasses =
      JSON.parse(localStorage.getItem("classes")) || [];

    if (!loggedInStudent) {
      setSchedules([]);
      return;
    }

    const studentId =
      loggedInStudent.id ||
      loggedInStudent.studentId;

    const studentName =
      loggedInStudent.name ||
      loggedInStudent.student ||
      loggedInStudent.fullName ||
      "";

    const studentSchedules = savedClasses.filter((item) => {
      const sameStudentId =
        studentId &&
        item.studentId &&
        String(item.studentId) === String(studentId);

      const sameStudentName =
        studentName &&
        (
          item.student === studentName ||
          item.studentName === studentName
        );

      const hasSchedule =
        item.scheduleDate &&
        item.startTime &&
        item.endTime;

      return (
        (sameStudentId || sameStudentName) &&
        hasSchedule
      );
    });

    // Sort by date and time
    studentSchedules.sort((a, b) => {
      const first =
        `${a.scheduleDate} ${a.startTime}`;

      const second =
        `${b.scheduleDate} ${b.startTime}`;

      return first.localeCompare(second);
    });

    setSchedules(studentSchedules);
  };

  // =========================================
  // FORMAT DATE
  // =========================================

  const formatDate = (date) => {
    if (!date) {
      return "Not scheduled";
    }

    const selectedDate =
      new Date(`${date}T00:00:00`);

    if (isNaN(selectedDate.getTime())) {
      return date;
    }

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
  // CREATE VALID MEETING URL
  // =========================================

  const getMeetingUrl = (link) => {
    if (!link) {
      return "";
    }

    const cleanLink = String(link).trim();

    if (
      cleanLink.startsWith("http://") ||
      cleanLink.startsWith("https://")
    ) {
      return cleanLink;
    }

    return `https://${cleanLink}`;
  };

  // =========================================
  // STATISTICS
  // =========================================

  const totalClasses = schedules.length;

  const totalSubjects = new Set(
    schedules
      .map((item) => item.subject)
      .filter(Boolean)
  ).size;

  // =========================================
  // PAGE
  // =========================================

  return (
    <div className="student-dashboard">

      {/* =====================================
          COMMON SIDEBAR
      ===================================== */}

      <StudentSidebar />


      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <main className="student-main">

        {/* ===================================
            HEADER
        =================================== */}

        <div className="student-topbar">

          <div>

            <h1>
              My Schedule
            </h1>

            <p>
              View your upcoming online classes
              and meeting links.
            </p>

          </div>

        </div>


        {/* ===================================
            STATISTICS
        =================================== */}

        <div className="student-statistics">

          {/* TOTAL SCHEDULED CLASSES */}

          <div className="student-stat-card">

            <span>
              📅
            </span>

            <div>

              <p>
                Scheduled Classes
              </p>

              <h2>
                {totalClasses}
              </h2>

            </div>

          </div>


          {/* TOTAL SUBJECTS */}

          <div className="student-stat-card">

            <span>
              📚
            </span>

            <div>

              <p>
                Subjects
              </p>

              <h2>
                {totalSubjects}
              </h2>

            </div>

          </div>

        </div>


        {/* ===================================
            EMPTY STATE
        =================================== */}

        {schedules.length === 0 ? (

          <div className="student-welcome-card">

            <div
              style={{
                fontSize: "55px",
                marginBottom: "15px",
              }}
            >
              📅
            </div>

            <h2>
              No Classes Scheduled
            </h2>

            <p>
              Your teacher has not scheduled
              any classes yet.
            </p>

            <Link
              to="/student/classes"
              className="auth-button"
              style={{
                display: "inline-block",
                marginTop: "20px",
                textDecoration: "none",
              }}
            >
              View My Classes
            </Link>

          </div>

        ) : (

          /* =================================
             SCHEDULE LIST
          ================================= */

          <div
            className="student-class-list"
            style={{
              marginTop: "30px",
            }}
          >

            {schedules.map((item) => {

              return (

                <div
                  className="student-class-card"
                  key={item.id}
                >

                  {/* =========================
                      CLASS ICON
                  ========================= */}

                  <div className="student-class-icon">
                    📚
                  </div>


                  {/* =========================
                      CLASS INFORMATION
                  ========================= */}

                  <div className="student-class-info">

                    <h2>
                      {item.name ||
                        item.className ||
                        item.subject ||
                        "Class"}
                    </h2>


                    {/* TEACHER */}

                    <p>
                      👨‍🏫 Teacher:{" "}
                      <strong>
                        {item.teacher ||
                          item.teacherName ||
                          "Teacher"}
                      </strong>
                    </p>


                    {/* SUBJECT */}

                    <p>
                      📖 Subject:{" "}
                      <strong>
                        {item.subject ||
                          "Not specified"}
                      </strong>
                    </p>


                    {/* =========================
                        DATE
                    ========================= */}

                    <div className="schedule-detail">

                      <p>
                        📅 Date
                      </p>

                      <strong>
                        {formatDate(
                          item.scheduleDate
                        )}
                      </strong>

                    </div>


                    {/* =========================
                        TIME
                    ========================= */}

                    <div className="schedule-detail">

                      <p>
                        🕐 Time
                      </p>

                      <strong>
                        {item.startTime}
                        {" - "}
                        {item.endTime}
                      </strong>

                    </div>


                    {/* =========================
                        PLAN
                    ========================= */}

                    {item.plan && (

                      <div className="schedule-detail">

                        <p>
                          📦 Plan
                        </p>

                        <strong>
                          {item.plan}
                        </strong>

                      </div>

                    )}


                    {/* =========================
                        MEETING LINK
                    ========================= */}

                    <div className="meeting-section">

                      <p className="meeting-title">
                        🎥 Online Class
                      </p>


                      {item.meetingLink ? (

                        <a
                          href={getMeetingUrl(
                            item.meetingLink
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="join-class-button"
                        >
                          🎥 Join Class
                        </a>

                      ) : (

                        <div className="meeting-not-available">

                          <span>
                            🔗
                          </span>

                          <p>
                            Meeting link has not
                            been added yet.
                          </p>

                        </div>

                      )}

                    </div>

                  </div>


                  {/* =========================
                      STATUS
                  ========================= */}

                  <div className="student-class-status">

                    <span>
                      {item.status ||
                        "Active"}
                    </span>

                  </div>

                </div>

              );
            })}

          </div>

        )}

      </main>

    </div>
  );
}

export default StudentSchedule;