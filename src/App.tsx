import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { profile, projects, skills, timeline } from "./data";
import "./App.css";

type SectionId = "home" | "work" | "about" | "contact";

const nav: { id: SectionId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function App() {
  const [active, setActive] = useState<SectionId>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActive(visible.target.id as SectionId);
        }
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0.2, 0.5, 0.8] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function goTo(id: SectionId) {
    setSidebarOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <div className="shell">
      <div className="backdrop" aria-hidden="true">
        <div className="glow glow-a" />
        <div className="glow glow-b" />
        <div className="leaves" />
      </div>

      <button
        className="menu-btn"
        type="button"
        aria-label="Open navigation"
        onClick={() => setSidebarOpen(true)}
      >
        Menu
      </button>

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="brand">TK</div>
        <p className="roll-chip">{profile.rollNo}</p>
        <nav aria-label="Primary">
          {nav.map((item) => (
            <button
              key={item.id}
              type="button"
              className={active === item.id ? "nav-link active" : "nav-link"}
              onClick={() => goTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <a className="gh" href={profile.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </aside>

      {sidebarOpen ? (
        <button
          className="scrim"
          type="button"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <main>
        <section id="home" className="panel hero">
          <p className="pill">{profile.availability}</p>
          <h1>{profile.name}.</h1>
          <p className="identity-line">
            Roll No: {profile.rollNo} · JECRC University · Section O
          </p>
          <p className="role">{profile.role}</p>
          <p className="tagline">{profile.tagline}</p>
          <div className="actions">
            <button type="button" className="btn primary" onClick={() => goTo("work")}>
              See my work →
            </button>
            <button type="button" className="btn ghost" onClick={() => goTo("contact")}>
              Say hello
            </button>
          </div>
        </section>

        <section id="work" className="panel">
          <h2>Selected work</h2>
          <div className="cards">
            {projects.map((project) => (
              <article key={project.title} className="card">
                <div className="card-top">
                  <h3>{project.title}</h3>
                  <span>{project.year}</span>
                </div>
                <p>{project.description}</p>
                <div className="tags">
                  {project.stack.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <a href={project.href} target="_blank" rel="noreferrer">
                  Open
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="panel">
          <h2>About</h2>
          <div className="about-grid">
            <div className="card identity">
              <h3>{profile.name}</h3>
              <p className="roll-meta">Roll No: {profile.rollNo}</p>
              <p>
                CSE student at JECRC University building full-stack and AI-assisted web apps.
                Comfortable from responsive UI through Express APIs and MongoDB.
              </p>
              <p className="meta">
                {profile.location}
                <br />
                {profile.email}
              </p>
            </div>
            <div>
              <h3>Skills</h3>
              <div className="tags wrap">
                {skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
              <h3 className="timeline-title">Timeline</h3>
              <ul className="timeline">
                {timeline.map((item) => (
                  <li key={item.year}>
                    <strong>{item.year}</strong>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className="panel">
          <h2>Contact</h2>
          <div className="contact-grid">
            <div className="card">
              <h3>Let’s talk</h3>
              <p>
                Internships, campus projects, or AI-assisted web builds — drop a note and I’ll
                reply.
              </p>
              <p className="meta">
                {profile.name} · {profile.rollNo}
                <br />
                {profile.email}
              </p>
              <a href={profile.github} target="_blank" rel="noreferrer">
                github.com/tanmay4141
              </a>
            </div>
            <form className="card form" onSubmit={onSubmit}>
              <label>
                Name
                <input name="name" required placeholder="Your name" />
              </label>
              <label>
                Email
                <input name="email" type="email" required placeholder="you@email.com" />
              </label>
              <label>
                Message
                <textarea name="message" required rows={4} placeholder="What are you building?" />
              </label>
              <button className="btn primary" type="submit">
                Send message
              </button>
              {sent ? <p className="success" role="status">Thanks — message captured locally.</p> : null}
            </form>
          </div>
        </section>
      </main>

      <p className="owner-stamp" aria-label="Lab record owner">
        {profile.name} · {profile.rollNo}
      </p>
    </div>
  );
}
