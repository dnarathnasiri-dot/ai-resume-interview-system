import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/auth/me")
      .then(res => setUser(res.data))
      .catch(() => navigate("/"));
  }, [navigate]);

  const logout = async () => {
    await api.post("/api/auth/logout");
    navigate("/");
  };

  {user?.role === "ROLE_ADMIN" && (
  <button style={styles.adminBtn} onClick={() => navigate("/admin")}>
    🛡️ Admin
  </button>
)}

  return (
    <div style={styles.page}>

      {/* Navbar */}
      <nav style={styles.nav}>
        <div style={styles.navLogo}>🎯 AI Resume Pro</div>
        <div style={styles.navRight}>
          {user && (
            <div style={styles.userBadge}>
              <div style={styles.avatar}>{user.name?.charAt(0).toUpperCase()}</div>
              <span style={styles.userName}>{user.name}</span>
            </div>
          )}
          <button style={styles.logoutBtn} onClick={logout}>Logout</button>
        </div>
      </nav>

      {/* Hero Banner with Image */}
      <div style={styles.hero}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Welcome back, <span style={styles.heroName}>{user?.name?.split(" ")[0]} 👋</span>
          </h1>
          <p style={styles.heroSub}>Your AI-powered career assistant is ready. Let's get started!</p>
          <div style={styles.heroStats}>
            <div style={styles.heroBadge}>🚀 AI-Powered</div>
            <div style={styles.heroBadge}>📊 Instant Results</div>
            <div style={styles.heroBadge}>🔒 Secure</div>
          </div>
        </div>
      </div>

      <div style={styles.container}>

        {/* Main Action Cards with Images */}
        <h2 style={styles.sectionTitle}>What would you like to do?</h2>
        <div style={styles.cardsGrid}>

          {/* Resume Card */}
          <div style={styles.card} onClick={() => navigate("/resumes")}>
            <div style={styles.cardImgWrapper}>
              <img
                src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80"
                alt="Resume"
                style={styles.cardImg}
              />
              <div style={styles.cardImgOverlay}>
                <span style={styles.cardImgBadge}>📄 Resume Scoring</span>
              </div>
            </div>
            <div style={styles.cardBody}>
              <h3 style={styles.cardTitle}>My Resumes</h3>
              <p style={styles.cardDesc}>Upload your resume and get an instant AI score out of 100 with detailed improvement feedback.</p>
              <div style={styles.cardFeatures}>
                <span style={styles.feature}>✅ AI Scoring</span>
                <span style={styles.feature}>✅ PDF Support</span>
                <span style={styles.feature}>✅ Instant Feedback</span>
              </div>
              <button style={{ ...styles.cardBtn, background:"linear-gradient(135deg, #667eea, #764ba2)" }}>
                Go to Resumes →
              </button>
            </div>
          </div>

          {/* Interview Card */}
          <div style={styles.card} onClick={() => navigate("/interview")}>
            <div style={styles.cardImgWrapper}>
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80"
                alt="Interview"
                style={styles.cardImg}
              />
              <div style={styles.cardImgOverlay}>
                <span style={styles.cardImgBadge}>🎤 Mock Interview</span>
              </div>
            </div>
            <div style={styles.cardBody}>
              <h3 style={styles.cardTitle}>Mock Interviews</h3>
              <p style={styles.cardDesc}>Practice with AI-generated interview questions and get scored on your answers in real time.</p>
              <div style={styles.cardFeatures}>
                <span style={styles.feature}>✅ AI Questions</span>
                <span style={styles.feature}>✅ Answer Scoring</span>
                <span style={styles.feature}>✅ Export Results</span>
              </div>
              <button style={{ ...styles.cardBtn, background:"linear-gradient(135deg, #f093fb, #f5576c)" }}>
                Start Interview →
              </button>
            </div>
          </div>

        </div>

        {/* How It Works with Images */}
        <h2 style={styles.sectionTitle}>How It Works</h2>
        <div style={styles.stepsGrid}>
          {[
            {
              num:"1", title:"Create Account",
              desc:"Sign up in 30 seconds and access all AI tools for free.",
              img:"https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80",
              color:"#ede9fe"
            },
            {
              num:"2", title:"Upload Resume",
              desc:"Upload your PDF or Word resume to our secure platform.",
              img:"https://images.unsplash.com/photo-1568219656418-15c329312bf1?w=400&q=80",
              color:"#dbeafe"
            },
            {
              num:"3", title:"Get AI Score",
              desc:"Our AI analyzes and scores your resume instantly.",
              img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
              color:"#dcfce7"
            },
            {
              num:"4", title:"Ace Interview",
              desc:"Practice mock interviews and land your dream job.",
              img:"https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80",
              color:"#fef3c7"
            },
          ].map((s, i) => (
            <div key={i} style={{ ...styles.stepCard, background: s.color }}>
              <img src={s.img} alt={s.title} style={styles.stepImg} />
              <div style={styles.stepNum}>{s.num}</div>
              <h3 style={styles.stepTitle}>{s.title}</h3>
              <p style={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Tips with Image */}
        <div style={styles.tipsSection}>
          <div style={styles.tipsLeft}>
            <img
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80"
              alt="Tips"
              style={styles.tipsImg}
            />
          </div>
          <div style={styles.tipsRight}>
            <h2 style={styles.sectionTitle}>💡 Tips to Boost Your Score</h2>
            {[
              { icon:"📝", tip:"Use strong action verbs like 'Led', 'Developed', 'Achieved'" },
              { icon:"🎯", tip:"Tailor your resume to match the job description keywords" },
              { icon:"📊", tip:"Add measurable achievements like 'Increased sales by 30%'" },
              { icon:"🔧", tip:"List your technical skills clearly in a dedicated section" },
              { icon:"🎓", tip:"Include your education, certifications, and courses" },
              { icon:"🌟", tip:"Keep your resume to 1-2 pages for best results" },
            ].map((t, i) => (
              <div key={i} style={styles.tipRow}>
                <span style={styles.tipIcon}>{t.icon}</span>
                <span style={styles.tipText}>{t.tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Banner */}
        <div style={styles.statsBanner}>
          <div style={styles.statsLeft}>
            <h2 style={styles.statsTitle}>Trusted by Job Seekers Worldwide</h2>
            <p style={styles.statsDesc}>Our AI-powered platform helps thousands land their dream jobs every month.</p>
          </div>
          <div style={styles.statsRight}>
            {[
              { num:"500+", label:"Resumes Analyzed" },
              { num:"95%", label:"User Satisfaction" },
              { num:"1000+", label:"Interviews Practiced" },
              { num:"100+", label:"Jobs Landed" },
            ].map((s, i) => (
              <div key={i} style={styles.statItem}>
                <div style={styles.statNum}>{s.num}</div>
                <div style={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials with Avatars */}
        <h2 style={styles.sectionTitle}>What Our Users Say</h2>
        <div style={styles.testimonialsGrid}>
          {[
            {
              name:"Sarah Johnson",
              role:"Software Engineer",
              text:"The AI feedback helped me improve my resume score from 62 to 91! I got 3 interview calls the next week.",
              img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
              score:"91/100"
            },
            {
              name:"Michael Chen",
              role:"Product Manager",
              text:"Mock interviews helped me prepare for tough questions. I felt confident and landed my dream job at a top company.",
              img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
              score:"88/100"
            },
            {
              name:"Priya Patel",
              role:"Data Analyst",
              text:"Amazing tool! The detailed AI feedback showed me exactly what was missing in my resume. Highly recommended!",
              img:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
              score:"94/100"
            },
          ].map((t, i) => (
            <div key={i} style={styles.testimonialCard}>
              <div style={styles.testimonialTop}>
                <img src={t.img} alt={t.name} style={styles.testimonialAvatar} />
                <div>
                  <div style={styles.testimonialName}>{t.name}</div>
                  <div style={styles.testimonialRole}>{t.role}</div>
                </div>
                <div style={styles.testimonialScore}>{t.score}</div>
              </div>
              <p style={styles.testimonialText}>"{t.text}"</p>
              <div style={styles.stars}>⭐⭐⭐⭐⭐</div>
            </div>
          ))}
        </div>

      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerTop}>
          <div style={styles.footerLogo}>🎯 AI Resume Pro</div>
          <p style={styles.footerDesc}>AI-powered tools to help you land your dream job faster.</p>
        </div>
        <div style={styles.footerBottom}>
          <p style={styles.footerText}>© 2026 AI Resume Pro — Built with ❤️ to help you succeed</p>
        </div>
      </footer>

    </div>
  );
}

const styles = {
  page: { fontFamily:"'Segoe UI', sans-serif", background:"#f8f9ff", minHeight:"100vh" },

  nav: { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 40px", background:"white", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", position:"sticky", top:0, zIndex:100 },
  navLogo: { fontSize:"22px", fontWeight:"800", color:"#4f46e5" },
  adminBtn: { padding:"8px 20px", background:"#ede9fe", color:"#6d28d9", border:"none", borderRadius:"8px", cursor:"pointer", fontWeight:"600" },
  navRight: { display:"flex", alignItems:"center", gap:"16px" },
  userBadge: { display:"flex", alignItems:"center", gap:"10px" },
  avatar: { width:"38px", height:"38px", background:"linear-gradient(135deg, #4f46e5, #7c3aed)", color:"white", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"16px", fontWeight:"700" },
  userName: { fontSize:"15px", fontWeight:"600", color:"#333" },
  logoutBtn: { padding:"8px 20px", background:"#fee2e2", color:"#dc2626", border:"none", borderRadius:"8px", cursor:"pointer", fontWeight:"600" },

  hero: { position:"relative", height:"320px", backgroundImage:`url("https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1400&q=80")`, backgroundSize:"cover", backgroundPosition:"center", display:"flex", alignItems:"center", padding:"0 60px" },
  heroOverlay: { position:"absolute", inset:0, background:"rgba(79,70,229,0.75)" },
  heroContent: { position:"relative", zIndex:1 },
  heroTitle: { fontSize:"40px", fontWeight:"800", color:"white", margin:"0 0 10px" },
  heroName: { color:"#c4b5fd" },
  heroSub: { fontSize:"17px", color:"rgba(255,255,255,0.85)", margin:"0 0 20px" },
  heroStats: { display:"flex", gap:"12px" },
  heroBadge: { padding:"8px 16px", background:"rgba(255,255,255,0.15)", color:"white", borderRadius:"20px", fontSize:"13px", fontWeight:"600", border:"1px solid rgba(255,255,255,0.3)" },

  container: { padding:"40px 60px", maxWidth:"1300px", margin:"0 auto" },
  sectionTitle: { fontSize:"24px", fontWeight:"700", color:"#1a1a2e", margin:"0 0 24px" },

  cardsGrid: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:"24px", marginBottom:"48px" },
  card: { background:"white", borderRadius:"20px", overflow:"hidden", boxShadow:"0 4px 24px rgba(0,0,0,0.08)", cursor:"pointer", border:"1px solid #f0f0f0" },
  cardImgWrapper: { position:"relative", height:"200px", overflow:"hidden" },
  cardImg: { width:"100%", height:"100%", objectFit:"cover" },
  cardImgOverlay: { position:"absolute", bottom:0, left:0, right:0, padding:"12px 16px", background:"linear-gradient(transparent, rgba(0,0,0,0.7))" },
  cardImgBadge: { color:"white", fontWeight:"700", fontSize:"16px" },
  cardBody: { padding:"24px" },
  cardTitle: { fontSize:"22px", fontWeight:"700", color:"#1a1a2e", margin:"0 0 10px" },
  cardDesc: { fontSize:"15px", color:"#666", lineHeight:"1.6", margin:"0 0 16px" },
  cardFeatures: { display:"flex", gap:"12px", flexWrap:"wrap", marginBottom:"20px" },
  feature: { fontSize:"13px", color:"#555", fontWeight:"500" },
  cardBtn: { width:"100%", padding:"14px", color:"white", border:"none", borderRadius:"12px", fontSize:"15px", fontWeight:"700", cursor:"pointer" },

  stepsGrid: { display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:"16px", marginBottom:"48px" },
  stepCard: { borderRadius:"16px", overflow:"hidden", padding:"0 0 20px 0" },
  stepImg: { width:"100%", height:"140px", objectFit:"cover", marginBottom:"16px" },
  stepNum: { width:"36px", height:"36px", background:"#4f46e5", color:"white", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"16px", fontWeight:"800", margin:"0 16px 10px" },
  stepTitle: { fontSize:"16px", fontWeight:"700", color:"#1a1a2e", margin:"0 16px 6px" },
  stepDesc: { fontSize:"13px", color:"#666", lineHeight:"1.5", margin:"0 16px" },

  tipsSection: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:"40px", alignItems:"center", marginBottom:"48px", background:"white", borderRadius:"20px", overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,0.06)" },
  tipsLeft: { height:"400px", overflow:"hidden" },
  tipsImg: { width:"100%", height:"100%", objectFit:"cover" },
  tipsRight: { padding:"32px 32px 32px 0" },
  tipRow: { display:"flex", gap:"12px", alignItems:"flex-start", marginBottom:"16px" },
  tipIcon: { fontSize:"22px" },
  tipText: { fontSize:"14px", color:"#555", lineHeight:"1.5" },

  statsBanner: { background:"linear-gradient(135deg, #1a1a2e, #16213e)", borderRadius:"20px", padding:"40px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"40px", marginBottom:"48px", alignItems:"center" },
  statsLeft: {},
  statsTitle: { fontSize:"24px", fontWeight:"700", color:"white", margin:"0 0 12px" },
  statsDesc: { fontSize:"15px", color:"rgba(255,255,255,0.6)", margin:0 },
  statsRight: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:"24px" },
  statItem: { textAlign:"center" },
  statNum: { fontSize:"36px", fontWeight:"800", color:"white" },
  statLabel: { fontSize:"13px", color:"rgba(255,255,255,0.6)", marginTop:"4px" },

  testimonialsGrid: { display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"20px", marginBottom:"48px" },
  testimonialCard: { background:"white", borderRadius:"16px", padding:"24px", boxShadow:"0 4px 16px rgba(0,0,0,0.06)", border:"1px solid #f0f0f0" },
  testimonialTop: { display:"flex", alignItems:"center", gap:"12px", marginBottom:"16px" },
  testimonialAvatar: { width:"48px", height:"48px", borderRadius:"50%", objectFit:"cover" },
  testimonialName: { fontSize:"15px", fontWeight:"700", color:"#1a1a2e" },
  testimonialRole: { fontSize:"13px", color:"#888" },
  testimonialScore: { marginLeft:"auto", padding:"4px 12px", background:"#dcfce7", color:"#16a34a", borderRadius:"20px", fontSize:"13px", fontWeight:"700" },
  testimonialText: { fontSize:"14px", color:"#555", lineHeight:"1.6", margin:"0 0 12px", fontStyle:"italic" },
  stars: { fontSize:"14px" },

  footer: { background:"#1a1a2e", color:"white" },
  footerTop: { padding:"40px 60px", borderBottom:"1px solid rgba(255,255,255,0.1)" },
  footerLogo: { fontSize:"22px", fontWeight:"800", marginBottom:"8px" },
  footerDesc: { fontSize:"14px", color:"rgba(255,255,255,0.6)", margin:0 },
  footerBottom: { padding:"20px 60px", textAlign:"center" },
  footerText: { fontSize:"13px", color:"rgba(255,255,255,0.4)", margin:0 },
};