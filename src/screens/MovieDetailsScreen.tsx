import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { fetchMovieDetails, fetchMovieVideos, getImageUrl } from '../services/api';
import { MovieDetails, MovieVideo } from '../types/movie';
import TrailerPlayer from '../components/TrailerPlayer';
import { useFavoritesStore } from '../store/useFavoritesStore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemeStore } from '../store/useThemeStore';

type MovieDetailsRouteProp = RouteProp<RootStackParamList, 'MovieDetails'>;

const MovieDetailsScreen = () => {
  const colors = useThemeStore(state => state.colors); // ✅ Get colors first
  
  const route = useRoute<MovieDetailsRouteProp>();
  const navigation = useNavigation();
  const { id } = route.params;

  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [trailer, setTrailer] = useState<MovieVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const favorite = isFavorite(id);

  // ✅ Move styles here, after getting colors
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    loadingContainer: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    errorContainer: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    errorText: {
      color: colors.error,
      fontSize: 18,
    },
    errorButton: {
      marginTop: 20,
      backgroundColor: colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 25,
    },
    errorButtonText: {
      color: colors.text,
      fontWeight: 'bold',
    },
    headerContainer: {
      position: 'relative',
    },
    backdrop: {
      width: '100%',
      height: 250,
    },
    backButton: {
      position: 'absolute',
      top: 48,
      left: 16,
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 12,
      borderRadius: 20,
    },
    favoriteButton: {
      position: 'absolute',
      top: 48,
      right: 16,
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 12,
      borderRadius: 20,
    },
    content: {
      paddingHorizontal: 16,
      paddingVertical: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      marginBottom: 16,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    star: {
      color: '#FFD700',
      fontSize: 18,
      marginRight: 4,
    },
    rating: {
      color: colors.text,
      fontWeight: 'bold',
      fontSize: 16,
    },
    infoText: {
      color: colors.textSecondary,
      fontSize: 14,
    },
    genresContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 16,
    },
    genreChip: {
      backgroundColor: `${colors.primary}33`,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
    },
    genreText: {
      color: colors.accent,
      fontSize: 12,
      fontWeight: 'bold',
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 12,
    },
    overview: {
      color: colors.textSecondary,
      lineHeight: 24,
      fontSize: 15,
    },
    tagline: {
      fontSize: 16,
      fontStyle: 'italic',
      color: colors.textSecondary,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    detailLabel: {
      color: colors.textSecondary,
      fontSize: 14,
      fontWeight: '600',
      flex: 1,
    },
    detailValue: {
      color: colors.text,
      fontSize: 14,
      flex: 1,
      textAlign: 'right',
    },
    infoDivider: {
  color: colors.textSecondary,
  fontSize: 14,
  marginHorizontal: 8,
},
  });

  useEffect(() => {
    loadMovieData();
  }, [id]);

  const loadMovieData = async () => {
    try {
      setLoading(true);
      const [movieData, videos] = await Promise.all([
        fetchMovieDetails(id),
        fetchMovieVideos(id),
      ]);

      setMovie(movieData);

      const officialTrailer = videos.find(
        v => v.type === 'Trailer' && v.site === 'YouTube' && v.official
      );
      setTrailer(officialTrailer || videos[0] || null);
    } catch (err) {
      setError('Failed to load movie details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = () => {
    if (!movie) return;

    if (favorite) {
      removeFavorite(id);
    } else {
      addFavorite({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path || '',
        backdrop_path: movie.backdrop_path || '',
        overview: movie.overview || '',
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        adult: movie.adult,
        genre_ids: movie.genres.map(g => g.id),
        original_language: movie.original_language,
        original_title: movie.original_title,
        popularity: movie.popularity,
        video: movie.video,
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Movie not found'}</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.errorButton}
        >
          <Text style={styles.errorButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.headerContainer}>
          <Image
            source={{ uri: getImageUrl(movie.backdrop_path, 'original') }}
            style={styles.backdrop}
            resizeMode="cover"
          />

          {/* Back Button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>

          {/* Favorite Button */}
          <TouchableOpacity
            onPress={handleFavoriteToggle}
            style={styles.favoriteButton}
          >
            <Icon
              name={favorite ? 'favorite' : 'favorite-border'}
              size={28}
              color={favorite ? colors.error : colors.text}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{movie.title}</Text>

          {/* <View style={styles.infoRow}>
            <View style={styles.ratingContainer}>
              <Text style={styles.star}>★</Text>
              <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
            </View>
            <Text style={styles.infoText}>{movie.release_date?.split('-')[0]}</Text>
            {movie.runtime && (
              <Text style={styles.infoText}>{movie.runtime} min</Text>
            )}
          </View> */}
          <View style={styles.infoRow}>
  <View style={styles.ratingContainer}>
    <Text style={styles.star}>★</Text>
    <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
  </View>
  
  <Text style={styles.infoDivider}> • </Text>
  
  <Text style={styles.infoText}>{movie.release_date?.split('-')[0]}</Text>
  
  {movie.runtime && (
    <>
      <Text style={styles.infoDivider}> • </Text>
      <Text style={styles.infoText}>{movie.runtime} min</Text>
    </>
  )}
</View>

          <View style={styles.genresContainer}>
            {movie.genres.map(genre => (
              <View key={genre.id} style={styles.genreChip}>
                <Text style={styles.genreText}>{genre.name}</Text>
              </View>
            ))}
          </View>

          {trailer && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Trailer</Text>
              <TrailerPlayer videoKey={trailer.key} />
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.overview}>
              {movie.overview || 'No overview available'}
            </Text>
          </View>

          {movie.tagline && (
            <View style={styles.section}>
              <Text style={styles.tagline}>"{movie.tagline}"</Text>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Details</Text>
            
            {movie.budget > 0 && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Budget</Text>
                <Text style={styles.detailValue}>
                  ${(movie.budget / 1000000).toFixed(1)}M
                </Text>
              </View>
            )}
            
            {movie.revenue > 0 && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Revenue</Text>
                <Text style={styles.detailValue}>
                  ${(movie.revenue / 1000000).toFixed(1)}M
                </Text>
              </View>
            )}
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Status</Text>
              <Text style={styles.detailValue}>{movie.status}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Original Language</Text>
              <Text style={styles.detailValue}>
                {movie.original_language.toUpperCase()}
              </Text>
            </View>
            
            {movie.production_companies.length > 0 && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Production</Text>
                <Text style={styles.detailValue}>
                  {movie.production_companies.slice(0, 2).map(c => c.name).join(', ')}
                </Text>
              </View>
            )}

            {movie.vote_count > 0 && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Vote Count</Text>
                <Text style={styles.detailValue}>
                  {movie.vote_count.toLocaleString()}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetailsScreen;