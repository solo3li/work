import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { getMessagesForChannel, CHANNELS, USERS } from '../utils/data';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import MessageItem from './MessageItem';
import { useState } from 'react';

export default function Chat({ channelId, serverId }: { channelId: string, serverId: string }) {
  const [text, setText] = useState('');
  
  // Find channel name
  let channelName = 'channel';
  for (const serverChannels of Object.values(CHANNELS)) {
    const found = serverChannels.find(c => c.id === channelId);
    if (found) {
      channelName = found.name;
      break;
    }
  }

  const messages = getMessagesForChannel(channelId);

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Ionicons name="color-filter-outline" size={24} color={Colors.textMuted} style={styles.headerIcon} />
        <Text style={styles.headerTitle}>{channelName}</Text>
      </View>

      <ScrollView 
        style={styles.messageList} 
        contentContainerStyle={styles.messageListContent}
      >
        <View style={styles.welcomeContainer}>
          <View style={styles.welcomeIconContainer}>
            <Ionicons name="color-filter-outline" size={48} color={Colors.white} />
          </View>
          <Text style={styles.welcomeTitle}>Welcome to #{channelName}!</Text>
          <Text style={styles.welcomeSubtitle}>This is the start of the #{channelName} channel.</Text>
        </View>

        {messages.map((msg) => {
          const user = USERS[msg.userId as keyof typeof USERS];
          return (
            <MessageItem 
              key={msg.id}
              user={user}
              content={msg.content}
              timestamp={msg.timestamp}
            />
          );
        })}
      </ScrollView>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Pressable style={styles.attachButton}>
            <Ionicons name="add-circle" size={24} color={Colors.textMuted} />
          </Pressable>
          <TextInput
            style={styles.input}
            placeholder={`Message #${channelName}`}
            placeholderTextColor={Colors.textMuted}
            value={text}
            onChangeText={setText}
            multiline
          />
          <Pressable style={styles.actionButton}>
            <Ionicons name="gift" size={24} color={Colors.textMuted} />
          </Pressable>
          <Pressable style={styles.actionButton}>
            <Ionicons name="happy" size={24} color={Colors.textMuted} />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    zIndex: 2,
  },
  headerIcon: {
    marginRight: 8,
  },
  headerTitle: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    paddingVertical: 16,
  },
  welcomeContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    marginBottom: 16,
  },
  welcomeIconContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: Colors.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  welcomeTitle: {
    color: Colors.white,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    color: Colors.textMuted,
    fontSize: 16,
  },
  inputContainer: {
    padding: 16,
    paddingTop: 0,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    paddingHorizontal: 12,
    minHeight: 44,
  },
  attachButton: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: Colors.text,
    fontSize: 16,
    paddingVertical: 10,
    maxHeight: 150,
  },
  actionButton: {
    marginLeft: 12,
  },
});
