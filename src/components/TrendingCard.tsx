import MaskedView from '@react-native-masked-view/masked-view';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { TrendingMovie } from '../types/movie';
import { colors } from '../constants/color';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  movie: TrendingMovie;
  index: number;
}

const TrendingCard = ({ movie: { movie_id, title, poster_url }, index }: Props) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('MovieDetails', { id: movie_id })}
    >
      <Image source={{ uri: poster_url }} style={styles.poster} resizeMode="cover" />

      <View style={styles.rankBadge}>
        <Text style={styles.rankText}>{index + 1}</Text>
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 130,
    position: 'relative',
    marginLeft: 20,
  },
  poster: {
    width: 130,
    height: 190,
    borderRadius: 8,
    backgroundColor: colors.surface,
  },
  rankBadge: {
    position: 'absolute',
    bottom: 50,
    left: -14,
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rankText: {
    color: colors.text,
    fontSize: 32,
    fontWeight: 'bold',
  },
  title: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default TrendingCard;