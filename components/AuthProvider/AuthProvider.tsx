"use client"
import { getMe } from "@/lib/api/clientApi";
import { checkSession } from "@/lib/api/clientApi";
import { useAuth } from "@/lib/store/authStore";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuth((store) => store.setUser);
  const clearAuth = useAuth((store) => store.clearIsAuthenticated);

  useEffect(() => {
    const fetchSession = async () => {
      const isAuthenticated = await checkSession();
        if (isAuthenticated) {
          const user = await getMe()
        setUser(user);
      } else {
        clearAuth();
      }
    };
    fetchSession();
  }, [setUser, clearAuth]);

  return children;
};
export default AuthProvider;
