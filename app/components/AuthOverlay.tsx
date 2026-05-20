"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useAuth } from "../utils/auth";
import { ANIMATION_CLASSES, useDelayedUnmount } from "../utils/animations";

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24c0-1.55-.15-3.24-.47-4.77H24v9.03h12.75c-.53 2.87-2.14 5.3-4.57 6.93l7.1 5.5C43.43 36.57 46.5 30.76 46.5 24z" />
      <path fill="#FBBC05" d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.98-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.1-5.5c-1.97 1.33-4.52 2.13-7.79 2.13-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

export function AuthOverlay() {
  const { isOpen, close, signIn, signUp, signInWithGoogle, user, signOut } = useAuth();
  const shouldRender = useDelayedUnmount(isOpen, 1500);
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Lock and escape handlers
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  if (!shouldRender) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email");
      return;
    }
    setError("");
    setLoading(true);

    try {
      if (activeTab === "signin") {
        await signIn(email);
      } else {
        if (!name) {
          setError("Please enter your name");
          setLoading(false);
          return;
        }
        await signUp(email, name.toUpperCase());
      }
      setEmail("");
      setName("");
      setPassword("");
    } catch (err) {
      setError("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleAuth() {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError("Google authentication failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`fixed inset-0 z-[250] flex items-center justify-center transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isOpen ? "bg-black/55 backdrop-blur-md opacity-100" : "bg-black/0 backdrop-blur-0 opacity-0 pointer-events-none"
      }`}
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 w-full h-full cursor-default"
        onClick={close}
        aria-label="Close modal"
      />

      {/* Modal Dialog */}
      <div
        ref={containerRef}
        className={`relative w-full max-w-[460px] mx-[16px] bg-white rounded-[24px] lg:rounded-[30px] border border-[#083c30]/10 shadow-[0_20px_50px_rgba(0,0,0,0.18)] overflow-hidden transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-10 ${
          isOpen ? "translate-y-0 scale-100 opacity-100" : "translate-y-[20px] scale-95 opacity-0"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-[20px] right-[20px] text-[#002f00]/60 hover:text-[#002f00] p-1 rounded-full hover:bg-[#f5f5f5] transition-all duration-300"
          aria-label="Close login dialog"
        >
          <CloseIcon />
        </button>

        {/* Dynamic Logged In Screen */}
        {user ? (
          <div className="p-[30px] lg:p-[40px] flex flex-col items-center text-center gap-[24px]">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-[80px] h-[80px] rounded-full object-cover border-2 border-[#002f00]"
              />
            ) : (
              <div className="w-[80px] h-[80px] rounded-full bg-[#002f00] text-white flex items-center justify-center font-display text-[28px]">
                {user.name.charAt(0)}
              </div>
            )}
            <div className="flex flex-col gap-[6px]">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#002f00]/50">
                Welcome Back
              </span>
              <h2 className="font-display text-[26px] text-[#002f00] uppercase tracking-[0.02em]">
                {user.name}
              </h2>
              <p className="font-sans text-[13px] text-[#002f00]/60">{user.email}</p>
            </div>
            <div className="w-full flex flex-col gap-[12px] mt-[10px]">
              <Link
                href="/collections"
                onClick={close}
                className="font-sans w-full py-[14px] bg-[#002f00] text-white text-[12px] uppercase tracking-[0.12em] rounded-xl hover:bg-[#083c30] transition-colors text-center"
              >
                Explore Collections
              </Link>
              <button
                type="button"
                onClick={() => {
                  signOut();
                  close();
                }}
                className="font-sans w-full py-[14px] border border-[#002f00]/25 text-[#002f00] text-[12px] uppercase tracking-[0.12em] rounded-xl hover:bg-[#fcf8f8] transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          /* Form Content (Logged Out) */
          <div className="p-[30px] lg:p-[40px] flex flex-col gap-[28px]">
            {/* Header titles */}
            <div className="flex flex-col gap-[8px]">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#002f00]/50">
                Goyaz Member Portal
              </span>
              <h2 className="font-display text-[28px] text-[#002f00] leading-none">
                {activeTab === "signin" ? "Sign In" : "Create Account"}
              </h2>
            </div>

            {/* Toggle tabs */}
            <div className="flex border-b border-[#002f00]/10">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("signin");
                  setError("");
                }}
                className={`flex-1 pb-[12px] text-[13px] uppercase tracking-[0.1em] font-medium transition-all duration-300 border-b-2 ${
                  activeTab === "signin"
                    ? "border-[#002f00] text-[#002f00]"
                    : "border-transparent text-[#002f00]/40 hover:text-[#002f00]/60"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("signup");
                  setError("");
                }}
                className={`flex-1 pb-[12px] text-[13px] uppercase tracking-[0.1em] font-medium transition-all duration-300 border-b-2 ${
                  activeTab === "signup"
                    ? "border-[#002f00] text-[#002f00]"
                    : "border-transparent text-[#002f00]/40 hover:text-[#002f00]/60"
                }`}
              >
                Register
              </button>
            </div>

            {/* Error messaging */}
            {error && (
              <div className="bg-red-50 text-red-700 text-[12px] px-[16px] py-[10px] rounded-lg border border-red-200">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">
              {activeTab === "signup" && (
                <div className="flex flex-col gap-[6px]">
                  <label className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#002f00]/60">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    disabled={loading}
                    className="font-sans w-full bg-[#fafaf8] border border-[#002f00]/15 focus:border-[#002f00] focus:bg-white rounded-xl px-[16px] py-[12px] text-[13px] text-[#002f00] placeholder-[#002f00]/30 outline-none transition-all duration-300"
                  />
                </div>
              )}

              <div className="flex flex-col gap-[6px]">
                <label className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#002f00]/60">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  disabled={loading}
                  className="font-sans w-full bg-[#fafaf8] border border-[#002f00]/15 focus:border-[#002f00] focus:bg-white rounded-xl px-[16px] py-[12px] text-[13px] text-[#002f00] placeholder-[#002f00]/30 outline-none transition-all duration-300"
                />
              </div>

              <div className="flex flex-col gap-[6px]">
                <label className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#002f00]/60">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  className="font-sans w-full bg-[#fafaf8] border border-[#002f00]/15 focus:border-[#002f00] focus:bg-white rounded-xl px-[16px] py-[12px] text-[13px] text-[#002f00] placeholder-[#002f00]/30 outline-none transition-all duration-300"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="font-sans w-full mt-[8px] bg-[#002f00] text-white py-[14px] text-[13px] uppercase tracking-[0.12em] rounded-xl hover:bg-[#083c30] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-[8px]"
              >
                {loading && !name && !email ? (
                  <div className="w-[16px] h-[16px] border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : null}
                <span>{activeTab === "signin" ? "Sign In" : "Register"}</span>
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-[10px]">
              <div className="flex-1 h-px bg-[#002f00]/10" />
              <span className="font-sans text-[10px] uppercase tracking-[0.1em] text-[#002f00]/30">OR</span>
              <div className="flex-1 h-px bg-[#002f00]/10" />
            </div>

            {/* Google Sign In CTA */}
            <button
              onClick={handleGoogleAuth}
              disabled={loading}
              className="font-sans w-full py-[14px] border border-[#002f00]/15 text-[#002f00]/80 bg-white rounded-xl hover:bg-[#fcfcfc] hover:border-[#002f00]/30 hover:shadow-sm active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-[12px]"
            >
              <GoogleIcon />
              <span className="text-[13px] font-medium tracking-[0.02em]">Sign in with Google</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
