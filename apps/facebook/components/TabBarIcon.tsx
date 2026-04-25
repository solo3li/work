import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from 'react-native-reanimated';

interface TabBarIconProps {
  focused: boolean;
  color: string;
  children: React.ReactNode;
}

export default function TabBarIcon({ focused, color, children }: TabBarIconProps) {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (focused) {
      scale.value = withSequence(
        withSpring(0.8, { damping: 10, stiffness: 400 }),
        withSpring(1.2, { damping: 10, stiffness: 400 }),
        withSpring(1, { damping: 10, stiffness: 400 })
      );
    } else {
      scale.value = withSpring(1);
    }
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyle}>
        {children}
      </Animated.View>
      {focused && <View style={[styles.indicator, { backgroundColor: color }]} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: 50,
  },
  indicator: {
    position: 'absolute',
    bottom: -10, // Adjust based on tab bar layout
    height: 3,
    width: '100%',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
});
