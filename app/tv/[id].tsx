import { useThemeColor } from '@/components/Themed';
import { TMDB_IMAGE_BASE_URL } from '@/constants/tmdb';
import { movieService, TVShowDetails } from '@/services/movieService';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BACKDROP_HEIGHT = 400;

export default function TVShowScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [tvShow, setTVShow] = useState<TVShowDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tintColor = useThemeColor({}, 'tint');

  useEffect(() => {
    const fetchTVShowDetails = async () => {
      try {
        const data = await movieService.getTVShowDetails(Number(id));
        setTVShow(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTVShowDetails();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color={tintColor} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  if (!tvShow) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>TV show not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        bounces={false}
      >
        <View style={styles.backdropContainer}>
          <Image
            source={{ uri: `${TMDB_IMAGE_BASE_URL}/w1280${tvShow.backdrop_path}` }}
            style={styles.backdrop}
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <View style={styles.backButtonCircle}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </View>
          </TouchableOpacity>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{tvShow.vote_average.toFixed(1)}</Text>
            <Text style={styles.ratingLabel}>Rating</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.details}>
            <Text style={styles.title}>{tvShow.name}</Text>
            <View style={styles.metaInfo}>
              <Text style={styles.releaseDate}>
                {new Date(tvShow.first_air_date).getFullYear()}
              </Text>
              <Text style={styles.runtime}>
                {tvShow.number_of_seasons} Seasons
              </Text>
              {tvShow.status && (
                <Text style={styles.status}>{tvShow.status}</Text>
              )}
            </View>
            <View style={styles.genres}>
              {tvShow.genres.map((genre) => (
                <Text key={genre.id} style={styles.genre}>
                  {genre.name}
                </Text>
              ))}
            </View>
            <Text style={styles.overview}>{tvShow.overview}</Text>
            <View style={styles.financialInfo}>
              <View style={styles.financialItem}>
                <Text style={styles.financialLabel}>Episodes</Text>
                <Text style={styles.financialValue}>
                  {tvShow.number_of_episodes}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  backdropContainer: {
    height: BACKDROP_HEIGHT,
    position: 'relative',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  backdrop: {
    width: SCREEN_WIDTH,
    height: BACKDROP_HEIGHT,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 16,
    zIndex: 1,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingContainer: {
    position: 'absolute',
    top: 60,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    zIndex: 1,
  },
  rating: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  ratingLabel: {
    fontSize: 12,
    color: '#fff',
    marginTop: 2,
  },
  content: {
    padding: 16,
    paddingTop: 32,
    paddingBottom: 32,
    marginTop: -50,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  details: {
    marginTop: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  releaseDate: {
    fontSize: 16,
    marginRight: 16,
  },
  runtime: {
    fontSize: 16,
    marginRight: 16,
  },
  status: {
    fontSize: 16,
    color: '#666',
  },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  genre: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  overview: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  financialInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  financialItem: {
    flex: 1,
    alignItems: 'center',
  },
  financialLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  financialValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 