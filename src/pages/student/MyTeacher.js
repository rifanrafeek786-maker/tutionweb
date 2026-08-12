import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import teachers from "../../data/teachers";

function MyTeacher() {
  const [teacher, setTeacher] = useState(null);
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    loadMyTeacher();
  }, []);

  const loadMyTeacher = () => {
    // Get logged-in student
    const loggedInStudent =
      JSON.parse(localStorage.getItem("loggedInStudent"));

    // Get payments
    const savedPayments =
      JSON.parse(localStorage.getItem("payments")) || [];

    if (!loggedInStudent) {
      return;
    }

    // Find student's latest paid payment
    const studentPayment = savedPayments
      .filter(
        (item) =>
          String(item.studentId) ===
            String(loggedInStudent.id) &&
          item.status === "Paid"
      )
      .slice(-1)[0];

    if (!studentPayment) {
      setTeacher(null);
      setPayment(null);
      return;
    }

    setPayment(studentPayment);

    // Get admin-added teachers
    const savedTeachers =
      JSON.parse(localStorage.getItem("teachers")) || [];

    // Combine default + admin teachers
    const allTeachers = [
      ...teachers,
      ...savedTeachers,
    ];

    // Try teacher ID first
    let selectedTeacher = null;

    if (studentPayment.teacherId) {
      selectedTeacher = allTeachers.find(
        (item) =>
          String(item.id) ===
          String(studentPayment.teacherId)
      );
    }

    // If teacherId is not available,
    // find using teacher name
    if (!selectedTeacher && studentPayment.teacher) {
      selectedTeacher = allTeachers.find(
        (item) =>
          item.name === studentPayment.teacher
      );
    }

    setTeacher(selectedTeacher || null);
  };

  return (
    <div className="student-dashboard">

      {/* ==============================
          SIDEBAR
      ============================== */}

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

          <Link
            to="/student/teacher"
            className="active"
          >
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

        <div className="student-logout">

          <Link to="/login">
            Logout
          </Link>

        </div>

      </aside>


      {/* ==============================
          MAIN CONTENT
      ============================== */}

      <main className="student-main">

        {/* Header */}

        <div className="student-topbar">

          <div>

            <h1>
              My Teacher
            </h1>

            <p>
              View your current teacher and learning plan.
            </p>

          </div>

        </div>


        {/* ==============================
            NO TEACHER
        ============================== */}

        {!teacher ? (

          <div className="my-teacher-empty">

            <div className="my-teacher-empty-icon">
              👨‍🏫
            </div>

            <h2>
              No Teacher Assigned
            </h2>

            <p>
              You don't have an active teacher yet.
              Choose a teacher and purchase a plan to start learning.
            </p>

            <Link
              to="/student/teachers"
              className="find-teacher-button"
            >
              Find a Teacher
            </Link>

          </div>

        ) : (

          /* ==============================
             TEACHER CARD
          ============================== */

          <div className="my-teacher-container">

            <div className="my-teacher-card">

              {/* Teacher Avatar */}

              <div className="my-teacher-avatar">
                👨‍🏫
              </div>


              {/* Teacher Info */}

              <div className="my-teacher-info">

                <span className="my-teacher-label">
                  MY TEACHER
                </span>

                <h2>
                  {teacher.name}
                </h2>

                <p className="my-teacher-subject">
                  {teacher.subject || "Subject not specified"}
                </p>

                {teacher.experience && (
                  <p>
                    <strong>
                      Experience:
                    </strong>{" "}
                    {teacher.experience}
                  </p>
                )}

                {teacher.qualification && (
                  <p>
                    <strong>
                      Qualification:
                    </strong>{" "}
                    {teacher.qualification}
                  </p>
                )}

                {teacher.email && (
                  <p>
                    <strong>
                      Email:
                    </strong>{" "}
                    {teacher.email}
                  </p>
                )}

              </div>

            </div>


            {/* ==============================
                CURRENT PLAN
            ============================== */}

            {payment && (

              <div className="my-teacher-plan">

                <div>

                  <span>
                    CURRENT PLAN
                  </span>

                  <h3>
                    {payment.plan || "Monthly Plan"}
                  </h3>

                </div>


                <div className="my-teacher-plan-price">

                  <strong>
                    ₹
                    {Number(
                      payment.amount || 0
                    ).toLocaleString("en-IN")}
                  </strong>

                  <span>
                    / month
                  </span>

                </div>

              </div>

            )}


            {/* ==============================
                TEACHER DETAILS
            ============================== */}

            <div className="my-teacher-details">

              <h2>
                Teacher Details
              </h2>

              <div className="teacher-detail-grid">

                <div className="teacher-detail-item">

                  <span>
                    Teacher
                  </span>

                  <strong>
                    {teacher.name}
                  </strong>

                </div>


                <div className="teacher-detail-item">

                  <span>
                    Subject
                  </span>

                  <strong>
                    {teacher.subject || "Not specified"}
                  </strong>

                </div>


                <div className="teacher-detail-item">

                  <span>
                    Plan
                  </span>

                  <strong>
                    {payment?.plan || "Not available"}
                  </strong>

                </div>


                <div className="teacher-detail-item">

                  <span>
                    Payment Status
                  </span>

                  <strong className="teacher-paid">
                    {payment?.status || "Paid"}
                  </strong>

                </div>

              </div>

            </div>


            {/* Actions */}

            <div className="my-teacher-actions">

              <Link
                to="/student/classes"
                className="teacher-action-button"
              >
                View My Classes
              </Link>

              <Link
                to="/student/schedule"
                className="teacher-action-button secondary"
              >
                View Schedule
              </Link>

            </div>

          </div>

        )}

      </main>

    </div>
  );
}

export default MyTeacher;