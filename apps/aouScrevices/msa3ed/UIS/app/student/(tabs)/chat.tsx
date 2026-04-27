import { View, Text, StyleSheet, FlatList, Image, Pressable, Dimensions } from 'react-native';
import { Colors } from '../../../constants/Colors';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import { useRouter } from 'expo-router';

const DUMMY_CHATS = [
  {
    id: '1',
    name: 'أحمد محمود',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    lastMessage: 'ممتاز، سأبدأ في العمل على الملف الآن.',
    time: '10:30 ص',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'د. سارة',
    avatar: 'https://i.pravatar.cc/150?u=a04258a2462d826712d',
    lastMessage: 'هل يمكنك تأكيد الموعد غداً؟',
    time: 'أمس',
    unread: 0,
    online: false,
  },
  {
    id: '3',
    name: 'منى عبدالله',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
    lastMessage: 'تم تسليم المشروع بنجاح.',
    time: 'منذ يومين',
    unread: 0,
    online: true,
  }
];

export default function ChatScreen() {
  const router = useRouter();

  const renderItem = ({ item, index }: any) => (
    <Animated.View entering={FadeInLeft.delay(index * 100)}>
      <Pressable style={styles.chatCard} onPress={() => router.push(`/shared/chat/${item.id}`)}>
        <View>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          {item.online && <View style={styles.onlineBadge} />}
        </View>
        <View style={styles.chatInfo}>
          <View style={styles.chatHeader}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={[styles.time, item.unread > 0 && styles.timeUnread]}>{item.time}</Text>
          </View>
          <View style={styles.messageRow}>
            <Text style={[styles.lastMessage, item.unread > 0 && styles.lastMessageUnread]} numberOfLines={1}>
              {item.lastMessage}
            </Text>
            {item.unread > 0 && (
              <LinearGradient
                colors={[Colors.primary, Colors.secondary]}
                style={styles.unreadBadge}
              >
                <Text style={styles.unreadText}>{item.unread}</Text>
              </LinearGradient>
            )}
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>الرسائل</Text>
      </View>
      <FlatList
        data={DUMMY_CHATS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: Colors.white,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.text,
  },
  list: {
    padding: 24,
    paddingBottom: 100,
  },
  chatCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 16,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    alignItems: 'center',
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.text,
  },
  time: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  timeUnread: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: Colors.textSecondary,
    flex: 1,
    marginRight: 16,
    lineHeight: 20,
  },
  lastMessageUnread: {
    color: Colors.text,
    fontWeight: 'bold',
  },
  unreadBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
