import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import teachers from "../../data/teachers";

function AdminTeacherProfile() {
  const { id } = useParams();

  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    // Get Admin-added teachers
    const savedTeachers =
      JSON.parse(localStorage.getItem("teachers")) || [];

    // Combine dummy + Admin-added teachers
    const allTeachers = [
      ...teachers,
      ...savedTeachers,
    ];

    // Find selected teacher
    const selectedTeacher = allTeachers.find(
      (item) => String(item.id) === String(id)
    );

    setTeacher(selectedTeacher || null);
  }, [id]);

  // Teacher not found
  if (!teacher) {
    return (
      <div className="admin-teacher-profile-page">

        <div className="admin-teacher-profile-card">

          <h1>
            Teacher Not Found
          </h1>

          <p>
            The teacher you are looking for does not exist.
          </p>

          <Link
            to="/admin/teachers"
            className="back-admin-button"
          >
            ← Back to Teachers
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="admin-teacher-profile-page">

      {/* =================================
          HEADER
      ================================= */}

      <div className="admin-teacher-profile-top">

        <div>

          <span className="admin-profile-label">
            ADMIN VIEW
          </span>

          <h1>
            Teacher Profile
          </h1>

          <p>
            View complete teacher information.
          </p>

        </div>

        <Link
          to="/admin/teachers"
          className="back-admin-button"
        >
          ← Back to Teachers
        </Link>

      </div>


      {/* =================================
          PROFILE CARD
      ================================= */}

      <div className="admin-teacher-profile-card">

        {/* Teacher Header */}

        <div className="admin-teacher-profile-header">

          <div className="admin-teacher-profile-avatar">
            {teacher.avatar || "👨‍🏫"}
          </div>

          <div className="admin-teacher-profile-main">

            <h1>
              {teacher.name}
            </h1>

            <p className="admin-teacher-profile-subject">
              {teacher.subject} Teacher
            </p>

            <p className="admin-teacher-profile-rating">
              ⭐ {teacher.rating || "New"} / 5
            </p>

          </div>

        </div>


        {/* =================================
            ABOUT
        ================================= */}

        <div className="admin-teacher-profile-section">

          <h2>
            About the Teacher
          </h2>

          <p>
            {teacher.description ||
              `${teacher.name} is a ${teacher.subject} teacher on TuitionWeb.`}
          </p>

        </div>


        {/* =================================
            TEACHER DETAILS
        ================================= */}

        <div className="admin-teacher-details">

          <div className="admin-teacher-detail">

            <strong>
              Experience
            </strong>

            <p>
              {teacher.experience || "Not specified"}
            </p>

          </div>


          <div className="admin-teacher-detail">

            <strong>
              Subject
            </strong>

            <p>
              {teacher.subject || "Not specified"}
            </p>

          </div>


          <div className="admin-teacher-detail">

            <strong>
              Students
            </strong>

            <p>
              {teacher.students || "0"}
            </p>

          </div>


          <div className="admin-teacher-detail">

            <strong>
              Classes
            </strong>

            <p>
              {teacher.classes || "0"}
            </p>

          </div>

        </div>


        {/* =================================
            QUALIFICATION
        ================================= */}

        <div className="admin-teacher-profile-section">

          <h2>
            Qualification
          </h2>

          <p>
            {teacher.qualification || "Not specified"}
          </p>

        </div>


        {/* =================================
            CONTACT
        ================================= */}

        <div className="admin-teacher-profile-section">

          <h2>
            Contact Information
          </h2>

          <p>
            <strong>Email:</strong>{" "}
            {teacher.email || "Not available"}
          </p>

        </div>


        {/* =================================
            TEACHING INFORMATION
        ================================= */}

        <div className="admin-teacher-profile-section">

          <h2>
            Teaching Information
          </h2>

          <p>
            One-to-one online classes are available
            for students.
          </p>

          <p>
            Available: Monday - Saturday
          </p>

        </div>


        {/* =================================
            MONTHLY FEE
        ================================= */}

        <div className="admin-teacher-fee-section">

          <div>

            <h2>
              Monthly Fee
            </h2>

            <p>
              Current monthly teaching fee.
            </p>

          </div>

          <div className="admin-teacher-fee">

            ₹{Number(
              teacher.fee || 0
            ).toLocaleString("en-IN")}

            <span>
              / month
            </span>

          </div>

        </div>


        {/* =================================
            ADMIN ACTIONS
        ================================= */}

        <div className="admin-teacher-profile-actions">

          <Link
            to={`/admin/teachers`}
            className="admin-profile-action-button secondary"
          >
            Back to Teachers
          </Link>

          <Link
            to={`/admin/add-teacher`}
            className="admin-profile-action-button"
          >
            Add Another Teacher
          </Link>

        </div>

      </div>

    </div>
  );
}

export default AdminTeacherProfile;