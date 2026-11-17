import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';
import { Language, User, UserRole } from '../types';
import { useT } from './I18nContext';

interface AuthContextValue {
  user: User | null;
  role: UserRole;
  login: (email: string, password: string, rememberMe: boolean) => { ok: boolean; error?: string };
  register: (params: {
    name: string;
    email: string;
    password: string;
    role: 'student' | 'teacher';
  }) => { ok: boolean; error?: string };
  logout: () => void;
  refreshUser: () => void;
  updateProfile: (patch: Partial<Pick<User, 'name' | 'avatar' | 'preferredLanguage'>>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());
  const { lang, setLang } = useT();

  const refreshUser = useCallback(() => {
    setUser(authService.getCurrentUser());
  }, []);

  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []);

  const login = useCallback(
    (email: string, password: string, rememberMe: boolean) => {
      const res = authService.login(email, password, rememberMe);
      if (res.user) {
        setUser(res.user);
        return { ok: true };
      }
      return { ok: false, error: res.error };
    },
    []
  );

  const register = useCallback(
    (params: { name: string; email: string; password: string; role: 'student' | 'teacher' }) => {
      const res = authService.register({ ...params, preferredLanguage: lang });
      if (res.user) {
        setUser(res.user);
        return { ok: true };
      }
      return { ok: false, error: res.error };
    },
    [lang]
  );

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const updateProfile = useCallback(
    (patch: Partial<Pick<User, 'name' | 'avatar' | 'preferredLanguage'>>) => {
      if (!user) return;
      const updated = authService.updateProfile(user.id, patch);
      if (updated) {
        setUser(updated);
        if (patch.preferredLanguage) {
          setLang(patch.preferredLanguage as Language);
        }
      }
    },
    [user, setLang]
  );

  const role: UserRole = user ? user.role : 'guest';

  return (
    <AuthContext.Provider value={{ user, role, login, register, logout, refreshUser, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
