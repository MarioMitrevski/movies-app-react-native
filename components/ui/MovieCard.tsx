import { Text, View } from '@/components/Themed';
import { TMDB_IMAGE_BASE_URL } from '@/constants/tmdb';
import { Image, StyleSheet } from 'react-native';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
  };
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `${TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{movie.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    width: 150,
  },
  poster: {
    width: 150,
    height: 225,
    borderRadius: 8,
  },
  title: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 