import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { DUMMY_CHATS } from '../data/dummy';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Square, SquarePen, Send } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ChatScreen() {
  const insets = useSafeAreaInsets();

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <Animated.View 
        entering={FadeInUp.delay(index * 100).springify()}
        style={styles.chatRow}
      >
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.chatInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.statusRow}>
            {item.status === 'New Snap' ? (
              <Square color="#E92754" size={14} fill="#E92754" />
            ) : item.status === 'Opened' ? (
              <Square color="#E92754" size={14} />
            ) : (
              <Send color="#00B4D8" size={14} fill="#00B4D8" />
            )}
            <Text style={[styles.statusText, item.status === 'New Snap' && styles.newStatus]}>
              {item.status} • {item.time}
            </Text>
          </View>
        </View>
        <View style={styles.actionIcon}>
          <SquarePen color="#E0E0E0" size={24} />
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat</Text>
      </View>
      <FlatList
        data={DUMMY_CHATS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  listContent: {
    paddingBottom: 100,
  },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#222',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333',
  },
  chatInfo: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    color: '#999',
    fontSize: 13,
  },
  newStatus: {
    color: '#E92754',
    fontWeight: '600',
  },
  actionIcon: {
    padding: 10,
  },
});