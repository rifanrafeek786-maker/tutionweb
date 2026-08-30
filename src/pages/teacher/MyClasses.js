
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyClasses() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  const [scheduleDate, setScheduleDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [meetingLink, setMeetingLink] = useState("");

  useEffect(() => {
    loadClasses();
  }, []);

  // Load classes assigned to logged-in teacher
  const loadClasses = () => {
    const loggedInTeacher = JSON.parse(
      localStorage.getItem("loggedInTeacher")
    );

    const allClasses =
      JSON.parse(localStorage.getItem("classes")) || [];

    if (!loggedInTeacher) {
      setClasses([]);
      return;
    }

    const teacherClasses = allClasses.filter(
      (item) =>
        String(item.teacherId) ===
        String(loggedInTeacher.id)
    );

    setClasses(teacherClasses);
  };

  // Open schedule form
  const openSchedule = (classItem) => {
    setSelectedClass(classItem);

    setScheduleDate(classItem.scheduleDate || "");
    setStartTime(classItem.startTime || "");
    setEndTime(classItem.endTime || "");
    setMeetingLink(classItem.meetingLink || "");
  };

  // Close schedule form
  const closeSchedule = () => {
    setSelectedClass(null);
    setScheduleDate("");
    setStartTime("");
    setEndTime("");
    setMeetingLink("");
  };

  // Save schedule
  const saveSchedule = () => {
    if (!scheduleDate) {
      alert("Please select a date.");
      return;
    }

    if (!startTime) {
      alert("Please select start time.");
      return;
    }

    if (!endTime) {
      alert("Please select end time.");
      return;
    }

    if (!meetingLink.trim()) {
      alert("Please enter the video meeting link.");
      return;
    }

    if (startTime >= endTime) {
      alert("End time must be later than start time.");
      return;
    }

    const allClasses =
      JSON.parse(localStorage.getItem("classes")) || [];

    const updatedClasses = allClasses.map((item) => {
      if (
        String(item.id) ===
        String(selectedClass.id)
      ) {
        return {
          ...item,

          scheduleDate: scheduleDate,

          startTime: startTime,

          endTime: endTime,

          meetingLink: meetingLink.trim(),

          schedule:
            scheduleDate +
            " - " +
            startTime +
            " to " +
            endTime,

          scheduleSetBy: "Teacher",
        };
      }

      return item;
    });

    localStorage.setItem(
      "classes",
      JSON.stringify(updatedClasses)
    );

    alert("Schedule saved successfully!");

    closeSchedule();
    loadClasses();
  };

  const scheduledClasses = classes.filter(
    (item) =>
      item.scheduleDate &&
      item.startTime &&
      item.endTime
  ).length;

  return (
    <div className="teacher-dashboard">

      {/* SIDEBAR */}

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


      {/* MAIN CONTENT */}

      <main className="teacher-main">

        {/* HEADER */}

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


        {/* STATISTICS */}

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
                {scheduledClasses}
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
                {classes.length - scheduledClasses}
              </h2>

            </div>

          </div>

        </div>


        {/* CLASS LIST */}

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

          <div className="teacher-students-list">

            {classes.map((item) => {

              const isScheduled =
                item.scheduleDate &&
                item.startTime &&
                item.endTime;

              return (
                <div
                  className="teacher-student-card"
                  key={item.id}
                >

                  {/* ICON */}

                  <div className="teacher-student-avatar">
                    📚
                  </div>


                  {/* INFORMATION */}

                  <div className="teacher-student-info">

                    <h2>
                      {item.subject || "Class"}
                    </h2>

                    <p>
                      Student:{" "}
                      <strong>
                        {item.student || "Student"}
                      </strong>
                    </p>

                    <p>
                      Subject:{" "}
                      {item.subject || "Not specified"}
                    </p>

                    <div className="teacher-student-meta">

                      <span>
                        Status:{" "}
                        <strong>
                          {item.status || "Active"}
                        </strong>
                      </span>

                      <span>
                        Schedule:{" "}
                        {isScheduled
                          ? item.schedule
                          : "Not scheduled"}
                      </span>

                    </div>


                    {/* MEETING LINK */}

                    {item.meetingLink && (

                      <div
                        style={{
                          marginTop: "12px",
                        }}
                      >

                        <a
                          href={item.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#2563eb",
                            fontWeight: "600",
                            textDecoration: "none",
                          }}
                        >
                          🎥 Open Meeting
                        </a>

                      </div>

                    )}

                  </div>


                  {/* ACTION */}

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: "12px",
                    }}
                  >

                    <span
                      style={{
                        padding: "6px 12px",
                        borderRadius: "20px",
                        background: isScheduled
                          ? "#dcfce7"
                          : "#fef3c7",
                        color: isScheduled
                          ? "#166534"
                          : "#92400e",
                        fontWeight: "600",
                        fontSize: "13px",
                      }}
                    >
                      {isScheduled
                        ? "Scheduled"
                        : "Needs Schedule"}
                    </span>


                    <button
                      type="button"
                      className="create-class-button"
                      onClick={() =>
                        openSchedule(item)
                      }
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


      {/* SCHEDULE MODAL */}

      {selectedClass && (

        <div
          onClick={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              closeSchedule();
            }
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >

          <div
            style={{
              width: "100%",
              maxWidth: "520px",
              background: "#ffffff",
              borderRadius: "16px",
              padding: "30px",
              boxSizing: "border-box",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.25)",
            }}
          >

            {/* MODAL HEADER */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >

              <div>

                <h2
                  style={{
                    margin: "0 0 6px",
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
                  Set date, time and video meeting link.
                </p>

              </div>


              <button
                type="button"
                onClick={closeSchedule}
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: "28px",
                  cursor: "pointer",
                  color: "#64748b",
                }}
              >
                ×
              </button>

            </div>


            {/* CLASS INFORMATION */}

            <div
              style={{
                background: "#f8fafc",
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "22px",
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
                {selectedClass.student || "Student"}
              </p>

              <p
                style={{
                  margin: 0,
                }}
              >
                <strong>
                  Subject:
                </strong>{" "}
                {selectedClass.subject || "Subject"}
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
                value={scheduleDate}
                onChange={(event) =>
                  setScheduleDate(
                    event.target.value
                  )
                }
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  boxSizing: "border-box",
                }}
              />

            </div>


            {/* TIME */}

            <div
              style={{
                display: "flex",
                gap: "15px",
                marginBottom: "20px",
              }}
            >

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
                  onChange={(event) =>
                    setStartTime(
                      event.target.value
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    boxSizing: "border-box",
                  }}
                />

              </div>


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
                  onChange={(event) =>
                    setEndTime(
                      event.target.value
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    boxSizing: "border-box",
                  }}
                />

              </div>

            </div>


            {/* MEETING LINK */}

            <div
              style={{
                marginBottom: "25px",
              }}
            >

              <label
                style={{
                  display: "block",
                  fontWeight: "600",
                  marginBottom: "7px",
                }}
              >
                🎥 Video Meeting Link
              </label>

              <input
                type="url"
                value={meetingLink}
                onChange={(event) =>
                  setMeetingLink(
                    event.target.value
                  )
                }
                placeholder="https://meet.google.com/..."
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  boxSizing: "border-box",
                }}
              />

              <small
                style={{
                  display: "block",
                  marginTop: "7px",
                  color: "#64748b",
                }}
              >
                Add the Google Meet or other
                video meeting link.
              </small>

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
                onClick={closeSchedule}
                className="cancel-class-button"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={saveSchedule}
                className="create-class-button"
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

