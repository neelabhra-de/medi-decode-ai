import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="grid min-h-[70vh] place-items-center text-center">
      <div>
        <h1 className="text-6xl font-bold text-brand-gradient">404</h1>
        <p className="mt-2">Page not found.</p>
        <Link to="/" className="mt-4 inline-block text-cyan-300">Return Home</Link>
      </div>
    </div>
  );
}
