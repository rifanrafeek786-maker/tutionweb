import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      {/* Navbar */}
      <nav className="navbar">

        <div className="navbar-logo">
          TuitionWeb
        </div>

        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/admin/login">
            Admin Login
            </Link>
        </div>

      </nav>

      {/* Hero Section */}
      <section className="hero">

       <div className="hero-content">

  <div className="hero-text">

    <p className="hero-label">
      ONE-TO-ONE ONLINE LEARNING
    </p>

    <h1>
      Learn From the
      <span> Right Teacher</span>
    </h1>

    <p className="hero-description">
      Get personalized online tuition from qualified teachers.
      Choose your subject, find the right teacher, and learn
      at your own pace with a simple monthly plan.
    </p>

    <div className="hero-buttons">

      <Link to="/register" className="home-button">
        Get Started
      </Link>

      <Link to="/login" className="hero-secondary-button">
        Login
      </Link>

    </div>

  </div>

  <div className="hero-card">

    <div className="hero-card-icon">
      🎓
    </div>

    <h3>Personalized Learning</h3>

    <p>
      One teacher. One student. Focused learning.
    </p>

  </div>

</div>

      </section>
      {/* Popular Subjects */}
<section className="subjects-section">

  <div className="section-heading">
    <p>LEARN WHAT YOU LOVE</p>
    <h2>Popular Subjects</h2>
    <span>
      Find a qualified teacher for the subject you want to learn.
    </span>
  </div>

  <div className="subjects-grid">

    <div className="subject-card">
      <div className="subject-icon">📐</div>
      <h3>Mathematics</h3>
      <p>Learn mathematics with personalized one-to-one classes.</p>
      <Link to="/register">Find Teacher →</Link>
    </div>

    <div className="subject-card">
      <div className="subject-icon">💻</div>
      <h3>Programming</h3>
      <p>Learn coding and programming from experienced teachers.</p>
      <Link to="/register">Find Teacher →</Link>
    </div>

    <div className="subject-card">
      <div className="subject-icon">🔬</div>
      <h3>Science</h3>
      <p>Understand science through focused personal teaching.</p>
      <Link to="/register">Find Teacher →</Link>
    </div>

    <div className="subject-card">
      <div className="subject-icon">📖</div>
      <h3>English</h3>
      <p>Improve your English skills with a personal teacher.</p>
      <Link to="/register">Find Teacher →</Link>
    </div>

    <div className="subject-card">
      <div className="subject-icon">🌐</div>
      <h3>Languages</h3>
      <p>Learn a new language with one-to-one guidance.</p>
      <Link to="/register">Find Teacher →</Link>
    </div>

    <div className="subject-card">
      <div className="subject-icon">🧪</div>
      <h3>Chemistry</h3>
      <p>Master chemistry concepts with personalized lessons.</p>
      <Link to="/register">Find Teacher →</Link>
    </div>

  </div>

</section>
{/* How It Works */}
<section className="how-section">

  <div className="section-heading">
    <p>SIMPLE LEARNING PROCESS</p>
    <h2>How It Works</h2>
    <span>
      Start your personalized learning journey in just a few simple steps.
    </span>
  </div>

  <div className="steps-grid">

    <div className="step-card">
      <div className="step-number">01</div>
      <h3>Find a Teacher</h3>
      <p>
        Browse teachers based on subject, experience and your learning needs.
      </p>
    </div>

    <div className="step-card">
      <div className="step-number">02</div>
      <h3>Choose a Plan</h3>
      <p>
        Select a monthly tuition plan that works for you.
      </p>
    </div>

    <div className="step-card">
      <div className="step-number">03</div>
      <h3>Start Classes</h3>
      <p>
        Connect with your teacher and begin one-to-one online classes.
      </p>
    </div>

    <div className="step-card">
      <div className="step-number">04</div>
      <h3>Track Your Progress</h3>
      <p>
        Attend classes, complete lessons and monitor your learning progress.
      </p>
    </div>

  </div>

</section>
{/* Featured Teachers */}
<section className="teachers-section">

  <div className="section-heading">
    <p>MEET OUR TEACHERS</p>
    <h2>Featured Teachers</h2>
    <span>
      Learn from experienced teachers who are ready to guide you.
    </span>
  </div>

  <div className="teachers-grid">

    <div className="teacher-card">
      <div className="teacher-avatar">👨‍🏫</div>
      <h3>Arun Kumar</h3>
      <p className="teacher-subject">Mathematics</p>
      <p>⭐ 4.9 · 120+ Classes</p>
      <p className="teacher-price">₹2,000 / month</p>
      <Link to="/register" className="teacher-button">
        View Teacher
      </Link>
    </div>

    <div className="teacher-card">
      <div className="teacher-avatar">👩‍🏫</div>
      <h3>Priya Sharma</h3>
      <p className="teacher-subject">Programming</p>
      <p>⭐ 4.8 · 95+ Classes</p>
      <p className="teacher-price">₹2,500 / month</p>
      <Link to="/register" className="teacher-button">
        View Teacher
      </Link>
    </div>

    <div className="teacher-card">
      <div className="teacher-avatar">👨‍🏫</div>
      <h3>Rahul Menon</h3>
      <p className="teacher-subject">Science</p>
      <p>⭐ 4.9 · 150+ Classes</p>
      <p className="teacher-price">₹1,800 / month</p>
      <Link to="/register" className="teacher-button">
        View Teacher
      </Link>
    </div>

  </div>

</section>
{/* Monthly Plans */}
<section className="plans-section">

  <div className="section-heading">
    <p>SIMPLE MONTHLY PLANS</p>
    <h2>Choose Your Learning Plan</h2>
    <span>
      Choose a monthly plan that fits your learning needs.
    </span>
  </div>

  <div className="plans-grid">

    {/* Basic Plan */}
    <div className="plan-card">

      <h3>Basic</h3>

      <p className="plan-description">
        Perfect for getting started.
      </p>

      <div className="plan-price">
        ₹1,500 <span>/ month</span>
      </div>

      <ul>
        <li>✓ 4 one-to-one classes</li>
        <li>✓ One teacher</li>
        <li>✓ Online classes</li>
        <li>✓ Basic learning support</li>
      </ul>

      <Link to="/register" className="plan-button">
        Choose Plan
      </Link>

    </div>


    {/* Standard Plan */}
    <div className="plan-card popular-plan">

      <div className="popular-badge">
        MOST POPULAR
      </div>

      <h3>Standard</h3>

      <p className="plan-description">
        Best for regular learners.
      </p>

      <div className="plan-price">
        ₹2,500 <span>/ month</span>
      </div>

      <ul>
        <li>✓ 8 one-to-one classes</li>
        <li>✓ One teacher</li>
        <li>✓ Online classes</li>
        <li>✓ Learning progress tracking</li>
      </ul>

      <Link to="/register" className="plan-button">
        Choose Plan
      </Link>

    </div>


    {/* Premium Plan */}
    <div className="plan-card">

      <h3>Premium</h3>

      <p className="plan-description">
        For intensive learning.
      </p>

      <div className="plan-price">
        ₹4,000 <span>/ month</span>
      </div>

      <ul>
        <li>✓ 12 one-to-one classes</li>
        <li>✓ One teacher</li>
        <li>✓ Online classes</li>
        <li>✓ Priority support</li>
      </ul>

      <Link to="/register" className="plan-button">
        Choose Plan
      </Link>

    </div>

  </div>

</section>
{/* Why Choose Us */}
<section className="why-section">

  <div className="section-heading">
    <p>WHY TUITIONWEB</p>
    <h2>Why Choose Us?</h2>
    <span>
      Everything you need for a better one-to-one learning experience.
    </span>
  </div>

  <div className="why-grid">

    <div className="why-card">
      <div className="why-icon">👨‍🏫</div>
      <h3>One-to-One Learning</h3>
      <p>
        Get personal attention from your teacher instead of learning
        in a large classroom.
      </p>
    </div>

    <div className="why-card">
      <div className="why-icon">🎯</div>
      <h3>Personalized Lessons</h3>
      <p>
        Lessons can be focused on your individual goals, level and
        learning requirements.
      </p>
    </div>

    <div className="why-card">
      <div className="why-icon">💳</div>
      <h3>Simple Monthly Plans</h3>
      <p>
        Choose a monthly plan that matches your learning schedule
        and budget.
      </p>
    </div>

    <div className="why-card">
      <div className="why-icon">📊</div>
      <h3>Track Your Progress</h3>
      <p>
        Keep track of your classes and learning progress from your
        student dashboard.
      </p>
    </div>

    <div className="why-card">
      <div className="why-icon">🔒</div>
      <h3>Secure Platform</h3>
      <p>
        Your account, learning information and payment details are
        handled securely.
      </p>
    </div>

    <div className="why-card">
      <div className="why-icon">💬</div>
      <h3>Easy Communication</h3>
      <p>
        Communicate with your teacher and stay updated about your
        classes.
      </p>
    </div>

  </div>

</section>
{/* Testimonials */}
<section className="testimonials-section">

  <div className="section-heading">
    <p>STUDENT EXPERIENCES</p>
    <h2>What Our Students Say</h2>
    <span>
      See how personalized learning can make a difference.
    </span>
  </div>

  <div className="testimonials-grid">

    <div className="testimonial-card">
      <div className="testimonial-stars">★★★★★</div>

      <p>
        "My teacher explains everything clearly and gives me
        personal attention in every class."
      </p>

      <h3>Rahul</h3>
      <span>Mathematics Student</span>
    </div>

    <div className="testimonial-card">
      <div className="testimonial-stars">★★★★★</div>

      <p>
        "The one-to-one classes are much easier for me than
        studying in a large classroom."
      </p>

      <h3>Ananya</h3>
      <span>Programming Student</span>
    </div>

    <div className="testimonial-card">
      <div className="testimonial-stars">★★★★★</div>

      <p>
        "I like the monthly plan because I can learn regularly
        without complicated payment arrangements."
      </p>

      <h3>Arjun</h3>
      <span>Science Student</span>
    </div>

  </div>

</section>
{/* Call To Action */}
<section className="cta-section">

  <div className="cta-content">

    <h2>Ready to Start Learning?</h2>

    <p>
      Find the right teacher and start your personalized
      one-to-one learning journey today.
    </p>

    <Link to="/register" className="cta-button">
      Get Started
    </Link>

  </div>

</section>
{/* Footer */}
<footer className="footer">

  <div className="footer-content">

    <div className="footer-brand">
      <h2>TuitionWeb</h2>
      <p>
        One-to-one online learning made simple.
        Find the right teacher and learn at your own pace.
      </p>
    </div>

    <div className="footer-column">
      <h3>Platform</h3>
      <Link to="/">Home</Link>
      <Link to="/register">Find a Teacher</Link>
      <Link to="/register">Subjects</Link>
      <Link to="/register">Plans</Link>
    </div>

    <div className="footer-column">
      <h3>Account</h3>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>

    <div className="footer-column">
      <h3>Support</h3>
      <a href="#help">Help Center</a>
      <a href="#contact">Contact Us</a>
      <a href="#privacy">Privacy Policy</a>
    </div>

  </div>

  <div className="footer-bottom">
    <p>© 2026 TuitionWeb. All rights reserved.</p>
  </div>

</footer>
    </div>
  );
}

export default Home;