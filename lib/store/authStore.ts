import { User } from "@/types/user";
import { create } from "zustand";

export interface Auth {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
}

export const useAuth = create<Auth>()((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User) => set({ user, isAuthenticated:true }),
  clearIsAuthenticated: () => set({ user: null, isAuthenticated:false }),
}));
