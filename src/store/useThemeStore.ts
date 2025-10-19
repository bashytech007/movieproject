import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DARK_colors, LIGHT_colors } from '../constants/color';

const THEME_KEY = '@movieapp_theme';

interface ThemeState {
  isDark: boolean;
  colors: typeof DARK_colors;
  toggleTheme: () => Promise<void>;
  loadTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  isDark: true,
  colors: DARK_colors,

  loadTheme: async () => {
    try {
      const stored = await AsyncStorage.getItem(THEME_KEY);
      if (stored !== null) {
        const isDark = stored === 'dark';
        set({ 
          isDark,
          colors: isDark ? DARK_colors : LIGHT_colors 
        });
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  },

  toggleTheme: async () => {
    try {
      const { isDark } = get();
      const newTheme = !isDark;
      
      await AsyncStorage.setItem(THEME_KEY, newTheme ? 'dark' : 'light');
      set({ 
        isDark: newTheme,
        colors: newTheme ? DARK_colors : LIGHT_colors 
      });
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  },
}));