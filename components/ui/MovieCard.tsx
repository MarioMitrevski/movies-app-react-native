import { useThemeColor } from '@/hooks/useThemeColor';
import { Movie } from '@/services/movieService';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function MovieCard({ movie }: { movie: Movie }) {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const placeholderColor = useThemeColor({}, 'icon');

  return (
    <View style={[styles.card, { backgroundColor }]}>
      {movie.poster_path ? (
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={styles.image}
        />
      ) : (
        <View style={[styles.image, { backgroundColor: placeholderColor }]} />
      )}
      <View style={styles.info}>
        <Text style={[styles.title, { color: textColor }]}>{movie.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    margin: 10,
    borderRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 