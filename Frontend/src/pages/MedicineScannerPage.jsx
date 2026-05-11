import { useRef, useState } from "react";
import { UploadCloud, ShieldCheck, Pill, AlertTriangle } from "lucide-react";
import GlassCard from "../components/GlassCard";
import { uploadService } from "../services/mockApi";
import { useToast } from "../context/ToastContext";

export default function MedicineScannerPage() {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const inputRef = useRef(null);
  const { pushToast } = useToast();

  const runUpload = async (file) => {
    if (!file) {
      pushToast("Please select a file first", "error");
      return;
    }

    try {
      setLoading(true);
      const data = await uploadService.medicine(file);
      setResult({
        name: data.medicineName || "Uploaded Medicine",
        dosage: data.dosage || "Follow prescription instructions",
        duration: data.duration || "As advised by doctor",
        sideEffects: data.sideEffects || [],
        precautions: data.precautions || [],
      });
      pushToast("Medicine uploaded and analyzed");
    } catch {
      pushToast("Upload failed. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const onPick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    await runUpload(file);
  };

  const onDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    await runUpload(file);
  };

  return (
    <div className="space-y-6">
      <h1 className="font-['Poppins'] text-4xl font-semibold">AI Medicine <span className="text-brand-gradient">Scanner</span></h1>
      <div className="grid gap-4 lg:grid-cols-[.9fr,1.1fr]">
        <GlassCard
          className="grid cursor-pointer place-items-center border-dashed p-10 text-center"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
        >
          <input ref={inputRef} type="file" accept=".jpg,.jpeg,.png,.webp,.pdf" onChange={onPick} className="hidden" />
          <UploadCloud className={`mb-3 text-cyan-300 ${loading ? "animate-bounce" : ""}`} />
          <p className="text-lg">Drag & Drop Prescription</p>
          <p className="mt-1 text-xs text-cyan-100/60">JPG, PNG, WEBP, PDF</p>
          {selectedFile && <p className="mt-2 text-xs text-cyan-200">Selected: {selectedFile.name}</p>}
          {loading && <p className="mt-4 text-cyan-200">Analyzing with Gemini...</p>}
        </GlassCard>

        {!result ? (
          <GlassCard className="grid place-items-center text-center text-cyan-100/70">
            <p>Upload a medicine file to view AI results.</p>
          </GlassCard>
        ) : (
          <GlassCard>
            <div className="mb-4 flex items-center gap-2"><Pill size={16} className="text-cyan-300" /><h3 className="text-xl font-semibold">{result.name}</h3></div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="glass rounded-xl p-3"><p className="text-xs text-cyan-100/65">Recommended Dosage</p><p>{result.dosage}</p></div>
              <div className="glass rounded-xl p-3"><p className="text-xs text-cyan-100/65">Duration</p><p>{result.duration}</p></div>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div><p className="mb-2 flex items-center gap-2 text-sm"><ShieldCheck size={14} className="text-cyan-300" />Common Side Effects</p>{result.sideEffects.map((s) => <p key={s} className="text-sm text-cyan-100/80">• {s}</p>)}</div>
              <div><p className="mb-2 flex items-center gap-2 text-sm text-amber-200"><AlertTriangle size={14} />Precautions</p>{result.precautions.map((s) => <p key={s} className="text-sm text-cyan-100/80">• {s}</p>)}</div>
            </div>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
