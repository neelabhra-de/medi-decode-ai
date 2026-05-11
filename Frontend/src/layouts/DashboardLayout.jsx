import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
      <div className="hidden lg:block"><Sidebar /></div>
      <section className="min-w-0 flex-1"><Outlet /></section>
    </div>
  );
}
