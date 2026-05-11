import { AnimatePresence, motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import DashboardPage from "../pages/DashboardPage";
import MedicineScannerPage from "../pages/MedicineScannerPage";
import ReportAnalyzerPage from "../pages/ReportAnalyzerPage";
import ChatWithReportPage from "../pages/ChatWithReportPage";
import ProfilePage from "../pages/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import AuthRoute from "./AuthRoute";

const Wrap = ({ children }) => <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>{children}</motion.div>;

export default function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Wrap><LandingPage /></Wrap>} />
          <Route path="/login" element={<AuthRoute><Wrap><LoginPage /></Wrap></AuthRoute>} />
          <Route path="/signup" element={<AuthRoute><Wrap><SignupPage /></Wrap></AuthRoute>} />
          <Route path="/forgot-password" element={<AuthRoute><Wrap><ForgotPasswordPage /></Wrap></AuthRoute>} />
        </Route>

        <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<Wrap><DashboardPage /></Wrap>} />
          <Route path="medicine-scanner" element={<Wrap><MedicineScannerPage /></Wrap>} />
          <Route path="report-analyzer" element={<Wrap><ReportAnalyzerPage /></Wrap>} />
          <Route path="chat-report" element={<Wrap><ChatWithReportPage /></Wrap>} />
          <Route path="profile" element={<Wrap><ProfilePage /></Wrap>} />
        </Route>

        <Route path="*" element={<Wrap><NotFoundPage /></Wrap>} />
      </Routes>
    </AnimatePresence>
  );
}
