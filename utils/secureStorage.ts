import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'tmdb_access_token';

export const secureStorage = {
  async saveToken(token: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    } catch (error) {
      console.error('Error saving token:', error);
      throw error;
    }
  },

  async getToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(TOKEN_KEY);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  async deleteToken(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    } catch (error) {
      console.error('Error deleting token:', error);
      throw error;
    }
  }
}; 