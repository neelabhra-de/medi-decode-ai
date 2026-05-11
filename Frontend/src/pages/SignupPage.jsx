import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AnimatedButton from "../components/AnimatedButton";

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("Alex Mercer");
  const [email, setEmail] = useState("demo@medidecode.ai");
  const [password, setPassword] = useState("password123");

  const onSubmit = async (e) => {
    e.preventDefault();
    await signup({ name, email, password });
    navigate("/dashboard");
  };

  return (
    <div className="grid min-h-[82vh] place-items-center">
      <form className="glass w-full max-w-md rounded-2xl p-7" onSubmit={onSubmit}>
        <h1 className="text-3xl font-semibold">Create Account</h1>
        <p className="mt-1 text-sm text-cyan-100/65">Start your AI healthcare journey</p>
        <div className="mt-6 space-y-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full rounded-xl border border-cyan-200/20 bg-transparent p-3" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-xl border border-cyan-200/20 bg-transparent p-3" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full rounded-xl border border-cyan-200/20 bg-transparent p-3" />
        </div>
        <div className="mt-4"><p className="mb-1 text-xs text-cyan-100/60">Password strength</p><div className="h-2 rounded-full bg-slate-800"><div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-cyan-300 to-blue-400" /></div></div>
        <AnimatedButton className="mt-5 w-full" type="submit">Sign Up</AnimatedButton>
      </form>
    </div>
  );
}
