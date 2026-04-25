import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function Story({ user }: { user: any }) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={[styles.imageContainer, !user.hasSeen && styles.unseen]}>
        <Image source={{ uri: user.avatar }} style={styles.image} />
      </View>
      <Text style={styles.username} numberOfLines={1}>
        {user.username}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 72,
  },
  imageContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unseen: {
    borderWidth: 2,
    borderColor: '#e1306c', // Instagram pink/red gradient simplified
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fff',
  },
  username: {
    marginTop: 4,
    fontSize: 12,
    color: '#000',
  },
});
