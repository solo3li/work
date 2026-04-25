import { View, StyleSheet, FlatList, Image, Dimensions, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { POSTS } from '../../data/dummy';

const { width } = Dimensions.get('window');
const itemSize = width / 3;

// Duplicate posts to have enough grid items
const searchData = [...POSTS, ...POSTS, ...POSTS, ...POSTS].map((p, i) => ({ ...p, uniqueId: `${p.id}-${i}` }));

export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchHeader}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#8e8e8e" />
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            placeholderTextColor="#8e8e8e"
          />
        </View>
      </View>

      <FlatList
        data={searchData}
        keyExtractor={item => item.uniqueId}
        numColumns={3}
        renderItem={({ item }) => (
          <Image source={{ uri: item.image }} style={styles.gridImage} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchHeader: {
    padding: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },
  gridImage: {
    width: itemSize,
    height: itemSize,
    borderWidth: 0.5,
    borderColor: '#fff',
  },
});
