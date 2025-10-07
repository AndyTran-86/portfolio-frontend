import { useEffect, useState } from "react";
import "./index.css";
import "./App.css";
import ContactForm from "./components/ContactForm.jsx";

const API = (import.meta.env.VITE_API_URL ?? "http://localhost:8080").replace(/\/+$/, "");

export default function App() {
  const [profile, setProfile] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [showGallery, setShowGallery] = useState(false);
const [index, setIndex] = useState(0);

const gallery = [
  "/images/eli_1.jpg",
  "/images/eli_2.jpg",
  "/images/eli_3.jpg",
  "/images/eli_4.jpg",
  "/images/eli_5.jpg",
  "/images/eli_6.jpg",
  "/images/eli_7.jpg",
  "/images/eli_8.jpg",
  
];

const next = () => setIndex((index + 1) % gallery.length);
const prev = () => setIndex((index - 1 + gallery.length) % gallery.length);

  console.log("APP mounted. API =", API);

  useEffect(() => {
    fetch(`${API}/api/portfolio`)
      .then(r => r.ok ? r.json() : Promise.reject(r))
      .then(data => {
        setProfile(data?.profile ?? null);
        setExperiences(Array.isArray(data?.experience) ? data.experience : []);
        setSkills(Array.isArray(data?.skills) ? data.skills : []);
      })
      .catch(() => {
        setProfile(null); setExperiences([]); setSkills([]);
      });
  }, []);

  return (
    <>
      <nav className="nav">
        <a href="#about">About</a>
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>

      <main className="container">
        <section id="about">
  <div className="about-wrap">
    <img src="/andy.jpg" alt="Andy Tran" className="avatar" />
    <div>
      <h1>{profile?.name ?? "Andy Tran"}</h1>
      <p className="muted">
        {(profile?.title ?? "System Developer")}
        {profile?.location ? ` • ${profile.location}` : ""}
      </p>
      <p className="lead" style={{ marginTop: 12 }}>
        {profile?.summary}
      </p>
    </div>
  </div>
</section>

        <section id="experience">
          <h2>Experience</h2>
          {experiences.length === 0 ? (
            <p className="muted">Experience data not loaded.</p>
          ) : (
            experiences.map((e, i) => (
              <article key={i} className="card">
                <strong>{e.role}</strong>
                <div className="muted">
                  {e.company}
                  {e.period ? ` • ${e.period}` : ""}
                  {e.location ? ` • ${e.location}` : ""}
                </div>
                {e.description && <p style={{ marginTop: 8 }}>{e.description}</p>}
              </article>
            ))
          )}
        </section>

        <section id="skills">
          <h2>Skills</h2>
          <ul className="tags">
            {skills.map((s, i) => (
              <li key={i} className="tag">{s.name ?? String(s)}</li>
            ))}
          </ul>
        </section>

        <section id="projects">
          <h2>Projects</h2>
          <article className="card">
            <strong>Portfolio (this project)</strong>
            <p className="muted">Spring Boot backend + React frontend.</p>
            <a className="btn" target="_blank" rel="noreferrer"
               href="https://github.com/AndyTran-86/portfolio-backend">Backend Repo →</a>
          </article>
          
          <article className="card">
            <strong>Webshop</strong>
            <p className="muted">Simple webshop demo in Java/Spring.</p>
            <a className="btn" target="_blank" rel="noreferrer"
               href="https://github.com/AndyTran-86/webshop">View Repo →</a>
          </article>
            
            <article className="card">
                <strong>Project Elijah</strong>
                <p className="muted">My best project Ever</p>
                 <button
                className="btn"
                type="button"
                onClick={() => { setIndex(0); setShowGallery(true); }}>
                 View Project→
                </button>
                </article> 
                
                {showGallery && (
                    <div className="simple-viewer">
                        <div className="simple-viewer-frame">
                        <button className="nav-btn" onClick={prev} aria-label="Previous">←</button>

                        <img src={gallery[index]} alt={`Image ${index + 1}`} />

                        <button className="nav-btn" onClick={next} aria-label="Next">→</button>
                    </div>

                        <div className="simple-viewer-actions">
                        <span className="muted">{index + 1} / {gallery.length}</span>
                        <button className="btn" onClick={() => setShowGallery(false)}>Close ✕</button>
                        </div>
                    </div>
                    )}
        </section>

        <section id="contact">
          <h2>Contact</h2>


          {profile?.contact && (
            <div className="card" style={{ marginBottom: 16 }}>
              <div style={{ display: "grid", gap: 6 }}>
                {profile.contact.email && (
                  <div><strong>Email:</strong> <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a></div>
                )}
                {profile.contact.phone && (
                  <div><strong>Phone:</strong> <a href={`tel:${profile.contact.phone}`}>{profile.contact.phone}</a></div>
                )}
                {profile.contact.linkedin && (
                  <div><strong>LinkedIn:</strong> <a target="_blank" rel="noreferrer" href={profile.contact.linkedin}>{profile.contact.linkedin}</a></div>
                )}
                {profile.contact.github && (
                  <div><strong>GitHub:</strong> <a target="_blank" rel="noreferrer" href={profile.contact.github}>{profile.contact.github}</a></div>
                )}
                {profile.contact.website && (
                  <div><strong>Website:</strong> <a target="_blank" rel="noreferrer" href={`https://${profile.contact.website.replace(/^https?:\/\//,"")}`}>{profile.contact.website}</a></div>
                )}
              </div>
            </div>
          )}

          <ContactForm />
        </section>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} Andy Tran — Portfolio Project
      </footer>
    </>
  );
}