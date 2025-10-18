import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Movie, TrendingMovie } from '../types/movie';

interface FavoritesState {
  favorites: Movie[];
  loading: boolean;
  loadFavorites: () => Promise<void>;
  addFavorite: (movie: Movie) => Promise<void>;
  removeFavorite: (movieId: number) => Promise<void>;
  isFavorite: (movieId: number) => boolean;
}

const FAVORITES_KEY = '@movieapp_favorites';

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  loading: false,

  loadFavorites: async () => {
    try {
      set({ loading: true });
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) {
        set({ favorites: JSON.parse(stored) });
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      set({ loading: false });
    }
  },

  addFavorite: async (movie: Movie) => {
    try {
      const { favorites } = get();
      const newFavorites = [...favorites, movie];
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      set({ favorites: newFavorites });
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  },

  removeFavorite: async (movieId: number) => {
    try {
      const { favorites } = get();
      const newFavorites = favorites.filter(m => m.id !== movieId);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      set({ favorites: newFavorites });
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  },

  isFavorite: (movieId: number) => {
    const { favorites } = get();
    return favorites.some(m => m.id === movieId);
  },
}));

// ============================================
// File: src/store/useTrendingStore.ts
// ============================================

interface TrendingState {
  trending: TrendingMovie[];
  loading: boolean;
  loadTrending: () => Promise<void>;
  updateSearchCount: (searchTerm: string, movieId: number, title: string, posterUrl: string) => Promise<void>;
}

const TRENDING_KEY = '@movieapp_trending';

export const useTrendingStore = create<TrendingState>((set, get) => ({
  trending: [],
  loading: false,

  loadTrending: async () => {
    try {
      set({ loading: true });
      const stored = await AsyncStorage.getItem(TRENDING_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        const sorted = data.sort((a: TrendingMovie, b: TrendingMovie) => b.count - a.count).slice(0, 10);
        set({ trending: sorted });
      }
    } catch (error) {
      console.error('Error loading trending:', error);
    } finally {
      set({ loading: false });
    }
  },

  updateSearchCount: async (searchTerm: string, movieId: number, title: string, posterUrl: string) => {
    try {
      const { trending } = get();
      const existing = trending.find(t => t.movie_id === movieId);
      
      let newTrending: TrendingMovie[];
      if (existing) {
        newTrending = trending.map(t => 
          t.movie_id === movieId 
            ? { ...t, count: t.count + 1, searchTerm } 
            : t
        );
      } else {
        newTrending = [...trending, {
          searchTerm,
          movie_id: movieId,
          title,
          count: 1,
          poster_url: posterUrl,
        }];
      }

      const sorted = newTrending.sort((a, b) => b.count - a.count).slice(0, 10);
      
      await AsyncStorage.setItem(TRENDING_KEY, JSON.stringify(sorted));
      set({ trending: sorted });
    } catch (error) {
      console.error('Error updating search count:', error);
    }
  },
}));