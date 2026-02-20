import { create } from 'zustand';
import { saveData, getData, removeData } from '../storage/storage';

export interface User {
  name: string;
  email: string;
  password: string;
  totalWorkouts: number;
  currentStreak: number;
  lastWorkoutDate: string | null;
}

interface AuthState {
  user: User | null;
  signup: (name: string, email: string, password: string) => Promise<string | null>;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  signup: async (name, email, password) => {
    const existingUser = await getData(`user_${email}`);
    if (existingUser) return 'User already exists';

    const newUser: User = {
      name,
      email,
      password,
      totalWorkouts: 0,
      currentStreak: 0,
      lastWorkoutDate: null
    };

    await saveData(`user_${email}`, newUser);
    await saveData('activeUser', email);

    set({ user: newUser });
    return null;
  },

  login: async (email, password) => {
    const user = await getData(`user_${email}`);
    if (!user) return 'User not found';
    if (user.password !== password) return 'Invalid password';

    await saveData('activeUser', email);
    set({ user });
    return null;
  },

  logout: async () => {
    await removeData('activeUser');
    set({ user: null });
  }
}));
