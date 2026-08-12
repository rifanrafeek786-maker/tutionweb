import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function StudentPayments() {
  const [payments, setPayments] = useState([]);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = () => {
    // Get logged-in student
    const loggedInStudent =
      JSON.parse(
        localStorage.getItem("loggedInStudent")
      );

    setStudent(loggedInStudent);

    // Get all payments
    const savedPayments =
      JSON.parse(
        localStorage.getItem("payments")
      ) || [];

    // Show only this student's payments
    if (loggedInStudent) {
      const studentPayments = savedPayments.filter(
        (payment) =>
          String(payment.studentId) ===
          String(loggedInStudent.id)
      );

      setPayments(studentPayments.reverse());
    } else {
      setPayments([]);
    }
  };

  const totalPaid = payments.reduce(
    (total, payment) => {
      if (payment.status === "Paid") {
        return total + Number(payment.amount || 0);
      }

      return total;
    },
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

          <Link to="/student/classes">
            My Classes
          </Link>

          <Link to="/student/schedule">
            Schedule
          </Link>

          <Link to="/student/plan">
            Monthly Plan
          </Link>

          <Link
            to="/student/payments"
            className="active"
          >
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

        {/* Header */}

        <div className="student-topbar">

          <div>

            <h1>
              My Payments
            </h1>

            <p>
              View your payment history and subscription details.
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
            PAYMENT SUMMARY
        ================================= */}

        <div className="student-payment-stats">

          {/* Total Payments */}

          <div className="student-payment-stat">

            <div className="student-payment-stat-icon">
              💳
            </div>

            <div>

              <span>
                Total Payments
              </span>

              <strong>
                {payments.length}
              </strong>

            </div>

          </div>


          {/* Total Paid */}

          <div className="student-payment-stat">

            <div className="student-payment-stat-icon">
              ₹
            </div>

            <div>

              <span>
                Total Paid
              </span>

              <strong>
                ₹{totalPaid.toLocaleString("en-IN")}
              </strong>

            </div>

          </div>

        </div>


        {/* =================================
            PAYMENT HISTORY
        ================================= */}

        <div className="student-dashboard-section">

          <div className="student-section-header">

            <div>

              <h2>
                Payment History
              </h2>

              <p>
                Your completed and pending payments.
              </p>

            </div>

          </div>


          {payments.length === 0 ? (

            /* Empty State */

            <div className="student-empty-state">

              <div>
                💳
              </div>

              <h3>
                No Payments Yet
              </h3>

              <p>
                Your payments will appear here after you purchase a plan.
              </p>

              <Link
                to="/student/teachers"
                className="student-payment-action"
              >
                Find a Teacher
              </Link>

            </div>

          ) : (

            /* Payment List */

            <div className="student-payment-list">

              {payments.map((payment) => (

                <div
                  className="student-payment-card"
                  key={payment.id}
                >

                  {/* Icon */}

                  <div className="student-payment-icon">
                    💳
                  </div>


                  {/* Details */}

                  <div className="student-payment-details">

                    <h3>
                      {payment.plan || "Monthly Plan"}
                    </h3>

                    <p>
                      Teacher:{" "}
                      {payment.teacher || "Unknown"}
                    </p>

                    <p>
                      Subject:{" "}
                      {payment.subject || "Not specified"}
                    </p>

                    <div className="student-payment-meta">

                      <span>
                        {payment.date || "Date unavailable"}
                      </span>

                      <span
                        className={
                          payment.status === "Paid"
                            ? "student-status-paid"
                            : "student-status-pending"
                        }
                      >
                        {payment.status || "Pending"}
                      </span>

                    </div>

                  </div>


                  {/* Amount */}

                  <div className="student-payment-amount">

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

              ))}

            </div>

          )}

        </div>

      </main>

    </div>
  );
}

export default StudentPayments;