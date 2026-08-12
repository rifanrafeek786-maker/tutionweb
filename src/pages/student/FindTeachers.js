import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import teachers from "../../data/teachers";

function FindTeachers() {
  const [allTeachers, setAllTeachers] = useState(teachers);
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");

  useEffect(() => {
    const savedTeachers =
      JSON.parse(localStorage.getItem("teachers")) || [];

    setAllTeachers([
      ...teachers,
      ...savedTeachers,
    ]);
  }, []);

  const filteredTeachers = allTeachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(search.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(search.toLowerCase());

    const matchesSubject =
      subject === "" ||
      teacher.subject.toLowerCase() === subject.toLowerCase();

    return matchesSearch && matchesSubject;
  });

  return (
    <div className="find-teachers-page">

      {/* Header */}
      <div className="find-teachers-header">

        <h1>Find Your Teacher</h1>

        <p>
          Browse our teachers and find the right one for your learning needs.
        </p>

      </div>


      {/* Search */}
      <div className="teacher-search">

        <input
          type="text"
          placeholder="Search by teacher name or subject"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option value="">
            All Subjects
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


      {/* Teacher Cards */}
      <div className="teacher-grid">

        {filteredTeachers.map((teacher) => (

          <div
            className="teacher-card"
            key={teacher.id}
          >

            <div className="teacher-avatar">
              {teacher.avatar}
            </div>

            <h2>
              {teacher.name}
            </h2>

            <p className="teacher-subject">
              {teacher.subject}
            </p>

            <p>
              {teacher.description}
            </p>

            <div className="teacher-info">

              <span>
                ⭐ {teacher.rating}
              </span>

              <span>
                {teacher.experience}
              </span>

            </div>

            <p className="teacher-fee">
              ₹{teacher.fee} / month
            </p>

            <Link
              to={`/student/teacher-profile/${teacher.id}`}
              className="view-teacher-button"
            >
              View Profile
            </Link>

          </div>

        ))}

      </div>


      {/* No Results */}
      {filteredTeachers.length === 0 && (

        <div className="no-teachers">

          <h2>
            No teachers found
          </h2>

          <p>
            Try searching for another teacher or subject.
          </p>

        </div>

      )}

    </div>
  );
}

export default FindTeachers;