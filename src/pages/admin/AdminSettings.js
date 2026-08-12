import React from "react";
import { Link } from "react-router-dom";

function AdminSettings() {
  return (
    <div className="admin-settings-page">

      {/* Header */}

      <div className="admin-settings-header">

        <div>
          <h1>Settings</h1>

          <p>
            Manage your TuitionWeb admin settings.
          </p>
        </div>

        <Link
          to="/admin/dashboard"
          className="back-admin-button"
        >
          ← Dashboard
        </Link>

      </div>


      {/* Settings Cards */}

      <div className="admin-settings-grid">

        {/* Account */}

        <div className="admin-settings-card">

          <div className="admin-settings-icon">
            👤
          </div>

          <div>
            <h2>Admin Account</h2>

            <p>
              Manage administrator account information.
            </p>
          </div>

        </div>


        {/* Website */}

        <div className="admin-settings-card">

          <div className="admin-settings-icon">
            🌐
          </div>

          <div>
            <h2>Website Settings</h2>

            <p>
              Manage TuitionWeb platform settings.
            </p>
          </div>

        </div>


        {/* Notifications */}

        <div className="admin-settings-card">

          <div className="admin-settings-icon">
            🔔
          </div>

          <div>
            <h2>Notifications</h2>

            <p>
              Manage administrator notifications.
            </p>
          </div>

        </div>


        {/* Security */}

        <div className="admin-settings-card">

          <div className="admin-settings-icon">
            🔒
          </div>

          <div>
            <h2>Security</h2>

            <p>
              Manage account and platform security.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminSettings;