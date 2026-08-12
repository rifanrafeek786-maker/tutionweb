import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Get existing students
    const existingStudents =
      JSON.parse(localStorage.getItem("students")) || [];

    // Check if email already exists
    const existingStudent = existingStudents.find(
      (student) => student.email === email
    );

    if (existingStudent) {
      alert("An account with this email already exists.");
      return;
    }

    // Create new student
    const newStudent = {
      id: Date.now(),
      name: name,
      email: email,
      password: password,
    };

    // Add student
    const updatedStudents = [
      ...existingStudents,
      newStudent,
    ];

    // Save students
    localStorage.setItem(
      "students",
      JSON.stringify(updatedStudents)
    );

    // Save currently registered/logged-in student
    localStorage.setItem(
      "loggedInStudent",
      JSON.stringify(newStudent)
    );

    alert("Student registration successful!");

    navigate("/student/dashboard");
  };

  return (
    <div className="auth-page">

      <div className="auth-container">

        <div className="auth-header">
          <h1>Student Registration</h1>

          <p>
            Create your TuitionWeb account
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />
          </div>


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


          <div className="form-group">
            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>


          <div className="form-group">
            <label>
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
            />
          </div>


          <button
            className="auth-button"
            type="submit"
          >
            Register
          </button>

        </form>


        <p className="auth-footer">

          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;