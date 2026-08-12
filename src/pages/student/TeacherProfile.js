import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import teachers from "../../data/teachers";

function TeacherProfile() {
  const { id } = useParams();

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
      (teacher) => String(teacher.id) === String(id)
    );

    setTeacher(selectedTeacher);
  }, [id]);

  // Teacher not found
  if (!teacher) {
    return (
      <div className="teacher-profile-page">

        <h1>Teacher Not Found</h1>

        <p>
          The teacher you are looking for does not exist.
        </p>

        <Link
          to="/student/teachers"
          className="back-button"
        >
          ← Back to Teachers
        </Link>

      </div>
    );
  }

  return (
    <div className="teacher-profile-page">

      {/* Back Button */}

      <Link
        to="/student/teachers"
        className="back-button"
      >
        ← Back to Teachers
      </Link>


      {/* Teacher Profile */}

      <div className="teacher-profile-card">

        {/* Header */}

        <div className="teacher-profile-header">

          <div className="teacher-profile-avatar">
            {teacher.avatar}
          </div>

          <div>

            <h1>
              {teacher.name}
            </h1>

            <p className="teacher-profile-subject">
              {teacher.subject} Teacher
            </p>

            <p className="teacher-rating">
              ⭐ {teacher.rating} / 5
            </p>

          </div>

        </div>


        {/* About */}

        <div className="teacher-profile-section">

          <h2>
            About the Teacher
          </h2>

          <p>
            {teacher.description}
          </p>

        </div>


        {/* Teacher Details */}

        <div className="teacher-details">

          <div>
            <strong>
              Experience
            </strong>

            <p>
              {teacher.experience}
            </p>
          </div>


          <div>
            <strong>
              Subject
            </strong>

            <p>
              {teacher.subject}
            </p>
          </div>


          <div>
            <strong>
              Students
            </strong>

            <p>
              {teacher.students}
            </p>
          </div>


          <div>
            <strong>
              Classes
            </strong>

            <p>
              {teacher.classes}
            </p>
          </div>

        </div>


        {/* Qualification */}

        <div className="teacher-profile-section">

          <h2>
            Qualification
          </h2>

          <p>
            {teacher.qualification}
          </p>

        </div>


        {/* Teaching Information */}

        <div className="teacher-profile-section">

          <h2>
            Teaching Information
          </h2>

          <p>
            One-to-one online classes are available for students.
          </p>

          <p>
            Available: Monday - Saturday
          </p>

        </div>


        {/* Monthly Plan */}

        <div className="teacher-plan">

          <div>

            <h2>
              Monthly Plans
            </h2>

            <p>
              Choose a monthly plan that suits your learning needs.
            </p>

          </div>

          <div className="teacher-plan-price">

            From ₹1,000

            <span>
              / month
            </span>

          </div>

        </div>


        {/* Choose Teacher */}

        <Link
          to={`/student/plan/${teacher.id}`}
          className="choose-teacher-button"
        >
          Choose This Teacher
        </Link>

      </div>

    </div>
  );
}

export default TeacherProfile;