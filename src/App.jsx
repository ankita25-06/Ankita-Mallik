import React, { useState, useEffect } from "react";

// Inline SVG Icons to prevent external module dependency issues
const IconMail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const IconPhone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const IconLinkedin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const IconGithub = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const IconExternalLink = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const IconMoon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
  </svg>
);

const IconSun = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M18.36 5.64l1.41-1.41"/>
  </svg>
);

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: "YOUR_WEB3FORMS_ACCESS_KEY_HERE", // Paste your key from Web3Forms here
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Message from ${formData.name}`
        })
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      alert("Error sending message. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const profileData = {
    name: "Ankita Mallik",
    greeting: "Hello!",
    tagline: "Hope you enjoy my portfolio!",
    about:
      "I am a Computer Science & Engineering student passionate about building intelligent, practical web and AI solutions. My journey spans full-stack web development, machine learning, and multi-agent AI systems. Currently, as a Software Engineering Intern, I work on production web deployment, debugging, custom WordPress migrations, and building scalable web applications for real-world clients. On the project front, I am actively engineering Zenith—an Agentic AI system designed to craft personalized master study plans for students—alongside ML projects like FelineHub and interactive AI game arenas.",
    education: [
      {
        institution: "IIIT Bhubaneswar",
        degree: "Bachelor of Technology in Computer Science and Engineering",
        period: "2025 – 2029",
        details: "Focusing on Data Structures & Algorithms, Web Engineering, and Multi-Agent AI systems"
      }
    ],
    skills: ["React", "C / C++", "JavaScript", "Pandas", "Python", "Git & GitHub"],
    experiences: [
      {
        period: "2026 – Present",
        title: "Software Engineering Intern",
        company: "Tech Initiatives",
        description:
          "Developing custom Web applications, frontend bug resolution, Vercel deployments, and multi-agent AI automation workflows."
      },
      {
        period: "2025 – 2026",
        title: "Web Development Lead",
        company: "Campus Projects",
        description:
          "Designed and built some basic projects and tried to make my coding skills better by doing LeetCode regulary."
      }
    ],
    projects: [
      {
        id: "zenith",
        title: "Zenith",
        description:
          "A modern web application and design project featuring optimized frontend structures, custom animations, and seamless navigation layouts.",
        tech: ["React", "JavaScript", "Tailwind CSS", "Vite"],
        github: "https://github.com/ankita25-06/Zenith",
        live: ""
      },
      {
        id: "felinehub",
        title: "FelineHub",
        description:
          "An interactive AI health co-pilot and feline care web platform featuring symptom checking, health tracking dashboards, and responsive modern UI components.",
        tech: ["React", "Vite", "Lucide React", "Tailwind CSS"],
        github: "https://github.com/ankita25-06/Felinehub",
        live: "https://felinehub.vercel.app/"
      },
      {
        id: "titanic",
        title: "Titanic Survival Prediction Model",
        description:
          "An interactive web app predicting passenger survival on the Titanic using machine learning classification models trained on historical data.",
        tech: ["Python", "Pandas", "Scikit-Learn", "Streamlit"],
        github: "https://github.com/ankita25-06/titanic_survival-app",
        live: "https://titanicsurvival-app-t4fw5fxs7d8kcp3ez9jek2.streamlit.app/"
      },
      {
        id: "ptcg",
        title: "AI Arena Battle Field",
        description:
          "An AI-powered arena battle simulator between Pokémons featuring interactive visual elements and dynamic point systems.",
        tech: ["JavaScript", "React", "Tailwind CSS", "Vite"],
        github: "https://github.com/ankita25-06/PTCG-game",
        live: "https://ptcg-game-blush.vercel.app/"
      }
    ],
    contacts: {
      email: "mailto:mallikankitapriyadarsini@gmail.com",
      phone: "tel:+918984519558",
      linkedin: "https://linkedin.com/in/ankita-mallik-22164738a",
      github: "https://github.com/ankita25-06"
    }
  };

  return (
    <div
      style={{
        backgroundColor: darkMode ? "#1a1a1a" : "#e2e8f0",
        color: darkMode ? "#f3f4f6" : "#111827",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        fontFamily: "'Open Sans', sans-serif",
        transition: "background-color 0.3s ease, color 0.3s ease"
      }}
    >
      {/* Outer Floating Card */}
      <div
        style={{
          backgroundColor: darkMode ? "#262626" : "#ffffff",
          borderRadius: "28px",
          boxShadow: darkMode
            ? "0 20px 40px rgba(0,0,0,0.6)"
            : "0 20px 40px rgba(0,0,0,0.08)",
          width: "100%",
          maxWidth: "1000px",
          padding: "40px",
          position: "relative",
          transition: "background-color 0.3s ease",
          boxSizing: "border-box"
        }}
      >
        {/* Dark/Light Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            position: "absolute",
            top: "24px",
            right: "24px",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: darkMode ? "#333333" : "#f1f5f9",
            color: darkMode ? "#fbbf24" : "#475569",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s ease",
            zIndex: 10
          }}
          title="Toggle Theme"
        >
          {darkMode ? <IconSun /> : <IconMoon />}
        </button>

        {/* TOP SECTION: 2-COLUMN HERO */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "36px",
            alignItems: "start",
            marginBottom: "40px"
          }}
        >
          {/* Left Column: Pixel Image */}
          <div
            style={{
              borderRadius: "24px",
              overflow: "hidden",
              backgroundColor: "#2a2a2a",
              border: darkMode ? "2px solid #333" : "2px solid #000000",
              boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
              height: "480px",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start"
            }}
          >
            <img
              src="/pixel_image.png"
              alt="Ankita Mallik Pixel Art"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/pixel_image.jpg";
              }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top center"
              }}
            />
          </div>

          {/* Right Column: Intro Bio + Education */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <h1 style={{ fontSize: "2.8rem", fontWeight: "800", margin: 0, letterSpacing: "-1px" }}>
                {profileData.greeting}
              </h1>
              <span style={{ fontSize: "2.4rem", cursor: "default", userSelect: "none" }}>👋</span>
            </div>

            <p
              style={{
                fontSize: "0.95rem",
                color: darkMode ? "#d1d5db" : "#4b5563",
                lineHeight: "1.6",
                marginBottom: "16px"
              }}
            >
              {profileData.about}
            </p>

            <p
              style={{
                fontSize: "0.95rem",
                fontWeight: "700",
                color: darkMode ? "#9ca3af" : "#374151",
                marginBottom: "28px",
                fontStyle: "italic"
              }}
            >
              {profileData.tagline}
            </p>

            {/* Education Sub-section */}
            <div style={{ marginTop: "24px" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "12px" }}>Education</h2>
              {profileData.education.map((edu, idx) => (
                <div key={idx} style={{ marginBottom: "12px" }}>
                  <div style={{ fontWeight: "700", fontSize: "1rem" }}>
                    {edu.institution}{" "}
                    <span style={{ fontWeight: "400", color: darkMode ? "#9ca3af" : "#6b7280" }}>
                      | {edu.degree}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.85rem", color: darkMode ? "#9ca3af" : "#6b7280", marginTop: "2px" }}>
                    {edu.period}
                  </div>
                  <p style={{ fontSize: "0.88rem", color: darkMode ? "#d1d5db" : "#4b5563", marginTop: "4px" }}>
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: Skills Grid + Experience Timeline */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "36px",
            marginBottom: "40px",
            paddingTop: "24px",
            borderTop: darkMode ? "1px solid #333" : "1px solid #f0f0f0"
          }}
        >
          {/* Skills Grid */}
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "16px" }}>Skills</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "12px"
              }}
            >
              {profileData.skills.map((skill, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: darkMode ? "#171717" : "#18181b",
                    color: "#ffffff",
                    borderRadius: "14px",
                    aspectRatio: "1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "8px",
                    fontSize: "0.85rem",
                    fontWeight: "700",
                    textAlign: "center",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    transition: "transform 0.2s ease"
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Experience Timeline */}
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "16px" }}>Experience</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {profileData.experiences.map((exp, idx) => (
                <div key={idx} style={{ position: "relative", paddingLeft: "20px" }}>
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "6px",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: darkMode ? "#ffffff" : "#000000"
                    }}
                  />
                  <div style={{ fontSize: "0.8rem", color: darkMode ? "#9ca3af" : "#6b7280", fontWeight: "600" }}>
                    {exp.period}
                  </div>
                  <div style={{ fontSize: "1rem", fontWeight: "700", marginTop: "2px" }}>
                    {exp.title} – <span style={{ fontWeight: "500" }}>{exp.company}</span>
                  </div>
                  <div style={{ fontSize: "0.88rem", color: darkMode ? "#d1d5db" : "#4b5563", marginTop: "4px", lineHeight: "1.5" }}>
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PROJECTS SECTION WITH FLIP CARDS */}
        <div style={{ marginBottom: "40px", paddingTop: "24px", borderTop: darkMode ? "1px solid #333" : "1px solid #f0f0f0" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "20px" }}>Projects</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {profileData.projects.map((proj, idx) => {
              const isHovered = hoveredCard === proj.id;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredCard(proj.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    perspective: "1000px",
                    height: "320px",
                    cursor: "pointer"
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      transition: "transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)",
                      transformStyle: "preserve-3d",
                      transform: isHovered ? "rotateY(180deg)" : "rotateY(0deg)"
                    }}
                  >
                    {/* FRONT SIDE OF CARD */}
                    <div
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        backgroundColor: darkMode ? "#1e1e1e" : "#f9fafb",
                        borderRadius: "20px",
                        padding: "24px",
                        border: darkMode ? "1px solid #333" : "1px solid #e5e7eb",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        boxSizing: "border-box"
                      }}
                    >
                      <div>
                        <h3 style={{ fontSize: "1.2rem", fontWeight: "700", margin: "0 0 10px 0" }}>{proj.title}</h3>
                        <p style={{ fontSize: "0.85rem", color: darkMode ? "#d1d5db" : "#4b5563", lineHeight: "1.5", margin: "0 0 16px 0" }}>
                          {proj.description}
                        </p>
                      </div>

                      <div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                          {proj.tech.map((t, i) => (
                            <span
                              key={i}
                              style={{
                                backgroundColor: darkMode ? "#333333" : "#e5e7eb",
                                color: darkMode ? "#e5e7eb" : "#374151",
                                padding: "4px 10px",
                                borderRadius: "12px",
                                fontSize: "0.75rem",
                                fontWeight: "600"
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                          <a
                            href={proj.github}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              fontSize: "0.8rem",
                              fontWeight: "700",
                              color: darkMode ? "#ffffff" : "#000000",
                              textDecoration: "none"
                            }}
                          >
                            GitHub <IconExternalLink />
                          </a>
                          {proj.live && (
                            <a
                              href={proj.live}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                                fontSize: "0.8rem",
                                fontWeight: "700",
                                color: darkMode ? "#38bdf8" : "#2563eb",
                                textDecoration: "none"
                              }}
                            >
                              Live Demo <IconExternalLink />
                            </a>
                          )}
                          <span style={{ marginLeft: "auto", fontSize: "0.75rem", color: darkMode ? "#6b7280" : "#9ca3af", fontStyle: "italic" }}>
                            Hover to preview 🔄
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* BACK SIDE OF CARD (PREVIEW) */}
                    <div
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        backgroundColor: darkMode ? "#111827" : "#1e293b",
                        borderRadius: "20px",
                        overflow: "hidden",
                        border: darkMode ? "1px solid #374151" : "1px solid #334155",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        boxSizing: "border-box",
                        padding: "16px",
                        color: "#ffffff",
                        textAlign: "center"
                      }}
                    >
                      {proj.live ? (
                        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
                          <div style={{ width: "100%", height: "200px", borderRadius: "12px", overflow: "hidden", position: "relative", backgroundColor: "#000" }}>
                            <iframe
                              src={proj.live}
                              title={`${proj.title} Preview`}
                              style={{
                                width: "1200px",
                                height: "800px",
                                border: "none",
                                transform: "scale(0.23)",
                                transformOrigin: "0 0",
                                pointerEvents: "none"
                              }}
                            />
                          </div>

                          <a
                            href={proj.live}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              marginTop: "12px",
                              padding: "10px 20px",
                              backgroundColor: "#38bdf8",
                              color: "#0f172a",
                              borderRadius: "10px",
                              fontWeight: "800",
                              fontSize: "0.85rem",
                              textDecoration: "none",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              boxShadow: "0 4px 12px rgba(56, 189, 248, 0.3)"
                            }}
                          >
                            Open Live Site <IconExternalLink />
                          </a>
                        </div>
                      ) : (
                        <div style={{ padding: "20px" }}>
                          <h4 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "8px" }}>{proj.title}</h4>
                          <p style={{ fontSize: "0.85rem", color: "#9ca3af", marginBottom: "16px" }}>
                            Live website deployment is coming soon!
                          </p>
                          <a
                            href={proj.github}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              padding: "8px 16px",
                              backgroundColor: "#ffffff",
                              color: "#000000",
                              borderRadius: "8px",
                              fontWeight: "700",
                              fontSize: "0.8rem",
                              textDecoration: "none",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px"
                            }}
                          >
                            View Source on GitHub <IconExternalLink />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CONTACT FORM SECTION */}
        <div style={{ marginBottom: "32px", paddingTop: "24px", borderTop: darkMode ? "1px solid #333" : "1px solid #f0f0f0" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "16px", textAlign: "center" }}>Get in Touch</h2>
          
          {submitted ? (
            <div style={{ padding: "16px", backgroundColor: "#22c55e20", color: "#22c55e", border: "1px solid #22c55e", borderRadius: "12px", textAlign: "center", fontWeight: "600" }}>
              Thank you for reaching out! Your message has been delivered to my inbox.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "500px", margin: "0 auto" }}>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: darkMode ? "1px solid #444" : "1px solid #d1d5db",
                  backgroundColor: darkMode ? "#1c1c1c" : "#f9fafb",
                  color: darkMode ? "#ffffff" : "#111827",
                  fontSize: "0.9rem",
                  outline: "none"
                }}
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                style={{
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: darkMode ? "1px solid #444" : "1px solid #d1d5db",
                  backgroundColor: darkMode ? "#1c1c1c" : "#f9fafb",
                  color: darkMode ? "#ffffff" : "#111827",
                  fontSize: "0.9rem",
                  outline: "none"
                }}
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                style={{
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: darkMode ? "1px solid #444" : "1px solid #d1d5db",
                  backgroundColor: darkMode ? "#1c1c1c" : "#f9fafb",
                  color: darkMode ? "#ffffff" : "#111827",
                  fontSize: "0.9rem",
                  outline: "none",
                  resize: "vertical"
                }}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: "12px 20px",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: darkMode ? "#ffffff" : "#000000",
                  color: darkMode ? "#000000" : "#ffffff",
                  fontWeight: "700",
                  fontSize: "0.9rem",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  opacity: isSubmitting ? 0.7 : 1,
                  transition: "opacity 0.2s ease"
                }}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>

        {/* BOTTOM SOCIAL CONTACT ROW */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            paddingTop: "24px",
            borderTop: darkMode ? "1px solid #333" : "1px solid #f0f0f0"
          }}
        >
          <a
            href={profileData.contacts.email}
            title="Email"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: darkMode ? "#18181b" : "#000000",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none"
            }}
          >
            <IconMail />
          </a>
          <a
            href={profileData.contacts.phone}
            title="Phone"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: darkMode ? "#18181b" : "#000000",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none"
            }}
          >
            <IconPhone />
          </a>
          <a
            href={profileData.contacts.linkedin}
            target="_blank"
            rel="noreferrer"
            title="LinkedIn"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: darkMode ? "#18181b" : "#000000",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none"
            }}
          >
            <IconLinkedin />
          </a>
          <a
            href={profileData.contacts.github}
            target="_blank"
            rel="noreferrer"
            title="GitHub"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: darkMode ? "#18181b" : "#000000",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none"
            }}
          >
            <IconGithub />
          </a>
        </div>
      </div>
    </div>
  );
}