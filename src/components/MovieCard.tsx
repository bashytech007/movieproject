import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Movie } from '../types/movie';
import { getImageUrl } from '../services/api';
import { COLORS } from '../constants/color';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MovieCard = ({ id, poster_path, title, vote_average, release_date }: Movie) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('MovieDetails', { id })}
    >
      <Image
        source={{ uri: getImageUrl(poster_path) }}
        style={styles.poster}
        resizeMode="cover"
      />
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.infoRow}>
        <Text style={styles.star}>★</Text>
        <Text style={styles.rating}>{Math.round(vote_average / 2)}/5</Text>
        <Text style={styles.year}>{release_date?.split('-')[0]}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '30%',
    marginBottom: 16,
  },
  poster: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
  },
  title: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  star: {
    color: '#FFD700',
    fontSize: 12,
    marginRight: 4,
  },
  rating: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: 'bold',
    marginRight: 8,
  },
  year: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },
});

export default MovieCard;