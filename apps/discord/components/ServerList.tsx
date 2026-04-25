import { ScrollView, View, StyleSheet, Image, Pressable } from 'react-native';
import { SERVERS, CHANNELS } from '../utils/data';
import { Colors } from '../constants/Colors';
import { useRouter, usePathname } from 'expo-router';

export default function ServerList() {
  const router = useRouter();
  const pathname = usePathname();

  const handleServerPress = (serverId: string) => {
    const defaultChannel = CHANNELS[serverId as keyof typeof CHANNELS]?.[0]?.id;
    if (defaultChannel) {
      router.push(`/(tabs)/servers/${serverId}/${defaultChannel}`);
    }
  };

  const isActive = (serverId: string) => pathname.includes(`/(tabs)/servers/${serverId}/`);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Pressable style={styles.iconContainer}>
        <View style={styles.discordIcon}>
          <Image source={require('../assets/images/react-logo.png')} style={{ width: 28, height: 28 }} tintColor={Colors.white} />
        </View>
      </Pressable>
      
      <View style={styles.separator} />

      {SERVERS.map((server) => {
        const active = isActive(server.id);
        return (
          <Pressable 
            key={server.id} 
            style={styles.serverWrapper}
            onPress={() => handleServerPress(server.id)}
          >
            <View style={[styles.activeIndicator, active && styles.activeIndicatorActive]} />
            <Image 
              source={{ uri: server.icon }} 
              style={[styles.serverIcon, active && styles.serverIconActive]} 
            />
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.serverBackground,
  },
  content: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 20,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  discordIcon: {
    width: 28,
    height: 28,
  },
  separator: {
    width: 32,
    height: 2,
    backgroundColor: Colors.divider,
    marginBottom: 8,
    borderRadius: 1,
  },
  serverWrapper: {
    position: 'relative',
    width: 48,
    height: 48,
    marginBottom: 8,
    justifyContent: 'center',
  },
  activeIndicator: {
    position: 'absolute',
    left: -12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.white,
    opacity: 0,
  },
  activeIndicatorActive: {
    opacity: 1,
    height: 40,
    borderRadius: 4,
    transform: [{ translateY: 0 }],
  },
  serverIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  serverIconActive: {
    borderRadius: 16,
  },
});
