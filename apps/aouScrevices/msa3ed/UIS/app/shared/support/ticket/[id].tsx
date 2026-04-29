import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, FlatList, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import { fetchTicketById, replyToTicket } from '../../../../store/slices/ticketsSlice';

export default function TicketDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { currentTicket: ticket, loading } = useSelector((state: RootState) => state.tickets);
  const { user } = useSelector((state: RootState) => state.auth);

  const [inputText, setInputText] = useState('');
  const [recording, setRecording] = useState<Audio.Recording | undefined>();
  const [isRecording, setIsRecording] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchTicketById(id as string));
    }
  }, [id, dispatch]);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    setSending(true);
    try {
      await dispatch(replyToTicket({ id: id as string, content: inputText })).unwrap();
      setInputText('');
      // Optionally re-fetch ticket to get messages
      dispatch(fetchTicketById(id as string));
    } catch (err: any) {
      alert('فشل في إرسال الرد: ' + err.message);
    } finally {
      setSending(false);
    }
  };

  const renderMessage = ({ item }: any) => {
    const isSender = item.senderId === user?.id || item.isSender;
    return (
      <View style={[styles.messageBubble, isSender ? styles.userBubble : styles.supportBubble]}>
        <Text style={[styles.messageText, isSender ? styles.userText : styles.supportText]}>{item.content || item.text}</Text>
        <Text style={[styles.timeText, isSender ? styles.userTime : styles.supportTime]}>{item.createdAt || item.time}</Text>
      </View>
    );
  };

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    setIsRecording(false);
    if (!recording) return;
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    alert('تم تسجيل المقطع الصوتي وسيتم إرساله: ' + uri);
  }

  if (loading || !ticket) {
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
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>#{ticket.id}</Text>
          <Text style={styles.headerStatus}>{ticket.status}</Text>
        </View>
        <View style={styles.backBtn} />
      </View>

      <View style={styles.subjectBox}>
        <Text style={styles.subjectTitle}>{ticket.subject}</Text>
      </View>

      <FlatList
        data={ticket.messages || []}
        keyExtractor={item => item.id?.toString() || Math.random().toString()}
        renderItem={renderMessage}
        contentContainerStyle={styles.chatList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 20 }}>
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
          placeholder={isRecording ? "جاري التسجيل..." : "اكتب ردك هنا..."}
          placeholderTextColor={isRecording ? Colors.error : Colors.textSecondary}
          multiline
          value={inputText}
          onChangeText={setInputText}
          editable={!isRecording && !sending}
        />

        {inputText.length > 0 ? (
          <Pressable style={styles.sendBtn} onPress={handleSend} disabled={sending}>
            {sending ? <ActivityIndicator size="small" color={Colors.white} /> : <Ionicons name="send" size={20} color={Colors.white} style={{ marginLeft: 4 }} />}
          </Pressable>
        ) : (
          <Pressable 
            style={[styles.sendBtn, isRecording && { backgroundColor: Colors.error }]} 
            onPress={isRecording ? stopRecording : startRecording}
            disabled={sending}
          >
            <Ionicons name={isRecording ? "stop" : "mic"} size={20} color={Colors.white} />
          </Pressable>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 24, paddingTop: 60, backgroundColor: Colors.white, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2, zIndex: 10 },
  backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  headerInfo: { alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text },
  headerStatus: { fontSize: 12, color: Colors.success, fontWeight: '500' },
  subjectBox: { backgroundColor: Colors.primary + '10', padding: 16, marginHorizontal: 24, marginTop: 16, borderRadius: 12, borderWidth: 1, borderColor: Colors.primary + '30' },
  subjectTitle: { fontSize: 15, fontWeight: 'bold', color: Colors.text },
  chatList: { padding: 24 },
  messageBubble: { maxWidth: '85%', padding: 16, borderRadius: 20, marginBottom: 12 },
  userBubble: { alignSelf: 'flex-start', backgroundColor: Colors.white, borderBottomLeftRadius: 4, borderWidth: 1, borderColor: Colors.border },
  supportBubble: { alignSelf: 'flex-end', backgroundColor: Colors.primary, borderBottomRightRadius: 4 },
  messageText: { fontSize: 16, lineHeight: 24 },
  userText: { color: Colors.text },
  supportText: { color: Colors.white },
  timeText: { fontSize: 11, marginTop: 8, alignSelf: 'flex-end' },
  userTime: { color: Colors.textSecondary },
  supportTime: { color: 'rgba(255,255,255,0.7)' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 16, paddingBottom: Platform.OS === 'ios' ? 32 : 16, backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.border },
  attachBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  input: { flex: 1, minHeight: 44, maxHeight: 100, backgroundColor: Colors.background, borderRadius: 22, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12, fontSize: 16, color: Colors.text, textAlign: 'right' },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center', marginLeft: 12 },
});
