import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  weight: number;
  age: number;
  goal: "weight_loss" | "muscle_gain" | "maintain";
  workoutDays: number;
  gender: "male" | "female" | "other";
  weightHistory: { date: string; weight: number }[];
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (data: Omit<UserProfile, "id" | "weightHistory"> & { password: string }) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("gym_buddy_current_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const getUsers = (): Record<string, { profile: UserProfile; password: string }> => {
    return JSON.parse(localStorage.getItem("gym_buddy_users") || "{}");
  };

  const login = (email: string, password: string) => {
    const users = getUsers();
    const entry = users[email];
    if (entry && entry.password === password) {
      setUser(entry.profile);
      localStorage.setItem("gym_buddy_current_user", JSON.stringify(entry.profile));
      return true;
    }
    return false;
  };

  const signup = (data: Omit<UserProfile, "id" | "weightHistory"> & { password: string }) => {
    const users = getUsers();
    if (users[data.email]) return false;
    const profile: UserProfile = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      weight: data.weight,
      age: data.age,
      goal: data.goal,
      workoutDays: data.workoutDays,
      gender: data.gender,
      weightHistory: [{ date: new Date().toISOString().split("T")[0], weight: data.weight }],
    };
    users[data.email] = { profile, password: data.password };
    localStorage.setItem("gym_buddy_users", JSON.stringify(users));
    setUser(profile);
    localStorage.setItem("gym_buddy_current_user", JSON.stringify(profile));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("gym_buddy_current_user");
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem("gym_buddy_current_user", JSON.stringify(updated));
    const users = getUsers();
    if (users[user.email]) {
      users[user.email].profile = updated;
      localStorage.setItem("gym_buddy_users", JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
