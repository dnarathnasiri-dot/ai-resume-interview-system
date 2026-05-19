import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/landing";
import AuthPage from "./pages/auth";
import DashboardPage from "./pages/dashboard";
import ResumeUploadPage from "./pages/resume-upload";
import InterviewPage from "./pages/interview";
import ProfilePage from "./pages/profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/auth",
    Component: AuthPage,
  },
  {
    path: "/dashboard",
    Component: DashboardPage,
  },
  {
    path: "/resume-upload",
    Component: ResumeUploadPage,
  },
  {
    path: "/interview",
    Component: InterviewPage,
  },
  {
    path: "/profile",
    Component: ProfilePage,
  },
]);
