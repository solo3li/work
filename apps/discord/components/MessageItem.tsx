import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '../constants/Colors';

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface MessageItemProps {
  user: User;
  content: string;
  timestamp: string;
}

export default function MessageItem({ user, content, timestamp }: MessageItemProps) {
  if (!user) return null;
  
  return (
    <View style={styles.container}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.username}>{user.name}</Text>
          <Text style={styles.timestamp}>{timestamp}</Text>
        </View>
        <Text style={styles.content}>{content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginTop: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
    backgroundColor: Colors.divider,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  username: {
    color: Colors.white,
    fontWeight: '500',
    fontSize: 16,
    marginRight: 8,
  },
  timestamp: {
    color: Colors.textMuted,
    fontSize: 12,
  },
  content: {
    color: Colors.text,
    fontSize: 16,
    lineHeight: 22,
  },
});
