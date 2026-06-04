"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <main className="login-shell">
      <div aria-hidden="true" className="login-overlay" />

      <section className="login-card">
        <div className="text-center">
          <span className="login-chip">Admin Access</span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight" style={{ color: "var(--text)" }}>
            Welcome back
          </h1>
          <p className="mt-2 text-sm leading-6" style={{ color: "var(--muted)" }}>
            Sign in to manage your portfolio, featured projects, and inbox messages.
          </p>
        </div>

        {error && (
          <div
            className="mb-4 rounded-xl border border-red-500/20 p-3 text-center text-sm"
            style={{ background: "rgba(239, 68, 68, 0.10)", color: "#fca5a5" }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <label className="login-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="login-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <p className="login-help">Use your admin credentials to continue.</p>

        <Link href="/" className="login-link">
          ← Back to site
        </Link>
      </section>
    </main>
  );
}
