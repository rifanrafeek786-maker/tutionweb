import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import teachers from "../../data/teachers";

function AddClass() {
  const navigate = useNavigate();

  const [allTeachers, setAllTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  const [teacher, setTeacher] = useState("");
  const [student, setStudent] = useState("");
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState("Active");

  // =========================================
  // LOAD TEACHERS AND STUDENTS
  // =========================================

  useEffect(() => {
    // Load admin-added teachers
    const savedTeachers =
      JSON.parse(localStorage.getItem("teachers")) || [];

    // Combine dummy teachers + admin-added teachers
    const combinedTeachers = [
      ...teachers,
      ...savedTeachers,
    ];

    setAllTeachers(combinedTeachers);

    // Load registered students
    const savedStudents =
      JSON.parse(localStorage.getItem("students")) || [];

    setStudents(savedStudents);
  }, []);

  // =========================================
  // CREATE CLASS
  // =========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check required fields
    if (!teacher || !student || !subject) {
      alert("Please fill all fields.");
      return;
    }

    // Find selected teacher
    const selectedTeacher = allTeachers.find(
      (item) =>
        String(item.id) === String(teacher)
    );

    // Find selected student
    const selectedStudent = students.find(
      (item) =>
        String(item.id) === String(student)
    );

    // =========================================
    // CREATE NEW CLASS
    // =========================================

    const newClass = {
      id: Date.now(),

      // Teacher
      teacher:
        selectedTeacher?.name ||
        "Teacher",

      teacherId:
        teacher,

      // Student
      student:
        selectedStudent?.name ||
        "Student",

      studentId:
        student,

      // Subject
      subject:
        subject,

      // Status
      status:
        status,

      // Schedule is intentionally empty.
      // Teacher will set it later.
      scheduleDate: "",
      startTime: "",
      endTime: "",
      schedule: "",
      scheduleSetBy: "",
    };

    // =========================================
    // GET EXISTING CLASSES
    // =========================================

    const existingClasses =
      JSON.parse(
        localStorage.getItem("classes")
      ) || [];

    // =========================================
    // ADD NEW CLASS
    // =========================================

    const updatedClasses = [
      ...existingClasses,
      newClass,
    ];

    // =========================================
    // SAVE TO LOCAL STORAGE
    // =========================================

    localStorage.setItem(
      "classes",
      JSON.stringify(
        updatedClasses
      )
    );

    // =========================================
    // SUCCESS
    // =========================================

    alert(
      "Class created successfully!"
    );

    // Go to Manage Classes
    navigate("/admin/classes");
  };

  // =========================================
  // UI
  // =========================================

  return (
    <div className="add-class-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="add-class-header">

        <div>

          <h1>
            Add New Class
          </h1>

          <p>
            Assign a teacher, student and subject
            to a class.
          </p>

        </div>

        <Link
          to="/admin/dashboard"
          className="back-admin-button"
        >
          ← Dashboard
        </Link>

      </div>


      {/* =====================================
          FORM CARD
      ===================================== */}

      <div className="add-class-card">

        <form onSubmit={handleSubmit}>

          {/* =================================
              TEACHER
          ================================= */}

          <div className="add-class-form-group">

            <label>
              Select Teacher
            </label>

            <select
              value={teacher}
              onChange={(e) =>
                setTeacher(e.target.value)
              }
              required
            >

              <option value="">
                Choose a teacher
              </option>

              {allTeachers.map(
                (item) => (

                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </option>

                )
              )}

            </select>

          </div>


          {/* =================================
              STUDENT
          ================================= */}

          <div className="add-class-form-group">

            <label>
              Select Student
            </label>

            <select
              value={student}
              onChange={(e) =>
                setStudent(e.target.value)
              }
              required
            >

              <option value="">
                Choose a student
              </option>

              {students.map(
                (item) => (

                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name} - {item.email}
                  </option>

                )
              )}

            </select>

          </div>


          {/* =================================
              SUBJECT
          ================================= */}

          <div className="add-class-form-group">

            <label>
              Subject
            </label>

            <select
              value={subject}
              onChange={(e) =>
                setSubject(e.target.value)
              }
              required
            >

              <option value="">
                Choose a subject
              </option>

              <option value="Mathematics">
                Mathematics
              </option>

              <option value="Science">
                Science
              </option>

              <option value="Programming">
                Programming
              </option>

              <option value="English">
                English
              </option>

              <option value="Physics">
                Physics
              </option>

              <option value="Chemistry">
                Chemistry
              </option>

            </select>

          </div>


          {/* =================================
              STATUS
          ================================= */}

          <div className="add-class-form-group">

            <label>
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >

              <option value="Active">
                Active
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Completed">
                Completed
              </option>

            </select>

          </div>


          {/* =================================
              INFORMATION
          ================================= */}

          <div
            style={{
              padding: "15px",
              marginTop: "10px",
              marginBottom: "20px",
              borderRadius: "10px",
              background: "#f1f5f9",
              color: "#475569",
            }}
          >

            <strong>
              📅 Schedule
            </strong>

            <p
              style={{
                margin:
                  "6px 0 0 0",
              }}
            >
              The teacher will set the class
              date and time after the class
              has been created.
            </p>

          </div>


          {/* =================================
              BUTTONS
          ================================= */}

          <div className="add-class-buttons">

            <Link
              to="/admin/classes"
              className="cancel-class-button"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="create-class-button"
            >
              Create Class
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddClass;