import { secureStorage } from './secureStorage';

const TMDB_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTBhM2EzZTUxNTY5NTNhZWY4NWY2OTY5ZDUyY2IzOCIsIm5iZiI6MTY0NjM0NzIwOC4yNjMsInN1YiI6IjYyMjE0M2M4YzI4MjNhMDA0MjE1M2E5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.06eLUwP0Jk7_QHUAAdWUDoMZYHm9BOF8oiVR8HqEswo';

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