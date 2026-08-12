import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import teachers from "../../data/teachers";

function AdminDashboard() {
  const [teacherCount, setTeacherCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [classCount, setClassCount] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);

  const loadDashboardData = () => {
    // ==============================
    // TEACHERS
    // ==============================

    const savedTeachers =
      JSON.parse(localStorage.getItem("teachers")) || [];

    const allTeachers = [
      ...teachers,
      ...savedTeachers,
    ];

    setTeacherCount(allTeachers.length);


    // ==============================
    // STUDENTS
    // ==============================

    const savedStudents =
      JSON.parse(localStorage.getItem("students")) || [];

    setStudentCount(savedStudents.length);


    // ==============================
    // CLASSES
    // ==============================

    const savedClasses =
      JSON.parse(localStorage.getItem("classes")) || [];

    const activeClasses = savedClasses.filter(
      (item) => item.status === "Active"
    );

    setClassCount(activeClasses.length);


    // ==============================
    // PAYMENTS / REVENUE
    // ==============================

    const savedPayments =
      JSON.parse(localStorage.getItem("payments")) || [];

    const paidPayments = savedPayments.filter(
      (payment) => payment.status === "Paid"
    );

    const revenue = paidPayments.reduce(
      (total, payment) =>
        total + Number(payment.amount || 0),
      0
    );

    setMonthlyRevenue(revenue);
  };


  // ==============================
  // LOAD DATA
  // ==============================

  useEffect(() => {
    loadDashboardData();

    // Refresh when returning to dashboard
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
    <div className="admin-layout">

      {/* =================================
          SIDEBAR
      ================================= */}

      <aside className="admin-sidebar">

        <div className="admin-logo">

          <div className="admin-logo-icon">
            T
          </div>

          <div>
            <h2>
              TuitionWeb
            </h2>

            <span>
              ADMIN PANEL
            </span>
          </div>

        </div>


        <nav className="admin-nav">

          <p className="admin-nav-title">
            MAIN MENU
          </p>


          <Link
            to="/admin/dashboard"
            className="admin-nav-item active"
          >
            <span>▣</span>
            Dashboard
          </Link>


          <Link
            to="/admin/teachers"
            className="admin-nav-item"
          >
            <span>♟</span>
            Teachers
          </Link>


          <Link
            to="/admin/add-teacher"
            className="admin-nav-item"
          >
            <span>＋</span>
            Add Teacher
          </Link>


          <Link
            to="/admin/students"
            className="admin-nav-item"
          >
            <span>♙</span>
            Students
          </Link>


          <Link
            to="/admin/classes"
            className="admin-nav-item"
          >
            <span>▤</span>
            Classes
          </Link>


          <Link
            to="/admin/add-class"
            className="admin-nav-item"
          >
            <span>＋</span>
            Add Class
          </Link>


          <Link
            to="/admin/payments"
            className="admin-nav-item"
          >
            <span>₹</span>
            Payments
          </Link>


          <p className="admin-nav-title admin-nav-bottom-title">
            SYSTEM
          </p>


          <Link
            to="/admin/settings"
            className="admin-nav-item"
          >
            <span>⚙</span>
            Settings
          </Link>

        </nav>


        <div className="admin-sidebar-bottom">

          <button className="admin-logout">
            <span>↪</span>
            Logout
          </button>

        </div>

      </aside>


      {/* =================================
          MAIN
      ================================= */}

      <main className="admin-main">

        {/* HEADER */}

        <header className="admin-topbar">

          <div>

            <h1>
              Dashboard
            </h1>

            <p>
              Welcome back! Here's what's happening today.
            </p>

          </div>


          <div className="admin-profile">

            <div className="admin-notification">
              🔔
            </div>

            <div className="admin-user-avatar">
              A
            </div>

            <div className="admin-user-info">

              <strong>
                Administrator
              </strong>

              <span>
                Admin
              </span>

            </div>

          </div>

        </header>


        {/* =================================
            STATISTICS
        ================================= */}

        <section className="admin-statistics">


          {/* TEACHERS */}

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              👨‍🏫
            </div>

            <div className="admin-stat-content">

              <span>
                Total Teachers
              </span>

              <strong>
                {teacherCount}
              </strong>

              <small>
                Currently registered
              </small>

            </div>

          </div>


          {/* STUDENTS */}

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              👨‍🎓
            </div>

            <div className="admin-stat-content">

              <span>
                Total Students
              </span>

              <strong>
                {studentCount}
              </strong>

              <small>
                Currently registered
              </small>

            </div>

          </div>


          {/* CLASSES */}

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              📚
            </div>

            <div className="admin-stat-content">

              <span>
                Active Classes
              </span>

              <strong>
                {classCount}
              </strong>

              <small>
                Currently active
              </small>

            </div>

          </div>


          {/* REVENUE */}

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              ₹
            </div>

            <div className="admin-stat-content">

              <span>
                Monthly Revenue
              </span>

              <strong>
                ₹{monthlyRevenue.toLocaleString("en-IN")}
              </strong>

              <small>
                From paid payments
              </small>

            </div>

          </div>

        </section>


        {/* =================================
            DASHBOARD GRID
        ================================= */}

        <section className="admin-dashboard-grid">


          {/* QUICK ACTIONS */}

          <div className="admin-panel quick-actions-panel">

            <div className="admin-panel-header">

              <div>

                <h2>
                  Quick Actions
                </h2>

                <p>
                  Manage your platform quickly.
                </p>

              </div>

            </div>


            <div className="quick-actions">


              <Link
                to="/admin/add-teacher"
                className="quick-action"
              >

                <div className="quick-action-icon">
                  ＋
                </div>

                <div>

                  <strong>
                    Add Teacher
                  </strong>

                  <span>
                    Add a new teacher
                  </span>

                </div>

                <b>→</b>

              </Link>


              <Link
                to="/admin/teachers"
                className="quick-action"
              >

                <div className="quick-action-icon">
                  👨‍🏫
                </div>

                <div>

                  <strong>
                    Manage Teachers
                  </strong>

                  <span>
                    View and manage teachers
                  </span>

                </div>

                <b>→</b>

              </Link>


              <Link
                to="/admin/students"
                className="quick-action"
              >

                <div className="quick-action-icon">
                  👨‍🎓
                </div>

                <div>

                  <strong>
                    Manage Students
                  </strong>

                  <span>
                    View registered students
                  </span>

                </div>

                <b>→</b>

              </Link>


              <Link
                to="/admin/add-class"
                className="quick-action"
              >

                <div className="quick-action-icon">
                  📚
                </div>

                <div>

                  <strong>
                    Add Class
                  </strong>

                  <span>
                    Create a new class
                  </span>

                </div>

                <b>→</b>

              </Link>


              <Link
                to="/admin/payments"
                className="quick-action"
              >

                <div className="quick-action-icon">
                  ₹
                </div>

                <div>

                  <strong>
                    Payments
                  </strong>

                  <span>
                    View payment activity
                  </span>

                </div>

                <b>→</b>

              </Link>

            </div>

          </div>


          {/* RECENT ACTIVITY */}

          <div className="admin-panel activity-panel">

            <div className="admin-panel-header">

              <div>

                <h2>
                  Recent Activity
                </h2>

                <p>
                  Latest platform activity.
                </p>

              </div>

            </div>


            <div className="activity-list">


              <div className="activity-item">

                <div className="activity-icon">
                  👨‍🏫
                </div>

                <div className="activity-details">

                  <strong>
                    Teacher management
                  </strong>

                  <span>
                    {teacherCount} teacher(s) currently registered
                  </span>

                </div>

                <time>
                  Now
                </time>

              </div>


              <div className="activity-item">

                <div className="activity-icon">
                  👨‍🎓
                </div>

                <div className="activity-details">

                  <strong>
                    Student registration
                  </strong>

                  <span>
                    {studentCount} student(s) registered
                  </span>

                </div>

                <time>
                  Today
                </time>

              </div>


              <div className="activity-item">

                <div className="activity-icon">
                  📚
                </div>

                <div className="activity-details">

                  <strong>
                    Class management
                  </strong>

                  <span>
                    {classCount} active class(es)
                  </span>

                </div>

                <time>
                  Today
                </time>

              </div>


              <div className="activity-item">

                <div className="activity-icon">
                  💳
                </div>

                <div className="activity-details">

                  <strong>
                    Payment activity
                  </strong>

                  <span>
                    ₹{monthlyRevenue.toLocaleString("en-IN")} collected
                  </span>

                </div>

                <time>
                  Today
                </time>

              </div>

            </div>

          </div>

        </section>


        {/* =================================
            BOTTOM GRID
        ================================= */}

        <section className="admin-bottom-grid">


          {/* PLATFORM OVERVIEW */}

          <div className="admin-panel">

            <div className="admin-panel-header">

              <div>

                <h2>
                  Platform Overview
                </h2>

                <p>
                  Current platform status.
                </p>

              </div>

            </div>


            <div className="overview-list">

              <div className="overview-row">

                <span>
                  Teacher accounts
                </span>

                <strong>
                  {teacherCount}
                </strong>

              </div>


              <div className="overview-row">

                <span>
                  Student accounts
                </span>

                <strong>
                  {studentCount}
                </strong>

              </div>


              <div className="overview-row">

                <span>
                  Active classes
                </span>

                <strong>
                  {classCount}
                </strong>

              </div>


              <div className="overview-row">

                <span>
                  Total revenue
                </span>

                <strong>
                  ₹{monthlyRevenue.toLocaleString("en-IN")}
                </strong>

              </div>

            </div>

          </div>


          {/* SYSTEM STATUS */}

          <div className="admin-panel system-status-panel">

            <div className="admin-panel-header">

              <div>

                <h2>
                  System Status
                </h2>

                <p>
                  Platform health.
                </p>

              </div>

            </div>


            <div className="system-status">

              <div>

                <span className="status-dot"></span>

                <span>
                  Website
                </span>

                <strong>
                  Operational
                </strong>

              </div>


              <div>

                <span className="status-dot"></span>

                <span>
                  Database
                </span>

                <strong>
                  Operational
                </strong>

              </div>


              <div>

                <span className="status-dot"></span>

                <span>
                  Payments
                </span>

                <strong>
                  Operational
                </strong>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;