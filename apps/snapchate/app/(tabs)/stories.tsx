import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { DUMMY_STORIES } from '../data/dummy';
import Animated, { FadeInRight, useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const StoryRing = ({ children }: { children: React.ReactNode }) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 3000, easing: Easing.linear }),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={styles.ringContainer}>
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <LinearGradient
          colors={['#A612A6', '#FF0050', '#FFFC00']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        />
      </Animated.View>
      <View style={styles.innerRing}>{children}</View>
    </View>
  );
};

export default function StoriesScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.headerTitle}>Friends</Text>
      <View style={styles.friendsList}>
        {DUMMY_STORIES.map((item, index) => (
          <Animated.View key={item.id} entering={FadeInRight.delay(index * 50).springify()} style={styles.friendRow}>
            <StoryRing>
               <Image source={{ uri: item.avatar }} style={styles.friendRowAvatar} />
            </StoryRing>
            <View style={styles.friendRowInfo}>
              <Text style={styles.friendRowName}>{item.name}</Text>
              <Text style={styles.friendRowTime}>{item.time}</Text>
            </View>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  friendsList: {
    paddingBottom: 120,
    gap: 20,
  },
  friendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  friendRowInfo: {
    marginLeft: 15,
  },
  friendRowName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  friendRowTime: {
    color: '#888',
    fontSize: 14,
  },
  friendRowAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  ringContainer: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
    borderRadius: 32,
  },
  innerRing: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});