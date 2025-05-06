import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useThemeColor } from './Themed';

type SearchType = 'movie' | 'tv';

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  type: SearchType;
  setType: (type: SearchType) => void;
}

export function SearchBar({ query, setQuery, type, setType }: SearchBarProps) {
  const tintColor = useThemeColor({}, 'tint');

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search movies or TV shows..."
          value={query}
          onChangeText={setQuery}
          placeholderTextColor="#666"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.typeContainer}>
        <TouchableOpacity
          style={[styles.typeButton, type === 'movie' && styles.activeTypeButton]}
          onPress={() => setType('movie')}
        >
          <Text style={[styles.typeText, type === 'movie' && styles.activeTypeText]}>
            Movies
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, type === 'tv' && styles.activeTypeButton]}
          onPress={() => setType('tv')}
        >
          <Text style={[styles.typeText, type === 'tv' && styles.activeTypeText]}>
            TV Shows
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
  },
  typeContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeTypeButton: {
    backgroundColor: '#f0f0f0',
  },
  typeText: {
    fontSize: 14,
    color: '#666',
  },
  activeTypeText: {
    color: '#000',
    fontWeight: 'bold',
  },
}); 