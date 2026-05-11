import AnimatedButton from "../components/AnimatedButton";

export default function ForgotPasswordPage() {
  return (
    <div className="grid min-h-[80vh] place-items-center">
      <div className="glass w-full max-w-md rounded-2xl p-6">
        <h1 className="mb-3 text-2xl font-semibold">Forgot Password</h1>
        <input placeholder="Email Address" className="w-full rounded-lg border border-cyan-200/20 bg-transparent p-3" />
        <AnimatedButton className="mt-4 w-full">Send OTP</AnimatedButton>
        <input placeholder="Enter OTP" className="mt-4 w-full rounded-lg border border-cyan-200/20 bg-transparent p-3" />
      </div>
    </div>
  );
}
