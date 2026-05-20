"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type UserProfile = {
  name: string;
  email: string;
  avatar?: string;
};

type AuthContextValue = {
  user: UserProfile | null;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  signIn: (email: string, name?: string) => Promise<void>;
  signUp: (email: string, name: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("goyaz_user");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse user session", e);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage when user changes
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      if (user) {
        localStorage.setItem("goyaz_user", JSON.stringify(user));
      } else {
        localStorage.removeItem("goyaz_user");
      }
    }
  }, [user, isLoaded]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const signIn = useCallback(async (email: string, name?: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    const derivedName = name || email.split("@")[0].toUpperCase();
    setUser({
      name: derivedName,
      email: email,
    });
    setIsOpen(false);
  }, []);

  const signUp = useCallback(async (email: string, name: string) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    setUser({
      name: name,
      email: email,
    });
    setIsOpen(false);
  }, []);

  const signInWithGoogle = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUser({
      name: "AARYA SHARMA",
      email: "aarya.sharma@gmail.com",
      avatar: "https://lh3.googleusercontent.com/a/default-user=s96-c",
    });
    setIsOpen(false);
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  // Lock body scroll while auth overlay is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      (window as any).lenis?.stop();
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      (window as any).lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      (window as any).lenis?.start();
    };
  }, [isOpen]);

  const value = useMemo(
    () => ({
      user,
      isOpen,
      open,
      close,
      toggle,
      signIn,
      signUp,
      signInWithGoogle,
      signOut,
    }),
    [user, isOpen, open, close, toggle, signIn, signUp, signInWithGoogle, signOut]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
