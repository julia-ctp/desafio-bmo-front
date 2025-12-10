"use client";

import React from "react";
import type { LoginFormInput, LoginResponse } from "@/schemas/auth.schema";
import { AuthServiceInstance } from "@/service/auth.service";
import type { Result } from "@/types/Result";

type Employee = LoginResponse["response"]["employee"];

interface AuthContextProps {
  user: Employee | null;
  setUser: React.Dispatch<React.SetStateAction<Employee | null>>;
  login: (data: LoginFormInput) => Promise<Result<LoginResponse>>;
  logOut: () => void;
}

export const AuthContext = React.createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<Employee | null>(null);

  React.useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  async function login(data: LoginFormInput) {
    const result = await AuthServiceInstance.login(data);

    if (result.success) {
      const { employee, token } = result.data.response;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(employee));

      setUser(employee);
    }

    return result;
  }

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.assign("/login");
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
