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

  // =========================================
  // LOAD TEACHER CLASSES
  // =========================================

  function loadClasses() {
    const teacher = JSON.parse(
      localStorage.getItem("loggedInTeacher")
    );

    const allClasses =
      JSON.parse(
        localStorage.getItem("classes")
      ) || [];

    if (!teacher) {
      setClasses([]);
      return;
    }

    const myClasses = allClasses.filter(
      function (item) {
        return (
          String(item.teacherId) ===
            String(teacher.id) ||
          item.teacher === teacher.name
        );
      }
    );

    setClasses(myClasses);
  }

  // =========================================
  // OPEN SCHEDULE MODAL
  // =========================================

  function openSchedule(classItem) {
    setSelectedClass(classItem);

    setDate(
      classItem.scheduleDate || ""
    );

    setStartTime(
      classItem.startTime || ""
    );

    setEndTime(
      classItem.endTime || ""
    );
  }

  // =========================================
  // SAVE SCHEDULE
  // =========================================

  function saveSchedule() {
    if (!selectedClass) {
      return;
    }

    if (!date || !startTime || !endTime) {
      alert("Please select date and time.");
      return;
    }

    if (startTime >= endTime) {
      alert(
        "End time must be later than start time."
      );
      return;
    }

    const allClasses =
      JSON.parse(
        localStorage.getItem("classes")
      ) || [];

    const updatedClasses =
      allClasses.map(
        function (item) {

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

              scheduleSetBy:
                "Teacher",
            };
          }

          return item;
        }
      );

    localStorage.setItem(
      "classes",
      JSON.stringify(
        updatedClasses
      )
    );

    setSelectedClass(null);
    setDate("");
    setStartTime("");
    setEndTime("");

    loadClasses();

    alert(
      "Schedule saved successfully!"
    );
  }

  // =========================================
  // CLOSE MODAL
  // =========================================

  function cancelSchedule() {
    setSelectedClass(null);

    setDate("");
    setStartTime("");
    setEndTime("");
  }

  // =========================================
  // SCHEDULE COUNT
  // =========================================

  const scheduledCount =
    classes.filter(
      function (item) {
        return (
          item.scheduleDate &&
          item.startTime &&
          item.endTime
        );
      }
    ).length;

  // =========================================
  // CLOSE MODAL WHEN CLICKING BACKGROUND
  // =========================================

  function handleModalBackgroundClick(e) {
    if (
      e.target === e.currentTarget
    ) {
      cancelSchedule();
    }
  }

  // =========================================
  // PAGE
  // =========================================

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

        {/* TOPBAR */}

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


        {/* =====================================
            STATISTICS
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
                {classes.length -
                  scheduledCount}
              </h2>

            </div>

          </div>

        </div>


        {/* =====================================
            CLASSES
        ===================================== */}

        {classes.length === 0 ? (

          <div className="teacher-welcome-card">

            <div
              style={{
                fontSize: "50px",
                marginBottom: "15px",
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

            {classes.map(
              function (item) {

                const isScheduled =
                  item.scheduleDate &&
                  item.startTime &&
                  item.endTime;

                return (

                  <div
                    className="teacher-class-card"
                    key={item.id}
                  >

                    {/* CLASS ICON */}

                    <div className="teacher-class-icon">
                      📚
                    </div>


                    {/* CLASS INFORMATION */}

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


                    {/* STATUS + BUTTON */}

                    <div className="teacher-class-status">

                      <span
                        style={{
                          display: "block",
                          marginBottom: "10px",
                        }}
                      >
                        {isScheduled
                          ? "Scheduled"
                          : "Needs Schedule"}
                      </span>

                      <button
                        type="button"
                        className="create-class-button"
                        onClick={
                          function () {
                            openSchedule(
                              item
                            );
                          }
                        }
                      >
                        {isScheduled
                          ? "Edit Schedule"
                          : "Set Schedule"}
                      </button>

                    </div>

                  </div>

                );
              }
            )}

          </div>

        )}

      </main>


      {/* =====================================
          SCHEDULE MODAL
      ===================================== */}

      {selectedClass && (

        <div
          onClick={
            handleModalBackgroundClick
          }
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "rgba(0, 0, 0, 0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >

          {/* MODAL CARD */}

          <div
            style={{
              width: "100%",
              maxWidth: "520px",
              background: "#ffffff",
              borderRadius: "16px",
              padding: "30px",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.25)",
              position: "relative",
            }}
          >

            {/* CLOSE BUTTON */}

            <button
              type="button"
              onClick={cancelSchedule}
              style={{
                position: "absolute",
                top: "15px",
                right: "18px",
                border: "none",
                background: "transparent",
                fontSize: "25px",
                cursor: "pointer",
              }}
            >
              ×
            </button>


            {/* MODAL HEADER */}

            <div
              style={{
                marginBottom: "25px",
              }}
            >

              <h2
                style={{
                  marginBottom: "8px",
                }}
              >
                📅 Set Class Schedule
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                }}
              >
                Set the date and time for
                this class.
              </p>

            </div>


            {/* CLASS DETAILS */}

            <div
              style={{
                background: "#f8fafc",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "25px",
              }}
            >

              <p
                style={{
                  margin: "0 0 8px",
                }}
              >
                <strong>
                  Student:
                </strong>{" "}
                {selectedClass.student ||
                  "Student"}
              </p>

              <p
                style={{
                  margin: 0,
                }}
              >
                <strong>
                  Subject:
                </strong>{" "}
                {selectedClass.subject ||
                  "Subject"}
              </p>

            </div>


            {/* DATE */}

            <div
              style={{
                marginBottom: "18px",
              }}
            >

              <label
                style={{
                  display: "block",
                  fontWeight: "600",
                  marginBottom: "7px",
                }}
              >
                Class Date
              </label>

              <input
                type="date"
                value={date}
                onChange={
                  function (e) {
                    setDate(
                      e.target.value
                    );
                  }
                }
                style={{
                  width: "100%",
                  padding: "12px",
                  border:
                    "1px solid #cbd5e1",
                  borderRadius: "8px",
                  boxSizing:
                    "border-box",
                }}
              />

            </div>


            {/* TIME */}

            <div
              style={{
                display: "flex",
                gap: "15px",
                marginBottom: "25px",
              }}
            >

              {/* START */}

              <div
                style={{
                  flex: 1,
                }}
              >

                <label
                  style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "7px",
                  }}
                >
                  Start Time
                </label>

                <input
                  type="time"
                  value={startTime}
                  onChange={
                    function (e) {
                      setStartTime(
                        e.target.value
                      );
                    }
                  }
                  style={{
                    width: "100%",
                    padding: "12px",
                    border:
                      "1px solid #cbd5e1",
                    borderRadius: "8px",
                    boxSizing:
                      "border-box",
                  }}
                />

              </div>


              {/* END */}

              <div
                style={{
                  flex: 1,
                }}
              >

                <label
                  style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "7px",
                  }}
                >
                  End Time
                </label>

                <input
                  type="time"
                  value={endTime}
                  onChange={
                    function (e) {
                      setEndTime(
                        e.target.value
                      );
                    }
                  }
                  style={{
                    width: "100%",
                    padding: "12px",
                    border:
                      "1px solid #cbd5e1",
                    borderRadius: "8px",
                    boxSizing:
                      "border-box",
                  }}
                />

              </div>

            </div>


            {/* BUTTONS */}

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >

              <button
                type="button"
                className="cancel-class-button"
                onClick={cancelSchedule}
              >
                Cancel
              </button>

              <button
                type="button"
                className="create-class-button"
                onClick={saveSchedule}
              >
                Save Schedule
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default MyClasses;