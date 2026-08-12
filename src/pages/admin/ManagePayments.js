import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ManagePayments() {
  const [payments, setPayments] = useState([]);

  const loadPayments = () => {
    const savedPayments =
      JSON.parse(localStorage.getItem("payments")) || [];

    setPayments(savedPayments);
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this payment?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedPayments = payments.filter(
      (payment) => payment.id !== id
    );

    localStorage.setItem(
      "payments",
      JSON.stringify(updatedPayments)
    );

    setPayments(updatedPayments);
  };

  // Calculate total revenue
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
    <div className="manage-payments-page">

      {/* Header */}

      <div className="manage-payments-header">

        <div>
          <h1>Manage Payments</h1>

          <p>
            View and manage student payments.
          </p>
        </div>

        <Link
          to="/admin/dashboard"
          className="back-admin-button"
        >
          ← Dashboard
        </Link>

      </div>


      {/* Statistics */}

      <div className="payment-statistics">

        <div className="payment-stat-card">

          <div className="payment-stat-icon">
            💳
          </div>

          <div>
            <span>Total Payments</span>

            <strong>
              {payments.length}
            </strong>
          </div>

        </div>


        <div className="payment-stat-card">

          <div className="payment-stat-icon">
            ₹
          </div>

          <div>
            <span>Total Revenue</span>

            <strong>
              ₹{totalRevenue.toLocaleString("en-IN")}
            </strong>
          </div>

        </div>

      </div>


      {/* Empty State */}

      {payments.length === 0 ? (

        <div className="no-payments">

          <div className="no-payments-icon">
            💳
          </div>

          <h2>
            No Payments Yet
          </h2>

          <p>
            Student payments will appear here after
            a plan is purchased.
          </p>

        </div>

      ) : (

        /* Payment List */

        <div className="admin-payment-list">

          {payments.map((payment) => (

            <div
              className="admin-payment-card"
              key={payment.id}
            >

              {/* Payment Icon */}

              <div className="admin-payment-icon">
                💳
              </div>


              {/* Payment Information */}

              <div className="admin-payment-info">

                <h2>
                  {payment.plan || "Monthly Plan"}
                </h2>

                <p>
                  Student:{" "}
                  {payment.student || "Unknown Student"}
                </p>

                <p>
                  Teacher:{" "}
                  {payment.teacher || "Unknown Teacher"}
                </p>

                <div className="payment-meta">

                  <span>
                    {payment.date || "Date not available"}
                  </span>

                  <span
                    className={
                      payment.status === "Paid"
                        ? "payment-paid"
                        : "payment-pending"
                    }
                  >
                    {payment.status || "Pending"}
                  </span>

                </div>

              </div>


              {/* Amount */}

              <div className="payment-amount">

                <strong>
                  ₹
                  {Number(
                    payment.amount || 0
                  ).toLocaleString("en-IN")}
                </strong>

                <button
                  className="delete-payment-button"
                  onClick={() =>
                    handleDelete(payment.id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default ManagePayments;