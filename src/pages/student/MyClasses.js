import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import teachers from "../../data/teachers";

function MyClasses() {
  const [student, setStudent] = useState(null);
  const [payment, setPayment] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    loadClassData();
  }, []);

  const loadClassData = () => {
    /* ================================
       GET LOGGED-IN STUDENT
    ================================= */

    const loggedInStudent =
      JSON.parse(localStorage.getItem("loggedInStudent"));

    setStudent(loggedInStudent);

    if (!loggedInStudent) {
      return;
    }


    /* ================================
       GET PAYMENTS
    ================================= */

    const savedPayments =
      JSON.parse(localStorage.getItem("payments")) || [];

    const studentPayment = savedPayments
      .filter(
        (item) =>
          String(item.studentId) ===
            String(loggedInStudent.id) &&
          item.status === "Paid"
      )
      .slice(-1)[0];

    setPayment(studentPayment || null);


    /* ================================
       GET TEACHERS
    ================================= */

    const savedTeachers =
      JSON.parse(localStorage.getItem("teachers")) || [];

    const allTeachers = [
      ...teachers,
      ...savedTeachers,
    ];


    if (studentPayment) {
      let selectedTeacher = null;

      if (studentPayment.teacherId) {
        selectedTeacher = allTeachers.find(
          (item) =>
            String(item.id) ===
            String(studentPayment.teacherId)
        );
      }

      if (!selectedTeacher && studentPayment.teacher) {
        selectedTeacher = allTeachers.find(
          (item) =>
            item.name === studentPayment.teacher
        );
      }

      setTeacher(selectedTeacher || null);
    }


    /* ================================
       GET REAL CLASSES
    ================================= */

    const savedClasses =
      JSON.parse(localStorage.getItem("classes")) || [];


    /* ================================
       FILTER CLASSES FOR THIS STUDENT
    ================================= */

    const studentClasses = savedClasses.filter(
      (item) => {

        // Match student ID
        if (
          item.studentId &&
          loggedInStudent.id
        ) {
          return (
            String(item.studentId) ===
            String(loggedInStudent.id)
          );
        }

        // Match student name
        if (
          item.student &&
          loggedInStudent.name
        ) {
          return (
            item.student.toLowerCase() ===
            loggedInStudent.name.toLowerCase()
          );
        }

        return false;
      }
    );

    setClasses(studentClasses);
  };


  /* =================================
     PLAN CLASS COUNT
  ================================= */

  const planClasses = {
    "Basic Plan": 8,
    "Standard Plan": 12,
    "Premium Plan": 16,

    basic: 8,
    standard: 12,
    premium: 16,
  };


  const totalClasses =
    planClasses[payment?.plan] || 0;


  /* =================================
     COMPLETED CLASSES
  ================================= */

  const completedClasses = classes.filter(
    (item) =>
      String(item.status).toLowerCase() ===
      "completed"
  );


  /* =================================
     UPCOMING CLASSES
  ================================= */

  const upcomingClasses = classes.filter(
    (item) =>
      String(item.status).toLowerCase() !==
      "completed"
  );


  /* =================================
     REMAINING CLASSES
  ================================= */

  const remainingClasses = Math.max(
    totalClasses - completedClasses.length,
    0
  );


  return (
    <div className="student-dashboard">


      {/* =================================
          SIDEBAR
      ================================= */}

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

          <Link to="/student/teacher">
            My Teacher
          </Link>

          <Link
            to="/student/classes"
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


        {/* TOP BAR */}

        <div className="student-topbar">

          <div>

            <h1>
              My Classes
            </h1>

            <p>
              Manage your classes and learning sessions.
            </p>

          </div>


          <div className="student-profile">

            <div className="student-avatar">

              {student?.name
                ?.charAt(0)
                .toUpperCase() || "S"}

            </div>


            <div className="student-profile-info">

              <strong>
                {student?.name || "Student"}
              </strong>

              <span>
                Student
              </span>

            </div>

          </div>

        </div>


        {/* =================================
            NO ACTIVE PLAN
        ================================= */}

        {!payment ? (

          <div className="my-classes-empty">

            <div className="my-classes-empty-icon">
              📚
            </div>

            <h2>
              No Active Plan
            </h2>

            <p>
              Purchase a monthly plan to start
              attending classes.
            </p>

            <Link
              to="/student/teachers"
              className="find-teacher-button"
            >
              Find a Teacher
            </Link>

          </div>

        ) : (

          <>


            {/* =================================
                SUMMARY
            ================================= */}

            <div className="class-summary-grid">


              {/* TOTAL */}

              <div className="class-summary-card">

                <div className="class-summary-icon">
                  📚
                </div>

                <div>

                  <span>
                    Total Classes
                  </span>

                  <strong>
                    {totalClasses}
                  </strong>

                </div>

              </div>


              {/* COMPLETED */}

              <div className="class-summary-card">

                <div className="class-summary-icon">
                  ✓
                </div>

                <div>

                  <span>
                    Completed
                  </span>

                  <strong>
                    {completedClasses.length}
                  </strong>

                </div>

              </div>


              {/* UPCOMING */}

              <div className="class-summary-card">

                <div className="class-summary-icon">
                  🗓️
                </div>

                <div>

                  <span>
                    Upcoming
                  </span>

                  <strong>
                    {upcomingClasses.length}
                  </strong>

                </div>

              </div>


              {/* REMAINING */}

              <div className="class-summary-card">

                <div className="class-summary-icon">
                  ⏳
                </div>

                <div>

                  <span>
                    Remaining
                  </span>

                  <strong>
                    {remainingClasses}
                  </strong>

                </div>

              </div>

            </div>


            {/* =================================
                CURRENT TEACHER
            ================================= */}

            <div className="student-dashboard-section">

              <div className="student-section-header">

                <div>

                  <h2>
                    Current Teacher
                  </h2>

                  <p>
                    Your teacher for this monthly plan.
                  </p>

                </div>

              </div>


              <div className="class-teacher-card">

                <div className="class-teacher-avatar">
                  👨‍🏫
                </div>


                <div className="class-teacher-info">

                  <strong>
                    {teacher?.name ||
                      payment.teacher ||
                      "Teacher"}
                  </strong>

                  <span>
                    {teacher?.subject ||
                      payment.subject ||
                      "Subject"}
                  </span>

                </div>


                <div className="class-plan-badge">

                  {payment.plan ||
                    "Monthly Plan"}

                </div>

              </div>

            </div>


            {/* =================================
                REAL CLASSES
            ================================= */}

            <div className="student-dashboard-section">

              <div className="student-section-header">

                <div>

                  <h2>
                    My Classes
                  </h2>

                  <p>
                    Classes scheduled by the admin.
                  </p>

                </div>

              </div>


              {classes.length === 0 ? (

                <div className="no-classes">

                  <div className="no-classes-icon">
                    📚
                  </div>

                  <h2>
                    No Classes Scheduled
                  </h2>

                  <p>
                    Your teacher classes will
                    appear here when they are
                    scheduled.
                  </p>

                </div>

              ) : (

                <div className="class-list">

                  {classes.map((item) => (

                    <div
                      className="class-item"
                      key={item.id}
                    >


                      <div className="class-item-icon">
                        📚
                      </div>


                      <div className="class-item-info">

                        <strong>
                          {item.subject ||
                            "Class"}
                        </strong>

                        <span>
                          Teacher:{" "}
                          {item.teacher ||
                            teacher?.name ||
                            "Teacher"}
                        </span>

                      </div>


                      <div className="class-item-date">

                        <strong>
                          {item.date ||
                            item.schedule ||
                            "Date not set"}
                        </strong>

                        <span>
                          {item.time ||
                            ""}
                        </span>

                      </div>


                      <div
                        className={
                          String(item.status)
                            .toLowerCase() ===
                          "completed"
                            ? "class-status completed"
                            : "class-status"
                        }
                      >
                        {item.status ||
                          "Upcoming"}
                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>


            {/* =================================
                CURRENT PLAN
            ================================= */}

            <div className="student-dashboard-section">

              <div className="student-section-header">

                <div>

                  <h2>
                    Current Plan
                  </h2>

                  <p>
                    Your active monthly subscription.
                  </p>

                </div>

              </div>


              <div className="class-plan-details">


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
                    Classes
                  </span>

                  <strong>
                    {totalClasses} classes / month
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

                  <strong className="class-paid">
                    {payment.status}
                  </strong>

                </div>

              </div>

            </div>

          </>

        )}

      </main>

    </div>
  );
}

export default MyClasses;