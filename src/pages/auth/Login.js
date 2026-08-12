import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get registered students
    const students =
      JSON.parse(localStorage.getItem("students")) || [];

    // Find student
    const student = students.find(
      (item) =>
        item.email === email &&
        item.password === password
    );

    // Check login
    if (!student) {
      alert("Invalid email or password.");
      return;
    }

    // Save logged-in student
    localStorage.setItem(
      "loggedInStudent",
      JSON.stringify(student)
    );

    alert("Student login successful!");

    navigate("/student/dashboard");
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-header">

          <h1>
            Student Login
          </h1>

          <p>
            Login to your TuitionWeb account
          </p>

        </div>


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


          {/* Login */}

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