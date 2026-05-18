import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function InterviewPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const start = async () => {
    try {
      const res = await api.post("/api/interviews", { title });
      setMessage("Session started! ID: " + res.data.id);
    } catch { setMessage("Failed to start session"); }
  };

  return (
    <div style={styles.container}>
      <button style={styles.back} onClick={() => navigate("/dashboard")}>← Back</button>
      <h2>🎤 Mock Interview</h2>
      {message && <p style={styles.msg}>{message}</p>}
      <div style={styles.card}>
        <h3>Start New Session</h3>
        <input style={styles.input} placeholder="e.g. React Developer Interview"
          value={title} onChange={e => setTitle(e.target.value)} />
        <button style={styles.btn} onClick={start}>Start Interview</button>
      </div>
    </div>
  );
}

const styles = {
  container: { padding:"32px", background:"#f0f2f5", minHeight:"100vh" },
  card: { background:"white", padding:"32px", borderRadius:"12px", maxWidth:"500px" },
  input: { width:"100%", padding:"12px", marginBottom:"16px", borderRadius:"8px", border:"1px solid #ddd", boxSizing:"border-box", fontSize:"14px" },
  btn: { padding:"12px 24px", background:"#4f46e5", color:"white", border:"none", borderRadius:"8px", cursor:"pointer", fontSize:"16px" },
  back: { marginBottom:"16px", background:"none", border:"none", cursor:"pointer", color:"#4f46e5", fontSize:"16px" },
  msg: { color:"green", marginBottom:"16px" }
};