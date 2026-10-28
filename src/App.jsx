import React, { useState, useEffect } from "react";
import "./App.css";

// Inline SVG Icons
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

const IconArrowLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const themeClass = darkMode ? "dark" : "light";

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
          access_key: "YOUR_WEB3FORMS_ACCESS_KEY_HERE",
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
        company: "Paid 3rd Semester Internship",
        description:
          "Handling production client websites, custom WordPress conversions, debugging runtime errors, and building cloud-deployed team applications."
      },
      {
        period: "2025 – 2026",
        title: "Web Development Lead",
        company: "Campus Projects",
        description:
          "Designed and built some basic projects and tried to make my coding skills better by doing LeetCode regulary."
      }
    ],
    internshipsList: [
      {
        id: "intern-1",
        role: "Software Engineering Intern",
        company: "LumnLab / Web Tech Initiatives",
        period: "2026 – Present (Paid 3rd Semester Internship)",
        description: "Engaged in full-stack web development, client site production deployments, and core WordPress migrations.",
        keyTasks: [
          "Executed full site conversions and custom WordPress migrations with zero downtime.",
          "Diagnosed and resolved complex frontend bugs, styling discrepancies, and responsive layout errors.",
          "Integrated custom HTML5, CSS3, and JavaScript landing pages for client platforms.",
          "Managed GitHub codebases and collaborated on Cloudflare Worker application setups."
        ],
        certificateUrl: "" // Add your certificate URL here whenever ready
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
    <div className={`app-container ${themeClass}`}>
      <div className={`portfolio-card ${themeClass}`}>
        {/* Dark/Light Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`theme-toggle-btn ${themeClass}`}
          title="Toggle Theme"
        >
          {darkMode ? <IconSun /> : <IconMoon />}
        </button>

        {/* ==================== PAGE 1: HOME ==================== */}
        {currentPage === "home" && (
          <div>
            {/* HERO SECTION */}
            <div className="hero-grid">
              <div className={`avatar-frame ${themeClass}`}>
                <img
                  src="/pixel_image.png"
                  alt="Ankita Mallik Pixel Art"
                  className="avatar-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/pixel_image.jpg";
                  }}
                />
              </div>

              <div>
                <div className="hero-title-row">
                  <h1 className="hero-title">{profileData.greeting}</h1>
                  <span className="wave-emoji">👋</span>
                </div>

                <p className={`hero-about ${themeClass}`}>{profileData.about}</p>
                <p className={`hero-tagline ${themeClass}`}>{profileData.tagline}</p>

                {/* Education */}
                <div className="education-block">
                  <h2 className="section-title">Education</h2>
                  {profileData.education.map((edu, idx) => (
                    <div key={idx} className="education-item">
                      <div className="education-header">
                        {edu.institution}{" "}
                        <span className={`education-degree ${themeClass}`}>| {edu.degree}</span>
                      </div>
                      <div className={`education-period ${themeClass}`}>{edu.period}</div>
                      <p className={`education-details ${themeClass}`}>{edu.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SKILLS & EXPERIENCE */}
            <div className={`middle-grid ${themeClass}`}>
              <div>
                <h2 className="section-title">Skills</h2>
                <div className="skills-grid">
                  {profileData.skills.map((skill, index) => (
                    <div key={index} className="skill-card">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="section-title">Experience</h2>
                <div className="experience-list">
                  {profileData.experiences.map((exp, idx) => (
                    <div key={idx} className="experience-item">
                      <div className={`experience-dot ${themeClass}`} />
                      <div className={`experience-period ${themeClass}`}>{exp.period}</div>
                      <div className="experience-title">
                        {exp.title} – <span>{exp.company}</span>
                      </div>
                      <div className={`experience-desc ${themeClass}`}>{exp.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PROJECTS SECTION */}
            <div className={`projects-section ${themeClass}`}>
              <h2 className="section-title">Projects</h2>
              <div className="cards-grid">
                {profileData.projects.map((proj, idx) => {
                  const isHovered = hoveredCard === proj.id;

                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setHoveredCard(proj.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      className="flip-card-perspective"
                    >
                      <div className={`flip-card-inner ${isHovered ? "flipped" : ""}`}>
                        {/* Front */}
                        <div className={`card-front ${themeClass}`}>
                          <div>
                            <h3 className="card-title">{proj.title}</h3>
                            <p className={`card-desc ${themeClass}`}>{proj.description}</p>
                          </div>

                          <div>
                            <div className="badge-wrap">
                              {proj.tech.map((t, i) => (
                                <span key={i} className={`tech-badge ${themeClass}`}>
                                  {t}
                                </span>
                              ))}
                            </div>

                            <div className="card-actions">
                              <a href={proj.github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className={`link-btn ${themeClass}`}>
                                GitHub <IconExternalLink />
                              </a>
                              {proj.live && (
                                <a href={proj.live} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className={`link-btn demo-${themeClass}`}>
                                  Live Demo <IconExternalLink />
                                </a>
                              )}
                              <span className={`hover-hint ${themeClass}`}>Hover to preview 🔄</span>
                            </div>
                          </div>
                        </div>

                        {/* Back */}
                        <div className={`card-back ${themeClass}`}>
                          {proj.id === "titanic" ? (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "10px", textAlign: "center" }}>
                              <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>📊</div>
                              <h4 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "6px" }}>{proj.title}</h4>
                              <p style={{ fontSize: "0.8rem", color: "#9ca3af", marginBottom: "16px", lineHeight: "1.4" }}>
                                Hosted on Streamlit Cloud (external frame protection active). Click below to launch the live app!
                              </p>
                              <a href={proj.live} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="visit-site-btn">
                                Launch Streamlit App <IconExternalLink />
                              </a>
                            </div>
                          ) : proj.live ? (
                            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
                              <div className="iframe-container">
                                <iframe src={proj.live} title={`${proj.title} Preview`} className="preview-iframe" />
                              </div>
                              <a href={proj.live} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="visit-site-btn">
                                Open Live Site <IconExternalLink />
                              </a>
                            </div>
                          ) : (
                            <div style={{ padding: "20px" }}>
                              <h4 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "8px" }}>{proj.title}</h4>
                              <p style={{ fontSize: "0.85rem", color: "#9ca3af", marginBottom: "16px" }}>Live website deployment coming soon!</p>
                              <a href={proj.github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="submit-btn light" style={{ textDecoration: "none" }}>
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

            {/* INTERNSHIP SECTION (FIRST PAGE BANNER) */}
            <div className={`projects-section ${themeClass}`}>
              <h2 className="section-title">Internships</h2>
              <div
                onClick={() => {
                  setCurrentPage("internship");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`internship-banner ${themeClass}`}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className={`internship-tag ${themeClass}`}>Professional Experience</span>
                    <span className={`badge-count ${themeClass}`}>View Details & Certificates 🚀</span>
                  </div>
                  <h3 className="internship-headline">Internships</h3>
                  <div className={`internship-company ${themeClass}`}>Paid 3rd Semester Internship & Roles</div>
                  <p className={`hero-about ${themeClass}`} style={{ marginTop: "12px" }}>
                    Click here to view my internships and completion certificates.
                  </p>
                </div>

                <div className={`internship-cta ${themeClass}`}>
                  View Internships Details Page →
                </div>
              </div>
            </div>

            {/* CONTACT FORM */}
            <div className={`contact-section ${themeClass}`}>
              <h2 className="section-title" style={{ textAlign: "center" }}>Get in Touch</h2>
              {submitted ? (
                <div className="success-alert">Thank you for reaching out! Your message has been delivered to my inbox.</div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className={`form-input ${themeClass}`}
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className={`form-input ${themeClass}`}
                  />
                  <textarea
                    placeholder="Your Message"
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className={`form-textarea ${themeClass}`}
                  />
                  <button type="submit" disabled={isSubmitting} className={`submit-btn ${themeClass}`}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>

            {/* FOOTER SOCIAL LINKS */}
            <div className={`social-row ${themeClass}`}>
              <a href={profileData.contacts.email} title="Email" className={`social-circle ${themeClass}`}><IconMail /></a>
              <a href={profileData.contacts.phone} title="Phone" className={`social-circle ${themeClass}`}><IconPhone /></a>
              <a href={profileData.contacts.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" className={`social-circle ${themeClass}`}><IconLinkedin /></a>
              <a href={profileData.contacts.github} target="_blank" rel="noreferrer" title="GitHub" className={`social-circle ${themeClass}`}><IconGithub /></a>
            </div>
          </div>
        )}

        {/* ==================== PAGE 2: DEDICATED INTERNSHIP PAGE ==================== */}
        {currentPage === "internship" && (
          <div>
            <button
              onClick={() => {
                setCurrentPage("home");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`back-btn ${themeClass}`}
            >
              <IconArrowLeft /> Back to Main Portfolio
            </button>

            <div className={`internship-header-card ${themeClass}`}>
              <h1 className="hero-title" style={{ fontSize: "2.2rem", margin: "0 0 8px 0" }}>Internships</h1>
              <p className={`hero-about ${themeClass}`} style={{ lineHeight: "1.7", fontSize: "1rem", margin: 0 }}>
                Here is the complete record of the internships I have completed, detailing my roles, responsibilities, technical work, and certificates.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "40px" }}>
              {profileData.internshipsList.map((item) => (
                <div 
                  key={item.id} 
                  className={`internship-header-card ${themeClass}`}
                  style={{ margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                    <div>
                      <span className={`internship-tag ${themeClass}`}>{item.period}</span>
                      <h2 style={{ fontSize: "1.4rem", fontWeight: "800", marginTop: "4px" }}>{item.role}</h2>
                      <div className={`internship-company ${themeClass}`} style={{ fontWeight: "600" }}>{item.company}</div>
                    </div>
                    {item.certificateUrl ? (
                      <a href={item.certificateUrl} target="_blank" rel="noreferrer" className="submit-btn light" style={{ textDecoration: "none", fontSize: "0.85rem", padding: "10px 16px" }}>
                        View Certificate <IconExternalLink />
                      </a>
                    ) : (
                      <span style={{ fontSize: "0.8rem", color: "#9ca3af", fontStyle: "italic" }}>Certificate coming soon</span>
                    )}
                  </div>

                  <p className={`hero-about ${themeClass}`} style={{ lineHeight: "1.6", margin: 0 }}>
                    {item.description}
                  </p>

                  <div>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: "700", marginBottom: "8px" }}>Key Responsibilities & What I Did:</h4>
                    <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                      {item.keyTasks.map((task, idx) => (
                        <li key={idx} className={`hero-about ${themeClass}`} style={{ fontSize: "0.9rem", lineHeight: "1.5" }}>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", paddingTop: "20px" }} className={`social-row ${themeClass}`}>
              <button
                onClick={() => {
                  setCurrentPage("home");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`submit-btn ${themeClass}`}
                style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                <IconArrowLeft /> Return to Main Portfolio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}