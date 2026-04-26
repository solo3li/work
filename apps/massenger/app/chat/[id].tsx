import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { chatThreads, messages as messagesData, CURRENT_USER_ID, users } from '../../constants/DummyData';
import Avatar from '../../components/Avatar';

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  const thread = chatThreads.find((t) => t.id === id);
  const otherUser = thread?.participants.find((p) => p.id !== CURRENT_USER_ID) || users[1]; // fallback

  const [messages, setMessages] = useState(messagesData[id as keyof typeof messagesData] || []);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim() === '') return;
    const newMessage = {
      id: `m${Date.now()}`,
      text: inputText,
      senderId: CURRENT_USER_ID,
      time: 'Just now',
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const renderMessage = ({ item }: { item: any }) => {
    const isMe = item.senderId === CURRENT_USER_ID;
    return (
      <View style={[styles.messageRow, isMe ? styles.myMessageRow : styles.otherMessageRow]}>
        {!isMe && <Avatar url={otherUser.avatar} size={28} />}
        <View style={[styles.messageBubble, isMe ? styles.myMessageBubble : styles.otherMessageBubble]}>
          <Text style={[styles.messageText, isMe ? styles.myMessageText : styles.otherMessageText]}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={styles.headerTitleContainer}>
              <Avatar url={otherUser.avatar} isOnline={otherUser.isOnline} size={36} />
              <View style={styles.headerTitleTextContainer}>
                <Text style={styles.headerTitleName}>{otherUser.name}</Text>
                <Text style={styles.headerTitleActive}>
                  {otherUser.isOnline ? 'Active Now' : 'Offline'}
                </Text>
              </View>
            </View>
          ),
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={28} color="#0084ff" />
            </Pressable>
          ),
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <Ionicons name="call" size={24} color="#0084ff" style={styles.headerIcon} />
              <Ionicons name="videocam" size={24} color="#0084ff" />
            </View>
          ),
        }}
      />
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesList}
      />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={90}>
        <View style={styles.inputContainer}>
          <Ionicons name="add-circle" size={28} color="#0084ff" />
          <Ionicons name="camera" size={28} color="#0084ff" style={styles.inputIcon} />
          <Ionicons name="image" size={28} color="#0084ff" style={styles.inputIcon} />
          <Ionicons name="mic" size={28} color="#0084ff" style={styles.inputIcon} />
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Aa"
              placeholderTextColor="#65676b"
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <Ionicons name="happy" size={24} color="#0084ff" style={styles.emojiIcon} />
          </View>
          {inputText.trim() !== '' ? (
            <Pressable onPress={sendMessage}>
              <Ionicons name="send" size={28} color="#0084ff" style={styles.inputIcon} />
            </Pressable>
          ) : (
            <Ionicons name="thumbs-up" size={28} color="#0084ff" style={styles.inputIcon} />
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitleTextContainer: {
    marginLeft: 8,
  },
  headerTitleName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  headerTitleActive: {
    fontSize: 12,
    color: '#65676b',
  },
  backButton: {
    marginRight: 16,
    marginLeft: Platform.OS === 'web' ? 16 : 0,
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Platform.OS === 'web' ? 16 : 0,
  },
  headerIcon: {
    marginRight: 16,
  },
  messagesList: {
    padding: 16,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  myMessageRow: {
    justifyContent: 'flex-end',
  },
  otherMessageRow: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft: 8,
  },
  myMessageBubble: {
    backgroundColor: '#0084ff',
  },
  otherMessageBubble: {
    backgroundColor: '#e4e6eb',
  },
  messageText: {
    fontSize: 15,
  },
  myMessageText: {
    color: '#fff',
  },
  otherMessageText: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#e4e6eb',
    backgroundColor: '#fff',
  },
  inputIcon: {
    marginLeft: 12,
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    borderRadius: 20,
    paddingHorizontal: 12,
    marginLeft: 12,
    minHeight: 36,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    maxHeight: 100,
    paddingTop: 8,
    paddingBottom: 8,
  },
  emojiIcon: {
    marginLeft: 8,
  },
});
