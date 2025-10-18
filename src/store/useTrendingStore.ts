import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TrendingMovie } from '../types/movie';

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
        // Sort by count descending, limit to top 10
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

      // Sort and limit
      const sorted = newTrending.sort((a, b) => b.count - a.count).slice(0, 10);
      
      await AsyncStorage.setItem(TRENDING_KEY, JSON.stringify(sorted));
      set({ trending: sorted });
    } catch (error) {
      console.error('Error updating search count:', error);
    }
  },
}));