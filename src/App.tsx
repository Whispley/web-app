import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import Contacts from "@/pages/Contacts";
import NotFound from "@/pages/NotFound";
import Analytics from "@/pages/Analytics";
import { ErrorBoundary } from "@/components/common/error-boundary";
import Templates from "@/pages/Templates";
import Dashboard from "@/pages/Dashboard";
import Campaigns from "@/pages/Campaigns";

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          {/* Default route redirects to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="campaigns" element={<Campaigns />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="templates" element={<Templates />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
