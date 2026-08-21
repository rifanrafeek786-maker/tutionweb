import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyClasses() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = () => {
    // =========================================
    // GET LOGGED-IN STUDENT
    // =========================================

    const loggedInStudent =
      JSON.parse(
        localStorage.getItem("loggedInStudent")
      );

    // =========================================
    // GET CLASSES
    // =========================================

    const savedClasses =
      JSON.parse(
        localStorage.getItem("classes")
      ) || [];

    // =========================================
    // GET TEACHER SCHEDULES
    // =========================================

    const savedSchedules =
      JSON.parse(
        localStorage.getItem(
          "teacherSchedules"
        )
      ) || [];


    if (!loggedInStudent) {
      setClasses([]);
      return;
    }


    // =========================================
    // FIND STUDENT CLASSES
    // =========================================

    const studentClasses =
      savedClasses.filter(
        (item) =>
          String(item.studentId) ===
            String(loggedInStudent.id) ||
          item.student ===
            loggedInStudent.name ||
          item.studentName ===
            loggedInStudent.name
      );


    // =========================================
    // CONNECT SCHEDULE TO CLASS
    // =========================================

    const classesWithSchedule =
      studentClasses.map((item) => {

        const classSchedules =
          savedSchedules.filter(
            (schedule) =>
              String(schedule.classId) ===
              String(item.id)
          );


        // Get first schedule
        const schedule =
          classSchedules.length > 0
            ? classSchedules[0]
            : null;


        return {
          ...item,

          scheduleDate:
            schedule?.date || "",

          scheduleTime:
            schedule?.time || "",

          scheduleStatus:
            schedule?.status ||
            "",
        };
      });


    setClasses(
      classesWithSchedule
    );
  };


  // =========================================
  // REFRESH WHEN PAGE GETS FOCUS
  // =========================================

  useEffect(() => {

    const handleFocus = () => {
      loadClasses();
    };

    window.addEventListener(
      "focus",
      handleFocus
    );

    return () => {
      window.removeEventListener(
        "focus",
        handleFocus
      );
    };

  }, []);


  return (
    <div className="student-dashboard">


      {/* =====================================
          SIDEBAR
      ===================================== */}

      <aside className="student-sidebar">

        <div className="student-logo">
          TuitionWeb
        </div>


        <nav className="student-nav">

          <Link to="/student/dashboard">
            Dashboard
          </Link>

          <Link to="/student/teachers">
            Find Teachers
          </Link>

          <Link to="/student/my-teacher">
            My Teacher
          </Link>

          <Link
            to="/student/my-classes"
            className="active"
          >
            My Classes
          </Link>

          <Link to="/student/schedule">
            Schedule
          </Link>

          <Link to="/student/plan">
            Monthly Plan
          </Link>

          <Link to="/student/payment">
            Payments
          </Link>

          <Link to="/student/messages">
            Messages
          </Link>

          <Link to="/student/progress">
            Learning Progress
          </Link>

          <Link to="/student/profile">
            Profile
          </Link>

        </nav>


        <div className="student-logout">

          <Link to="/login">
            Logout
          </Link>

        </div>

      </aside>


      {/* =====================================
          MAIN
      ===================================== */}

      <main className="student-main">


        {/* HEADER */}

        <div className="student-topbar">

          <div>

            <h1>
              My Classes
            </h1>

            <p>
              View your classes and schedules.
            </p>

          </div>

        </div>


        {/* =====================================
            CLASS COUNT
        ===================================== */}

        <div className="student-statistics">

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

        </div>


        {/* =====================================
            EMPTY STATE
        ===================================== */}

        {classes.length === 0 ? (

          <div className="student-welcome-card">

            <div
              style={{
                fontSize: "45px",
              }}
            >
              📚
            </div>

            <h2>
              No Classes Yet
            </h2>

            <p>
              Your teacher's classes will
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

            {classes.map(
              (item) => (

                <div
                  className="student-class-card"
                  key={item.id}
                >

                  {/* ICON */}

                  <div className="student-class-icon">
                    📚
                  </div>


                  {/* INFORMATION */}

                  <div className="student-class-info">

                    <h2>
                      {item.name ||
                        item.className ||
                        "Class"}
                    </h2>


                    <p>
                      👨‍🏫 Teacher:{" "}
                      {item.teacher ||
                        "Unknown Teacher"}
                    </p>


                    <p>
                      📖 Subject:{" "}
                      {item.subject ||
                        "Not specified"}
                    </p>


                    {/* SCHEDULE */}

                    {item.scheduleDate ? (

                      <div
                        style={{
                          marginTop: "10px",
                        }}
                      >

                        <p>
                          📅 Date:{" "}
                          {item.scheduleDate}
                        </p>

                        <p>
                          🕐 Time:{" "}
                          {item.scheduleTime}
                        </p>

                        <p>
                          Status:{" "}
                          {item.scheduleStatus ||
                            "Scheduled"}
                        </p>

                      </div>

                    ) : (

                      <p
                        style={{
                          marginTop: "10px",
                        }}
                      >
                        📅 Not scheduled yet
                      </p>

                    )}

                  </div>


                  {/* CLASS STATUS */}

                  <div className="student-class-status">

                    <span>
                      {item.status ||
                        "Active"}
                    </span>

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

export default MyClasses;