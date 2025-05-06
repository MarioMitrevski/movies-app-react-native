import { TMDB_IMAGE_BASE_URL } from '@/constants/tmdb';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from './Themed';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

interface MovieCardProps {
  movie: Movie;
  onPress: () => void;
}

export function MovieCard({ movie, onPress }: MovieCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{ uri: `${TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}` }}
        style={styles.poster}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.rating}>
          {movie.vote_average.toFixed(1)} ★
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 4,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  poster: {
    width: '100%',
    aspectRatio: 2/3,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  rating: {
    fontSize: 12,
    color: '#666',
  },
}); 