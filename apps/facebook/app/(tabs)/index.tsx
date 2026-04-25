import React from 'react';
import { View, FlatList, StyleSheet, StatusBar } from 'react-native';
import Header from '../../components/Header';
import CreatePost from '../../components/CreatePost';
import StoryList from '../../components/StoryList';
import Post from '../../components/Post';
import { POSTS } from '../../data/dummy';

export default function Home() {
  const renderHeader = () => (
    <View>
      <Header />
      <CreatePost />
      <StoryList />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <FlatList
        data={POSTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Post post={item} />}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c9ccd1',
  },
  listContent: {
    paddingBottom: 20,
  },
});
