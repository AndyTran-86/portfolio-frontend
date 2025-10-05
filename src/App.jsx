import "./App.css";
import ContactForm from "./components/ContactForm.jsx";

export default function App() {
  return (
    <>
      <header style={{ padding: 16 }}>
        <h1>Portfolio</h1>
        <p className="muted">Hotfixes, CV skapandet kommer sen igen</p>
      </header>

      <main style={{ padding: 16 }}>
        <section id="contact">
          <h2>Kontakt</h2>
          <ContactForm />
        </section>
      </main>

      <footer style={{ padding: 16 }}>
        <a href="#contact">Till kontakt ↑</a>
      </footer>
    </>
  );
}