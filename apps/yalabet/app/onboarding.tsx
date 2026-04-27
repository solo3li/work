import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Logo from '../components/Logo';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  { id: '1', title: 'Welcome to 7rbit', description: 'The ultimate sports betting and casino experience.', icon: 'trophy' },
  { id: '2', title: 'Live Betting', description: 'Watch and bet on your favorite matches in real-time.', icon: 'play-circle' },
  { id: '3', title: 'Premium Casino', description: 'Enjoy thousands of slots, roulette, and live dealer games.', icon: 'game-controller' },
  { id: '4', title: 'Fast Payouts', description: 'Instant crypto and fiat withdrawals.', icon: 'wallet' },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false, listener: (event: any) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        setCurrentIndex(Math.round(index));
      } 
    }
  );

  const onNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      scrollRef.current?.scrollTo({ x: (currentIndex + 1) * width, animated: true });
    } else {
      router.replace('/(auth)/login');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {SLIDES.map((slide, index) => (
          <View key={slide.id} style={styles.slide}>
            <View style={styles.iconContainer}>
              {slide.id === '1' ? (
                <Logo size={100} />
              ) : (
                <Ionicons name={slide.icon as any} size={100} color={Colors.dark.tint} />
              )}
            </View>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.description}>{slide.description}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {SLIDES.map((_, index) => {
            const opacity = scrollX.interpolate({
              inputRange: [(index - 1) * width, index * width, (index + 1) * width],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            return <Animated.View key={index} style={[styles.dot, { opacity }]} />;
          })}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.skipButton} onPress={() => router.replace('/(tabs)')}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={onNext}>
            <Text style={styles.nextText}>{currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.dark.background },
  slide: { width, height: height * 0.7, alignItems: 'center', justifyContent: 'center', padding: 20 },
  iconContainer: { marginBottom: 40, padding: 20, backgroundColor: Colors.dark.card, borderRadius: 100, elevation: 10, shadowColor: Colors.dark.tint, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: Colors.dark.text, marginBottom: 15, textAlign: 'center' },
  description: { fontSize: 16, color: Colors.dark.text, opacity: 0.7, textAlign: 'center', paddingHorizontal: 20 },
  footer: { height: height * 0.3, justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 40 },
  pagination: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.dark.tint, marginHorizontal: 5 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  skipButton: { padding: 15 },
  skipText: { color: Colors.dark.text, opacity: 0.6, fontSize: 16, fontWeight: '600' },
  nextButton: { backgroundColor: Colors.dark.tint, paddingVertical: 15, paddingHorizontal: 30, borderRadius: 25, elevation: 5 },
  nextText: { color: '#000', fontSize: 16, fontWeight: 'bold' },
});