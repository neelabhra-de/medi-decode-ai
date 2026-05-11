import { useAuth } from "../context/AuthContext";
import AnimatedButton from "../components/AnimatedButton";
import GlassCard from "../components/GlassCard";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Health Profile</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <GlassCard><p className="text-lg font-semibold">{user.name}</p><p className="text-cyan-100/70">{user.email}</p></GlassCard>
        <GlassCard>Uploaded Reports: 12</GlassCard>
        <GlassCard>Medicine Scans: 18</GlassCard>
      </div>
      <GlassCard><h3 className="mb-3 font-semibold">Settings</h3><AnimatedButton onClick={logout}>Logout</AnimatedButton></GlassCard>
    </div>
  );
}
