import axios from 'axios';
import { TMDB_API_KEY, TMDB_BASE_URL, TMDB_IMAGE_BASE_URL } from '@env';
import { Movie, MovieDetails, MovieVideo } from '../types/movie';

const api = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export const fetchMovies = async ({ query }: { query: string }): Promise<Movie[]> => {
  try {
    const endpoint = query.trim() 
      ? '/search/movie' 
      : '/movie/popular';
    
    const params = query.trim() 
      ? { query, page: 1 } 
      : { page: 1 };

    const response = await api.get(endpoint, { params });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  try {
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const fetchMovieVideos = async (movieId: number): Promise<MovieVideo[]> => {
  try {
    const response = await api.get(`/movie/${movieId}/videos`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movie videos:', error);
    throw error;
  }
};

export const getImageUrl = (path: string | null, size: 'w500' | 'original' = 'w500'): string => {
  if (!path) return 'https://placehold.co/600x400/1a1a1a/ffffff/png';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};