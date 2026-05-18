import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/login", form);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sign In</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input style={styles.input} name="email" type="email"
          placeholder="Email" value={form.email} onChange={handleChange} />
        <input style={styles.input} name="password" type="password"
          placeholder="Password" value={form.password} onChange={handleChange} />
        <button style={styles.button} onClick={handleSubmit}>Login</button>
        <p style={styles.link}>No account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}

const styles = {
  container: { display:"flex", justifyContent:"center", alignItems:"center", height:"100vh", background:"#f0f2f5" },
  card: { background:"white", padding:"40px", borderRadius:"12px", width:"360px", boxShadow:"0 4px 20px rgba(0,0,0,0.1)" },
  title: { textAlign:"center", marginBottom:"24px", color:"#333" },
  input: { width:"100%", padding:"12px", marginBottom:"16px", borderRadius:"8px", border:"1px solid #ddd", boxSizing:"border-box", fontSize:"14px" },
  button: { width:"100%", padding:"12px", background:"#4f46e5", color:"white", border:"none", borderRadius:"8px", cursor:"pointer", fontSize:"16px" },
  error: { color:"red", textAlign:"center", marginBottom:"12px" },
  link: { textAlign:"center", marginTop:"16px", fontSize:"14px" }
};