import { useThemeColor } from '@/components/Themed';
import { TMDB_IMAGE_BASE_URL } from '@/constants/tmdb';
import { MovieDetails, movieService } from '@/services/movieService';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HEADER_HEIGHT = 60;
const BACKDROP_HEIGHT = 400;

export default function MovieDetailsScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const tintColor = useThemeColor({}, 'tint');

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const data = await movieService.getMovieDetails(Number(id));
                setMovie(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
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

    if (!movie) {
        return (
            <SafeAreaView style={styles.centered}>
                <Text style={styles.errorText}>Movie not found</Text>
            </SafeAreaView>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <SafeAreaView edges={['top']} style={styles.headerContent}>
                    <Stack.Screen
                        options={{
                            headerShown: false,
                        }}
                    />
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <View style={styles.backButtonCircle}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle} numberOfLines={1}>
                        {movie?.title || 'Movie Detail'}
                    </Text>
                </SafeAreaView>
            </View>
            <ScrollView
                style={styles.scrollView}
                bounces={false}
            >
                <View style={styles.backdropContainer}>
                    <Image
                        source={{
                            uri: `${TMDB_IMAGE_BASE_URL}/w1280${movie.backdrop_path}`,
                        }}
                        style={styles.backdrop}
                    />

                    <View style={styles.ratingContainer}>
                        <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
                        <Text style={styles.ratingLabel}>Rating</Text>
                    </View>
                </View>

                <View style={styles.content}>
                    <View style={styles.details}>
                        <Text style={styles.title}>{movie.title}</Text>
                        {movie.tagline && (
                            <Text style={styles.tagline}>{movie.tagline}</Text>
                        )}
                        <View style={styles.metaInfo}>
                            <Text style={styles.releaseDate}>
                                {new Date(movie.release_date).getFullYear()}
                            </Text>
                            <Text style={styles.runtime}>{movie.runtime} min</Text>
                            {movie.status && (
                                <Text style={styles.status}>{movie.status}</Text>
                            )}
                        </View>
                        <View style={styles.genres}>
                            {movie.genres.map((genre) => (
                                <Text key={genre.id} style={styles.genre}>
                                    {genre.name}
                                </Text>
                            ))}
                        </View>
                        <Text style={styles.overview}>{movie.overview}</Text>
                        {(movie.budget !== undefined || movie.revenue !== undefined) && (
                            <View style={styles.financialInfo}>
                                {movie.budget !== undefined && movie.budget > 0 && (
                                    <View style={styles.financialItem}>
                                        <Text style={styles.financialLabel}>Budget</Text>
                                        <Text style={styles.financialValue}>
                                            ${movie.budget.toLocaleString()}
                                        </Text>
                                    </View>
                                )}
                                {movie.revenue !== undefined && movie.revenue > 0 && (
                                    <View style={styles.financialItem}>
                                        <Text style={styles.financialLabel}>Revenue</Text>
                                        <Text style={styles.financialValue}>
                                            ${movie.revenue.toLocaleString()}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        )}
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
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: HEADER_HEIGHT,
        backgroundColor: 'transparent',
        zIndex: 1000,
    },
    headerContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 16,
    },
    backButtonCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
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
    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 100,
        backgroundColor: 'rgba(0,0,0,0.8)',
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
    details: {
        marginTop: 0,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    tagline: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#666',
        marginBottom: 16,
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