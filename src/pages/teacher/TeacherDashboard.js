import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TeacherDashboard() {
  const [teacher, setTeacher] = useState(null);

  const [studentCount, setStudentCount] = useState(0);
  const [classCount, setClassCount] = useState(0);
  const [todayClassCount, setTodayClassCount] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);


  // =========================================
  // LOAD DASHBOARD DATA
  // =========================================

  const loadDashboardData = () => {

    const loggedInTeacher =
      JSON.parse(
        localStorage.getItem("loggedInTeacher")
      );

    setTeacher(loggedInTeacher);


    if (!loggedInTeacher) {

      setStudentCount(0);
      setClassCount(0);
      setTodayClassCount(0);
      setTotalEarnings(0);

      return;
    }


    // =========================================
    // GET TEACHER-STUDENT RELATIONSHIPS
    // =========================================

    const teacherStudents =
      JSON.parse(
        localStorage.getItem("teacherStudents")
      ) || [];


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


    // =========================================
    // GET PAYMENTS
    // =========================================

    const savedPayments =
      JSON.parse(
        localStorage.getItem("payments")
      ) || [];


    // =========================================
    // MY STUDENTS
    // =========================================

    const myStudents =
      teacherStudents.filter(
        (student) =>
          String(student.teacherId) ===
          String(loggedInTeacher.id)
      );


    // =========================================
    // MY CLASSES
    // =========================================

    const myClasses =
      savedClasses.filter(
        (item) =>
          String(item.teacherId) ===
            String(loggedInTeacher.id) ||
          item.teacher ===
            loggedInTeacher.name
      );


    // =========================================
    // MY SCHEDULES
    // =========================================

    const mySchedules =
      savedSchedules.filter(
        (schedule) =>
          String(schedule.teacherId) ===
          String(loggedInTeacher.id)
      );


    // =========================================
    // TODAY
    // =========================================

    const today =
      new Date()
        .toISOString()
        .split("T")[0];


    // =========================================
    // TODAY'S CLASSES
    // =========================================

    const todayClasses =
      mySchedules.filter(
        (schedule) =>
          schedule.date === today
      );


    // =========================================
    // MY PAYMENTS
    // =========================================

    const myPayments =
      savedPayments.filter(
        (payment) =>
          String(payment.teacherId) ===
            String(loggedInTeacher.id) ||
          payment.teacher ===
            loggedInTeacher.name
      );


    // =========================================
    // TOTAL EARNINGS
    // =========================================

    const earnings =
      myPayments.reduce(
        (total, payment) => {

          if (
            payment.status === "Paid"
          ) {

            return (
              total +
              Number(
                payment.amount || 0
              )
            );

          }

          return total;

        },
        0
      );


    // =========================================
    // UPDATE DASHBOARD
    // =========================================

    setStudentCount(
      myStudents.length
    );

    setClassCount(
      myClasses.length
    );

    setTodayClassCount(
      todayClasses.length
    );

    setTotalEarnings(
      earnings
    );
  };


  // =========================================
  // INITIAL LOAD
  // =========================================

  useEffect(() => {

    loadDashboardData();

  }, []);


  // =========================================
  // REFRESH WHEN WINDOW GETS FOCUS
  // =========================================

  useEffect(() => {

    const handleFocus = () => {
      loadDashboardData();
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
    <div className="teacher-dashboard">


      {/* =====================================
          SIDEBAR
      ===================================== */}

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


      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <main className="teacher-main">


        {/* =====================================
            HEADER
        ===================================== */}

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


        {/* =====================================
            STATISTICS
        ===================================== */}

        <div className="teacher-statistics">


          {/* STUDENTS */}

          <div className="teacher-stat-card">

            <span>
              👨‍🎓
            </span>


            <div>

              <p>
                My Students
              </p>


              <h2>
                {studentCount}
              </h2>

            </div>

          </div>


          {/* CLASSES */}

          <div className="teacher-stat-card">

            <span>
              📚
            </span>


            <div>

              <p>
                My Classes
              </p>


              <h2>
                {classCount}
              </h2>

            </div>

          </div>


          {/* TODAY'S CLASSES */}

          <div className="teacher-stat-card">

            <span>
              📅
            </span>


            <div>

              <p>
                Today's Classes
              </p>


              <h2>
                {todayClassCount}
              </h2>

            </div>

          </div>


          {/* TOTAL EARNINGS */}

          <div className="teacher-stat-card">

            <span>
              💰
            </span>


            <div>

              <p>
                Total Earnings
              </p>


              <h2>
                ₹
                {totalEarnings.toLocaleString(
                  "en-IN"
                )}
              </h2>

            </div>

          </div>

        </div>


        {/* =====================================
            WELCOME
        ===================================== */}

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


        {/* =====================================
            QUICK ACTIONS
        ===================================== */}

        <div className="teacher-section">

          <h2>
            Quick Actions
          </h2>


          <div className="teacher-quick-actions">


            {/* STUDENTS */}

            <Link to="/teacher/students">

              <span>
                👨‍🎓
              </span>


              <strong>
                View Students
              </strong>


              <p>
                Manage your students
              </p>

            </Link>


            {/* CLASSES */}

            <Link to="/teacher/classes">

              <span>
                📚
              </span>


              <strong>
                My Classes
              </strong>


              <p>
                View your classes
              </p>

            </Link>


            {/* SCHEDULE */}

            <Link to="/teacher/schedule">

              <span>
                📅
              </span>


              <strong>
                Schedule
              </strong>


              <p>
                Schedule your classes
              </p>

            </Link>


            {/* PAYMENTS */}

            <Link to="/teacher/payments">

              <span>
                💰
              </span>


              <strong>
                Payments
              </strong>


              <p>
                View student payments
              </p>

            </Link>

          </div>

        </div>

      </main>

    </div>
  );
}

export default TeacherDashboard;