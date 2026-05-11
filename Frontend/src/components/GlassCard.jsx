import { motion } from "framer-motion";

export default function GlassCard({ children, className = "", ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -4, boxShadow: "0 16px 44px rgba(41,157,255,0.16)" }}
      className={`panel-soft rounded-2xl p-5 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
