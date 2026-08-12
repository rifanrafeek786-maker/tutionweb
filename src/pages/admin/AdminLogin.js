import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Admin credentials
    const adminEmail = "admin@tuitionweb.com";
    const adminPassword = "admin123";

    // Check credentials
    if (
      email === adminEmail &&
      password === adminPassword
    ) {
      // Save admin login
      localStorage.setItem(
        "loggedInAdmin",
        JSON.stringify({
          email: adminEmail,
          role: "admin",
        })
      );

      alert("Admin login successful!");

      navigate("/admin/dashboard");
    } else {
      alert("Invalid admin email or password.");
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-header">

          <h1>
            Admin Login
          </h1>

          <p>
            Login to the TuitionWeb Admin Panel
          </p>

        </div>


        <form onSubmit={handleSubmit}>

          {/* Email */}

          <div className="form-group">

            <label>
              Admin Email
            </label>

            <input
              type="email"
              placeholder="Enter admin email"
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
              placeholder="Enter admin password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>


          {/* Login Button */}

          <button
            type="submit"
            className="auth-button"
          >
            Admin Login
          </button>

        </form>


        {/* Back to Student Login */}

        <p className="auth-footer">

          Student?

          {" "}

          <Link to="/login">
            Student Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default AdminLogin;