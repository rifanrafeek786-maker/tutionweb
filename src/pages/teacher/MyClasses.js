import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyClasses() {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    studentId: "",
    student: "",
    name: "",
    subject: "",
  });


  // =========================================
  // LOAD DATA
  // =========================================

  useEffect(() => {
    loadData();
  }, []);


  const loadData = () => {
    const loggedInTeacher =
      JSON.parse(
        localStorage.getItem("loggedInTeacher")
      );

    const savedClasses =
      JSON.parse(
        localStorage.getItem("classes")
      ) || [];

    const teacherStudents =
      JSON.parse(
        localStorage.getItem("teacherStudents")
      ) || [];


    if (!loggedInTeacher) {
      setClasses([]);
      setStudents([]);
      return;
    }


    // -----------------------------------------
    // GET THIS TEACHER'S CLASSES
    // -----------------------------------------

    const teacherClasses =
      savedClasses.filter(
        (item) =>
          String(item.teacherId) ===
            String(loggedInTeacher.id) ||
          item.teacher ===
            loggedInTeacher.name
      );


    // -----------------------------------------
    // GET THIS TEACHER'S STUDENTS
    // -----------------------------------------

    const myStudents =
      teacherStudents.filter(
        (item) =>
          String(item.teacherId) ===
          String(loggedInTeacher.id)
      );


    setClasses(teacherClasses);
    setStudents(myStudents);
  };


  // =========================================
  // FORM CHANGE
  // =========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });


    // Get selected student
    if (name === "studentId") {

      const selectedStudent =
        students.find(
          (student) =>
            String(student.studentId) ===
            String(value)
        );


      setForm((previous) => ({
        ...previous,
        studentId: value,
        student:
          selectedStudent?.student ||
          "",
      }));
    }
  };


  // =========================================
  // CREATE CLASS
  // =========================================

  const handleSubmit = (e) => {
    e.preventDefault();


    const loggedInTeacher =
      JSON.parse(
        localStorage.getItem("loggedInTeacher")
      );


    if (!loggedInTeacher) {
      alert("Teacher login not found.");
      return;
    }


    if (!form.studentId) {
      alert("Please select a student.");
      return;
    }


    if (!form.name.trim()) {
      alert("Please enter a class name.");
      return;
    }


    if (!form.subject.trim()) {
      alert("Please enter a subject.");
      return;
    }


    // -----------------------------------------
    // CREATE CLASS
    // -----------------------------------------

    const newClass = {

      id: Date.now(),

      teacherId:
        loggedInTeacher.id,

      teacher:
        loggedInTeacher.name,

      studentId:
        form.studentId,

      student:
        form.student,

      name:
        form.name,

      subject:
        form.subject,

      status:
        "Active",

      schedule:
        "",

      createdAt:
        new Date().toLocaleDateString(
          "en-IN"
        ),
    };


    // -----------------------------------------
    // GET EXISTING CLASSES
    // -----------------------------------------

    const existingClasses =
      JSON.parse(
        localStorage.getItem("classes")
      ) || [];


    // -----------------------------------------
    // SAVE
    // -----------------------------------------

    const updatedClasses = [
      ...existingClasses,
      newClass,
    ];


    localStorage.setItem(
      "classes",
      JSON.stringify(
        updatedClasses
      )
    );


    // Update screen

    setClasses(
      updatedClasses.filter(
        (item) =>
          String(item.teacherId) ===
          String(loggedInTeacher.id) ||
          item.teacher ===
          loggedInTeacher.name
      )
    );


    // Clear form

    setForm({
      studentId: "",
      student: "",
      name: "",
      subject: "",
    });


    setShowForm(false);


    alert(
      "Class created successfully!"
    );
  };


  // =========================================
  // DELETE CLASS
  // =========================================

  const handleDelete = (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this class?"
      );


    if (!confirmDelete) {
      return;
    }


    const existingClasses =
      JSON.parse(
        localStorage.getItem("classes")
      ) || [];


    const updatedClasses =
      existingClasses.filter(
        (item) =>
          item.id !== id
      );


    localStorage.setItem(
      "classes",
      JSON.stringify(
        updatedClasses
      )
    );


    setClasses(
      classes.filter(
        (item) =>
          item.id !== id
      )
    );
  };


  return (
    <div className="teacher-dashboard">


      {/* =====================================
          SIDEBAR
      ===================================== */}

      <aside className="teacher-sidebar">

        <div className="teacher-logo">
          TuitionWeb
        </div>


        <nav className="teacher-nav">

          <Link to="/teacher/dashboard">
            Dashboard
          </Link>

          <Link to="/teacher/students">
            My Students
          </Link>

          <Link
            to="/teacher/classes"
            className="active"
          >
            My Classes
          </Link>

          <Link to="/teacher/schedule">
            Schedule
          </Link>

          <Link to="/teacher/payments">
            Payments
          </Link>

          <Link to="/teacher/messages">
            Messages
          </Link>

          <Link to="/teacher/profile">
            Profile
          </Link>

          <Link to="/teacher/settings">
            Settings
          </Link>

        </nav>


        <div className="teacher-logout">

          <Link to="/login">
            Logout
          </Link>

        </div>

      </aside>


      {/* =====================================
          MAIN
      ===================================== */}

      <main className="teacher-main">


        {/* TOP BAR */}

        <div className="teacher-topbar">

          <div>

            <h1>
              My Classes
            </h1>

            <p>
              Create and manage your classes.
            </p>

          </div>


          <button
            className="auth-button"
            onClick={() =>
              setShowForm(!showForm)
            }
          >
            {showForm
              ? "Close"
              : "+ Add Class"}
          </button>

        </div>


        {/* =====================================
            ADD CLASS FORM
        ===================================== */}

        {showForm && (

          <div className="teacher-welcome-card">

            <h2>
              Create New Class
            </h2>

            <form
              onSubmit={handleSubmit}
              style={{
                marginTop: "20px",
              }}
            >


              {/* STUDENT */}

              <div className="form-group">

                <label>
                  Student
                </label>

                <select
                  name="studentId"
                  value={form.studentId}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Student
                  </option>

                  {students.map(
                    (student) => (

                      <option
                        key={
                          student.studentId
                        }
                        value={
                          student.studentId
                        }
                      >
                        {student.student}
                      </option>

                    )
                  )}

                </select>

              </div>


              {/* CLASS NAME */}

              <div className="form-group">

                <label>
                  Class Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Example: Mathematics Class"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* SUBJECT */}

              <div className="form-group">

                <label>
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  placeholder="Example: Mathematics"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />

              </div>


              <button
                type="submit"
                className="auth-button"
              >
                Create Class
              </button>

            </form>

          </div>

        )}


        {/* =====================================
            CLASS COUNT
        ===================================== */}

        <div className="teacher-statistics">

          <div className="teacher-stat-card">

            <span>
              📚
            </span>

            <div>

              <p>
                Total Classes
              </p>

              <h2>
                {classes.length}
              </h2>

            </div>

          </div>

        </div>


        {/* =====================================
            CLASS LIST
        ===================================== */}

        {classes.length === 0 ? (

          <div className="teacher-welcome-card">

            <div
              style={{
                fontSize: "45px",
              }}
            >
              📚
            </div>

            <h2>
              No Classes Yet
            </h2>

            <p>
              Create a class for one of your
              students.
            </p>

          </div>

        ) : (

          <div className="teacher-class-list">

            {classes.map(
              (item) => (

                <div
                  className="teacher-class-card"
                  key={item.id}
                >

                  <div className="teacher-class-icon">
                    📚
                  </div>


                  <div className="teacher-class-info">

                    <h2>
                      {item.name ||
                        "Class"}
                    </h2>

                    <p>
                      Subject:{" "}
                      {item.subject ||
                        "Not specified"}
                    </p>

                    <p>
                      Student:{" "}
                      {item.student ||
                        "Not assigned"}
                    </p>

                    <p>
                      Schedule:{" "}
                      {item.schedule ||
                        "Not scheduled"}
                    </p>

                  </div>


                  <div className="teacher-class-status">

                    <span>
                      {item.status ||
                        "Active"}
                    </span>


                    <button
                      className="delete-payment-button"
                      onClick={() =>
                        handleDelete(
                          item.id
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </main>

    </div>
  );
}

export default MyClasses;