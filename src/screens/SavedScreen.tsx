import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { useFavoritesStore } from '../store/useFavoritesStore';
import { COLORS } from '../constants/color';

const SavedScreen = () => {
  const { favorites, loadFavorites } = useFavoritesStore();

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🎬</Text>
        <Text style={styles.title}>My Favorites</Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No favorites yet!</Text>
          <Text style={styles.emptySubtitle}>
            Start adding movies to your favorites list
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={({ item }) => <MovieCard {...item} />}
          keyExtractor={item => item.id.toString()}
          numColumns={3}
          style={styles.list}
          columnWrapperStyle={styles.grid}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 16,
    marginTop: 60,
    marginBottom: 20,
  },
  logo: {
    fontSize: 40,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    color: COLORS.text,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  emptyTitle: {
    color: COLORS.textSecondary,
    fontSize: 18,
    textAlign: 'center',
  },
  emptySubtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  list: {
    paddingHorizontal: 16,
  },
  grid: {
    justifyContent: 'flex-start',
    gap: 16,
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 100,
  },
});

export default SavedScreen;