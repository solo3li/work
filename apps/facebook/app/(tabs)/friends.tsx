import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { USERS } from '../../data/dummy';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function FriendsScreen() {
  const insets = useSafeAreaInsets();
  // Exclude current user
  const friendsList = USERS.slice(1);

  const renderFriend = ({ item }: { item: any }) => (
    <View style={styles.friendContainer}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.friendInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.confirmButton}>
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <Text style={styles.pageTitle}>Friends</Text>
        <TouchableOpacity style={styles.searchIcon}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.headerButtons}>
        <TouchableOpacity style={styles.pillButton}>
          <Text style={styles.pillText}>Suggestions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pillButton}>
          <Text style={styles.pillText}>Your Friends</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Friend Requests</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>
      <FlatList
        data={friendsList}
        keyExtractor={(item) => item.id}
        renderItem={renderFriend}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  searchIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f2f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtons: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  pillButton: {
    backgroundColor: '#f1f2f6',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  pillText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EB',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#1877F2',
    fontSize: 16,
  },
  friendContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  friendInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#1877F2',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  confirmText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#E4E6EB',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteText: {
    color: 'black',
    fontWeight: 'bold',
  },
});
