import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react-native';
import { DUMMY_SPOTLIGHT } from '../data/dummy';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const SpotlightItem = ({ item }: any) => {
  return (
    <View style={styles.videoContainer}>
      <Image source={{ uri: item.videoUrl }} style={styles.video} />
      
      {/* Right Actions */}
      <View style={styles.actionsContainer}>
        <View style={styles.actionItem}>
          <Heart color="#fff" size={32} />
          <Text style={styles.actionText}>{item.likes}</Text>
        </View>
        <View style={styles.actionItem}>
          <MessageCircle color="#fff" size={32} />
          <Text style={styles.actionText}>{item.comments}</Text>
        </View>
        <View style={styles.actionItem}>
          <Share2 color="#fff" size={32} />
          <Text style={styles.actionText}>Share</Text>
        </View>
        <View style={styles.actionItem}>
          <MoreHorizontal color="#fff" size={32} />
        </View>
      </View>

      {/* Bottom Info */}
      <View style={styles.bottomInfo}>
        <View style={styles.userInfo}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <Text style={styles.username}>@{item.username}</Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.musicRow}>
          <Text style={styles.musicText}>🎵 {item.music}</Text>
        </View>
      </View>
    </View>
  );
};

export default function SpotlightScreen() {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={DUMMY_SPOTLIGHT}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SpotlightItem item={item} />}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        snapToInterval={SCREEN_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  actionsContainer: {
    position: 'absolute',
    right: 15,
    bottom: 120,
    alignItems: 'center',
    gap: 25,
  },
  actionItem: {
    alignItems: 'center',
    gap: 5,
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  bottomInfo: {
    position: 'absolute',
    bottom: 120,
    left: 15,
    right: 80,
    gap: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  description: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  musicRow: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  musicText: {
    color: '#fff',
    fontSize: 13,
  },
});