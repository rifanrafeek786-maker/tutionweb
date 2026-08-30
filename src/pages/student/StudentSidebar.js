
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function StudentSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("loggedInStudent");
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="student-sidebar">

      {/* LOGO */}
      <div className="student-logo">
        TuitionWeb
      </div>

      {/* NAVIGATION */}
      <nav className="student-nav">

        <Link
          to="/student/dashboard"
          className={isActive("/student/dashboard") ? "active" : ""}
        >
          Dashboard
        </Link>

        <Link
          to="/student/teachers"
          className={isActive("/student/teachers") ? "active" : ""}
        >
          Find Teachers
        </Link>

        <Link
          to="/student/teacher"
          className={isActive("/student/teacher") ? "active" : ""}
        >
          My Teacher
        </Link>

        <Link
          to="/student/classes"
          className={isActive("/student/classes") ? "active" : ""}
        >
          My Classes
        </Link>

        <Link
          to="/student/schedule"
          className={isActive("/student/schedule") ? "active" : ""}
        >
          Schedule
        </Link>

        <Link
          to="/student/plan"
          className={isActive("/student/plan") ? "active" : ""}
        >
          Monthly Plan
        </Link>

        <Link
          to="/student/payment"
          className={isActive("/student/payment") ? "active" : ""}
        >
          Payments
        </Link>

        <Link
          to="/student/messages"
          className={isActive("/student/messages") ? "active" : ""}
        >
          Messages
        </Link>

        <Link
          to="/student/progress"
          className={isActive("/student/progress") ? "active" : ""}
        >
          Learning Progress
        </Link>

        <Link
          to="/student/profile"
          className={isActive("/student/profile") ? "active" : ""}
        >
          Profile
        </Link>

      </nav>

      {/* LOGOUT */}
      <div className="student-logout">
        <button
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

    </aside>
  );
}

export default StudentSidebar;
