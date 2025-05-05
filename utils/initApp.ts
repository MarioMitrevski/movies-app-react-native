import Constants from 'expo-constants';
import { secureStorage } from './secureStorage';

const TMDB_ACCESS_TOKEN = Constants.expoConfig?.extra?.tmdbApiKey || process.env.TMDB_API_KEY;

export async function initializeApp() {
  try {
    // Check if token exists
    const existingToken = await secureStorage.getToken();
    
    // If no token exists, save it
    if (!existingToken) {
      await secureStorage.saveToken(TMDB_ACCESS_TOKEN);
      console.log('TMDB access token saved successfully');
    }
  } catch (error) {
    console.error('Error initializing app:', error);
    throw error;
  }
} 