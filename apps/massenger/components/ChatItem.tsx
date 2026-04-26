import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import Avatar from './Avatar';

interface ChatItemProps {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  isOnline: boolean;
  unreadCount?: number;
}

export default function ChatItem({ id, name, avatar, lastMessage, time, isOnline, unreadCount }: ChatItemProps) {
  const isUnread = Boolean(unreadCount && unreadCount > 0);

  return (
    <Link href={{ pathname: '/chat/[id]', params: { id } }} asChild>
      <Pressable style={styles.container}>
        <Avatar url={avatar} isOnline={isOnline} size={56} />
        <View style={styles.content}>
          <Text style={[styles.name, isUnread && styles.unreadText]}>{name}</Text>
          <View style={styles.messageRow}>
            <Text style={[styles.message, isUnread && styles.unreadText]} numberOfLines={1}>
              {lastMessage}
            </Text>
            <Text style={[styles.time, isUnread && styles.unreadText]}> • {time}</Text>
          </View>
        </View>
        {isUnread && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
          </View>
        )}
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    fontSize: 14,
    color: '#65676b',
    flexShrink: 1,
  },
  time: {
    fontSize: 14,
    color: '#65676b',
  },
  unreadText: {
    fontWeight: '700',
    color: '#000',
  },
  unreadBadge: {
    backgroundColor: '#0084ff',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginLeft: 8,
  },
  unreadBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
