import { createContext, type ReactNode, useContext, useMemo, useState } from 'react';

export interface AuthState {
  authenticated: boolean;
  canViewMembers: boolean;
  canCreateMembers: boolean;
  canEditMembers: boolean;
  canDeleteMembers: boolean;
}

interface AuthContextValue extends AuthState {
  signInPlaceholder: () => void;
  signOutPlaceholder: () => void;
}

const initialAuthState: AuthState = {
  authenticated: false,
  canViewMembers: true,
  canCreateMembers: true,
  canEditMembers: true,
  canDeleteMembers: true,
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...authState,
      signInPlaceholder: () => {
        setAuthState((current) => ({
          ...current,
          authenticated: true,
        }));
      },
      signOutPlaceholder: () => {
        setAuthState((current) => ({
          ...current,
          authenticated: false,
        }));
      },
    }),
    [authState],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error('useAuth must be used within AuthProvider.');
  }

  return value;
}
