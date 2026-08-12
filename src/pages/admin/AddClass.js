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
  const [schedule, setSchedule] = useState("");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    // Load admin-added teachers
    const savedTeachers =
      JSON.parse(localStorage.getItem("teachers")) || [];

    // Dummy teachers + admin-added teachers
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!teacher || !student || !subject || !schedule) {
      alert("Please fill all fields.");
      return;
    }

    // Find selected teacher
    const selectedTeacher = allTeachers.find(
      (item) => String(item.id) === String(teacher)
    );

    // Find selected student
    const selectedStudent = students.find(
      (item) => String(item.id) === String(student)
    );

    const newClass = {
      id: Date.now(),

      teacher:
        selectedTeacher?.name || "Teacher",

      teacherId: teacher,

      student:
        selectedStudent?.name || "Student",

      studentId: student,

      subject: subject,

      schedule: schedule,

      status: status,
    };

    // Get existing classes
    const existingClasses =
      JSON.parse(localStorage.getItem("classes")) || [];

    // Add new class
    const updatedClasses = [
      ...existingClasses,
      newClass,
    ];

    // Save
    localStorage.setItem(
      "classes",
      JSON.stringify(updatedClasses)
    );

    alert("Class created successfully!");

    // Go to Manage Classes
    navigate("/admin/classes");
  };

  return (
    <div className="add-class-page">

      {/* Header */}

      <div className="add-class-header">

        <div>
          <h1>Add New Class</h1>

          <p>
            Assign a teacher and student to a class.
          </p>
        </div>

        <Link
          to="/admin/dashboard"
          className="back-admin-button"
        >
          ← Dashboard
        </Link>

      </div>


      {/* Form */}

      <div className="add-class-card">

        <form onSubmit={handleSubmit}>

          {/* Teacher */}

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

              {allTeachers.map((item) => (

                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </option>

              ))}

            </select>

          </div>


          {/* Student */}

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

              {students.map((item) => (

                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name} - {item.email}
                </option>

              ))}

            </select>

          </div>


          {/* Subject */}

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


          {/* Schedule */}

          <div className="add-class-form-group">

            <label>
              Schedule
            </label>

            <input
              type="text"
              placeholder="Example: Monday - 5:00 PM"
              value={schedule}
              onChange={(e) =>
                setSchedule(e.target.value)
              }
              required
            />

          </div>


          {/* Status */}

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


          {/* Buttons */}

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