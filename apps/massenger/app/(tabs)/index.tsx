import React from 'react';
import { FlatList, StyleSheet, View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { chatThreads } from '../../constants/DummyData';
import ChatItem from '../../components/ChatItem';

export default function ChatsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#65676b" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#65676b"
          />
        </View>
      </View>
      <FlatList
        data={chatThreads}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          // Find the other participant
          const otherUser = item.participants[1];
          return (
            <ChatItem
              id={item.id}
              name={otherUser.name}
              avatar={otherUser.avatar}
              lastMessage={item.lastMessage}
              time={item.lastMessageTime}
              isOnline={otherUser.isOnline}
              unreadCount={item.unreadCount}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
  },
});
