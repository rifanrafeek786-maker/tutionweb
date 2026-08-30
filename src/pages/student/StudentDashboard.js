
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";

function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [classes, setClasses] = useState([]);
  const [payments, setPayments] = useState([]);

  // =========================================
  // LOAD STUDENT DATA
  // =========================================

  useEffect(() => {
    loadDashboardData();

    const handleFocus = () => {
      loadDashboardData();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  // =========================================
  // LOAD DASHBOARD DATA
  // =========================================

  const loadDashboardData = () => {
    // Logged-in student
    const loggedInStudent = JSON.parse(
      localStorage.getItem("loggedInStudent")
    );

    setStudent(loggedInStudent);

    if (!loggedInStudent) {
      setTeacher(null);
      setClasses([]);
      setPayments([]);
      return;
    }

    const studentId =
      loggedInStudent.id ||
      loggedInStudent.studentId;

    // =======================================
    // LOAD PAYMENTS
    // =======================================

    const savedPayments =
      JSON.parse(
        localStorage.getItem("payments")
      ) || [];

    const studentPayments =
      savedPayments.filter(
        (item) =>
          String(item.studentId) ===
          String(studentId)
      );

    setPayments(studentPayments);

    // =======================================
    // FIND CURRENT TEACHER
    // =======================================

    const teacherStudents =
      JSON.parse(
        localStorage.getItem(
          "teacherStudents"
        )
      ) || [];

    const connection =
      teacherStudents.find(
        (item) =>
          String(item.studentId) ===
          String(studentId) &&
          item.status === "Active"
      );

    if (connection) {
      setTeacher({
        id: connection.teacherId,
        name:
          connection.teacher ||
          "Teacher",
        subject:
          connection.subject ||
          "General",
        plan:
          connection.plan ||
          "Monthly Plan",
      });
    } else {
      setTeacher(null);
    }

    // =======================================
    // LOAD CLASSES
    // =======================================

    const savedClasses =
      JSON.parse(
        localStorage.getItem("classes")
      ) || [];

    const studentClasses =
      savedClasses.filter(
        (item) =>
          String(item.studentId) ===
          String(studentId)
      );

    setClasses(studentClasses);
  };

  // =========================================
  // STATISTICS
  // =========================================

  const scheduledClasses =
    classes.filter(
      (item) =>
        item.scheduleDate &&
        item.startTime &&
        item.endTime
    ).length;

  const totalPaid =
    payments.reduce(
      (total, payment) => {
        if (payment.status === "Paid") {
          return (
            total +
            Number(payment.amount || 0)
          );
        }

        return total;
      },
      0
    );

  // =========================================
  // NO LOGIN
  // =========================================

  if (!student) {
    return (
      <div className="student-dashboard">

        <StudentSidebar />

        <main className="student-main">

          <div className="student-topbar">

            <div>
              <h1>
                Student Dashboard
              </h1>

              <p>
                Please login to continue.
              </p>
            </div>

          </div>

          <div
            className="student-welcome-card"
            style={{
              marginTop: "30px",
              textAlign: "center",
            }}
          >

            <div
              style={{
                fontSize: "50px",
                marginBottom: "15px",
              }}
            >
              🔐
            </div>

            <h2>
              Please Login
            </h2>

            <p>
              Login as a student to view
              your dashboard.
            </p>

            <Link
              to="/login"
              className="auth-button"
              style={{
                display: "inline-block",
                marginTop: "15px",
                textDecoration: "none",
              }}
            >
              Login
            </Link>

          </div>

        </main>

      </div>
    );
  }

  // =========================================
  // DASHBOARD
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
            TOP BAR
        =================================== */}

        <div className="student-topbar">

          <div>

            <h1>
              Student Dashboard
            </h1>

            <p>
              Welcome back,{" "}
              {student.name ||
                student.studentName ||
                "Student"}
              !
            </p>

          </div>


          {/* PROFILE */}

          <div className="student-profile">

            <div className="student-avatar">

              {(
                student.name ||
                student.studentName ||
                "S"
              )
                .charAt(0)
                .toUpperCase()}

            </div>

            <div className="student-profile-info">

              <strong>
                {student.name ||
                  student.studentName ||
                  "Student"}
              </strong>

              <span>
                Student
              </span>

            </div>

          </div>

        </div>


        {/* ===================================
            WELCOME CARD
        =================================== */}

        <div className="student-welcome-card">

          <div>

            <span
              style={{
                display: "inline-block",
                padding: "6px 12px",
                background: "#eaf2ff",
                color: "#2563eb",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: "600",
                marginBottom: "10px",
              }}
            >
              🎓 Student Dashboard
            </span>

            <h2>
              Welcome,{" "}
              {student.name ||
                student.studentName ||
                "Student"}!
            </h2>

            <p>
              Manage your teachers, classes,
              schedule, monthly plans and
              payments from here.
            </p>

          </div>

        </div>


        {/* ===================================
            STATISTICS
        =================================== */}

        <div className="student-statistics">

          {/* MY TEACHER */}

          <div className="student-stat-card">

            <span>
              👨‍🏫
            </span>

            <div>

              <p>
                My Teacher
              </p>

              <h2
                style={{
                  fontSize: "18px",
                }}
              >
                {teacher
                  ? teacher.name
                  : "Not Assigned"}
              </h2>

            </div>

          </div>


          {/* MY CLASSES */}

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


          {/* TOTAL PAID */}

          <div className="student-stat-card">

            <span>
              ₹
            </span>

            <div>

              <p>
                Total Paid
              </p>

              <h2>
                ₹
                {totalPaid.toLocaleString(
                  "en-IN"
                )}
              </h2>

            </div>

          </div>

        </div>


        {/* ===================================
            CURRENT TEACHER
        =================================== */}

        {teacher ? (

          <div
            className="student-dashboard-section"
            style={{
              marginTop: "25px",
            }}
          >

            <div className="student-section-header">

              <div>

                <h2>
                  My Teacher
                </h2>

                <p>
                  Your currently assigned
                  teacher.
                </p>

              </div>

              <Link
                to="/student/teacher"
                className="auth-button"
                style={{
                  textDecoration: "none",
                }}
              >
                View Teacher
              </Link>

            </div>


            <div
              style={{
                padding: "20px",
                background: "#f8fafc",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: "18px",
                flexWrap: "wrap",
              }}
            >

              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "15px",
                  background: "#eef4ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "30px",
                }}
              >
                👨‍🏫
              </div>

              <div>

                <h3
                  style={{
                    margin: "0 0 5px",
                  }}
                >
                  {teacher.name}
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: "#718096",
                  }}
                >
                  {teacher.subject}
                </p>

                <p
                  style={{
                    margin:
                      "5px 0 0",
                    color: "#2563eb",
                  }}
                >
                  📦 {teacher.plan}
                </p>

              </div>

            </div>

          </div>

        ) : (

          <div
            className="student-dashboard-section"
            style={{
              marginTop: "25px",
            }}
          >

            <div
              style={{
                textAlign: "center",
                padding: "25px",
              }}
            >

              <div
                style={{
                  fontSize: "45px",
                  marginBottom: "10px",
                }}
              >
                👨‍🏫
              </div>

              <h2>
                No Teacher Assigned
              </h2>

              <p>
                Find a teacher and choose a
                monthly plan to start learning.
              </p>

              <Link
                to="/student/teachers"
                className="auth-button"
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  textDecoration: "none",
                }}
              >
                Find a Teacher
              </Link>

            </div>

          </div>

        )}


        {/* ===================================
            QUICK ACTIONS
        =================================== */}

        <div
          className="student-dashboard-section"
          style={{
            marginTop: "25px",
          }}
        >

          <div className="student-section-header">

            <div>

              <h2>
                Quick Actions
              </h2>

              <p>
                Quickly access your student
                features.
              </p>

            </div>

          </div>


          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "15px",
            }}
          >

            <Link
              to="/student/teachers"
              className="auth-button"
              style={{
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              👨‍🏫 Find Teachers
            </Link>


            <Link
              to="/student/classes"
              className="auth-button"
              style={{
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              📚 My Classes
            </Link>


            <Link
              to="/student/schedule"
              className="auth-button"
              style={{
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              📅 Schedule
            </Link>


            <Link
              to="/student/payment"
              className="auth-button"
              style={{
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              💳 Payments
            </Link>

          </div>

        </div>

      </main>

    </div>
  );
}

export default StudentDashboard;
