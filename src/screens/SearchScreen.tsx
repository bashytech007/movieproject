
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import useFetch from '../hooks/useFetch';
import { fetchMovies, getImageUrl } from '../services/api';
import SearchBar from '../components/SearchBar';
import { useTrendingStore } from '../store/useTrendingStore';
import { COLORS } from '../constants/color'; 

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { updateSearchCount } = useTrendingStore();

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();

        // ✅ Fixed: Added proper null checks
        if (movies && movies.length > 0 && movies[0]) {
          updateSearchCount(
            searchQuery,
            movies[0].id,
            movies[0].title,
            getImageUrl(movies[0].poster_path)
          );
        }
      } else {
        reset();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    // ✅ Fixed: Added proper null checks
    if (movies && movies.length > 0 && movies[0]) {
      updateSearchCount(
        searchQuery,
        movies[0].id,
        movies[0].title,
        getImageUrl(movies[0].poster_path)
      );
    }
  }, [movies]);

  return (
    <View style={styles.container}>
      <FlatList
        data={movies || []} // ✅ Fixed: Provide empty array if null
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
        numColumns={3}
        columnWrapperStyle={styles.grid}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.logo}>🎬</Text>
            </View>
            <View style={styles.searchContainer}>
              <SearchBar
                placeholder="search movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            {loading && (
              <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
            )}
            {error && (
              <Text style={styles.errorText}>Error: {error.message}</Text>
            )}
            {!loading &&
              !error &&
              searchQuery.trim() &&
              movies && // ✅ Fixed: Check movies is not null
              movies.length > 0 && (
                <Text style={styles.resultsText}>
                  Search Results for{' '}
                  <Text style={styles.queryText}>{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {searchQuery.trim() ? 'No movies found' : 'Search for a movie'}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    paddingHorizontal: 16,
  },
  grid: {
    justifyContent: 'center',
    gap: 16,
    marginVertical: 16,
  },
  listContent: {
    paddingBottom: 100,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 60,
    alignItems: 'center',
  },
  logo: {
    fontSize: 40,
  },
  searchContainer: {
    marginVertical: 20,
  },
  loader: {
    marginVertical: 12,
  },
  errorText: {
    color: COLORS.error,
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  resultsText: {
    fontSize: 18,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  queryText: {
    color: COLORS.accent,
  },
  emptyContainer: {
    marginTop: 40,
    paddingHorizontal: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textSecondary,
  },
});

export default SearchScreen;