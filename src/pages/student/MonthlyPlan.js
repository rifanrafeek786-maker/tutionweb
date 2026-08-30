
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import teachers from "../../data/teachers";

function MonthlyPlan() {
  const { teacherId } = useParams();

  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================================
  // MONTHLY PLANS
  // =========================================

  const plans = [
    {
      id: "basic",
      name: "Basic Plan",
      price: 1000,
      classes: 8,
      description:
        "Good for students who need regular learning support.",
      features: [
        "8 classes per month",
        "One-to-one classes",
        "Online classes",
        "Basic learning support",
      ],
    },

    {
      id: "standard",
      name: "Standard Plan",
      price: 1500,
      classes: 12,
      description:
        "A balanced plan for regular and consistent learning.",
      features: [
        "12 classes per month",
        "One-to-one classes",
        "Online classes",
        "Learning progress tracking",
      ],
      popular: true,
    },

    {
      id: "premium",
      name: "Premium Plan",
      price: 2000,
      classes: 16,
      description:
        "More classes with personalized learning support.",
      features: [
        "16 classes per month",
        "One-to-one classes",
        "Online classes",
        "Personalized learning support",
      ],
    },
  ];

  // =========================================
  // LOAD TEACHER
  // =========================================

  useEffect(() => {
    const loadTeacher = () => {
      setLoading(true);

      const savedTeachers =
        JSON.parse(
          localStorage.getItem("teachers")
        ) || [];

      const allTeachers = [
        ...teachers,
        ...savedTeachers,
      ];

      const selectedTeacher =
        allTeachers.find(
          (item) =>
            String(item.id) ===
            String(teacherId)
        );

      setTeacher(
        selectedTeacher || null
      );

      setLoading(false);
    };

    loadTeacher();
  }, [teacherId]);

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="monthly-plan-page">
        <div className="monthly-plan-not-found">
          <h2>
            Loading plans...
          </h2>
        </div>
      </div>
    );
  }

  // =========================================
  // TEACHER NOT FOUND
  // =========================================

  if (!teacher) {
    return (
      <div className="monthly-plan-page">

        <div className="monthly-plan-not-found">

          <div className="not-found-icon">
            👨‍🏫
          </div>

          <h1>
            Teacher Not Found
          </h1>

          <p>
            We could not find the selected
            teacher.
          </p>

          <Link
            to="/student/teachers"
            className="back-to-teachers"
          >
            ← Back to Teachers
          </Link>

        </div>

      </div>
    );
  }

  // =========================================
  // PAGE
  // =========================================

  return (
    <div className="monthly-plan-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="monthly-plan-header">

        <span className="plan-header-badge">
          📦 Monthly Learning Plans
        </span>

        <h1>
          Choose Your Monthly Plan
        </h1>

        <p>
          Select a plan that works best for
          your learning needs.
        </p>

      </div>


      {/* =====================================
          SELECTED TEACHER
      ===================================== */}

      <div className="selected-teacher">

        <div className="selected-teacher-avatar">

          {teacher.avatar || "👨‍🏫"}

        </div>

        <div className="selected-teacher-info">

          <h2>
            {teacher.name}
          </h2>

          <p>
            {teacher.subject ||
              "Subject"}{" "}
            Teacher
          </p>

          <span>
            ⭐{" "}
            {teacher.rating ||
              "New"}
          </span>

        </div>

      </div>


      {/* =====================================
          PLANS
      ===================================== */}

      <div className="plans-container">

        {plans.map((plan) => (

          <div
            className={
              `plan-card ${
                plan.popular
                  ? "popular-plan"
                  : ""
              }`
            }
            key={plan.id}
          >

            {/* POPULAR */}

            {plan.popular && (
              <div className="popular-label">
                Most Popular
              </div>
            )}


            {/* PLAN NAME */}

            <h2>
              {plan.name}
            </h2>


            {/* PRICE */}

            <div className="plan-price">

              ₹
              {plan.price.toLocaleString(
                "en-IN"
              )}

              <span>
                / month
              </span>

            </div>


            {/* DESCRIPTION */}

            <p className="plan-description">
              {plan.description}
            </p>


            {/* CLASSES */}

            <div className="plan-class-count">

              📚{" "}
              {plan.classes}
              {" "}
              classes per month

            </div>


            {/* FEATURES */}

            <ul>

              {plan.features.map(
                (feature, index) => (

                  <li
                    key={index}
                  >
                    ✓{" "}
                    {feature}
                  </li>

                )
              )}

            </ul>


            {/* SELECT PLAN */}

            <Link
              to={
                `/student/payment?teacher=${teacher.id}&plan=${plan.id}`
              }
              className="select-plan-button"
            >
              Select Plan
            </Link>

          </div>

        ))}

      </div>


      {/* =====================================
          BACK
      ===================================== */}

      <Link
        to="/student/teachers"
        className="back-to-teachers"
      >
        ← Back to Teachers
      </Link>

    </div>
  );
}

export default MonthlyPlan;
