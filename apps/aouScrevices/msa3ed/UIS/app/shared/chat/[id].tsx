import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, FlatList, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { useEffect, useState, useRef } from 'react';
import { fetchOrderChat, sendMessage, addLocalMessage } from '../../../store/slices/chatSlice';
import * as signalR from '@microsoft/signalr';
import { API_BASE_URL } from '../../../services/api';

export default function ChatDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { currentChat, loading } = useSelector((state: RootState) => state.chat);
  const { user, token } = useSelector((state: RootState) => state.auth);
  
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderChat(id as string));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (!currentChat?.id || !token) return;

    let isMounted = true;
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${API_BASE_URL}/hubs/chat`, {
        accessTokenFactory: () => token
      })
      .withAutomaticReconnect()
      .build();

    const startConnection = async () => {
      try {
        await connection.start();
        if (isMounted) {
          console.log('Connected to Chat Hub');
          await connection.invoke('JoinChat', currentChat.id);
          connectionRef.current = connection;
        } else {
          await connection.stop();
        }
      } catch (err) {
        console.error('Chat Hub Start Error: ', err);
      }
    };

    connection.on('ReceiveMessage', (message) => {
      dispatch(addLocalMessage(message));
      setTimeout(() => flatListRef.current?.scrollToEnd(), 100);
    });

    startConnection();

    return () => {
      isMounted = false;
      if (connection.state === signalR.HubConnectionState.Connected || connection.state === signalR.HubConnectionState.Connecting) {
        connection.stop().catch(e => console.log('Stop error ignored:', e));
      }
    };
  }, [currentChat?.id, token, dispatch]);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    setSending(true);
    try {
      await dispatch(sendMessage({ chatId: currentChat.id, content: inputText })).unwrap();
      setInputText('');
    } catch (err: any) {
      alert('فشل في إرسال الرسالة: ' + err.message);
    } finally {
      setSending(false);
    }
  };

  const renderMessage = ({ item, index }: any) => {
    const isSender = item.senderId === user?.id;
    return (
      <View style={[styles.messageBubble, isSender ? styles.senderBubble : styles.receiverBubble]}>
        <Text style={[styles.messageText, isSender ? styles.senderText : styles.receiverText]}>{item.content}</Text>
        <Text style={[styles.timeText, isSender ? styles.senderTime : styles.receiverTime]}>
            {new Date(item.sentAt || item.createdAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  if (loading && !currentChat) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-forward" size={24} color={Colors.text} />
        </Pressable>
        <div className="flex flex-col items-center">
          <Text style={styles.headerTitle}>المحادثة #{id?.toString().substring(0,8)}</Text>
          <Text style={styles.headerStatus}>متصل الآن</Text>
        </div>
        <View style={styles.backBtn} />
      </View>

      <FlatList
        ref={flatListRef}
        data={currentChat?.messages || []}
        keyExtractor={item => item.id?.toString() || Math.random().toString()}
        renderItem={renderMessage}
        contentContainerStyle={styles.chatList}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Text style={{ color: Colors.textSecondary }}>لا توجد رسائل</Text>
          </View>
        }
      />

      <View style={styles.inputContainer}>
        <Pressable style={styles.attachBtn}>
          <Ionicons name="attach" size={24} color={Colors.textSecondary} />
        </Pressable>
        <TextInput 
          style={styles.input} 
          placeholder="اكتب رسالتك هنا..." 
          placeholderTextColor={Colors.textSecondary}
          multiline
          value={inputText}
          onChangeText={setInputText}
          editable={!sending}
        />
        <Pressable style={styles.sendBtn} onPress={handleSend} disabled={sending}>
          {sending ? <ActivityIndicator size="small" color={Colors.white} /> : <Ionicons name="send" size={20} color={Colors.white} style={{ marginLeft: 4 }} />}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 24, paddingTop: 60, backgroundColor: Colors.white, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2, zIndex: 10 },
  backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text },
  headerStatus: { fontSize: 12, color: Colors.success, fontWeight: '500' },
  chatList: { padding: 24, paddingBottom: 16 },
  messageBubble: { maxWidth: '80%', padding: 16, borderRadius: 20, marginBottom: 12 },
  senderBubble: { alignSelf: 'flex-start', backgroundColor: Colors.primary, borderBottomLeftRadius: 4 },
  receiverBubble: { alignSelf: 'flex-end', backgroundColor: Colors.white, borderBottomRightRadius: 4, borderWidth: 1, borderColor: Colors.border },
  messageText: { fontSize: 16, lineHeight: 24 },
  senderText: { color: Colors.white },
  receiverText: { color: Colors.text },
  timeText: { fontSize: 11, marginTop: 8, alignSelf: 'flex-end' },
  senderTime: { color: 'rgba(255,255,255,0.7)' },
  receiverTime: { color: Colors.textSecondary },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 16, paddingBottom: Platform.OS === 'ios' ? 32 : 16, backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.border },
  attachBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  input: { flex: 1, minHeight: 44, maxHeight: 100, backgroundColor: Colors.background, borderRadius: 22, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12, fontSize: 16, color: Colors.text, textAlign: 'right' },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center', marginLeft: 12 },
});
