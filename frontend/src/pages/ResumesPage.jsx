import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ResumesPage() {
  const [resumes, setResumes] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotal] = useState(0);
  const [selectedResume, setSelectedResume] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const load = async () => {
    try {
      const res = await api.get("/api/resumes", { params: { page, size: 10 } });
      setResumes(res.data.data.content);
      setTotal(res.data.data.totalPages);
    } catch { navigate("/login"); }
  };

  useEffect(() => { load(); }, [page]);

  const upload = async () => {
    if (!title || !file) {
      alert("Please enter a title and choose a file!");
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("file", file);
      await api.post("/api/resumes", fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setTitle("");
      setFile(null);
      document.getElementById("fileInput").value = "";
      await load();
    } catch (e) {
      alert("Upload failed!");
    }
    setUploading(false);
  };

  const del = async (id) => {
    if (window.confirm("Delete this resume?")) {
      await api.delete(`/api/resumes/${id}`);
      load();
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "#16a34a";
    if (score >= 60) return "#d97706";
    return "#dc2626";
  };

  const getScoreBg = (score) => {
    if (score >= 80) return "#dcfce7";
    if (score >= 60) return "#fef3c7";
    return "#fee2e2";
  };

  const getStatusStyle = (status) => {
    const base = { padding:"4px 12px", borderRadius:"20px", fontSize:"12px", fontWeight:"600" };
    if (status === "ANALYZED") return { ...base, background:"#dcfce7", color:"#16a34a" };
    if (status === "FAILED")   return { ...base, background:"#fee2e2", color:"#dc2626" };
    return { ...base, background:"#fef3c7", color:"#d97706" };
  };

  return (
    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <button style={styles.backBtn} onClick={() => navigate("/dashboard")}>← Back</button>
          <h2 style={styles.pageTitle}>📄 My Resumes</h2>
        </div>
      </div>

      {/* Upload Card */}
      <div style={styles.uploadCard}>
        <h3 style={styles.cardTitle}>Upload New Resume</h3>
        <div style={styles.uploadRow}>
          <input
            style={styles.textInput}
            placeholder="Resume title (e.g. Software Engineer Resume)"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <label style={styles.fileLabel}>
            📎 {file ? file.name : "Choose File"}
            <input
              id="fileInput"
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              style={{ display:"none" }}
              onChange={e => setFile(e.target.files[0])}
            />
          </label>
          <button
            style={{ ...styles.uploadBtn, opacity: uploading ? 0.7 : 1 }}
            onClick={upload}
            disabled={uploading}
          >
            {uploading ? "⏳ Analyzing..." : "🚀 Upload & Score"}
          </button>
        </div>
        {uploading && (
          <p style={styles.analyzingText}>
            🤖 AI is analyzing your resume... please wait
          </p>
        )}
      </div>

      {/* Resumes Table */}
      <div style={styles.tableCard}>
        {resumes.length === 0 ? (
          <div style={styles.empty}>
            <p style={{ fontSize:"48px" }}>📋</p>
            <p>No resumes yet. Upload your first resume above!</p>
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHead}>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>AI Score</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Feedback</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {resumes.map((r, i) => (
                <tr key={r.id} style={{
                  ...styles.tr,
                  background: i % 2 === 0 ? "white" : "#f9fafb"
                }}>
                  <td style={styles.td}>
                    <strong>{r.title || "Untitled"}</strong>
                    <br />
                    <span style={{ fontSize:"12px", color:"#888" }}>{r.fileName}</span>
                  </td>
                  <td style={styles.td}>
                    <div style={{
                      display:"inline-block",
                      padding:"6px 16px",
                      borderRadius:"20px",
                      background: getScoreBg(r.aiScore),
                      color: getScoreColor(r.aiScore),
                      fontWeight:"700",
                      fontSize:"16px"
                    }}>
                      {r.aiScore}/100
                    </div>
                  </td>
                  <td style={styles.td}>
                    <span style={getStatusStyle(r.status)}>{r.status}</span>
                  </td>
                  <td style={styles.td}>
                    <button
                      style={styles.feedbackBtn}
                      onClick={() => setSelectedResume(r)}
                    >
                      👁 View Feedback
                    </button>
                  </td>
                  <td style={styles.td}>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => del(r.id)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setPage(i)} style={{
              ...styles.pageBtn,
              background: i === page ? "#4f46e5" : "white",
              color: i === page ? "white" : "#333"
            }}>{i + 1}</button>
          ))}
        </div>
      )}

      {/* Feedback Modal */}
      {selectedResume && (
        <div style={styles.modalOverlay} onClick={() => setSelectedResume(null)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={{ margin:0 }}>🤖 AI Feedback</h3>
              <button style={styles.closeBtn} onClick={() => setSelectedResume(null)}>✕</button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.scoreCircle}>
                <div style={{
                  ...styles.scoreNumber,
                  color: getScoreColor(selectedResume.aiScore)
                }}>
                  {selectedResume.aiScore}
                </div>
                <div style={styles.scoreLabel}>out of 100</div>
              </div>

              <h4 style={{ color:"#333", marginBottom:"8px" }}>
                📝 {selectedResume.title}
              </h4>

              <div style={styles.feedbackBox}>
                {selectedResume.aiFeedback
                  ? selectedResume.aiFeedback.split('\n').map((line, i) => (
                      <p key={i} style={{ margin:"4px 0" }}>{line}</p>
                    ))
                  : <p>No feedback available.</p>
                }
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.closeModalBtn} onClick={() => setSelectedResume(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { padding:"32px", background:"#f0f2f5", minHeight:"100vh", fontFamily:"'Segoe UI', sans-serif" },
  header: { display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"24px" },
  headerLeft: { display:"flex", alignItems:"center", gap:"16px" },
  backBtn: { background:"none", border:"none", cursor:"pointer", color:"#4f46e5", fontSize:"16px", fontWeight:"600" },
  pageTitle: { margin:0, color:"#1f2937", fontSize:"28px" },

  uploadCard: { background:"white", borderRadius:"16px", padding:"28px", marginBottom:"24px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)" },
  cardTitle: { margin:"0 0 20px 0", color:"#1f2937", fontSize:"18px" },
  uploadRow: { display:"flex", gap:"12px", alignItems:"center", flexWrap:"wrap" },
  textInput: { flex:1, minWidth:"200px", padding:"12px 16px", borderRadius:"10px", border:"1.5px solid #e5e7eb", fontSize:"14px", outline:"none" },
  fileLabel: { padding:"12px 20px", background:"#f3f4f6", borderRadius:"10px", cursor:"pointer", fontSize:"14px", border:"1.5px dashed #d1d5db", whiteSpace:"nowrap" },
  uploadBtn: { padding:"12px 24px", background:"linear-gradient(135deg, #4f46e5, #7c3aed)", color:"white", border:"none", borderRadius:"10px", cursor:"pointer", fontSize:"15px", fontWeight:"600", whiteSpace:"nowrap" },
  analyzingText: { marginTop:"12px", color:"#6366f1", fontStyle:"italic" },

  tableCard: { background:"white", borderRadius:"16px", overflow:"hidden", boxShadow:"0 2px 12px rgba(0,0,0,0.06)" },
  table: { width:"100%", borderCollapse:"collapse" },
  tableHead: { background:"#f8fafc" },
  th: { padding:"16px 20px", textAlign:"left", fontSize:"13px", fontWeight:"700", color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.5px" },
  tr: { borderBottom:"1px solid #f3f4f6" },
  td: { padding:"16px 20px", fontSize:"14px", color:"#374151", verticalAlign:"middle" },
  feedbackBtn: { padding:"8px 16px", background:"#ede9fe", color:"#6d28d9", border:"none", borderRadius:"8px", cursor:"pointer", fontWeight:"600", fontSize:"13px" },
  deleteBtn: { padding:"8px 16px", background:"#fee2e2", color:"#dc2626", border:"none", borderRadius:"8px", cursor:"pointer", fontWeight:"600", fontSize:"13px" },
  empty: { textAlign:"center", padding:"60px", color:"#9ca3af" },
  pagination: { display:"flex", gap:"8px", marginTop:"20px", justifyContent:"center" },
  pageBtn: { padding:"8px 16px", border:"1px solid #e5e7eb", borderRadius:"8px", cursor:"pointer", fontWeight:"600" },
  modalOverlay: { position:"fixed", top:0, left:0, right:0, bottom:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000 },
  modal: { background:"white", borderRadius:"20px", width:"90%", maxWidth:"540px", boxShadow:"0 20px 60px rgba(0,0,0,0.3)", overflow:"hidden" },
  modalHeader: { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"20px 24px", borderBottom:"1px solid #f3f4f6", background:"linear-gradient(135deg, #4f46e5, #7c3aed)", color:"white" },
  closeBtn: { background:"rgba(255,255,255,0.2)", border:"none", color:"white", width:"32px", height:"32px", borderRadius:"50%", cursor:"pointer", fontSize:"16px" },
  modalBody: { padding:"24px" },
  scoreCircle: { textAlign:"center", marginBottom:"20px", padding:"20px", background:"#f8fafc", borderRadius:"16px" },
  scoreNumber: { fontSize:"56px", fontWeight:"800", lineHeight:1 },
  scoreLabel: { color:"#9ca3af", fontSize:"14px", marginTop:"4px" },
  feedbackBox: { background:"#f8fafc", borderRadius:"12px", padding:"16px", color:"#374151", lineHeight:"1.7", maxHeight:"250px", overflowY:"auto" },
  modalFooter: { padding:"16px 24px", borderTop:"1px solid #f3f4f6", display:"flex", justifyContent:"flex-end" },
  closeModalBtn: { padding:"10px 24px", background:"#4f46e5", color:"white", border:"none", borderRadius:"10px", cursor:"pointer", fontWeight:"600" }
};