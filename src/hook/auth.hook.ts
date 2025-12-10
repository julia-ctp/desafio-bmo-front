import React from "react";
import { AuthContext } from "@/contexts/auth.context";

export const useAuth = () => {
  const useAuthContext = React.useContext(AuthContext);

  if (!useAuthContext) {
    throw new Error("Auth context error");
  }
  return useAuthContext;
};
