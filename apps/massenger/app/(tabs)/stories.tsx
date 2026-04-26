import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import Avatar from '../../components/Avatar';
import { storiesData } from '../../constants/DummyData';

const { width } = Dimensions.get('window');
const numColumns = 2;
const storyWidth = width / numColumns - 24; // with some padding

export default function StoriesScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={storiesData}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={[styles.storyCard, { width: storyWidth }]}>
            <Image source={{ uri: item.image }} style={styles.storyImage} />
            <View style={styles.avatarContainer}>
              <View style={[styles.avatarBorder, item.viewed && styles.viewedBorder]}>
                <Avatar url={item.user.avatar} size={32} />
              </View>
            </View>
            <Text style={styles.name} numberOfLines={1}>
              {item.user.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    padding: 12,
  },
  storyCard: {
    height: 200,
    margin: 8,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f0f2f5',
    position: 'relative',
  },
  storyImage: {
    width: '100%',
    height: '100%',
  },
  avatarContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
  avatarBorder: {
    borderWidth: 2,
    borderColor: '#0084ff',
    borderRadius: 20,
    padding: 2,
  },
  viewedBorder: {
    borderColor: '#ccc',
  },
  name: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
