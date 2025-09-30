import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    const url = `${API_URL}`; // eller `${API_URL}/profile` om du vill börja litet
    console.log("Hämtar:", url);
    fetch(url, { headers: { Accept: "application/json" } })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch(e => setErr(e.message));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Min portfolio</h1>
      {err && <p style={{color:'crimson'}}>Error: {err}</p>}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}