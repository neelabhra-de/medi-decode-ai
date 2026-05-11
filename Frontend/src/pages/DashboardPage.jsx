import { Activity, UploadCloud, TriangleAlert } from "lucide-react";
import GlassCard from "../components/GlassCard";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-['Space_Grotesk'] text-3xl font-semibold">Dashboard Overview</h1>
        <div className="rounded-full border border-cyan-200/20 px-3 py-1 text-xs text-cyan-100/70">Synced 2 mins ago</div>
      </div>

      <section className="grid gap-4 md:grid-cols-4">
        {["Heart Rate","Blood Pressure","BMI","Risk Score"].map((x, i) => (
          <GlassCard key={x} className="p-4">
            <p className="text-xs text-cyan-100/65">{x}</p>
            <p className={`mt-2 text-2xl font-semibold ${i===3?"text-rose-200":""}`}>{i===0?"72":i===1?"118/78":i===2?"24.8":"High"}</p>
          </GlassCard>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.3fr,.9fr]">
        <GlassCard className="min-h-72">
          <div className="mb-4 flex items-center gap-2"><Activity size={16} className="text-cyan-300" /><p className="text-sm text-cyan-50/80">Health Trend</p></div>
          <div className="h-56 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-400/10 p-4">
            <svg viewBox="0 0 300 120" className="h-full w-full"><path d="M0,90 C35,85 60,70 90,75 C120,80 140,40 170,48 C205,58 228,28 260,34 C280,37 292,22 300,18" stroke="#67ecff" strokeWidth="3" fill="none" /><path d="M0,120 L0,90 C35,85 60,70 90,75 C120,80 140,40 170,48 C205,58 228,28 260,34 C280,37 292,22 300,18 L300,120 Z" fill="rgba(103,236,255,.12)" /></svg>
          </div>
        </GlassCard>
        <div className="space-y-4">
          <GlassCard><div className="flex items-center gap-2"><UploadCloud size={16} className="text-cyan-300" /><p>Upload New Report</p></div></GlassCard>
          <GlassCard><p className="mb-2 text-sm text-cyan-50/80">AI Insight</p><p className="text-sm">LDL is slightly elevated. Add fiber-rich foods, reduce saturated fats, and re-check after 8 weeks.</p></GlassCard>
          <GlassCard><div className="flex items-center gap-2 text-amber-200"><TriangleAlert size={16} /><p>Potential interaction alert found in recent scan.</p></div></GlassCard>
        </div>
      </section>
    </div>
  );
}
