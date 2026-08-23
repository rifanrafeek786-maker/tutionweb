import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyClasses() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    loadClasses();
  }, []);

  function loadClasses() {
    const teacher = JSON.parse(
      localStorage.getItem("loggedInTeacher")
    );

    const allClasses =
      JSON.parse(localStorage.getItem("classes")) || [];

    if (!teacher) {
      setClasses([]);
      return;
    }

    const myClasses = allClasses.filter(function (item) {
      return (
        String(item.teacherId) ===
          String(teacher.id) ||
        item.teacher === teacher.name
      );
    });

    setClasses(myClasses);
  }

  function openSchedule(classItem) {
    setSelectedClass(classItem);

    setDate(classItem.scheduleDate || "");
    setStartTime(classItem.startTime || "");
    setEndTime(classItem.endTime || "");
  }

  function saveSchedule() {
    if (!selectedClass) {
      return;
    }

    if (!date || !startTime || !endTime) {
      alert("Please select date and time.");
      return;
    }

    if (startTime >= endTime) {
      alert("End time must be later than start time.");
      return;
    }

    const allClasses =
      JSON.parse(localStorage.getItem("classes")) || [];

    const updatedClasses = allClasses.map(function (item) {
      if (
        String(item.id) ===
        String(selectedClass.id)
      ) {
        return {
          ...item,
          scheduleDate: date,
          startTime: startTime,
          endTime: endTime,
          schedule:
            date +
            " - " +
            startTime +
            " to " +
            endTime,
          scheduleSetBy: "Teacher"
        };
      }

      return item;
    });

    localStorage.setItem(
      "classes",
      JSON.stringify(updatedClasses)
    );

    setSelectedClass(null);
    setDate("");
    setStartTime("");
    setEndTime("");

    loadClasses();

    alert("Schedule saved successfully!");
  }

  function cancelSchedule() {
    setSelectedClass(null);
    setDate("");
    setStartTime("");
    setEndTime("");
  }

  const scheduledCount = classes.filter(
    function (item) {
      return (
        item.scheduleDate &&
        item.startTime &&
        item.endTime
      );
    }
  ).length;

  return (
    <div className="teacher-dashboard">

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

      <main className="teacher-main">

        <div className="teacher-topbar">

          <div>
            <h1>
              My Classes
            </h1>

            <p>
              Classes assigned to you by the admin.
            </p>
          </div>

        </div>

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

          <div className="teacher-stat-card">

            <span>
              📅
            </span>

            <div>
              <p>
                Scheduled
              </p>

              <h2>
                {scheduledCount}
              </h2>
            </div>

          </div>

          <div className="teacher-stat-card">

            <span>
              ⏳
            </span>

            <div>
              <p>
                Needs Schedule
              </p>

              <h2>
                {classes.length - scheduledCount}
              </h2>
            </div>

          </div>

        </div>

        {selectedClass && (

          <div className="teacher-welcome-card">

            <h2>
              Set Class Schedule
            </h2>

            <p>
              Student:{" "}
              {selectedClass.student || "Student"}
            </p>

            <p>
              Subject:{" "}
              {selectedClass.subject || "Subject"}
            </p>

            <div style={{ marginTop: "20px" }}>

              <label>
                Class Date
              </label>

              <input
                type="date"
                value={date}
                onChange={function (e) {
                  setDate(e.target.value);
                }}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "8px",
                  marginBottom: "15px"
                }}
              />

              <label>
                Start Time
              </label>

              <input
                type="time"
                value={startTime}
                onChange={function (e) {
                  setStartTime(e.target.value);
                }}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "8px",
                  marginBottom: "15px"
                }}
              />

              <label>
                End Time
              </label>

              <input
                type="time"
                value={endTime}
                onChange={function (e) {
                  setEndTime(e.target.value);
                }}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  marginTop: "8px",
                  marginBottom: "20px"
                }}
              />

              <button
                type="button"
                className="create-class-button"
                onClick={saveSchedule}
              >
                Save Schedule
              </button>

              <button
                type="button"
                className="cancel-class-button"
                onClick={cancelSchedule}
                style={{
                  marginLeft: "10px"
                }}
              >
                Cancel
              </button>

            </div>

          </div>

        )}

        {classes.length === 0 ? (

          <div className="teacher-welcome-card">

            <div
              style={{
                fontSize: "50px"
              }}
            >
              📚
            </div>

            <h2>
              No Classes Assigned
            </h2>

            <p>
              Classes created by the admin
              will appear here.
            </p>

          </div>

        ) : (

          <div className="teacher-class-list">

            {classes.map(function (item) {

              const isScheduled =
                item.scheduleDate &&
                item.startTime &&
                item.endTime;

              return (

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
                        item.className ||
                        item.subject ||
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
                        item.studentName ||
                        "Not assigned"}
                    </p>

                    <p>
                      Status:{" "}
                      {item.status ||
                        "Active"}
                    </p>

                    <p>
                      Schedule:{" "}
                      {isScheduled
                        ? item.schedule
                        : "Not scheduled yet"}
                    </p>

                  </div>

                  <div className="teacher-class-status">

                    <span
                      style={{
                        display: "block",
                        marginBottom: "10px"
                      }}
                    >
                      {isScheduled
                        ? "Scheduled"
                        : "Needs Schedule"}
                    </span>

                    <button
                      type="button"
                      className="create-class-button"
                      onClick={function () {
                        openSchedule(item);
                      }}
                    >
                      {isScheduled
                        ? "Edit Schedule"
                        : "Set Schedule"}
                    </button>

                  </div>

                </div>

              );
            })}

          </div>

        )}

      </main>

    </div>
  );
}

export default MyClasses;