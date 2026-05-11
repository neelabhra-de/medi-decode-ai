import { motion } from "framer-motion";

export default function AnimatedButton({ children, className = "", variant = "primary", ...props }) {
  const styles = variant === "ghost"
    ? "border border-cyan-300/30 bg-transparent text-cyan-100"
    : variant === "blue"
      ? "border border-blue-300/30 bg-blue-400/20 text-blue-50"
      : "border border-cyan-300/30 bg-cyan-300/15 text-cyan-100";

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2, boxShadow: "0 0 30px rgba(76,233,255,0.2)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
      className={`rounded-xl px-5 py-2 font-medium ${styles} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
