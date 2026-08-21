import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TeacherSchedule() {
  const [schedules, setSchedules] = useState([]);
  const [classes, setClasses] = useState([]);

  const [form, setForm] = useState({
    classId: "",
    date: "",
    time: "",
  });


  // =========================================
  // LOAD TEACHER DATA
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

    const savedSchedules =
      JSON.parse(
        localStorage.getItem("teacherSchedules")
      ) || [];


    if (!loggedInTeacher) {
      setClasses([]);
      setSchedules([]);
      return;
    }


    // =========================================
    // GET THIS TEACHER'S CLASSES
    // =========================================

    const myClasses =
      savedClasses.filter(
        (item) =>
          String(item.teacherId) ===
            String(loggedInTeacher.id) ||
          item.teacher ===
            loggedInTeacher.name
      );


    // =========================================
    // GET THIS TEACHER'S SCHEDULES
    // =========================================

    const mySchedules =
      savedSchedules.filter(
        (schedule) =>
          String(schedule.teacherId) ===
          String(loggedInTeacher.id)
      );


    setClasses(myClasses);
    setSchedules(mySchedules);
  };


  // =========================================
  // FORM CHANGE
  // =========================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    setForm({
      ...form,
      [name]: value,
    });
  };


  // =========================================
  // ADD SCHEDULE
  // =========================================

  const handleSubmit = (e) => {

    e.preventDefault();


    const loggedInTeacher =
      JSON.parse(
        localStorage.getItem("loggedInTeacher")
      );


    if (!loggedInTeacher) {

      alert(
        "Teacher login not found."
      );

      return;
    }


    if (!form.classId) {

      alert(
        "Please select a class."
      );

      return;
    }


    if (!form.date) {

      alert(
        "Please select a date."
      );

      return;
    }


    if (!form.time) {

      alert(
        "Please select a time."
      );

      return;
    }


    // =========================================
    // GET SELECTED CLASS
    // =========================================

    const selectedClass =
      classes.find(
        (item) =>
          String(item.id) ===
          String(form.classId)
      );


    if (!selectedClass) {

      alert(
        "Selected class not found."
      );

      return;
    }


    // =========================================
    // CREATE SCHEDULE
    // =========================================

    const newSchedule = {

      id: Date.now(),

      teacherId:
        loggedInTeacher.id,

      teacher:
        loggedInTeacher.name,

      classId:
        selectedClass.id,

      className:
        selectedClass.name,

      studentId:
        selectedClass.studentId,

      student:
        selectedClass.student,

      subject:
        selectedClass.subject,

      date:
        form.date,

      time:
        form.time,

      status:
        "Scheduled",
    };


    // =========================================
    // GET EXISTING SCHEDULES
    // =========================================

    const existingSchedules =
      JSON.parse(
        localStorage.getItem(
          "teacherSchedules"
        )
      ) || [];


    // =========================================
    // SAVE
    // =========================================

    const updatedSchedules = [
      ...existingSchedules,
      newSchedule,
    ];


    localStorage.setItem(
      "teacherSchedules",
      JSON.stringify(
        updatedSchedules
      )
    );


    // =========================================
    // UPDATE SCREEN
    // =========================================

    setSchedules(
      updatedSchedules.filter(
        (schedule) =>
          String(schedule.teacherId) ===
          String(loggedInTeacher.id)
      )
    );


    // =========================================
    // CLEAR FORM
    // =========================================

    setForm({
      classId: "",
      date: "",
      time: "",
    });


    alert(
      "Class scheduled successfully!"
    );
  };


  // =========================================
  // DELETE SCHEDULE
  // =========================================

  const handleDelete = (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this schedule?"
      );


    if (!confirmDelete) {
      return;
    }


    const existingSchedules =
      JSON.parse(
        localStorage.getItem(
          "teacherSchedules"
        )
      ) || [];


    const updatedSchedules =
      existingSchedules.filter(
        (schedule) =>
          schedule.id !== id
      );


    localStorage.setItem(
      "teacherSchedules",
      JSON.stringify(
        updatedSchedules
      )
    );


    setSchedules(
      schedules.filter(
        (schedule) =>
          schedule.id !== id
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

          <Link to="/teacher/classes">
            My Classes
          </Link>

          <Link
            to="/teacher/schedule"
            className="active"
          >
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


        {/* HEADER */}

        <div className="teacher-topbar">

          <h1>
            Schedule
          </h1>

          <p>
            Schedule your existing classes.
          </p>

        </div>


        {/* =====================================
            ADD SCHEDULE
        ===================================== */}

        <div className="teacher-welcome-card">

          <h2>
            Schedule a Class
          </h2>


          {classes.length === 0 ? (

            <div
              style={{
                marginTop: "20px",
              }}
            >

              <p>
                You don't have any classes yet.
              </p>

              <Link
                to="/teacher/classes"
                className="auth-button"
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  textDecoration: "none",
                }}
              >
                Go to My Classes
              </Link>

            </div>

          ) : (

            <form
              onSubmit={handleSubmit}
              style={{
                marginTop: "20px",
              }}
            >


              {/* CLASS */}

              <div className="form-group">

                <label>
                  Class
                </label>

                <select
                  name="classId"
                  value={form.classId}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Class
                  </option>

                  {classes.map(
                    (item) => (

                      <option
                        key={item.id}
                        value={item.id}
                      >
                        {item.name} —{" "}
                        {item.student}
                      </option>

                    )
                  )}

                </select>

              </div>


              {/* DATE */}

              <div className="form-group">

                <label>
                  Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* TIME */}

              <div className="form-group">

                <label>
                  Time
                </label>

                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                />

              </div>


              <button
                type="submit"
                className="auth-button"
              >
                Schedule Class
              </button>

            </form>

          )}

        </div>


        {/* =====================================
            UPCOMING CLASSES
        ===================================== */}

        <div
          style={{
            marginTop: "30px",
          }}
        >

          <h2>
            Upcoming Classes
          </h2>

        </div>


        {schedules.length === 0 ? (

          <div className="teacher-welcome-card">

            <div
              style={{
                fontSize: "45px",
                marginBottom: "15px",
              }}
            >
              📅
            </div>

            <h2>
              No Schedule Yet
            </h2>

            <p>
              Your scheduled classes will appear here.
            </p>

          </div>

        ) : (

          <div className="teacher-students-list">

            {schedules.map(
              (schedule) => (

                <div
                  className="teacher-student-card"
                  key={schedule.id}
                >

                  <div className="teacher-student-avatar">
                    📅
                  </div>


                  <div className="teacher-student-info">

                    <h2>
                      {schedule.className}
                    </h2>

                    <p>
                      Student:{" "}
                      {schedule.student}
                    </p>

                    <p>
                      Subject:{" "}
                      {schedule.subject}
                    </p>


                    <div className="teacher-student-meta">

                      <span>
                        📅 {schedule.date}
                      </span>

                      <span>
                        🕐 {schedule.time}
                      </span>

                      <span>
                        {schedule.status}
                      </span>

                    </div>

                  </div>


                  <div className="teacher-student-payment">

                    <button
                      className="delete-payment-button"
                      onClick={() =>
                        handleDelete(
                          schedule.id
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

export default TeacherSchedule;