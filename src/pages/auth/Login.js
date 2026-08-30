
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // =====================================
    // CHECK STUDENTS
    // =====================================

    const students =
      JSON.parse(localStorage.getItem("students")) || [];

    const student = students.find(
      (item) =>
        item.email &&
        item.email.toLowerCase() === email.toLowerCase() &&
        item.password === password
    );

    if (student) {
      // Make sure student always has an ID
      const studentId =
        student.id ||
        student.studentId ||
        `student-${Date.now()}`;

      const loggedInStudent = {
        ...student,
        id: studentId,
        studentId: studentId,
        name:
          student.name ||
          student.studentName ||
          "Student",
      };

      // Save logged-in student
      localStorage.setItem(
        "loggedInStudent",
        JSON.stringify(loggedInStudent)
      );

      alert("Student login successful!");

      navigate("/student/dashboard");
      return;
    }

    // =====================================
    // CHECK TEACHERS
    // =====================================

    const teachers =
      JSON.parse(localStorage.getItem("teachers")) || [];

    const teacher = teachers.find(
      (item) =>
        item.email &&
        item.email.toLowerCase() === email.toLowerCase() &&
        item.password === password
    );

    if (teacher) {
      localStorage.setItem(
        "loggedInTeacher",
        JSON.stringify(teacher)
      );

      alert("Teacher login successful!");

      navigate("/teacher/dashboard");
      return;
    }

    // =====================================
    // INVALID LOGIN
    // =====================================

    alert("Invalid email or password.");
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-header">

          <h1>Login</h1>

          <p>
            Login to your TuitionWeb account
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>

          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>

          <button
            className="auth-button"
            type="submit"
          >
            Login
          </button>

        </form>

        <p className="auth-footer">

          Don't have an account?{" "}

          <Link to="/register">
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;

