import MovieCard from '@/components/ui/MovieCard';
import { useMovies } from '@/hooks/useMovies';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MoviesScreen() {
  const { movies, loading, error, loadMore, hasMore } = useMovies();
  const backgroundColor = useThemeColor({}, 'background');
  const tintColor = useThemeColor({}, 'tint');

  if (error) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        <ActivityIndicator size="large" color={tintColor} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard movie={item} />}
        keyExtractor={(item) => `movie-${item.id}-${item.title}`}
        onEndReached={hasMore ? loadMore : undefined}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.list}
        ListFooterComponent={
          loading ? (
            <View style={styles.footer}>
              <ActivityIndicator size="small" color={tintColor} />
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingBottom: 16,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});
