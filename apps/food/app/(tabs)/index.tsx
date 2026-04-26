import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { CATEGORIES, RESTAURANTS } from '../../data/dummy';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
  const router = useRouter();

  const renderCategory = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.categoryCard}>
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Deliver to</Text>
          <Text style={styles.address}>123 Main St, City <Ionicons name="chevron-down" size={16} /></Text>
        </View>
        <TouchableOpacity style={styles.cartBtn} onPress={() => router.push('/cart')}>
          <Ionicons name="cart" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Categories</Text>
      <FlatList
        data={CATEGORIES}
        renderItem={renderCategory}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
      />

      <Text style={styles.sectionTitle}>Featured Restaurants</Text>
      {RESTAURANTS.map(restaurant => (
        <TouchableOpacity 
          key={restaurant.id} 
          style={styles.restaurantCard}
          onPress={() => router.push(`/restaurant/${restaurant.id}` as any)}
        >
          <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
          <View style={styles.restaurantInfo}>
            <View style={styles.restaurantHeader}>
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{restaurant.rating}</Text>
              </View>
            </View>
            <Text style={styles.restaurantDetails}>
              {restaurant.deliveryTime} • ${restaurant.deliveryFee.toFixed(2)} delivery
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 20,
  },
  greeting: {
    fontSize: 14,
    color: '#666',
  },
  address: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartBtn: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryIcon: {
    fontSize: 32,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 30,
    marginBottom: 8,
    overflow: 'hidden',
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '500',
  },
  restaurantCard: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  restaurantImage: {
    width: '100%',
    height: 150,
  },
  restaurantInfo: {
    padding: 12,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: 'bold',
  },
  restaurantDetails: {
    color: '#666',
  },
});
