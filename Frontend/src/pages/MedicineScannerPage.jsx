import { useState } from "react";
import { UploadCloud, ShieldCheck, Pill, AlertTriangle } from "lucide-react";
import GlassCard from "../components/GlassCard";
import { medicineResult } from "../data/mockData";
import { uploadService } from "../services/mockApi";

export default function MedicineScannerPage() {
  const [loading, setLoading] = useState(false);
  const onUpload = async () => { setLoading(true); await uploadService.medicine(); setLoading(false); };

  return (
    <div className="space-y-6">
      <h1 className="font-['Poppins'] text-4xl font-semibold">AI Medicine <span className="text-brand-gradient">Scanner</span></h1>
      <div className="grid gap-4 lg:grid-cols-[.9fr,1.1fr]">
        <GlassCard className="grid place-items-center border-dashed p-10 text-center" onClick={onUpload}>
          <UploadCloud className={`mb-3 text-cyan-300 ${loading ? "animate-bounce" : ""}`} />
          <p className="text-lg">Drag & Drop Prescription</p>
          <p className="mt-1 text-xs text-cyan-100/60">JPG, PNG, PDF</p>
          {loading && <p className="mt-4 text-cyan-200">Analyzing with Gemini...</p>}
        </GlassCard>
        <GlassCard>
          <div className="mb-4 flex items-center gap-2"><Pill size={16} className="text-cyan-300" /><h3 className="text-xl font-semibold">{medicineResult.name}</h3></div>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="glass rounded-xl p-3"><p className="text-xs text-cyan-100/65">Recommended Dosage</p><p>{medicineResult.dosage}</p></div>
            <div className="glass rounded-xl p-3"><p className="text-xs text-cyan-100/65">Duration</p><p>{medicineResult.duration}</p></div>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div><p className="mb-2 flex items-center gap-2 text-sm"><ShieldCheck size={14} className="text-cyan-300" />Common Side Effects</p>{medicineResult.sideEffects.map((s) => <p key={s} className="text-sm text-cyan-100/80">• {s}</p>)}</div>
            <div><p className="mb-2 flex items-center gap-2 text-sm text-amber-200"><AlertTriangle size={14} />Precautions</p>{medicineResult.precautions.map((s) => <p key={s} className="text-sm text-cyan-100/80">• {s}</p>)}</div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
