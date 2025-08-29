import { create } from 'zustand';

/**
 * Theme store for managing dark/light mode
 */
export const useThemeStore = create((set) => ({
  isDark: false,
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
  setTheme: (isDark) => set({ isDark }),
}));
