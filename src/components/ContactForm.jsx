import { useState } from "react";
import "./ContactForm.css";

const API_BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");
const CONTACT_URL = `${API_BASE}/api/contact`;

export default function ContactForm() {
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setSending(true); setOk(false); setErr("");

    const fd = new FormData(e.currentTarget);
    const body = {
      firstName: fd.get("firstName"),
      lastName:  fd.get("lastName"),
      email:     fd.get("email"),
      title:     fd.get("title"),
      message:   fd.get("message"),
    };

    try {
      const res = await fetch(CONTACT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const text = await res.text();
      if (!res.ok) throw new Error(`HTTP ${res.status} - ${text}`);
      setOk(true);
      e.currentTarget.reset();
    } catch (e) {
      setErr(String(e.message || e));
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="contact-form">
      <div className="field">
        <label htmlFor="firstName">First name</label>
        <input id="firstName" name="firstName" required />
      </div>

      <div className="field">
        <label htmlFor="lastName">Last name</label>
        <input id="lastName" name="lastName" required />
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />
      </div>

      <div className="field">
        <label htmlFor="title">Subject</label>
        <input id="title" name="title" required />
      </div>

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={6} minLength={10} required />
      </div>

      <button type="submit" disabled={sending}>
        {sending ? "Sending…" : "Send"}
      </button>

      {ok  && <p className="notice ok">Tack! Ditt meddelande är skickat.</p>}
      {err && <p className="notice err">{err}</p>}
    </form>
  );
}