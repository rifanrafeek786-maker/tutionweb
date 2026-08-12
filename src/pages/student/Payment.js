import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import teachers from "../../data/teachers";

function Payment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const teacherId = searchParams.get("teacher");
  const plan = searchParams.get("plan");

  const [teacher, setTeacher] = useState(null);

  // ==============================
  // GET SELECTED TEACHER
  // ==============================

  useEffect(() => {
    const savedTeachers =
      JSON.parse(localStorage.getItem("teachers")) || [];

    const allTeachers = [
      ...teachers,
      ...savedTeachers,
    ];

    const selectedTeacher = allTeachers.find(
      (teacher) =>
        String(teacher.id) === String(teacherId)
    );

    setTeacher(selectedTeacher);
  }, [teacherId]);


  // ==============================
  // PLANS
  // ==============================

  const plans = {
    basic: {
      name: "Basic Plan",
      price: 1000,
      classes: "8 classes per month",
    },

    standard: {
      name: "Standard Plan",
      price: 1500,
      classes: "12 classes per month",
    },

    premium: {
      name: "Premium Plan",
      price: 2000,
      classes: "16 classes per month",
    },
  };


  const selectedPlan = plans[plan];


  // ==============================
  // HANDLE PAYMENT
  // ==============================

  const handlePayment = () => {

    if (!teacher || !selectedPlan) {
      alert("Selection not found.");
      return;
    }

    // Get logged-in student
    const loggedInStudent =
      JSON.parse(
        localStorage.getItem("loggedInStudent")
      );

    // Get existing payments
    const existingPayments =
      JSON.parse(localStorage.getItem("payments")) || [];


    // Create payment
    const newPayment = {

      id: Date.now(),

      student:
        loggedInStudent?.name ||
        "Student",

      studentId:
        loggedInStudent?.id ||
        null,

      teacher:
        teacher.name,

      teacherId:
        teacher.id,

      subject:
        teacher.subject,

      plan:
        selectedPlan.name,

      planType:
        plan,

      amount:
        selectedPlan.price,

      classes:
        selectedPlan.classes,

      date:
        new Date().toLocaleDateString("en-IN"),

      status:
        "Paid",
    };


    // Save payment

    const updatedPayments = [
      ...existingPayments,
      newPayment,
    ];

    localStorage.setItem(
      "payments",
      JSON.stringify(updatedPayments)
    );


    // Success message

    alert("Payment successful!");


    // Go to student dashboard

    navigate("/student/dashboard");
  };


  // ==============================
  // CHECK SELECTION
  // ==============================

  if (!teacher || !selectedPlan) {
    return (
      <div className="payment-page">

        <div className="payment-card">

          <h1>
            Selection Not Found
          </h1>

          <p>
            Please select a teacher and plan again.
          </p>

          <Link
            to="/student/teachers"
            className="back-to-plan"
          >
            ← Back to Teachers
          </Link>

        </div>

      </div>
    );
  }


  // ==============================
  // PAYMENT PAGE
  // ==============================

  return (
    <div className="payment-page">


      {/* Header */}

      <div className="payment-header">

        <h1>
          Payment
        </h1>

        <p>
          Review your selection before continuing.
        </p>

      </div>


      {/* Payment Card */}

      <div className="payment-card">

        <h2>
          Order Summary
        </h2>


        {/* Teacher */}

        <div className="payment-row">

          <span>
            Teacher
          </span>

          <strong>
            {teacher.name}
          </strong>

        </div>


        {/* Subject */}

        <div className="payment-row">

          <span>
            Subject
          </span>

          <strong>
            {teacher.subject}
          </strong>

        </div>


        {/* Plan */}

        <div className="payment-row">

          <span>
            Plan
          </span>

          <strong>
            {selectedPlan.name}
          </strong>

        </div>


        {/* Classes */}

        <div className="payment-row">

          <span>
            Classes
          </span>

          <strong>
            {selectedPlan.classes}
          </strong>

        </div>


        <hr />


        {/* Total */}

        <div className="payment-total">

          <span>
            Total
          </span>

          <strong>
            ₹{selectedPlan.price.toLocaleString("en-IN")}
          </strong>

        </div>


        {/* Payment Method */}

        <div className="payment-method">

          <h2>
            Payment Method
          </h2>

          <label>

            <input
              type="radio"
              name="payment"
              defaultChecked
            />

            Online Payment

          </label>

        </div>


        {/* Payment Button */}

        <button
          className="pay-button"
          onClick={handlePayment}
        >
          Proceed to Payment
        </button>


        {/* Back */}

        <Link
          to={`/student/plan/${teacher.id}`}
          className="back-to-plan"
        >
          ← Back to Plans
        </Link>

      </div>

    </div>
  );
}

export default Payment;