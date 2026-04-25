import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>You</Text>
      </View>
      
      <View style={styles.profileSection}>
        <View style={styles.banner} />
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
            style={styles.avatar} 
          />
          <View style={styles.statusIndicator} />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.username}>Solo</Text>
          <Text style={styles.tag}>solo#1234</Text>
        </View>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.settingsHeader}>USER SETTINGS</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Account</Text>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Privacy & Safety</Text>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Connections</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.channelBackground,
  },
  headerTitle: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  profileSection: {
    backgroundColor: Colors.channelBackground,
    marginBottom: 16,
  },
  banner: {
    height: 120,
    backgroundColor: Colors.primary,
  },
  avatarContainer: {
    position: 'absolute',
    top: 76,
    left: 16,
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.channelBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.green,
    borderWidth: 4,
    borderColor: Colors.channelBackground,
  },
  userInfo: {
    marginTop: 56,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  username: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  tag: {
    color: Colors.textMuted,
    fontSize: 16,
  },
  settingsSection: {
    paddingHorizontal: 16,
  },
  settingsHeader: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  settingItem: {
    backgroundColor: Colors.channelBackground,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  settingText: {
    color: Colors.white,
    fontSize: 16,
  },
});
