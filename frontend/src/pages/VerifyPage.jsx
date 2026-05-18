import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";

export default function VerifyPage() {
  const [status, setStatus] = useState("verifying");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      api.get(`/api/auth/verify?token=${token}`)
        .then(() => {
          setStatus("success");
          setTimeout(() => navigate("/"), 3000);
        })
        .catch(() => setStatus("error"));
    }
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {status === "verifying" && (
          <>
            <div style={styles.icon}>⏳</div>
            <h2 style={styles.title}>Verifying your email...</h2>
            <p style={styles.desc}>Please wait a moment.</p>
          </>
        )}
        {status === "success" && (
          <>
            <div style={styles.icon}>✅</div>
            <h2 style={{ ...styles.title, color:"#16a34a" }}>Email Verified!</h2>
            <p style={styles.desc}>Your account is now active. Redirecting to login in 3 seconds...</p>
          </>
        )}
        {status === "error" && (
          <>
            <div style={styles.icon}>❌</div>
            <h2 style={{ ...styles.title, color:"#dc2626" }}>Verification Failed</h2>
            <p style={styles.desc}>Invalid or expired token. Please register again.</p>
            <button style={styles.btn} onClick={() => navigate("/")}>Go Home</button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { display:"flex", justifyContent:"center", alignItems:"center", height:"100vh", background:"#f8f9ff", fontFamily:"'Segoe UI', sans-serif" },
  card: { background:"white", borderRadius:"20px", padding:"48px", textAlign:"center", boxShadow:"0 8px 32px rgba(0,0,0,0.1)", maxWidth:"400px", width:"90%" },
  icon: { fontSize:"64px", marginBottom:"16px" },
  title: { fontSize:"24px", fontWeight:"700", color:"#1a1a2e", margin:"0 0 12px" },
  desc: { fontSize:"15px", color:"#888", margin:"0 0 24px" },
  btn: { padding:"12px 32px", background:"#4f46e5", color:"white", border:"none", borderRadius:"10px", cursor:"pointer", fontSize:"15px", fontWeight:"600" }
};