import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import teachers from "../../data/teachers";

function MonthlyPlan() {
  const { teacherId } = useParams();

  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    // Get teachers added by admin
    const savedTeachers =
      JSON.parse(localStorage.getItem("teachers")) || [];

    // Combine dummy teachers + admin-added teachers
    const allTeachers = [
      ...teachers,
      ...savedTeachers,
    ];

    // Find selected teacher
    const selectedTeacher = allTeachers.find(
      (teacher) => String(teacher.id) === String(teacherId)
    );

    setTeacher(selectedTeacher);
  }, [teacherId]);

  // If teacher doesn't exist
  if (!teacher) {
    return (
      <div className="monthly-plan-page">

        <h1>Teacher Not Found</h1>

        <p>
          Please select a teacher first.
        </p>

        <Link
          to="/student/teachers"
          className="back-to-teachers"
        >
          ← Back to Teachers
        </Link>

      </div>
    );
  }

  return (
    <div className="monthly-plan-page">

      {/* Header */}

      <div className="monthly-plan-header">

        <h1>
          Choose Your Monthly Plan
        </h1>

        <p>
          Select a plan that works best for your learning needs.
        </p>

      </div>


      {/* Selected Teacher */}

      <div className="selected-teacher">

        <div className="selected-teacher-avatar">
          {teacher.avatar}
        </div>

        <div>

          <h2>
            {teacher.name}
          </h2>

          <p>
            {teacher.subject} Teacher
          </p>

          <span>
            ⭐ {teacher.rating}
          </span>

        </div>

      </div>


      {/* Plans */}

      <div className="plans-container">

        {/* Basic Plan */}

        <div className="plan-card">

          <h2>
            Basic Plan
          </h2>

          <div className="plan-price">
            ₹1,000
            <span>/ month</span>
          </div>

          <p>
            Good for students who need regular support.
          </p>

          <ul>
            <li>✓ 8 classes per month</li>
            <li>✓ One-to-one classes</li>
            <li>✓ Online classes</li>
            <li>✓ Basic learning support</li>
          </ul>

          <Link
            to={`/student/payment?teacher=${teacher.id}&plan=basic`}
            className="select-plan-button"
          >
            Select Plan
          </Link>

        </div>


        {/* Standard Plan */}

        <div className="plan-card popular-plan">

          <div className="popular-label">
            Most Popular
          </div>

          <h2>
            Standard Plan
          </h2>

          <div className="plan-price">
            ₹1,500
            <span>/ month</span>
          </div>

          <p>
            A balanced plan for regular learning.
          </p>

          <ul>
            <li>✓ 12 classes per month</li>
            <li>✓ One-to-one classes</li>
            <li>✓ Online classes</li>
            <li>✓ Learning progress tracking</li>
          </ul>

          <Link
            to={`/student/payment?teacher=${teacher.id}&plan=standard`}
            className="select-plan-button"
          >
            Select Plan
          </Link>

        </div>


        {/* Premium Plan */}

        <div className="plan-card">

          <h2>
            Premium Plan
          </h2>

          <div className="plan-price">
            ₹2,000
            <span>/ month</span>
          </div>

          <p>
            More classes and personalized learning.
          </p>

          <ul>
            <li>✓ 16 classes per month</li>
            <li>✓ One-to-one classes</li>
            <li>✓ Online classes</li>
            <li>✓ Personalized learning support</li>
          </ul>

          <Link
            to={`/student/payment?teacher=${teacher.id}&plan=premium`}
            className="select-plan-button"
          >
            Select Plan
          </Link>

        </div>

      </div>


      {/* Back */}

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