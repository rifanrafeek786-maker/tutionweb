import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";

// HOME
import Home from "./pages/home/Home";

// AUTH
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// ADMIN
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

// STUDENT
import StudentDashboard from "./pages/student/StudentDashboard";
import FindTeachers from "./pages/student/FindTeachers";
import TeacherProfile from "./pages/student/TeacherProfile";
import MyTeacher from "./pages/student/MyTeacher";
import MyClasses from "./pages/student/MyClasses";
import MonthlyPlan from "./pages/student/MonthlyPlan";
import Payment from "./pages/student/Payment";
import StudentSchedule from "./pages/student/Schedule";

// TEACHER
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import MyStudents from "./pages/teacher/MyStudents";
import TeacherMyClasses from "./pages/teacher/MyClasses";
import TeacherSchedule from "./pages/teacher/TeacherSchedule";
import TeacherPayments from "./pages/teacher/TeacherPayments";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            HOME
        ========================= */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* =========================
            AUTH
        ========================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* =========================
            ADMIN
        ========================= */}

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/teachers"
          element={<ManageTeachers />}
        />

        <Route
          path="/admin/add-teacher"
          element={<AddTeacher />}
        />

        <Route
          path="/admin/students"
          element={<ManageStudents />}
        />

        <Route
          path="/admin/classes"
          element={<ManageClasses />}
        />

        <Route
          path="/admin/add-class"
          element={<AddClass />}
        />

        <Route
          path="/admin/payments"
          element={<ManagePayments />}
        />

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

        {/* =========================
            STUDENT
        ========================= */}

        <Route
          path="/student/dashboard"
          element={<StudentDashboard />}
        />

        <Route
          path="/student/teachers"
          element={<FindTeachers />}
        />

        <Route
          path="/student/teacher-profile/:id"
          element={<TeacherProfile />}
        />

        <Route
          path="/student/teacher"
          element={<MyTeacher />}
        />

        <Route
          path="/student/classes"
          element={<MyClasses />}
        />

        {/* MONTHLY PLANS */}

        <Route
          path="/student/plan/:teacherId"
          element={<MonthlyPlan />}
        />

        {/* PAYMENT */}

        <Route
          path="/student/payment"
          element={<Payment />}
        />

        {/* SCHEDULE */}

        <Route
          path="/student/schedule"
          element={<StudentSchedule />}
        />

        {/* OTHER STUDENT PAGES */}

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

        <Route
          path="/student/profile"
          element={
            <div style={{ padding: "40px" }}>
              <h1>Student Profile</h1>
              <p>
                Student profile will be developed soon.
              </p>
            </div>
          }
        />

        {/* =========================
            TEACHER
        ========================= */}

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

        <Route
          path="/teacher/schedule"
          element={<TeacherSchedule />}
        />

        <Route
          path="/teacher/payments"
          element={<TeacherPayments />}
        />

        {/* =========================
            FALLBACK
        ========================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;