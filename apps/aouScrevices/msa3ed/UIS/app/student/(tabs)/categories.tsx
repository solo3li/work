import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { Colors } from '../../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { DUMMY_CATEGORIES } from '../../../constants/dummyData';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function CategoriesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>أقسام الخدمات</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {DUMMY_CATEGORIES.map((cat, index) => (
          <Animated.View key={cat.id} entering={FadeInUp.delay(index * 50)} style={styles.cardWrapper}>
            <Pressable style={styles.card}>
              <LinearGradient
                colors={[`${cat.color}`, Colors.white]}
                style={styles.cardGradient}
              >
                <View style={styles.iconContainer}>
                  <Ionicons name={cat.icon as any} size={36} color={Colors.primary} />
                </View>
                <Text style={styles.title}>{cat.title}</Text>
                <Text style={styles.subtitle}>تصفح الخدمات</Text>
              </LinearGradient>
            </Pressable>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: Colors.white,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.text,
  },
  grid: {
    padding: 24,
    paddingBottom: 100,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: width / 2 - 32,
    marginBottom: 16,
  },
  card: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardGradient: {
    padding: 24,
    alignItems: 'center',
    height: 160,
    justifyContent: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
