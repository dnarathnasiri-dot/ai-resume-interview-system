import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ResumesPage from "./pages/ResumesPage";
import InterviewPage from "./pages/InterviewPage";
import VerifyPage from "./pages/VerifyPage";
import AdminPage from "./pages/AdminPage";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<LandingPage />} />
        <Route path="/login"     element={<LoginPage />} />
        <Route path="/register"  element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/resumes"   element={<ResumesPage />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/verify"    element={<VerifyPage />} />
        <Route path="/admin"     element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}