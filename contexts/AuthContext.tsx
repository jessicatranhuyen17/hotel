// Design note: Auth local-first (demo). No backend; data stored in localStorage.

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type SessionUser = {
  name: string;
  email: string;
};

type StoredUser = SessionUser & {
  password: string; // demo-only
};

type AuthContextValue = {
  user: SessionUser | null;
  isAuthenticated: boolean;
  register: (input: { name: string; email: string; password: string }) => Promise<void>;
  login: (input: { email: string; password: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const LS_USERS = "alh_users";
const LS_SESSION = "alh_session";

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(LS_USERS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(LS_USERS, JSON.stringify(users));
}

function readSessionEmail(): string | null {
  try {
    return localStorage.getItem(LS_SESSION);
  } catch {
    return null;
  }
}

function writeSessionEmail(email: string | null) {
  if (!email) localStorage.removeItem(LS_SESSION);
  else localStorage.setItem(LS_SESSION, email);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const email = readSessionEmail();
    if (!email) return;
    const u = readUsers().find((x) => x.email.toLowerCase() === email.toLowerCase());
    if (u) setUser({ name: u.name, email: u.email });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      async register(input) {
        const email = input.email.trim().toLowerCase();
        const name = input.name.trim();
        const password = input.password;

        const users = readUsers();
        const exists = users.some((u) => u.email.toLowerCase() === email);
        if (exists) throw new Error("This email is already registered.");

        users.push({ name, email, password });
        writeUsers(users);
        writeSessionEmail(email);
        setUser({ name, email });
      },
      async login(input) {
        const email = input.email.trim().toLowerCase();
        const password = input.password;

        const u = readUsers().find((x) => x.email.toLowerCase() === email);
        if (!u) throw new Error("No account found for this email.");
        if (u.password !== password) throw new Error("Incorrect password.");

        writeSessionEmail(u.email);
        setUser({ name: u.name, email: u.email });
      },
      logout() {
        writeSessionEmail(null);
        setUser(null);
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
