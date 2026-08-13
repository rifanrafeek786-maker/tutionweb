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
      // Save logged-in student
      localStorage.setItem(
        "loggedInStudent",
        JSON.stringify(student)
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
      // Save logged-in teacher
      localStorage.setItem(
        "loggedInTeacher",
        JSON.stringify(teacher)
      );

      alert("Teacher login successful!");

      // Teacher dashboard will be created next
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

        {/* Header */}

        <div className="auth-header">

          <h1>
            Login
          </h1>

          <p>
            Login to your TuitionWeb account
          </p>

        </div>


        {/* Login Form */}

        <form onSubmit={handleSubmit}>

          {/* Email */}

          <div className="form-group">

            <label>
              Email
            </label>

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


          {/* Password */}

          <div className="form-group">

            <label>
              Password
            </label>

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


          {/* Login Button */}

          <button
            className="auth-button"
            type="submit"
          >
            Login
          </button>

        </form>


        {/* Register */}

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