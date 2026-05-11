import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";
import AnimatedButton from "../components/AnimatedButton";

export default function LoginPage() {
  const { pushToast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("demo@medidecode.ai");
  const [password, setPassword] = useState("password123");

  const onSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
    pushToast("Login successful");
    navigate("/dashboard");
  };

  return (
    <div className="grid min-h-[82vh] items-center gap-6 lg:grid-cols-2">
      <div className="relative hidden h-[580px] overflow-hidden rounded-3xl border border-cyan-300/15 lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(102,237,255,.22),transparent_45%),linear-gradient(160deg,#071726,#06101d)]" />
        <div className="relative p-8">
          <h2 className="font-['Space_Grotesk'] text-3xl font-semibold text-brand-gradient">MediDecode AI</h2>
          <p className="mt-4 max-w-xs text-cyan-100/75">Precision medicine, powered by intelligence.</p>
        </div>
      </div>

      <form className="glass mx-auto w-full max-w-md rounded-2xl p-7" onSubmit={onSubmit}>
        <h1 className="text-3xl font-semibold">Welcome back</h1>
        <p className="mt-1 text-sm text-cyan-100/65">Log in to your clinical dashboard</p>
        <div className="mt-6 space-y-3">
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-xl border border-cyan-200/20 bg-transparent p-3" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full rounded-xl border border-cyan-200/20 bg-transparent p-3" />
          <label className="flex items-center gap-2 text-xs text-cyan-100/70"><input type="checkbox" />Remember me</label>
        </div>
        <AnimatedButton className="mt-5 w-full" type="submit">Log In</AnimatedButton>
        <button type="button" className="mt-3 w-full rounded-xl border border-cyan-200/20 py-2 text-sm">Continue with Google</button>
      </form>
    </div>
  );
}
