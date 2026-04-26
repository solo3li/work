import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface AvatarProps {
  url: string;
  size?: number;
  isOnline?: boolean;
}

export default function Avatar({ url, size = 50, isOnline = false }: AvatarProps) {
  return (
    <View style={[{ width: size, height: size }, styles.container]}>
      <Image source={{ uri: url }} style={[{ width: size, height: size, borderRadius: size / 2 }]} />
      {isOnline && (
        <View
          style={[
            styles.onlineIndicator,
            { width: size * 0.28, height: size * 0.28, borderRadius: size * 0.14 },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#31a24c',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
});
