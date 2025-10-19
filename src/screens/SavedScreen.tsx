import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, { useEffect } from 'react';
import { useFavoritesStore } from '../store/useFavoritesStore';
import MovieCard from '../components/MovieCard';
import { useThemeStore } from '../store/useThemeStore';

export default function SavedScreen() {
  const colors = useThemeStore(state => state.colors); // ✅ Get colors first
  const { favorites, loadFavorites } = useFavoritesStore();

  // ✅ Move styles here, after getting colors
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 16,
      paddingTop: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 20,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 32,
    },
    emptyText: {
      fontSize: 18,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: 16,
    },
    emptyIcon: {
      fontSize: 64,
      marginBottom: 8,
    },
    movieGrid: {
      justifyContent: 'flex-start',
      gap: 16,
      marginBottom: 16,
    },
  });

  useEffect(() => {
    loadFavorites();
  }, []);

  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Saved Movies</Text>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🎬</Text>
          <Text style={styles.emptyText}>
            No saved movies yet.{'\n'}
            Start adding your favorites!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Movies ({favorites.length})</Text>
      <FlatList
        data={favorites}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={styles.movieGrid}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
