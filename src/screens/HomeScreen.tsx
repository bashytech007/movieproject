import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, { useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import useFetch from '../hooks/useFetch';
import { fetchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import TrendingCard from '../components/TrendingCard';
import { useTrendingStore } from '../store/useTrendingStore';
import ThemeToggle from '../components/ThemeToggle';
import { useThemeStore } from '../store/useThemeStore';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { trending, loadTrending, loading: trendingLoading } = useTrendingStore();
  const colors = useThemeStore(state => state.colors); // ✅ Get colors from hook
  
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: '' }));

  useEffect(() => {
    loadTrending();
  }, []);

  // ✅ Create styles inside component using colors from hook
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollView: {
      flex: 1,
      paddingHorizontal: 16,
    },
    scrollContent: {
      minHeight: '100%',
      paddingBottom: 32,
    },
    logo: {
      fontSize: 40,
      textAlign: 'center',
      marginTop: 60,
      marginBottom: 20,
    },
    loader: {
      marginTop: 40,
    },
    errorText: {
      color: colors.error,
      textAlign: 'center',
      marginTop: 20,
    },
    content: {
      flex: 1,
      marginTop: 20,
    },
    section: {
      marginTop: 32,
    },
    sectionTitle: {
      fontSize: 18,
      color: colors.text,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 12,
    },
    trendingList: {
      marginBottom: 16,
      marginTop: 12,
    },
    separator: {
      width: 16,
    },
    movieGrid: {
      justifyContent: 'flex-start',
      gap: 16,
      marginBottom: 16,
    },
    movieList: {
      marginTop: 8,
    },
    themeToggleContainer: {
      alignItems: 'center',
      marginBottom: 10,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.logo}>🎬</Text>
        <View style={styles.themeToggleContainer}>
          <ThemeToggle />
        </View>
        {moviesLoading || trendingLoading ? (
          <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
        ) : moviesError ? (
          <Text style={styles.errorText}>Error: {moviesError.message}</Text>
        ) : (
          <View style={styles.content}>
            <SearchBar
              onPress={() => navigation.navigate('MainTabs', { screen: 'Search' })}
              placeholder="Search for a movie"
            />

            {trending && trending.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Trending Movies</Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View style={styles.separator} />}
                  style={styles.trendingList}
                  data={trending}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item, index) => `${item.movie_id}-${index}`}
                />
              </View>
            )}

            <Text style={styles.sectionTitle}>Latest Movies</Text>
            <FlatList
              data={movies}
              renderItem={({ item }) => <MovieCard {...item} />}
              keyExtractor={item => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={styles.movieGrid}
              style={styles.movieList}
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}