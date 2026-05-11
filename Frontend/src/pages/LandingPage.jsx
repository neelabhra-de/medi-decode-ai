import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Activity, ShieldCheck, Sparkles, ScanSearch, Bot, HeartPulse, ArrowRight } from "lucide-react";
import GlassCard from "../components/GlassCard";
import AnimatedButton from "../components/AnimatedButton";

const feats = [
  { title: "Medicine Scanner", icon: ScanSearch, text: "Decode labels, dosage and risk interactions instantly." },
  { title: "Report Simplifier", icon: Activity, text: "Turn clinical reports into simple, usable insights." },
  { title: "Chat With Report", icon: Bot, text: "Ask follow-up questions with contextual AI responses." },
  { title: "Emergency Alerts", icon: ShieldCheck, text: "Highlight risky values and critical overlaps quickly." },
];

const parent = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const child = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function LandingPage() {
  return (
    <div className="space-y-20 pb-6">
      <section className="relative overflow-hidden rounded-3xl border border-cyan-200/10 px-6 py-14 md:px-10">
        <motion.div animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-12 top-8 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl" />
        <motion.div animate={{ x: [0, -24, 0], y: [0, 16, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-16 bottom-6 h-52 w-52 rounded-full bg-blue-400/20 blur-3xl" />

        <motion.div variants={parent} initial="hidden" animate="show" className="relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <motion.p variants={child} className="mb-4 inline-flex rounded-full border border-cyan-200/20 px-3 py-1 text-xs uppercase tracking-[.2em] text-cyan-100/80">AI Healthcare Intelligence</motion.p>
            <motion.h1 variants={child} className="font-['Poppins'] text-4xl font-semibold leading-tight md:text-6xl">Understand Your Medicines & <span className="text-brand-gradient">Medical Reports</span> with AI</motion.h1>
            <motion.p variants={child} className="mt-5 max-w-xl text-cyan-50/75">MediDecode AI gives fast, clear, patient-friendly medical explanations. Built for awareness, not diagnosis replacement.</motion.p>
            <motion.div variants={child} className="mt-8 flex flex-wrap gap-3">
              <Link to="/medicine-scanner"><AnimatedButton>Scan Medicine</AnimatedButton></Link>
              <Link to="/report-analyzer"><AnimatedButton variant="blue">Upload Report</AnimatedButton></Link>
              <Link to="/login"><AnimatedButton variant="ghost">Try Demo</AnimatedButton></Link>
            </motion.div>
          </div>

          <motion.div variants={child} whileHover={{ y: -4 }} className="panel-soft relative rounded-2xl p-4">
            <div className="mb-3 flex items-center justify-between text-xs text-cyan-100/70"><span>Live Clinical View</span><span className="rounded-full bg-emerald-400/20 px-2 py-1 text-emerald-200">AI Active</span></div>
            <div className="grid gap-3 md:grid-cols-2">
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }} className="glass rounded-xl p-4"><p className="text-xs text-cyan-100/70">Blood Pressure</p><p className="mt-2 text-2xl font-semibold">118/78</p></motion.div>
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, delay: .8 }} className="glass rounded-xl p-4"><p className="text-xs text-cyan-100/70">LDL Risk</p><p className="mt-2 text-2xl font-semibold text-amber-200">Borderline</p></motion.div>
              <div className="glass rounded-xl p-4 md:col-span-2"><p className="text-xs text-cyan-100/70">Gemini Insight</p><p className="mt-2 text-sm">Lifestyle optimization advised with fiber-focused nutrition and follow-up lipid profile in 8-12 weeks.</p></div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section>
        <h2 className="mb-6 font-['Space_Grotesk'] text-3xl font-semibold">Intelligent Health Decoded</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {feats.map((f) => {
            const Icon = f.icon;
            return (
              <GlassCard key={f.title} className="group">
                <Icon className="mb-3 text-cyan-300 transition group-hover:scale-110" size={20} />
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-cyan-100/70">{f.text}</p>
                <motion.div initial={{ width: 0 }} whileInView={{ width: "48%" }} transition={{ duration: .7 }} className="mt-4 h-[2px] bg-gradient-to-r from-cyan-300 to-transparent" />
              </GlassCard>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <GlassCard><HeartPulse className="mb-2 text-cyan-300" /><p className="font-medium">Healthcare clarity</p></GlassCard>
        <GlassCard><ShieldCheck className="mb-2 text-cyan-300" /><p className="font-medium">Safe AI framing</p></GlassCard>
        <GlassCard><Sparkles className="mb-2 text-cyan-300" /><p className="font-medium">Hackathon-ready demo</p></GlassCard>
      </section>

      <footer className="relative overflow-hidden rounded-2xl border border-cyan-200/10 px-6 py-8">
        <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-cyan-300/20 blur-2xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-['Space_Grotesk'] text-xl font-semibold text-brand-gradient">MediDecode AI</p>
            <p className="mt-2 max-w-lg text-sm text-cyan-100/65">AI-powered healthcare awareness platform. This tool simplifies information and is not a substitute for professional medical diagnosis.</p>
          </div>
          <div className="space-y-2 text-sm text-cyan-100/70">
            <Link to="/login" className="flex items-center gap-2 hover:text-cyan-100">Get Started <ArrowRight size={14} /></Link>
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
