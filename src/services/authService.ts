import { Language, User } from '../types';
import { generateId, hashPassword } from '../utils/crypto';
import { ensureSeeded, readStore, STORAGE_KEYS, writeStore } from './storageService';

interface SessionData {
  userId: string;
  rememberMe: boolean;
}

export const authService = {
  getAllUsers(): User[] {
    ensureSeeded();
    return readStore<User[]>(STORAGE_KEYS.USERS, []);
  },

  getStudents(): User[] {
    return this.getAllUsers().filter((u) => u.role === 'student');
  },

  getCurrentUser(): User | null {
    ensureSeeded();
    const session = readStore<SessionData | null>(STORAGE_KEYS.SESSION, null) ||
      (() => {
        try {
          const raw = sessionStorage.getItem(STORAGE_KEYS.SESSION);
          return raw ? (JSON.parse(raw) as SessionData) : null;
        } catch {
          return null;
        }
      })();

    if (!session?.userId) return null;
    const users = this.getAllUsers();
    return users.find((u) => u.id === session.userId) ?? null;
  },

  login(email: string, password: string, rememberMe: boolean): { user?: User; error?: 'invalid' } {
    ensureSeeded();
    const normalized = email.trim().toLowerCase();
    const pwdHash = hashPassword(password);
    const users = this.getAllUsers();
    const user = users.find((u) => u.email.toLowerCase() === normalized && u.passwordHash === pwdHash);
    if (!user) return { error: 'invalid' };

    const updated = this.touchStreak(user);
    const sessionPayload: SessionData = { userId: updated.id, rememberMe };

    if (rememberMe) {
      writeStore(STORAGE_KEYS.SESSION, sessionPayload);
      sessionStorage.removeItem(STORAGE_KEYS.SESSION);
    } else {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
      sessionStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(sessionPayload));
    }

    return { user: updated };
  },

  register(params: {
    name: string;
    email: string;
    password: string;
    role: 'student' | 'teacher';
    preferredLanguage: Language;
  }): { user?: User; error?: 'exists' } {
    ensureSeeded();
    const users = this.getAllUsers();
    const normalized = params.email.trim().toLowerCase();
    if (users.some((u) => u.email.toLowerCase() === normalized)) {
      return { error: 'exists' };
    }

    const today = new Date().toISOString().slice(0, 10);
    const newUser: User = {
      id: generateId('user'),
      name: params.name.trim(),
      email: normalized,
      passwordHash: hashPassword(params.password),
      role: params.role,
      preferredLanguage: params.preferredLanguage,
      xp: 50,
      streakDays: 1,
      lastActiveDate: today,
      badges: [],
      createdAt: new Date().toISOString(),
    };

    writeStore(STORAGE_KEYS.USERS, [...users, newUser]);
    writeStore(STORAGE_KEYS.SESSION, { userId: newUser.id, rememberMe: true });
    return { user: newUser };
  },

  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    sessionStorage.removeItem(STORAGE_KEYS.SESSION);
  },

  updateProfile(userId: string, patch: Partial<Pick<User, 'name' | 'avatar' | 'preferredLanguage'>>): User | null {
    const users = this.getAllUsers();
    let updatedUser: User | null = null;
    const next = users.map((u) => {
      if (u.id === userId) {
        updatedUser = { ...u, ...patch };
        return updatedUser;
      }
      return u;
    });
    if (updatedUser) {
      writeStore(STORAGE_KEYS.USERS, next);
    }
    return updatedUser;
  },

  awardXpAndBadge(userId: string, xpDelta: number, badgeId?: string): User | null {
    const users = this.getAllUsers();
    let updatedUser: User | null = null;
    const next = users.map((u) => {
      if (u.id === userId) {
        const badges = badgeId && !u.badges.includes(badgeId) ? [...u.badges, badgeId] : u.badges;
        updatedUser = { ...u, xp: u.xp + xpDelta, badges };
        return updatedUser;
      }
      return u;
    });
    if (updatedUser) {
      writeStore(STORAGE_KEYS.USERS, next);
    }
    return updatedUser;
  },

  touchStreak(user: User): User {
    const today = new Date().toISOString().slice(0, 10);
    if (user.lastActiveDate === today) return user;

    const prev = new Date(user.lastActiveDate);
    const now = new Date(today);
    const diffDays = Math.round((now.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));
    const nextStreak = diffDays === 1 ? user.streakDays + 1 : 1;
    const nextBadges =
      nextStreak >= 7 && !user.badges.includes('streak_7')
        ? [...user.badges, 'streak_7']
        : user.badges;

    const users = this.getAllUsers();
    const updated: User = { ...user, streakDays: nextStreak, lastActiveDate: today, badges: nextBadges };
    writeStore(
      STORAGE_KEYS.USERS,
      users.map((u) => (u.id === user.id ? updated : u))
    );
    return updated;
  },
};
