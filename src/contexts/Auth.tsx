import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

export type User = {
  cpf: string;
  nome: string;
  email: string;
  funcao: string;
};

interface Props {
  children: React.ReactNode;
}

interface AuthContextData {
  loading: boolean;
  authData?: User;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (type: string, inputValues: User & { senha: string }) => Promise<User>;
  signOut: () => Promise<void>;
  clearAuthData: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [authData, setAuthData] = useState<User>();

  async function signIn(email: string, senha: string) {
    return new Promise<User>((resolve, reject) => {})
  }

  async function signUp(type: string, inputValues: User & { senha: string }) {
    return new Promise<User>((resolve, reject) => {});
  }

  async function signOut() {}

  async function clearAuthData() {
  }

  return (
    <AuthContext.Provider
      value={{
        authData,
        loading,
        signIn,
        signUp,
        signOut,
        clearAuthData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
