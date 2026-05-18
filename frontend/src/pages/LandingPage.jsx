import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function LandingPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/auth/login", form);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
    }
    setLoading(false);
  };

  return (
    <div style={styles.page}>

      {/* Navbar */}
      <nav style={styles.nav}>
        <div style={styles.navLogo}>🎯 AI Resume Pro</div>
        <div style={styles.navLinks}>
          <a href="#features" style={styles.navLink}>Features</a>
          <a href="#how" style={styles.navLink}>How It Works</a>
          <Link to="/register" style={styles.navBtn}>Sign Up Free</Link>
        </div>
        <button style={styles.menuBtn} onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          <a href="#features" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#how" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>How It Works</a>
          <Link to="/register" style={styles.mobileLinkBtn} onClick={() => setMenuOpen(false)}>Sign Up Free</Link>
        </div>
      )}

      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroLeft}>
          <div style={styles.badge}>✨ AI-Powered Career Tool</div>
          <h1 style={styles.heroTitle}>
            Land Your Dream Job with
            <span style={styles.heroHighlight}> AI Resume Scoring</span>
          </h1>
          <p style={styles.heroDesc}>
            Upload your resume, get instant AI feedback, and practice mock interviews.
          </p>
          <div style={styles.statsRow}>
            <div style={styles.stat}>
              <div style={styles.statNum}>500+</div>
              <div style={styles.statLabel}>Resumes Scored</div>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.stat}>
              <div style={styles.statNum}>95%</div>
              <div style={styles.statLabel}>Success Rate</div>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.stat}>
              <div style={styles.statNum}>100+</div>
              <div style={styles.statLabel}>Happy Users</div>
            </div>
          </div>
          <div style={styles.pills}>
            <span style={styles.pill}>📄 Resume Scoring</span>
            <span style={styles.pill}>🎤 Mock Interviews</span>
            <span style={styles.pill}>📊 AI Feedback</span>
          </div>
        </div>

        {/* Login Form */}
        <div style={styles.heroRight}>
          <div style={styles.loginCard}>
            <div style={styles.loginHeader}>
              <div style={styles.loginIcon}>🎯</div>
              <h2 style={styles.loginTitle}>Welcome Back</h2>
              <p style={styles.loginSub}>Sign in to your account</p>
            </div>
            {error && <div style={styles.errorBox}>{error}</div>}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input style={styles.input} name="email" type="email"
                placeholder="you@example.com" value={form.email} onChange={handleChange} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input style={styles.input} name="password" type="password"
                placeholder="Enter your password" value={form.password} onChange={handleChange} />
            </div>
            <button style={{ ...styles.loginBtn, opacity: loading ? 0.8 : 1 }}
              onClick={handleSubmit} disabled={loading}>
              {loading ? "Signing in..." : "Sign In →"}
            </button>
            <div style={styles.divider}>
              <span style={styles.dividerLine} />
              <span style={styles.dividerText}>or</span>
              <span style={styles.dividerLine} />
            </div>
            <Link to="/register" style={styles.registerBtn}>Create Free Account</Link>
            <p style={styles.terms}>By signing in, you agree to our Terms of Service</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div id="features" style={styles.section}>
        <h2 style={styles.sectionTitle}>Everything You Need to Get Hired</h2>
        <p style={styles.sectionSub}>Powerful AI tools to supercharge your job search</p>
        <div style={styles.featuresGrid}>
          {[
            { icon:"📄", title:"AI Resume Scoring", desc:"Get an instant score out of 100 with detailed improvement tips.", color:"#ede9fe", border:"#c4b5fd" },
            { icon:"🎤", title:"Mock Interviews", desc:"Practice with AI-generated questions tailored to your field.", color:"#dbeafe", border:"#93c5fd" },
            { icon:"📊", title:"Detailed Feedback", desc:"Actionable feedback on every section of your resume.", color:"#dcfce7", border:"#86efac" },
            { icon:"📥", title:"Export Reports", desc:"Download your results as PDF or CSV reports.", color:"#fef3c7", border:"#fcd34d" },
            { icon:"🔒", title:"Secure & Private", desc:"Your data is protected with enterprise-grade security.", color:"#fee2e2", border:"#fca5a5" },
            { icon:"⚡", title:"Instant Results", desc:"Get your resume scored in seconds, not hours.", color:"#f0fdf4", border:"#86efac" },
          ].map((f, i) => (
            <div key={i} style={{ ...styles.featureCard, background: f.color, border: `1px solid ${f.border}` }}>
              <div style={styles.featureIcon}>{f.icon}</div>
              <h3 style={styles.featureTitle}>{f.title}</h3>
              <p style={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div id="how" style={{ ...styles.section, background:"#f8faff" }}>
        <h2 style={styles.sectionTitle}>How It Works</h2>
        <p style={styles.sectionSub}>Get started in 4 simple steps</p>
        <div style={styles.stepsGrid}>
          {[
            { num:"1", icon:"✍️", title:"Create Account", desc:"Sign up for free in 30 seconds." },
            { num:"2", icon:"📤", title:"Upload Resume", desc:"Upload your PDF or Word resume." },
            { num:"3", icon:"🤖", title:"Get AI Score", desc:"AI analyzes and scores your resume." },
            { num:"4", icon:"🏆", title:"Ace Interview", desc:"Practice and land your dream job." },
          ].map((s, i) => (
            <div key={i} style={styles.stepCard}>
              <div style={styles.stepNum}>{s.num}</div>
              <div style={styles.stepIcon}>{s.icon}</div>
              <h3 style={styles.stepTitle}>{s.title}</h3>
              <p style={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={styles.cta}>
        <h2 style={styles.ctaTitle}>Ready to Land Your Dream Job?</h2>
        <p style={styles.ctaDesc}>Join hundreds of job seekers already using AI Resume Pro</p>
        <Link to="/register" style={styles.ctaBtn}>Get Started for Free →</Link>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerLogo}>🎯 AI Resume Pro</div>
        <p style={styles.footerText}>© 2026 AI Resume Pro. All rights reserved.</p>
      </footer>
    </div>
  );
}

const isMobile = window.innerWidth <= 768;

const styles = {
  page: { fontFamily:"'Segoe UI', sans-serif", background:"white" },

  nav: { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 40px", background:"white", borderBottom:"1px solid #f0f0f0", position:"sticky", top:0, zIndex:100 },
  navLogo: { fontSize:"20px", fontWeight:"800", color:"#4f46e5" },
  navLinks: { display: isMobile ? "none" : "flex", alignItems:"center", gap:"32px" },
  navLink: { textDecoration:"none", color:"#555", fontSize:"15px" },
  navBtn: { textDecoration:"none", padding:"10px 24px", background:"#4f46e5", color:"white", borderRadius:"10px", fontSize:"14px", fontWeight:"600" },
  menuBtn: { display: isMobile ? "block" : "none", background:"none", border:"none", fontSize:"24px", cursor:"pointer" },

  mobileMenu: { background:"white", padding:"16px 24px", borderBottom:"1px solid #f0f0f0", display:"flex", flexDirection:"column", gap:"12px" },
  mobileLink: { textDecoration:"none", color:"#555", fontSize:"16px", padding:"8px 0" },
  mobileLinkBtn: { textDecoration:"none", padding:"12px 24px", background:"#4f46e5", color:"white", borderRadius:"10px", fontSize:"15px", fontWeight:"600", textAlign:"center" },

  hero: { display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:"40px", padding: isMobile ? "32px 20px" : "80px 60px", alignItems:"center", background:"linear-gradient(135deg, #fafafe 0%, #f0f0ff 100%)" },

  heroLeft: {},
  badge: { display:"inline-block", padding:"6px 16px", background:"#ede9fe", color:"#6d28d9", borderRadius:"20px", fontSize:"13px", fontWeight:"600", marginBottom:"20px" },
  heroTitle: { fontSize: isMobile ? "28px" : "40px", fontWeight:"800", color:"#1a1a2e", lineHeight:"1.2", margin:"0 0 16px" },
  heroHighlight: { color:"#4f46e5" },
  heroDesc: { fontSize:"16px", color:"#555", lineHeight:"1.7", margin:"0 0 24px" },

  statsRow: { display:"flex", alignItems:"center", gap:"20px", marginBottom:"24px", flexWrap:"wrap" },
  stat: { textAlign:"center" },
  statNum: { fontSize:"24px", fontWeight:"800", color:"#4f46e5" },
  statLabel: { fontSize:"12px", color:"#888" },
  statDivider: { width:"1px", height:"32px", background:"#e0e0e0" },

  pills: { display:"flex", gap:"8px", flexWrap:"wrap" },
  pill: { padding:"6px 14px", background:"white", border:"1px solid #e0e0e0", borderRadius:"20px", fontSize:"12px", color:"#555" },

  heroRight: { display:"flex", justifyContent:"center" },
  loginCard: { background:"white", borderRadius:"24px", padding: isMobile ? "28px 20px" : "40px", width:"100%", maxWidth:"420px", boxShadow:"0 20px 60px rgba(79,70,229,0.15)" },
  loginHeader: { textAlign:"center", marginBottom:"24px" },
  loginIcon: { fontSize:"36px", marginBottom:"8px" },
  loginTitle: { fontSize:"22px", fontWeight:"800", color:"#1a1a2e", margin:"0 0 4px" },
  loginSub: { fontSize:"14px", color:"#888", margin:0 },

  errorBox: { background:"#fee2e2", color:"#dc2626", padding:"10px 14px", borderRadius:"8px", marginBottom:"14px", fontSize:"14px" },
  inputGroup: { marginBottom:"14px" },
  label: { display:"block", fontSize:"13px", fontWeight:"600", color:"#444", marginBottom:"5px" },
  input: { width:"100%", padding:"12px 14px", borderRadius:"10px", border:"1.5px solid #e5e7eb", fontSize:"14px", boxSizing:"border-box" },
  loginBtn: { width:"100%", padding:"14px", background:"linear-gradient(135deg, #4f46e5, #7c3aed)", color:"white", border:"none", borderRadius:"12px", fontSize:"15px", fontWeight:"700", cursor:"pointer", marginBottom:"14px" },
  divider: { display:"flex", alignItems:"center", gap:"10px", marginBottom:"14px" },
  dividerLine: { flex:1, height:"1px", background:"#e5e7eb" },
  dividerText: { fontSize:"13px", color:"#aaa" },
  registerBtn: { display:"block", textAlign:"center", padding:"12px", background:"#f8f8ff", color:"#4f46e5", border:"1.5px solid #c4b5fd", borderRadius:"12px", fontSize:"14px", fontWeight:"600", textDecoration:"none", marginBottom:"12px" },
  terms: { textAlign:"center", fontSize:"11px", color:"#aaa", margin:0 },

  section: { padding: isMobile ? "48px 20px" : "80px 60px" },
  sectionTitle: { textAlign:"center", fontSize: isMobile ? "26px" : "34px", fontWeight:"800", color:"#1a1a2e", margin:"0 0 10px" },
  sectionSub: { textAlign:"center", fontSize:"15px", color:"#888", margin:"0 0 40px" },

  featuresGrid: { display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap:"16px" },
  featureCard: { padding:"24px", borderRadius:"16px" },
  featureIcon: { fontSize:"32px", marginBottom:"10px" },
  featureTitle: { fontSize:"16px", fontWeight:"700", color:"#1a1a2e", margin:"0 0 6px" },
  featureDesc: { fontSize:"14px", color:"#555", lineHeight:"1.6", margin:0 },

  stepsGrid: { display:"grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap:"16px" },
  stepCard: { background:"white", borderRadius:"16px", padding:"20px", textAlign:"center", boxShadow:"0 2px 12px rgba(0,0,0,0.06)" },
  stepNum: { width:"40px", height:"40px", background:"#4f46e5", color:"white", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px", fontWeight:"800", margin:"0 auto 10px" },
  stepIcon: { fontSize:"28px", marginBottom:"8px" },
  stepTitle: { fontSize:"15px", fontWeight:"700", color:"#1a1a2e", margin:"0 0 6px" },
  stepDesc: { fontSize:"13px", color:"#888", lineHeight:"1.5", margin:0 },

  cta: { padding: isMobile ? "48px 20px" : "80px 60px", background:"linear-gradient(135deg, #4f46e5, #7c3aed)", textAlign:"center" },
  ctaTitle: { fontSize: isMobile ? "26px" : "34px", fontWeight:"800", color:"white", margin:"0 0 10px" },
  ctaDesc: { fontSize:"15px", color:"rgba(255,255,255,0.85)", margin:"0 0 28px" },
  ctaBtn: { display:"inline-block", padding:"14px 36px", background:"white", color:"#4f46e5", borderRadius:"12px", fontSize:"16px", fontWeight:"700", textDecoration:"none" },

  footer: { padding:"24px 40px", background:"#1a1a2e", textAlign:"center" },
  footerLogo: { fontSize:"18px", fontWeight:"800", color:"white", marginBottom:"6px" },
  footerText: { fontSize:"12px", color:"#888", margin:0 },
};