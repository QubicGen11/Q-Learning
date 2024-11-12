import React from 'react';
import './About.css';
import Navbar_main from '../Navbar Components/Navbar_main';

const About = () => {
  return (
    <div className="about-container">
        <Navbar_main />
      {/* Header Section */}
      <header className="about-header">
        <h1>Empowering Minds, Elevating Skills</h1>
        <h2>Welcome to Qubicgens Q Learning, where education meets innovation.</h2>
      </header>

      {/* Mission Section */}
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>At Qubicgen, our mission is to provide accessible, high-quality education for students and professionals worldwide. Through Q Learning, our online Learning Management System, we strive to empower individuals with the knowledge, skills, and confidence needed to thrive in today's competitive world.</p>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <h2>Our Story</h2>
        <p>Founded with a passion for transformative learning, Qubicgen has grown to become a leader in educational technology. We designed Q Learning to bridge the gap between academic knowledge and real-world applications, creating a learning experience that is both practical and engaging.</p>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <h2>Our Products</h2>
        <div className="product-cards">
          <div className="product-card">
            <h3>Q Learning LMS</h3>
            <p>Q Learning offers a comprehensive suite of courses across various domains, from software development and data science to cloud computing and digital marketing. Each course is crafted by industry experts to ensure practical insights and up-to-date knowledge.</p>
          </div>
          <div className="product-card">
            <h3>Skill-Based Learning Paths</h3>
            <p>Our learning paths guide learners through a structured, step-by-step journey to master a skill or achieve a certification. Whether you're a beginner or an advanced learner, Q Learning has a path tailored for you.</p>
          </div>
          <div className="product-card">
            <h3>Interactive and Gamified Learning</h3>
            <p>Q Learning combines interactive quizzes, assignments, and live sessions to create a dynamic learning experience. Our gamified approach rewards progress, making learning engaging and motivating.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Our Team</h2>
        <p>The Qubicgen team is composed of experienced educators, industry professionals, and technologists dedicated to pushing the boundaries of online learning. Together, we work to create a platform that not only educates but also inspires.</p>
      </section>

      {/* Vision Section */}
      <section className="vision-section">
        <h2>Our Vision for the Future</h2>
        <p>Our vision is to become the premier platform for skill development and professional education. By continuously innovating and expanding our offerings, we aim to support lifelong learners and help individuals achieve their career aspirations.</p>
      </section>

      {/* Why Choose Section */}
      <section className="why-choose-section">
        <h2>Why Choose Q Learning?</h2>
        <p>Q Learning is more than just an LMS—it's a pathway to professional growth. With industry-aligned content, hands-on projects, and personalized learning paths, we provide the resources you need to succeed in your chosen field.</p>
      </section>
    </div>
  );
};

export default About;
