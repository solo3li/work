import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Post({ post }: { post: any }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
          <Text style={styles.username}>{post.user.username}</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Image */}
      <Image source={{ uri: post.image }} style={styles.postImage} />

      {/* Actions */}
      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity style={styles.actionIcon}>
            <Ionicons name="heart-outline" size={28} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionIcon}>
            <Ionicons name="chatbubble-outline" size={26} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionIcon}>
            <Ionicons name="paper-plane-outline" size={26} color="#000" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={26} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.likes}>{post.likes.toLocaleString()} likes</Text>
        
        <View style={styles.captionContainer}>
          <Text style={styles.usernameText}>{post.user.username}</Text>
          <Text style={styles.caption}> {post.caption}</Text>
        </View>

        <TouchableOpacity>
          <Text style={styles.comments}>View all {post.comments} comments</Text>
        </TouchableOpacity>

        <Text style={styles.timestamp}>{post.timestamp}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  username: {
    fontWeight: '600',
    fontSize: 14,
  },
  postImage: {
    width: '100%',
    height: 400,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginRight: 15,
  },
  info: {
    paddingHorizontal: 12,
  },
  likes: {
    fontWeight: '600',
    marginBottom: 4,
  },
  captionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  usernameText: {
    fontWeight: '600',
  },
  caption: {
    color: '#333',
  },
  comments: {
    color: '#777',
    marginBottom: 4,
  },
  timestamp: {
    color: '#999',
    fontSize: 12,
  },
});
