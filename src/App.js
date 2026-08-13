import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";

/* =========================================
   HOME
========================================= */

import Home from "./pages/home/Home";


/* =========================================
   AUTH
========================================= */

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";


/* =========================================
   ADMIN
========================================= */

import AdminDashboard from "./pages/admin/AdminDashboard";
import AddTeacher from "./pages/admin/AddTeacher";
import ManageTeachers from "./pages/admin/ManageTeachers";
import ManageStudents from "./pages/admin/ManageStudents";
import ManageClasses from "./pages/admin/ManageClasses";
import AddClass from "./pages/admin/AddClass";
import ManagePayments from "./pages/admin/ManagePayments";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminTeacherProfile from "./pages/admin/AdminTeacherProfile";
import AdminLogin from "./pages/admin/AdminLogin";

/* =========================================
   STUDENT
========================================= */

import StudentDashboard from "./pages/student/StudentDashboard";
import FindTeachers from "./pages/student/FindTeachers";
import TeacherProfile from "./pages/student/TeacherProfile";
import MyTeacher from "./pages/student/MyTeacher";
import MyClasses from "./pages/student/MyClasses";
import MonthlyPlan from "./pages/student/MonthlyPlan";
import Payment from "./pages/student/Payment";
import StudentPayments from "./pages/student/StudentPayments";

/* =========================================
   TEACHER
========================================= */
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import MyStudents from "./pages/teacher/MyStudents";
import TeacherMyClasses from "./pages/teacher/MyClasses";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =====================================
            HOME
        ===================================== */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* =====================================
            AUTH
        ===================================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =====================================
            ADMIN DASHBOARD
        ===================================== */}

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />


        {/* =====================================
            ADMIN TEACHERS
        ===================================== */}

        <Route
          path="/admin/teachers"
          element={<ManageTeachers />}
        />

        <Route
          path="/admin/add-teacher"
          element={<AddTeacher />}
        />


        {/* =====================================
            ADMIN STUDENTS
        ===================================== */}

        <Route
          path="/admin/students"
          element={<ManageStudents />}
        />


        {/* =====================================
            ADMIN CLASSES
        ===================================== */}

        <Route
          path="/admin/classes"
          element={<ManageClasses />}
        />

        <Route
          path="/admin/add-class"
          element={<AddClass />}
        />


        {/* =====================================
            ADMIN PAYMENTS
        ===================================== */}

        <Route
          path="/admin/payments"
          element={<ManagePayments />}
        />


        {/* =====================================
            ADMIN SETTINGS
        ===================================== */}

        <Route
          path="/admin/settings"
          element={<AdminSettings />}
        />
        <Route
  path="/admin/teacher/:id"
  element={<AdminTeacherProfile />}
/>
<Route
  path="/admin/login"
  element={<AdminLogin />}
/>


        {/* =====================================
            STUDENT DASHBOARD
        ===================================== */}

        <Route
          path="/student/dashboard"
          element={<StudentDashboard />}
        />


        {/* =====================================
            STUDENT FIND TEACHERS
        ===================================== */}

        <Route
          path="/student/teachers"
          element={<FindTeachers />}
        />


        {/* =====================================
            TEACHER PROFILE
        ===================================== */}

        <Route
  path="/student/teacher-profile/:id"
  element={<TeacherProfile />}
/>


        {/* =====================================
            MY TEACHER
        ===================================== */}

        <Route
          path="/student/teacher"
          element={<MyTeacher />}
        />


        {/* =====================================
            MY CLASSES
        ===================================== */}

        <Route
          path="/student/classes"
          element={<MyClasses />}
        />


        {/* =====================================
            MONTHLY PLAN
        ===================================== */}

        <Route
          path="/student/plan/:teacherId"
          element={<MonthlyPlan />}
        />


        {/* =====================================
            PAYMENT
        ===================================== */}

        <Route
          path="/student/payment"
          element={<Payment />}
        />


        {/* =====================================
            STUDENT PAYMENTS
        ===================================== */}

        <Route
          path="/student/payments"
          element={<StudentPayments />}
        />


        {/* =====================================
            STUDENT SCHEDULE
        ===================================== */}

        <Route
          path="/student/schedule"
          element={
            <div style={{ padding: "40px" }}>
              <h1>Schedule</h1>
              <p>
                Schedule section will be developed next.
              </p>
            </div>
          }
        />


        {/* =====================================
            STUDENT MESSAGES
        ===================================== */}

        <Route
          path="/student/messages"
          element={
            <div style={{ padding: "40px" }}>
              <h1>Messages</h1>
              <p>
                Messages section will be developed soon.
              </p>
            </div>
          }
        />


        {/* =====================================
            LEARNING PROGRESS
        ===================================== */}

        <Route
          path="/student/progress"
          element={
            <div style={{ padding: "40px" }}>
              <h1>Learning Progress</h1>
              <p>
                Learning progress section will be developed soon.
              </p>
            </div>
          }
        />


        {/* =====================================
            STUDENT PROFILE
        ===================================== */}

        <Route
          path="/student/profile"
          element={
            <div style={{ padding: "40px" }}>
              <h1>Student Profile</h1>
              <p>
                Student profile section will be developed soon.
              </p>
            </div>
          }
        />


        {/* =====================================
            STUDENT SETTINGS
        ===================================== */}

        <Route
          path="/student/settings"
          element={
            <div style={{ padding: "40px" }}>
              <h1>Settings</h1>
              <p>
                Settings section will be developed soon.
              </p>
            </div>
          }
        />


        {/* =====================================
            FALLBACK
        ===================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
              <Route
        path="/teacher/dashboard"
        element={<TeacherDashboard />}
      />
      <Route
  path="/teacher/students"
  element={<MyStudents />}
/>
<Route
  path="/teacher/classes"
  element={<TeacherMyClasses />}
/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;