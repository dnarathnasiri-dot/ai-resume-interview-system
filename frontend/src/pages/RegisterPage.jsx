import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/register", form);
      setMessage("Registered! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        {message && <p style={styles.msg}>{message}</p>}
        <input style={styles.input} name="name" placeholder="Full Name"
          value={form.name} onChange={handleChange} />
        <input style={styles.input} name="email" type="email" placeholder="Email"
          value={form.email} onChange={handleChange} />
        <input style={styles.input} name="password" type="password" placeholder="Password"
          value={form.password} onChange={handleChange} />
        <button style={styles.button} onClick={handleSubmit}>Register</button>
        <p style={styles.link}>Have account? <Link to="/login">Login</Link></p>
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
  msg: { color:"green", textAlign:"center", marginBottom:"12px" },
  link: { textAlign:"center", marginTop:"16px", fontSize:"14px" }
};