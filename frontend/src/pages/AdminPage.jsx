import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdminPage() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [activeTab, setActiveTab] = useState("stats");
  const navigate = useNavigate();

  useEffect(() => {
    loadStats();
    loadUsers();
    loadResumes();
  }, []);

  const loadStats = async () => {
    try {
      const res = await api.get("/api/admin/stats");
      setStats(res.data);
    } catch { navigate("/"); }
  };

  const loadUsers = async () => {
    try {
      const res = await api.get("/api/admin/users");
      setUsers(res.data);
    } catch {}
  };

  const loadResumes = async () => {
    try {
      const res = await api.get("/api/admin/resumes");
      setResumes(res.data);
    } catch {}
  };

  const deleteUser = async (id) => {
    if (window.confirm("Delete this user?")) {
      await api.delete(`/api/admin/users/${id}`);
      loadUsers();
    }
  };

  return (
    <div style={styles.page}>

      {/* Header */}
      <nav style={styles.nav}>
        <div style={styles.navLogo}>🛡️ Admin Panel</div>
        <button style={styles.backBtn} onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
      </nav>

      {/* Stats Cards */}
      {stats && (
        <div style={styles.statsGrid}>
          <div style={{ ...styles.statCard, background:"linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
            <div style={styles.statNum}>{stats.totalUsers}</div>
            <div style={styles.statLabel}>Total Users</div>
          </div>
          <div style={{ ...styles.statCard, background:"linear-gradient(135deg, #059669, #10b981)" }}>
            <div style={styles.statNum}>{stats.totalResumes}</div>
            <div style={styles.statLabel}>Total Resumes</div>
          </div>
          <div style={{ ...styles.statCard, background:"linear-gradient(135deg, #dc2626, #ef4444)" }}>
            <div style={styles.statNum}>{stats.totalSessions}</div>
            <div style={styles.statLabel}>Total Interviews</div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={styles.tabs}>
        <button style={{ ...styles.tab, ...(activeTab === "users" ? styles.activeTab : {}) }}
          onClick={() => setActiveTab("users")}>👥 Users ({users.length})</button>
        <button style={{ ...styles.tab, ...(activeTab === "resumes" ? styles.activeTab : {}) }}
          onClick={() => setActiveTab("resumes")}>📄 Resumes ({resumes.length})</button>
      </div>

      {/* Users Table */}
      {activeTab === "users" && (
        <div style={styles.tableCard}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHead}>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} style={styles.tr}>
                  <td style={styles.td}>{u.id}</td>
                  <td style={styles.td}><strong>{u.name}</strong></td>
                  <td style={styles.td}>{u.email}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.badge,
                      background: u.role === "ROLE_ADMIN" ? "#ede9fe" : "#dbeafe",
                      color: u.role === "ROLE_ADMIN" ? "#6d28d9" : "#1d4ed8"
                    }}>{u.role}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={{ ...styles.badge,
                      background: u.enabled ? "#dcfce7" : "#fee2e2",
                      color: u.enabled ? "#16a34a" : "#dc2626"
                    }}>{u.enabled ? "Active" : "Pending"}</span>
                  </td>
                  <td style={styles.td}>
                    <button style={styles.deleteBtn} onClick={() => deleteUser(u.id)}>
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Resumes Table */}
      {activeTab === "resumes" && (
        <div style={styles.tableCard}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHead}>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>User</th>
                <th style={styles.th}>Score</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {resumes.map(r => (
                <tr key={r.id} style={styles.tr}>
                  <td style={styles.td}>{r.id}</td>
                  <td style={styles.td}><strong>{r.title || "Untitled"}</strong></td>
                  <td style={styles.td}>{r.user?.name}</td>
                  <td style={styles.td}>
                    <span style={{
                      fontWeight:"700",
                      color: r.aiScore >= 80 ? "#16a34a" : r.aiScore >= 60 ? "#d97706" : "#dc2626"
                    }}>{r.aiScore}/100</span>
                  </td>
                  <td style={styles.td}>
                    <span style={{ ...styles.badge,
                      background: r.status === "ANALYZED" ? "#dcfce7" : "#fee2e2",
                      color: r.status === "ANALYZED" ? "#16a34a" : "#dc2626"
                    }}>{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}

const styles = {
  page: { fontFamily:"'Segoe UI', sans-serif", background:"#f8f9ff", minHeight:"100vh" },
  nav: { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 40px", background:"white", boxShadow:"0 2px 12px rgba(0,0,0,0.06)" },
  navLogo: { fontSize:"22px", fontWeight:"800", color:"#4f46e5" },
  backBtn: { padding:"8px 20px", background:"#ede9fe", color:"#6d28d9", border:"none", borderRadius:"8px", cursor:"pointer", fontWeight:"600" },
  statsGrid: { display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"20px", padding:"32px 40px" },
  statCard: { borderRadius:"16px", padding:"28px", textAlign:"center", color:"white" },
  statNum: { fontSize:"48px", fontWeight:"800", marginBottom:"8px" },
  statLabel: { fontSize:"16px", opacity:0.9 },
  tabs: { display:"flex", gap:"12px", padding:"0 40px 20px" },
  tab: { padding:"10px 24px", border:"1.5px solid #e5e7eb", borderRadius:"10px", cursor:"pointer", background:"white", fontSize:"15px", fontWeight:"600", color:"#555" },
  activeTab: { background:"#4f46e5", color:"white", border:"1.5px solid #4f46e5" },
  tableCard: { margin:"0 40px", background:"white", borderRadius:"16px", overflow:"hidden", boxShadow:"0 2px 12px rgba(0,0,0,0.06)" },
  table: { width:"100%", borderCollapse:"collapse" },
  tableHead: { background:"#f8fafc" },
  th: { padding:"16px 20px", textAlign:"left", fontSize:"13px", fontWeight:"700", color:"#6b7280", textTransform:"uppercase" },
  tr: { borderBottom:"1px solid #f3f4f6" },
  td: { padding:"16px 20px", fontSize:"14px", color:"#374151" },
  badge: { padding:"4px 12px", borderRadius:"20px", fontSize:"12px", fontWeight:"600" },
  deleteBtn: { padding:"6px 14px", background:"#fee2e2", color:"#dc2626", border:"none", borderRadius:"8px", cursor:"pointer", fontWeight:"600" }
};