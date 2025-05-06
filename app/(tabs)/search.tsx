import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MovieCard } from '../../components/MovieCard';
import { SearchBar } from '../../components/SearchBar';
import { useThemeColor } from '../../components/Themed';
import { useSearch } from '../../hooks/useSearch';

export default function SearchScreen() {
  const { query, setQuery, type, setType, results, loading, error } = useSearch();
  const tintColor = useThemeColor({}, 'tint');
  const router = useRouter();

  const handleItemPress = (item: any) => {
    if (type === 'movie') {
      router.push(`/movie/${item.id}`);
    } else {
      router.push(`/tv/${item.id}`);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <SearchBar query={query} setQuery={setQuery} type={type} setType={setType} />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={tintColor} />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              onPress={() => handleItemPress(item)}
            />
          )}
          contentContainerStyle={styles.listContent}
          numColumns={2}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    color: '#ff0000',
    textAlign: 'center',
  },
  listContent: {
    padding: 8,
  },
}); 