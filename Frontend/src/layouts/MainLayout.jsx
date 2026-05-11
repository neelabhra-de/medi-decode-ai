import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8"><Outlet /></main>
    </div>
  );
}
