import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withDelay, 
  Easing,
  interpolate,
  Extrapolation
} from 'react-native-reanimated';
import { MapPin } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const PulseCircle = ({ delay }: { delay: number }) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: 2000,
          easing: Easing.out(Easing.ease),
        }),
        -1,
        false
      )
    );
  }, [delay, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: interpolate(
        scale.value,
        [0, 1],
        [0.8, 0],
        Extrapolation.CLAMP
      ),
    };
  });

  return <Animated.View style={[styles.circle, animatedStyle]} />;
};

export default function FindingDriver() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/trip');
    }, 4000); // Wait 4 seconds then go to trip screen

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Connecting you to a driver...</Text>
        <Text style={styles.subtitle}>Matching you with the best available ride.</Text>

        <View style={styles.radarContainer}>
          <PulseCircle delay={0} />
          <PulseCircle delay={600} />
          <PulseCircle delay={1200} />
          
          <View style={styles.centerDot}>
            <MapPin color="#fff" size={24} />
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel Request</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  radarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: '#000',
    opacity: 0,
  },
  centerDot: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});
