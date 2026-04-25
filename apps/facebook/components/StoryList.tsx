import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { STORIES } from '../data/dummy';

export default function StoryList() {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {STORIES.map((story, index) => (
          <TouchableOpacity key={story.id} style={styles.storyCard} activeOpacity={0.8}>
            <Image source={{ uri: story.image }} style={styles.storyImage} />
            {story.isAddStory ? (
              <View style={styles.addStoryContainer}>
                <View style={styles.addIconWrapper}>
                  <Ionicons name="add" size={20} color="white" />
                </View>
                <Text style={styles.addStoryText}>Create Story</Text>
              </View>
            ) : (
              <>
                <View style={styles.userAvatarContainer}>
                  <Image source={{ uri: story.user.avatar }} style={styles.userAvatar} />
                </View>
                <Text style={styles.userName} numberOfLines={1}>
                  {story.user.name}
                </Text>
              </>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 10,
    paddingVertical: 10,
  },
  scrollContent: {
    paddingHorizontal: 10,
  },
  storyCard: {
    width: 100,
    height: 170,
    borderRadius: 12,
    marginHorizontal: 5,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E4E6EB',
  },
  storyImage: {
    width: '100%',
    height: '100%',
  },
  addStoryContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '35%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIconWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#1877F2',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -15,
    borderWidth: 2,
    borderColor: 'white',
  },
  addStoryText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 10,
  },
  userAvatarContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1877F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'white',
  },
  userName: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
