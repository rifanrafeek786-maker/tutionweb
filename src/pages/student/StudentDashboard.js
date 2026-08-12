import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [payment, setPayment] = useState(null);
  const [classes, setClasses] = useState([]);

  // ==============================
  // LOAD STUDENT DATA
  // ==============================

  useEffect(() => {
    loadStudentData();
  }, []);

  const loadStudentData = () => {
    // ------------------------------
    // Logged-in student
    // ------------------------------

    const loggedInStudent =
      JSON.parse(
        localStorage.getItem("loggedInStudent")
      );

    setStudent(loggedInStudent);


    // ------------------------------
    // Payments
    // ------------------------------

    const savedPayments =
      JSON.parse(
        localStorage.getItem("payments")
      ) || [];


    // Find payment belonging to student

    let studentPayment = null;

    if (loggedInStudent) {
      studentPayment = savedPayments
        .filter(
          (item) =>
            String(item.studentId) ===
            String(loggedInStudent.id) &&
            item.status === "Paid"
        )
        .slice(-1)[0];
    }

    setPayment(studentPayment || null);


    // ------------------------------
    // Classes
    // ------------------------------

    const savedClasses =
      JSON.parse(
        localStorage.getItem("classes")
      ) || [];


    if (loggedInStudent) {
      const studentClasses =
        savedClasses.filter(
          (item) =>
            String(item.studentId) ===
            String(loggedInStudent.id)
        );

      setClasses(studentClasses);
    } else {
      setClasses([]);
    }
  };


  // ==============================
  // STUDENT NAME
  // ==============================

  const studentName =
    student?.name || "Student";


  // ==============================
  // TEACHER
  // ==============================

  const teacherName =
    payment?.teacher || "No teacher assigned yet.";


  // ==============================
  // PLAN
  // ==============================

  const planName =
    payment?.plan || "No active plan.";


  // ==============================
  // PAYMENT STATUS
  // ==============================

  const paymentStatus =
    payment?.status || "No payment";


  return (
    <div className="student-dashboard">


      {/* =================================
          SIDEBAR
      ================================= */}

      <aside className="student-sidebar">

        {/* Logo */}

        <div className="student-logo">
          TuitionWeb
        </div>


        {/* Navigation */}

        <nav className="student-nav">

          <Link
            to="/student/dashboard"
            className="active"
          >
            Dashboard
          </Link>


          <Link to="/student/teachers">
            Find Teachers
          </Link>


          <Link to="/student/teacher">
            My Teacher
          </Link>


          <Link to="/student/classes">
            My Classes
          </Link>


          <Link to="/student/schedule">
            Schedule
          </Link>


          <Link to="/student/plan">
            Monthly Plan
          </Link>


          <Link to="/student/payments">
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


        {/* Logout */}

        <div className="student-logout">

          <Link to="/login">
            Logout
          </Link>

        </div>

      </aside>



      {/* =================================
          MAIN CONTENT
      ================================= */}

      <main className="student-main">


        {/* =================================
            TOP BAR
        ================================= */}

        <div className="student-topbar">

          <div>

            <h1>
              Student Dashboard
            </h1>

            <p>
              Welcome back, {studentName}! Let's continue your learning journey.
            </p>

          </div>


          {/* Student Profile */}

          <div className="student-profile">

            <div className="student-avatar">
              {studentName
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="student-profile-info">

              <strong>
                {studentName}
              </strong>

              <span>
                Student
              </span>

            </div>

          </div>

        </div>



        {/* =================================
            DASHBOARD CARDS
        ================================= */}

        <div className="dashboard-cards">


          {/* =================================
              MY TEACHER
          ================================= */}

          <div className="dashboard-card">

            <div className="dashboard-card-icon">
              👨‍🏫
            </div>

            <h3>
              My Teacher
            </h3>

            <p>
              {teacherName}
            </p>

            {payment && (
              <small>
                {payment.subject || "Subject"}
              </small>
            )}

          </div>



          {/* =================================
              MY CLASSES
          ================================= */}

          <div className="dashboard-card">

            <div className="dashboard-card-icon">
              📚
            </div>

            <h3>
              My Classes
            </h3>

            <p>
              {classes.length}{" "}
              {classes.length === 1
                ? "class"
                : "classes"}{" "}
              scheduled.
            </p>

          </div>



          {/* =================================
              MONTHLY PLAN
          ================================= */}

          <div className="dashboard-card">

            <div className="dashboard-card-icon">
              💳
            </div>

            <h3>
              Monthly Plan
            </h3>

            <p>
              {planName}
            </p>

            {payment && (
              <small>
                ₹
                {Number(
                  payment.amount || 0
                ).toLocaleString("en-IN")}{" "}
                / month
              </small>
            )}

          </div>



          {/* =================================
              LEARNING PROGRESS
          ================================= */}

          <div className="dashboard-card">

            <div className="dashboard-card-icon">
              📊
            </div>

            <h3>
              Learning Progress
            </h3>

            <p>
              0% completed.
            </p>

            <small>
              Progress tracking coming soon.
            </small>

          </div>

        </div>



        {/* =================================
            PAYMENT STATUS
        ================================= */}

        {payment && (

          <div className="student-dashboard-section">

            <div className="student-section-header">

              <div>

                <h2>
                  Current Subscription
                </h2>

                <p>
                  Your current learning plan.
                </p>

              </div>

            </div>


            <div className="student-subscription-card">


              <div>

                <span>
                  Plan
                </span>

                <strong>
                  {payment.plan}
                </strong>

              </div>


              <div>

                <span>
                  Teacher
                </span>

                <strong>
                  {payment.teacher}
                </strong>

              </div>


              <div>

                <span>
                  Amount
                </span>

                <strong>
                  ₹
                  {Number(
                    payment.amount || 0
                  ).toLocaleString("en-IN")}
                </strong>

              </div>


              <div>

                <span>
                  Status
                </span>

                <strong className="student-paid-status">
                  {paymentStatus}
                </strong>

              </div>

            </div>

          </div>

        )}



        {/* =================================
            MY CLASSES
        ================================= */}

        <div className="student-dashboard-section">

          <div className="student-section-header">

            <div>

              <h2>
                My Classes
              </h2>

              <p>
                Your scheduled classes.
              </p>

            </div>


            <Link
              to="/student/classes"
              className="student-view-link"
            >
              View All
            </Link>

          </div>


          {classes.length === 0 ? (

            <div className="student-empty-state">

              <div>
                📚
              </div>

              <h3>
                No Classes Yet
              </h3>

              <p>
                Your scheduled classes will appear here.
              </p>

            </div>

          ) : (

            <div className="student-classes-list">

              {classes.map((item) => (

                <div
                  className="student-class-item"
                  key={item.id}
                >

                  <div className="student-class-icon">
                    📚
                  </div>


                  <div className="student-class-info">

                    <strong>
                      {item.subject}
                    </strong>

                    <span>
                      Teacher: {item.teacher}
                    </span>

                    <span>
                      {item.schedule}
                    </span>

                  </div>


                  <div className="student-class-status">

                    {item.status}

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </main>

    </div>
  );
}

export default StudentDashboard;