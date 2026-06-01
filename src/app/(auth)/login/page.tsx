"use client";

import { signIn } from "next-auth/react";
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
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="p-8 rounded-2xl w-full max-w-md" style={{ 
        background: 'var(--card-2)',
        border: '1px solid var(--border)'
      }}>
        <h1 className="text-2xl font-bold mb-2 text-center" style={{ color: 'var(--text)' }}>Admin Login</h1>
        <p className="text-center mb-6" style={{ color: 'var(--muted)' }}>Welcome back, Mahmud!</p>
        
        {error && (
          <div className="mb-4 p-3 rounded-lg text-sm text-center" style={{
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#f87171'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--muted)' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-lg outline-none focus:ring-2"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                transition: 'all 0.25s ease'
              }}
              placeholder="admin@example.com"
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--green-2)';
                e.target.style.boxShadow = '0 0 0 2px rgba(34, 197, 94, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--muted)' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-lg outline-none focus:ring-2"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                transition: 'all 0.25s ease'
              }}
              placeholder="••••••••"
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--green-2)';
                e.target.style.boxShadow = '0 0 0 2px rgba(34, 197, 94, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-bold transition-all"
            style={{
              background: 'var(--green)',
              color: '#fff'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'var(--green-2)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(34, 197, 94, 0.35)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'var(--green)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
