import { useState } from "react";
import { FileUp, TrendingUp, AlertTriangle } from "lucide-react";
import GlassCard from "../components/GlassCard";
import { uploadService } from "../services/mockApi";

export default function ReportAnalyzerPage() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const run = async () => { setLoading(true); const res = await uploadService.report(); setSummary(res.summary); setLoading(false); };

  return (
    <div className="space-y-6">
      <h1 className="font-['Poppins'] text-4xl font-semibold">Report Analyzer</h1>
      <GlassCard className="cursor-pointer border-dashed p-10 text-center" onClick={run}>
        <FileUp className={`mx-auto mb-3 text-cyan-300 ${loading ? "animate-pulse" : ""}`} size={26} />
        <p className="text-lg">Drop PDF / Image to Analyze</p>
        <p className="mt-2 text-xs text-cyan-100/60">Upload and get instant simplification</p>
      </GlassCard>

      <div className="grid gap-4 md:grid-cols-3">
        <GlassCard><p className="text-xs text-cyan-100/65">Total Cholesterol</p><p className="mt-2 text-3xl font-semibold">142.2</p></GlassCard>
        <GlassCard><p className="text-xs text-cyan-100/65">LDL</p><p className="mt-2 text-3xl font-semibold text-amber-200">115</p></GlassCard>
        <GlassCard><p className="flex items-center gap-2 text-xs text-rose-200"><AlertTriangle size={14} />Risk Indicator</p><p className="mt-2 text-3xl font-semibold">Moderate</p></GlassCard>
      </div>

      <GlassCard>
        <p className="mb-2 flex items-center gap-2 text-sm text-cyan-100/75"><TrendingUp size={14} />AI Summary</p>
        <p>{summary || "Awaiting upload. We will highlight abnormal values and practical next steps."}</p>
      </GlassCard>
    </div>
  );
}
