import { View, Text, StyleSheet, Dimensions, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { REELS } from '../../data/dummy';

const { height, width } = Dimensions.get('window');

// We use a simple placeholder for video since we might not have expo-av installed.
function ReelItem({ reel }: { reel: any }) {
  return (
    <View style={styles.reelContainer}>
      {/* Video Placeholder */}
      <View style={styles.videoPlaceholder}>
        <Text style={styles.placeholderText}>Video Placeholder</Text>
        <Text style={styles.placeholderUrl}>{reel.video}</Text>
      </View>

      <View style={styles.overlay}>
        <View style={styles.rightActions}>
          <View style={styles.actionItem}>
            <Ionicons name="heart-outline" size={35} color="#fff" />
            <Text style={styles.actionText}>{reel.likes}</Text>
          </View>
          <View style={styles.actionItem}>
            <Ionicons name="chatbubble-outline" size={32} color="#fff" />
            <Text style={styles.actionText}>{reel.comments}</Text>
          </View>
          <View style={styles.actionItem}>
            <Ionicons name="paper-plane-outline" size={32} color="#fff" />
          </View>
          <View style={styles.actionItem}>
            <Ionicons name="ellipsis-horizontal" size={28} color="#fff" />
          </View>
        </View>

        <View style={styles.bottomInfo}>
          <View style={styles.userInfo}>
            <View style={styles.avatarPlaceholder} />
            <Text style={styles.username}>{reel.user.username}</Text>
            <View style={styles.followBtn}>
              <Text style={styles.followText}>Follow</Text>
            </View>
          </View>
          <Text style={styles.caption}>{reel.caption}</Text>
        </View>
      </View>
    </View>
  );
}

export default function ReelsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reels</Text>
        <Ionicons name="camera-outline" size={28} color="#fff" />
      </View>
      <FlatList
        data={REELS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ReelItem reel={item} />}
        pagingEnabled
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  reelContainer: {
    width,
    height: height - 80, // Approximate height minus bottom tab
    position: 'relative',
  },
  videoPlaceholder: {
    flex: 1,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholderText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  placeholderUrl: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 20,
  },
  rightActions: {
    position: 'absolute',
    bottom: 40,
    right: 15,
    alignItems: 'center',
  },
  actionItem: {
    alignItems: 'center',
    marginBottom: 25,
  },
  actionText: {
    color: '#fff',
    marginTop: 5,
    fontWeight: '600',
  },
  bottomInfo: {
    width: '80%',
    paddingBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarPlaceholder: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  username: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginRight: 10,
  },
  followBtn: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  followText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  caption: {
    color: '#fff',
    fontSize: 14,
  },
});
