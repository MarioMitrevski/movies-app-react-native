import { Text, View } from '@/components/Themed';
import { TMDB_IMAGE_BASE_URL } from '@/constants/tmdb';
import { useMovies } from '@/hooks/useMovies';
import { router } from 'expo-router';
import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MoviesScreen() {
  const { movies, loading, error, loadMore } = useMovies();

  const renderMovie = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => router.push(`/movie/${item.id}`)}
      style={styles.movieCard}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: `${TMDB_IMAGE_BASE_URL}/w500${item.poster_path}` }}
        style={styles.poster}
      />
      <View style={styles.movieContent}>
        <Text style={styles.movieTitle}>{item.title}</Text>
        <Text style={styles.movieOverview} numberOfLines={2}>
          {item.overview}
        </Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>★ {item.vote_average.toFixed(1)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading && movies.length === 0) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderMovie}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 16,
    paddingBottom: 0,
  },
  movieCard: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  poster: {
    width: 100,
    height: 150,
  },
  movieContent: {
    flex: 1,
    padding: 12,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  movieOverview: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFD700',
  },
});
