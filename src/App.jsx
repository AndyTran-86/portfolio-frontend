import { useEffect, useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch(e => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  const profile = data?.profile;

  if (loading) return <p style={{ padding: 24 }}>Loading…</p>;
  if (err)     return <p style={{ padding: 24, color: "crimson" }}>Error: {err}</p>;

  return (
    <>

      <nav className="nav">
        <a href="#profile">Profil</a>
        <a href="#experience">Erfarenhet</a>
        <a href="#education">Utbildning</a>
        <a href="#skills">Kompetenser</a>
        <a href="#languages">Språk</a>
        <a href="#projects">Projekt</a>
        <a href="#contact">Kontakt</a>
      </nav>


      <section id="profile">
        <h1>{profile?.name ?? "Ditt Namn"}</h1>
        <h2 className="muted">{profile?.title ?? "Titel / Roll"}</h2>
        {profile?.summary && <p className="lead">{profile.summary}</p>}
      </section>


      <section id="experience">
        <h2>Erfarenhet</h2>
        {(data?.experience ?? []).map((e, i) => (
          <article className="card" key={i}>
            <h3>{e?.role || e?.title || "Roll"}</h3>
            <p className="muted">
              {e?.company ?? "Företag"} {e?.period ? `• ${e.period}` : ""}
            </p>
            {e?.description && <p>{e.description}</p>}

            {!e?.role && !e?.title && !e?.company && !e?.period && !e?.description && (
              <pre className="raw">{JSON.stringify(e, null, 2)}</pre>
            )}
          </article>
        ))}
      </section>


      <section id="education">
        <h2>Utbildning</h2>
        {(data?.education ?? []).map((ed, i) => (
          <article className="card" key={i}>
            <h3>{ed?.degree || ed?.title || "Examen/Kurs"}</h3>
            <p className="muted">
              {ed?.school ?? "Skola"} {ed?.period ? `• ${ed.period}` : ""}
            </p>
            {ed?.description && <p>{ed.description}</p>}
            {!ed?.degree && !ed?.title && !ed?.school && !ed?.period && !ed?.description && (
              <pre className="raw">{JSON.stringify(ed, null, 2)}</pre>
            )}
          </article>
        ))}
      </section>


      <section id="skills">
        <h2>Kompetenser</h2>
        <ul className="tags">
          {(data?.skills ?? []).map((s, i) => (
            <li key={i} className="tag">{s?.name ?? String(s)}</li>
          ))}
        </ul>
      </section>


      <section id="languages">
        <h2>Språk</h2>
        <ul className="list">
          {(data?.languages ?? []).map((l, i) => (
            <li key={i}>{l?.name ?? "Språk"} {l?.level ? `– ${l.level}` : ""}</li>
          ))}
        </ul>
      </section>


      <section id="projects">
        <h2>Projekt</h2>
        {(data?.projects ?? []).map((p, i) => (
          <article className="card" key={i}>
            <h3>{p?.name ?? "Projekt"}</h3>
            {p?.description && <p>{p.description}</p>}
            {p?.link && (
              <p><a href={p.link} target="_blank" rel="noreferrer">Öppna projekt</a></p>
            )}
            {!p?.name && !p?.description && !p?.link && (
              <pre className="raw">{JSON.stringify(p, null, 2)}</pre>
            )}
          </article>
        ))}
      </section>


      <section id="contact">
        <h2>Kontakt</h2>
        <p>Mail: {profile?.email ?? "—"}</p>
        <p>Plats: {profile?.location ?? "—"}</p>
      </section>

      <footer className="footer">
        <a href="#profile">Till toppen ↑</a>
      </footer>
    </>
  );
}