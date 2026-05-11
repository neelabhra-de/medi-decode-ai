import { useEffect, useRef, useState } from "react";
import { Bot, User, Send } from "lucide-react";
import GlassCard from "../components/GlassCard";
import { chatService } from "../services/mockApi";

export default function ChatWithReportPage() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "I reviewed your blood test. LDL is mildly elevated while fasting glucose remains normal." },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

  const send = async () => {
    if (!input.trim()) return;
    const q = input;
    setMessages((prev) => [...prev, { role: "user", text: q }]);
    setInput("");
    const data = await chatService.askReport(q);
    setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[260px,1fr]">
      <GlassCard className="h-fit">
        <p className="text-xs uppercase tracking-widest text-cyan-100/60">Active Context</p>
        <div className="mt-3 space-y-2 text-sm">
          <div className="glass rounded-lg p-3">Blood Test Oct 24</div>
          <div className="glass rounded-lg p-3 opacity-70">MRI Scan Lumbar</div>
        </div>
      </GlassCard>

      <GlassCard className="flex h-[72vh] flex-col">
        <div className="mb-4 flex flex-wrap gap-2 text-xs">
          {["Suggest a diet plan","Should I consult a doctor?","Explain LDL vs HDL"].map((s) => <button key={s} onClick={() => setInput(s)} className="rounded-full border border-cyan-200/20 px-3 py-1 text-cyan-100/75">{s}</button>)}
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto pr-1">
          {messages.map((m, i) => (
            <div key={i} className={`flex items-start gap-2 ${m.role === "user" ? "justify-end" : ""}`}>
              {m.role === "ai" && <Bot size={16} className="mt-1 text-cyan-300" />}
              <div className={`max-w-[82%] rounded-2xl px-4 py-3 ${m.role === "ai" ? "glass" : "bg-blue-400/20 border border-blue-300/30"}`}>{m.text}</div>
              {m.role === "user" && <User size={16} className="mt-1 text-blue-200" />}
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <div className="mt-4 flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about your report..." className="flex-1 rounded-xl border border-cyan-200/20 bg-transparent px-4 py-3 outline-none focus:border-cyan-300/60" />
          <button onClick={send} className="rounded-xl border border-cyan-300/30 bg-cyan-300/15 px-4"><Send size={16} /></button>
        </div>
      </GlassCard>
    </div>
  );
}
