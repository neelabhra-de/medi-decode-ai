import { NavLink } from "react-router-dom";
import { LayoutDashboard, Pill, FileText, MessageCircle, User } from "lucide-react";

const items = [
  ["/dashboard", "Dashboard", LayoutDashboard],
  ["/medicine-scanner", "Medicine", Pill],
  ["/report-analyzer", "Reports", FileText],
  ["/chat-report", "Chat", MessageCircle],
  ["/profile", "Profile", User],
];

export default function Sidebar() {
  return (
    <aside className="panel-soft sticky top-20 h-[calc(100vh-6rem)] w-72 rounded-2xl p-4">
      <h2 className="mb-5 font-['Space_Grotesk'] text-xl text-brand-gradient">Workspace</h2>
      <div className="space-y-1.5">
        {items.map(([to, label, Icon]) => (
          <NavLink key={to} to={to} className="flex items-center gap-3 rounded-lg px-3 py-2 text-cyan-50/80 transition hover:bg-cyan-300/10">
            <Icon size={16} />{label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
