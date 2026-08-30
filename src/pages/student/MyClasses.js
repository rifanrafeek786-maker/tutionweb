
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";

function MyClasses() {
  const [classes, setClasses] = useState([]);

  // =========================================
  // LOAD CLASSES
  // =========================================

  useEffect(() => {
    loadClasses();

    const handleFocus = () => {
      loadClasses();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  // =========================================
  // LOAD STUDENT CLASSES
  // =========================================

  const loadClasses = () => {
    const loggedInStudent = JSON.parse(
      localStorage.getItem("loggedInStudent")
    );

    const savedClasses =
      JSON.parse(
        localStorage.getItem("classes")
      ) || [];

    if (!loggedInStudent) {
      setClasses([]);
      return;
    }

    const studentId =
      loggedInStudent.id ||
      loggedInStudent.studentId;

    // =======================================
    // FIND STUDENT CLASSES
    // =======================================

    const studentClasses = savedClasses.filter(
      (item) => {
        const sameStudentId =
          item.studentId &&
          studentId &&
          String(item.studentId) ===
            String(studentId);

        const sameStudentName =
          loggedInStudent.name &&
          (
            item.student ===
              loggedInStudent.name ||
            item.studentName ===
              loggedInStudent.name
          );

        return (
          sameStudentId ||
          sameStudentName
        );
      }
    );

    setClasses(studentClasses);
  };

  // =========================================
  // SCHEDULED CLASSES
  // =========================================

  const scheduledClasses = classes.filter(
    (item) =>
      item.scheduleDate &&
      item.startTime &&
      item.endTime
  ).length;

  // =========================================
  // PAGE
  // =========================================

  return (
    <div className="student-dashboard">

      {/* =====================================
          SIDEBAR
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
              My Classes
            </h1>

            <p>
              View your classes, schedules and
              online meeting links.
            </p>

          </div>

        </div>


        {/* ===================================
            STATISTICS
        =================================== */}

        <div className="student-statistics">

          {/* TOTAL CLASSES */}

          <div className="student-stat-card">

            <span>
              📚
            </span>

            <div>

              <p>
                My Classes
              </p>

              <h2>
                {classes.length}
              </h2>

            </div>

          </div>


          {/* SCHEDULED */}

          <div className="student-stat-card">

            <span>
              📅
            </span>

            <div>

              <p>
                Scheduled
              </p>

              <h2>
                {scheduledClasses}
              </h2>

            </div>

          </div>

        </div>


        {/* ===================================
            EMPTY STATE
        =================================== */}

        {classes.length === 0 ? (

          <div className="student-welcome-card">

            <div
              style={{
                fontSize: "45px",
                marginBottom: "15px",
              }}
            >
              📚
            </div>

            <h2>
              No Classes Yet
            </h2>

            <p>
              Classes assigned to you will
              appear here.
            </p>

            <Link
              to="/student/teachers"
              className="auth-button"
              style={{
                display: "inline-block",
                marginTop: "15px",
                textDecoration: "none",
              }}
            >
              Find a Teacher
            </Link>

          </div>

        ) : (

          /* ===================================
             CLASS LIST
          =================================== */

          <div className="student-class-list">

            {classes.map((item) => {

              const isScheduled =
                item.scheduleDate &&
                item.startTime &&
                item.endTime;

              return (

                <div
                  className="student-class-card"
                  key={item.id}
                >

                  {/* =================================
                      CLASS ICON
                  ================================= */}

                  <div className="student-class-icon">
                    📚
                  </div>


                  {/* =================================
                      CLASS INFORMATION
                  ================================= */}

                  <div className="student-class-info">

                    <h2>
                      {item.subject ||
                        item.name ||
                        "Class"}
                    </h2>


                    <p>
                      👨‍🏫 Teacher:{" "}
                      <strong>
                        {item.teacher ||
                          item.teacherName ||
                          "Unknown Teacher"}
                      </strong>
                    </p>


                    <p>
                      📖 Subject:{" "}
                      {item.subject ||
                        "Not specified"}
                    </p>


                    {/* PLAN */}

                    {item.plan && (

                      <p>
                        📦 Plan:{" "}
                        <strong>
                          {item.plan}
                        </strong>
                      </p>

                    )}


                    {/* =================================
                        SCHEDULE
                    ================================= */}

                    {isScheduled ? (

                      <div
                        style={{
                          marginTop: "15px",
                          padding: "15px",
                          background: "#f8fafc",
                          borderRadius: "10px",
                        }}
                      >

                        <p>
                          📅 Date:{" "}
                          <strong>
                            {item.scheduleDate}
                          </strong>
                        </p>

                        <p>
                          🕐 Time:{" "}
                          <strong>
                            {item.startTime}
                            {" - "}
                            {item.endTime}
                          </strong>
                        </p>


                        {/* =================================
                            MEETING LINK
                        ================================= */}

                        {item.meetingLink ? (

                          <a
                            href={item.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display:
                                "inline-block",
                              marginTop: "10px",
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
                            🎥 Join Class
                          </a>

                        ) : (

                          <p
                            style={{
                              color:
                                "#64748b",
                              marginTop:
                                "10px",
                            }}
                          >
                            🎥 Meeting link not
                            added yet.
                          </p>

                        )}

                      </div>

                    ) : (

                      <div
                        style={{
                          marginTop: "12px",
                          padding: "12px",
                          background: "#fef3c7",
                          borderRadius: "8px",
                          color: "#92400e",
                        }}
                      >
                        📅 Teacher has not
                        scheduled this class yet.
                      </div>

                    )}

                  </div>


                  {/* =================================
                      CLASS STATUS
                  ================================= */}

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

export default MyClasses;
