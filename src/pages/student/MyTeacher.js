
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import teachers from "../../data/teachers";
import StudentSidebar from "./StudentSidebar";

function MyTeacher() {
  const [teacher, setTeacher] = useState(null);
  const [payment, setPayment] = useState(null);

  // =========================================
  // LOAD MY TEACHER
  // =========================================

  useEffect(() => {
    loadMyTeacher();

    const handleFocus = () => {
      loadMyTeacher();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const loadMyTeacher = () => {
    // =======================================
    // LOGGED-IN STUDENT
    // =======================================

    const loggedInStudent = JSON.parse(
      localStorage.getItem("loggedInStudent")
    );

    if (!loggedInStudent) {
      setTeacher(null);
      setPayment(null);
      return;
    }

    // =======================================
    // GET PAYMENTS
    // =======================================

    const savedPayments =
      JSON.parse(localStorage.getItem("payments")) || [];

    const studentId =
      loggedInStudent.id ||
      loggedInStudent.studentId;

    // =======================================
    // FIND PAID PAYMENT
    // =======================================

    const studentPayments = savedPayments.filter((item) => {
      const sameStudentId =
        item.studentId &&
        studentId &&
        String(item.studentId) === String(studentId);

      const sameStudentName =
        loggedInStudent.name &&
        (
          item.student === loggedInStudent.name ||
          item.studentName === loggedInStudent.name
        );

      return (
        (sameStudentId || sameStudentName) &&
        item.status === "Paid"
      );
    });

    const studentPayment =
      studentPayments.length > 0
        ? studentPayments[studentPayments.length - 1]
        : null;

    // =======================================
    // NO PAYMENT
    // =======================================

    if (!studentPayment) {
      setTeacher(null);
      setPayment(null);
      return;
    }

    setPayment(studentPayment);

    // =======================================
    // GET ALL TEACHERS
    // =======================================

    const savedTeachers =
      JSON.parse(localStorage.getItem("teachers")) || [];

    const allTeachers = [
      ...teachers,
      ...savedTeachers,
    ];

    // =======================================
    // FIND TEACHER BY ID
    // =======================================

    let selectedTeacher = null;

    if (studentPayment.teacherId) {
      selectedTeacher = allTeachers.find(
        (item) =>
          String(item.id) ===
          String(studentPayment.teacherId)
      );
    }

    // =======================================
    // FIND TEACHER BY NAME
    // =======================================

    if (
      !selectedTeacher &&
      studentPayment.teacher
    ) {
      selectedTeacher = allTeachers.find(
        (item) =>
          item.name === studentPayment.teacher
      );
    }

    setTeacher(selectedTeacher || null);
  };

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

        {/* HEADER */}

        <div className="student-topbar">

          <div>
            <h1>
              My Teacher
            </h1>

            <p>
              View your current teacher and
              learning plan.
            </p>
          </div>

        </div>


        {/* =====================================
            NO TEACHER
        ===================================== */}

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
              Choose a teacher and purchase a plan
              to start learning.
            </p>

            <Link
              to="/student/teachers"
              className="find-teacher-button"
            >
              Find a Teacher
            </Link>

          </div>

        ) : (

          <div className="my-teacher-container">

            {/* =================================
                TEACHER CARD
            ================================= */}

            <div className="my-teacher-card">

              <div className="my-teacher-avatar">
                {teacher.avatar || "👨‍🏫"}
              </div>

              <div className="my-teacher-info">

                <span className="my-teacher-label">
                  MY TEACHER
                </span>

                <h2>
                  {teacher.name}
                </h2>

                <p className="my-teacher-subject">
                  {teacher.subject ||
                    "Subject not specified"}
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


            {/* =================================
                CURRENT PLAN
            ================================= */}

            {payment && (

              <div className="my-teacher-plan">

                <div>

                  <span>
                    CURRENT PLAN
                  </span>

                  <h3>
                    {payment.plan ||
                      "Monthly Plan"}
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


            {/* =================================
                TEACHER DETAILS
            ================================= */}

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
                    {teacher.subject ||
                      "Not specified"}
                  </strong>

                </div>


                <div className="teacher-detail-item">

                  <span>
                    Plan
                  </span>

                  <strong>
                    {payment?.plan ||
                      "Not available"}
                  </strong>

                </div>


                <div className="teacher-detail-item">

                  <span>
                    Payment Status
                  </span>

                  <strong className="teacher-paid">
                    {payment?.status ||
                      "Paid"}
                  </strong>

                </div>

              </div>

            </div>


            {/* =================================
                ACTIONS
            ================================= */}

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