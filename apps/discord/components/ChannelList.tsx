import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { getChannelsForServer, SERVERS } from '../utils/data';
import { Colors } from '../constants/Colors';
import { useRouter, useLocalSearchParams, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface ChannelListProps {
  serverId: string;
  onClose?: () => void;
}

export default function ChannelList({ serverId, onClose }: ChannelListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const channels = getChannelsForServer(serverId);
  const server = SERVERS.find(s => s.id === serverId);

  const handleChannelPress = (channelId: string) => {
    router.push(`/(tabs)/servers/${serverId}/${channelId}`);
    if (onClose) onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{server?.name || 'Server'}</Text>
        {onClose && (
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={Colors.text} />
          </Pressable>
        )}
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.categoryHeader}>
          <Ionicons name="chevron-down" size={12} color={Colors.textMuted} style={styles.categoryIcon} />
          <Text style={styles.categoryText}>TEXT CHANNELS</Text>
        </View>
        {channels.map((channel) => {
          const isActive = pathname.includes(`/${channel.id}`);
          return (
            <Pressable 
              key={channel.id} 
              style={[styles.channelItem, isActive && styles.channelItemActive]}
              onPress={() => handleChannelPress(channel.id)}
            >
              <Ionicons 
                name={channel.type === 'voice' ? "volume-medium" : "color-filter-outline"} 
                size={20} 
                color={isActive ? Colors.text : Colors.textMuted} 
                style={styles.channelIcon}
              />
              <Text style={[styles.channelText, isActive && styles.channelTextActive]}>
                {channel.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.channelBackground,
  },
  header: {
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    zIndex: 2,
  },
  headerText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
    paddingTop: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  categoryIcon: {
    marginRight: 4,
  },
  categoryText: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: 'bold',
  },
  channelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginHorizontal: 8,
    borderRadius: 4,
    marginBottom: 2,
  },
  channelItemActive: {
    backgroundColor: Colors.messageHover,
  },
  channelIcon: {
    marginRight: 6,
  },
  channelText: {
    color: Colors.textMuted,
    fontSize: 16,
    fontWeight: '500',
  },
  channelTextActive: {
    color: Colors.white,
  },
});
