import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from 'react-native-reanimated';

interface PostProps {
  post: any;
}

export default function Post({ post }: PostProps) {
  const [liked, setLiked] = useState(false);
  const likeScale = useSharedValue(1);

  const handleLike = () => {
    setLiked(!liked);
    likeScale.value = withSequence(
      withSpring(1.5, { damping: 10, stiffness: 400 }),
      withSpring(1, { damping: 10, stiffness: 400 })
    );
  };

  const likeAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: likeScale.value }],
    };
  });

  return (
    <View style={styles.container}>
      {/* Post Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.userName}>{post.user.name}</Text>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{post.time}</Text>
              <Text style={styles.dot}>•</Text>
              <Ionicons name="earth" size={12} color="#65676B" />
            </View>
          </View>
        </View>
        <TouchableOpacity>
          <MaterialCommunityIcons name="dots-horizontal" size={24} color="#65676B" />
        </TouchableOpacity>
      </View>

      {/* Post Content */}
      {post.content ? (
        <Text style={styles.content}>{post.content}</Text>
      ) : null}

      {/* Post Image */}
      {post.image ? (
        <Image source={{ uri: post.image }} style={styles.image} resizeMode="cover" />
      ) : null}

      {/* Post Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.likesStats}>
          <View style={styles.likeIconContainer}>
            <Ionicons name="thumbs-up" size={12} color="white" />
          </View>
          <Text style={styles.statsText}>{post.likes + (liked ? 1 : 0)}</Text>
        </View>
        <Text style={styles.statsText}>{post.comments} comments • {post.shares} shares</Text>
      </View>

      <View style={styles.divider} />

      {/* Post Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike} activeOpacity={0.8}>
          <Animated.View style={likeAnimatedStyle}>
            <Ionicons
              name={liked ? "thumbs-up" : "thumbs-up-outline"}
              size={22}
              color={liked ? "#1877F2" : "#65676B"}
            />
          </Animated.View>
          <Text style={[styles.actionText, liked && { color: '#1877F2' }]}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={22} color="#65676B" />
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialCommunityIcons name="share-outline" size={24} color="#65676B" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  userInfo: {
    flexDirection: 'row',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  timeText: {
    color: '#65676B',
    fontSize: 13,
  },
  dot: {
    color: '#65676B',
    fontSize: 13,
    marginHorizontal: 4,
  },
  content: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    fontSize: 15,
    lineHeight: 20,
  },
  image: {
    width: '100%',
    height: 300,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  likesStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeIconContainer: {
    backgroundColor: '#1877F2',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  statsText: {
    color: '#65676B',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#E4E6EB',
    marginHorizontal: 15,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  actionText: {
    color: '#65676B',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 5,
  },
});
