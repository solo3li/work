import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NOTIFICATIONS } from '../../data/dummy';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();

  const renderNotification = ({ item }: { item: any }) => (
    <TouchableOpacity style={[styles.notificationContainer, !item.isRead && styles.unreadContainer]}>
      <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
      <View style={styles.iconBadge}>
        <Ionicons name="notifications" size={12} color="white" />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.notificationText}>
          <Text style={styles.userName}>{item.user.name}</Text> {item.action}
        </Text>
        <Text style={[styles.timeText, !item.isRead && styles.unreadTimeText]}>{item.time}</Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="ellipsis-horizontal" size={20} color="#65676B" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <Text style={styles.pageTitle}>Notifications</Text>
        <TouchableOpacity style={styles.searchIcon}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>Earlier</Text>
      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  notificationContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  unreadContainer: {
    backgroundColor: '#e7f3ff',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  iconBadge: {
    position: 'absolute',
    bottom: 10,
    left: 55,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1877F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  contentContainer: {
    flex: 1,
    paddingRight: 10,
  },
  notificationText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userName: {
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 13,
    color: '#65676B',
    marginTop: 2,
  },
  unreadTimeText: {
    color: '#1877F2',
    fontWeight: 'bold',
  },
});
