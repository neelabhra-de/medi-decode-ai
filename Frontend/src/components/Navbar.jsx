import { NavLink } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import AnimatedButton from "./AnimatedButton";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    ["/", "Home"],
    ["/dashboard", "Dashboard"],
    ["/medicine-scanner", "Medicine"],
    ["/report-analyzer", "Reports"],
    ["/chat-report", "Chat"],
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-cyan-200/10 bg-slate-950/45 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <NavLink to="/" className="flex items-center gap-2 font-['Space_Grotesk'] text-xl font-bold text-brand-gradient"><Sparkles size={16} />MediDecode AI</NavLink>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map(([to, label]) => <NavLink key={to} to={to} className="text-sm text-cyan-50/75 transition hover:text-cyan-100">{label}</NavLink>)}
        </nav>
        <div className="hidden gap-2 md:flex"><NavLink to="/login"><AnimatedButton className="px-4 py-1.5" variant="ghost">Login</AnimatedButton></NavLink><NavLink to="/signup"><AnimatedButton className="px-4 py-1.5">Get Started</AnimatedButton></NavLink></div>
        <button onClick={() => setOpen((x) => !x)} className="md:hidden">{open ? <X /> : <Menu />}</button>
      </div>
      {open && <div className="space-y-1 px-4 pb-3 md:hidden">{links.map(([to, l]) => <NavLink key={to} to={to} className="block rounded-lg px-3 py-2 text-cyan-100/90 hover:bg-cyan-400/10">{l}</NavLink>)}</div>}
    </header>
  );
}
