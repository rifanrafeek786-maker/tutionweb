import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TeacherPayments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = () => {
    const loggedInTeacher =
      JSON.parse(localStorage.getItem("loggedInTeacher"));

    const savedPayments =
      JSON.parse(localStorage.getItem("payments")) || [];

    if (!loggedInTeacher) {
      setPayments([]);
      return;
    }

    const teacherPayments = savedPayments.filter(
      (payment) =>
        String(payment.teacherId) ===
          String(loggedInTeacher.id) ||
        payment.teacher === loggedInTeacher.name
    );

    setPayments(teacherPayments);
  };

  const totalRevenue = payments.reduce(
    (total, payment) => {
      if (payment.status === "Paid") {
        return total + Number(payment.amount || 0);
      }

      return total;
    },
    0
  );

  return (
    <div className="teacher-dashboard">

      {/* SIDEBAR */}

      <aside className="teacher-sidebar">

        <div className="teacher-logo">
          TuitionWeb
        </div>

        <nav className="teacher-nav">

          <Link to="/teacher/dashboard">
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

          <Link
            to="/teacher/payments"
            className="active"
          >
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


      {/* MAIN */}

      <main className="teacher-main">

        <div className="teacher-topbar">

          <div>

            <h1>
              Payments
            </h1>

            <p>
              View payments from your students.
            </p>

          </div>

        </div>


        {/* STATISTICS */}

        <div className="teacher-statistics">

          <div className="teacher-stat-card">

            <span>
              💳
            </span>

            <div>

              <p>
                Total Payments
              </p>

              <h2>
                {payments.length}
              </h2>

            </div>

          </div>


          <div className="teacher-stat-card">

            <span>
              ₹
            </span>

            <div>

              <p>
                Total Revenue
              </p>

              <h2>
                ₹{totalRevenue.toLocaleString("en-IN")}
              </h2>

            </div>

          </div>

        </div>


        {/* PAYMENT LIST */}

        {payments.length === 0 ? (

          <div className="teacher-welcome-card">

            <div
              style={{
                fontSize: "45px",
                marginBottom: "15px",
              }}
            >
              💳
            </div>

            <h2>
              No Payments Yet
            </h2>

            <p>
              Payments from your students will
              appear here.
            </p>

          </div>

        ) : (

          <div className="teacher-students-list">

            {payments.map((payment) => (

              <div
                className="teacher-student-card"
                key={payment.id}
              >

                {/* ICON */}

                <div className="teacher-student-avatar">
                  💳
                </div>


                {/* INFORMATION */}

                <div className="teacher-student-info">

                  <h2>
                    {payment.plan ||
                      "Monthly Plan"}
                  </h2>

                  <p>
                    Student:{" "}
                    {payment.student ||
                      "Unknown Student"}
                  </p>

                  <p>
                    Subject:{" "}
                    {payment.subject ||
                      "Not specified"}
                  </p>

                  <div className="teacher-student-meta">

                    <span>
                      📅{" "}
                      {payment.date ||
                        "Date unavailable"}
                    </span>

                    <span>
                      {payment.status ||
                        "Pending"}
                    </span>

                  </div>

                </div>


                {/* AMOUNT */}

                <div className="teacher-student-payment">

                  <strong>
                    ₹
                    {Number(
                      payment.amount || 0
                    ).toLocaleString("en-IN")}
                  </strong>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  );
}

export default TeacherPayments;