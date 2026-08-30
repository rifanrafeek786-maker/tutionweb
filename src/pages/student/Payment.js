
import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import teachers from "../../data/teachers";

function Payment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const teacherId = searchParams.get("teacher");
  const planType = searchParams.get("plan");

  const [teacher, setTeacher] = useState(null);

  // =========================================
  // PLAN DATA
  // =========================================

  const plans = {
    basic: {
      name: "Basic Plan",
      price: 1000,
      classes: 8,
    },

    standard: {
      name: "Standard Plan",
      price: 1500,
      classes: 12,
    },

    premium: {
      name: "Premium Plan",
      price: 2000,
      classes: 16,
    },
  };

  const selectedPlan = plans[planType];

  // =========================================
  // LOAD TEACHER
  // =========================================

  useEffect(() => {
    const savedTeachers =
      JSON.parse(localStorage.getItem("teachers")) || [];

    const allTeachers = [
      ...teachers,
      ...savedTeachers,
    ];

    const selectedTeacher = allTeachers.find(
      (item) =>
        String(item.id) === String(teacherId)
    );

    setTeacher(selectedTeacher || null);
  }, [teacherId]);

  // =========================================
  // HANDLE PAYMENT
  // =========================================

  const handlePayment = () => {
    // Check teacher and plan
    if (!teacher || !selectedPlan) {
      alert(
        "Teacher or plan selection not found."
      );
      return;
    }

    // =======================================
    // GET LOGGED-IN STUDENT
    // =======================================

    const loggedInStudent =
      JSON.parse(
        localStorage.getItem("loggedInStudent")
      );

    if (!loggedInStudent) {
      alert(
        "Please login as a student first."
      );

      navigate("/login");
      return;
    }

    // =======================================
    // STUDENT INFORMATION
    // =======================================

    const studentId =
      loggedInStudent.id ||
      loggedInStudent.studentId ||
      null;

    const studentName =
      loggedInStudent.name ||
      loggedInStudent.studentName ||
      "Student";

    // =======================================
    // GET EXISTING PAYMENTS
    // =======================================

    const existingPayments =
      JSON.parse(
        localStorage.getItem("payments")
      ) || [];

    // =======================================
    // CREATE NEW PAYMENT
    // =======================================

    const newPayment = {
      id: Date.now(),

      studentId: studentId,

      student: studentName,

      teacherId: teacher.id,

      teacher: teacher.name,

      subject:
        teacher.subject || "General",

      plan: selectedPlan.name,

      planType: planType,

      amount: selectedPlan.price,

      classes: selectedPlan.classes,

      date:
        new Date().toLocaleDateString(
          "en-IN"
        ),

      status: "Paid",
    };

    // =======================================
    // SAVE PAYMENT
    // =======================================

    const updatedPayments = [
      ...existingPayments,
      newPayment,
    ];

    localStorage.setItem(
      "payments",
      JSON.stringify(updatedPayments)
    );

    // =======================================
    // SAVE TEACHER-STUDENT CONNECTION
    // =======================================

    const existingRelationships =
      JSON.parse(
        localStorage.getItem(
          "teacherStudents"
        )
      ) || [];

    const existingConnection =
      existingRelationships.find(
        (item) =>
          String(item.studentId) ===
            String(studentId) &&
          String(item.teacherId) ===
            String(teacher.id)
      );

    if (existingConnection) {
      // UPDATE EXISTING CONNECTION

      const updatedRelationships =
        existingRelationships.map(
          (item) => {
            if (
              String(item.studentId) ===
                String(studentId) &&
              String(item.teacherId) ===
                String(teacher.id)
            ) {
              return {
                ...item,

                studentId: studentId,

                student: studentName,

                teacherId: teacher.id,

                teacher: teacher.name,

                subject:
                  teacher.subject ||
                  "General",

                plan: selectedPlan.name,

                planType: planType,

                amount:
                  selectedPlan.price,

                classes:
                  selectedPlan.classes,

                status: "Active",

                paymentStatus: "Paid",

                updatedDate:
                  new Date().toLocaleDateString(
                    "en-IN"
                  ),
              };
            }

            return item;
          }
        );

      localStorage.setItem(
        "teacherStudents",
        JSON.stringify(
          updatedRelationships
        )
      );
    } else {
      // CREATE NEW CONNECTION

      const newRelationship = {
        id: Date.now(),

        studentId: studentId,

        student: studentName,

        teacherId: teacher.id,

        teacher: teacher.name,

        subject:
          teacher.subject ||
          "General",

        plan: selectedPlan.name,

        planType: planType,

        amount:
          selectedPlan.price,

        classes:
          selectedPlan.classes,

        joinedDate:
          new Date().toLocaleDateString(
            "en-IN"
          ),

        status: "Active",

        paymentStatus: "Paid",
      };

      const updatedRelationships = [
        ...existingRelationships,
        newRelationship,
      ];

      localStorage.setItem(
        "teacherStudents",
        JSON.stringify(
          updatedRelationships
        )
      );
    }

    // =======================================
    // SAVE CURRENT STUDENT PLAN
    // =======================================

    const studentPlan = {
      studentId: studentId,

      student: studentName,

      teacherId: teacher.id,

      teacher: teacher.name,

      subject:
        teacher.subject ||
        "General",

      plan: selectedPlan.name,

      planType: planType,

      amount:
        selectedPlan.price,

      classes:
        selectedPlan.classes,

      startDate:
        new Date().toLocaleDateString(
          "en-IN"
        ),

      paymentStatus: "Paid",

      status: "Active",
    };

    localStorage.setItem(
      "studentPlan",
      JSON.stringify(studentPlan)
    );

    // =======================================
    // SUCCESS MESSAGE
    // =======================================

    alert(
      "Payment successful! Your monthly plan is now active."
    );

    // =======================================
    // GO TO STUDENT DASHBOARD
    // =======================================

    navigate("/student/dashboard");
  };

  // =========================================
  // INVALID SELECTION
  // =========================================

  if (!teacher || !selectedPlan) {
    return (
      <div className="payment-page">

        <div className="payment-card">

          <h1>
            Selection Not Found
          </h1>

          <p>
            Please select a teacher and
            monthly plan again.
          </p>

          <Link
            to="/student/teachers"
            className="back-to-plan"
            style={{
              display: "inline-block",
              marginTop: "20px",
              textDecoration: "none",
            }}
          >
            ← Back to Teachers
          </Link>

        </div>

      </div>
    );
  }

  // =========================================
  // PAYMENT PAGE
  // =========================================

  return (
    <div className="payment-page">

      {/* HEADER */}

      <div className="payment-header">

        <h1>
          Payment
        </h1>

        <p>
          Review your monthly plan before
          completing payment.
        </p>

      </div>


      {/* PAYMENT CARD */}

      <div className="payment-card">

        <h2>
          Order Summary
        </h2>


        {/* TEACHER */}

        <div className="payment-row">

          <span>
            Teacher
          </span>

          <strong>
            {teacher.name}
          </strong>

        </div>


        {/* SUBJECT */}

        <div className="payment-row">

          <span>
            Subject
          </span>

          <strong>
            {teacher.subject ||
              "General"}
          </strong>

        </div>


        {/* PLAN */}

        <div className="payment-row">

          <span>
            Plan
          </span>

          <strong>
            {selectedPlan.name}
          </strong>

        </div>


        {/* CLASSES */}

        <div className="payment-row">

          <span>
            Classes
          </span>

          <strong>
            {selectedPlan.classes}
            {" "}
            classes / month
          </strong>

        </div>


        <hr />


        {/* TOTAL */}

        <div className="payment-total">

          <span>
            Total
          </span>

          <strong>
            ₹
            {selectedPlan.price.toLocaleString(
              "en-IN"
            )}
          </strong>

        </div>


        {/* PAYMENT METHOD */}

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

            {" "}
            Online Payment

          </label>

        </div>


        {/* PAY BUTTON */}

        <button
          type="button"
          className="pay-button"
          onClick={handlePayment}
        >
          Proceed to Payment
        </button>


        {/* BACK */}

        <Link
          to={`/student/plan/${teacher.id}`}
          className="back-to-plan"
          style={{
            display: "inline-block",
            marginTop: "15px",
            textDecoration: "none",
          }}
        >
          ← Back to Plans
        </Link>

      </div>

    </div>
  );
}

export default Payment;

