import { View, FlatList, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { POSTS, STORIES } from '../../data/dummy';
import Story from '../../components/Story';
import Post from '../../components/Post';

export default function HomeFeed() {
  const renderHeader = () => (
    <View style={styles.storiesContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesScroll}>
        <View style={styles.myStoryContainer}>
          <Story user={{ ...STORIES[0], username: 'Your Story', hasSeen: true }} />
          <View style={styles.addStoryIcon}>
            <Ionicons name="add-circle" size={24} color="#0095f6" />
          </View>
        </View>
        {STORIES.map(story => (
          <Story key={story.id} user={story} />
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoPlaceholder}>
          <Ionicons name="logo-instagram" size={32} color="#000" />
        </View>
        <View style={styles.headerRight}>
          <Ionicons name="heart-outline" size={28} color="#000" style={styles.icon} />
          <Ionicons name="chatbubble-ellipses-outline" size={28} color="#000" style={styles.icon} />
        </View>
      </View>

      <FlatList
        data={POSTS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Post post={item} />}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dbdbdb',
  },
  logoPlaceholder: {
    // Usually an image here for "Instagram" text logo
  },
  headerRight: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 20,
  },
  storiesContainer: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dbdbdb',
  },
  storiesScroll: {
    paddingHorizontal: 10,
  },
  myStoryContainer: {
    position: 'relative',
  },
  addStoryIcon: {
    position: 'absolute',
    bottom: 20,
    right: 5,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
});
