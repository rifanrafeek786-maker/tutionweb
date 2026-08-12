import React, { useState } from "react";
import { Link } from "react-router-dom";

function AddTeacher() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [fee, setFee] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create new teacher
    const newTeacher = {
      id: Date.now(),
      name: name,
      email: email,
      subject: subject,
      qualification: qualification,
      experience: experience,
      students: "0",
      classes: "0",
      rating: "New",
      fee: Number(fee),
      avatar: "👨‍🏫",
      description: `${name} is a new ${subject} teacher on TuitionWeb.`,
    };

    // Get existing teachers from localStorage
    const existingTeachers =
      JSON.parse(localStorage.getItem("teachers")) || [];

    // Add new teacher
    const updatedTeachers = [
      ...existingTeachers,
      newTeacher,
    ];

    // Save teachers
    localStorage.setItem(
      "teachers",
      JSON.stringify(updatedTeachers)
    );

    alert("Teacher added successfully!");

    // Clear form
    setName("");
    setEmail("");
    setSubject("");
    setQualification("");
    setExperience("");
    setFee("");
  };

  return (
    <div className="add-teacher-page">

      {/* Header */}
      <div className="add-teacher-header">

        <div>
          <h1>Add Teacher</h1>

          <p>
            Add a new teacher to TuitionWeb.
          </p>
        </div>

        <Link
          to="/admin/dashboard"
          className="back-admin-button"
        >
          ← Dashboard
        </Link>

      </div>


      {/* Form Card */}
      <div className="add-teacher-card">

        <form onSubmit={handleSubmit}>

          {/* Teacher Name */}
          <div className="form-group">

            <label>
              Teacher Name
            </label>

            <input
              type="text"
              placeholder="Enter teacher name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

          </div>


          {/* Email */}
          <div className="form-group">

            <label>
              Email
            </label>

            <input
              type="email"
              placeholder="Enter teacher email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>


          {/* Subject */}
          <div className="form-group">

            <label>
              Subject
            </label>

            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            >

              <option value="">
                Select Subject
              </option>

              <option value="Mathematics">
                Mathematics
              </option>

              <option value="Science">
                Science
              </option>

              <option value="Programming">
                Programming
              </option>

              <option value="English">
                English
              </option>

            </select>

          </div>


          {/* Qualification */}
          <div className="form-group">

            <label>
              Qualification
            </label>

            <input
              type="text"
              placeholder="Example: M.Sc Mathematics"
              value={qualification}
              onChange={(e) =>
                setQualification(e.target.value)
              }
              required
            />

          </div>


          {/* Experience */}
          <div className="form-group">

            <label>
              Experience
            </label>

            <input
              type="text"
              placeholder="Example: 5 Years"
              value={experience}
              onChange={(e) =>
                setExperience(e.target.value)
              }
              required
            />

          </div>


          {/* Monthly Fee */}
          <div className="form-group">

            <label>
              Monthly Fee
            </label>

            <input
              type="number"
              placeholder="Example: 1500"
              value={fee}
              onChange={(e) =>
                setFee(e.target.value)
              }
              required
            />

          </div>


          {/* Submit */}
          <button
            type="submit"
            className="add-teacher-button"
          >
            Add Teacher
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddTeacher;