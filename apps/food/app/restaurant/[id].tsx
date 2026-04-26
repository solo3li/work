import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { RESTAURANTS, MENU_ITEMS } from '../../data/dummy';
import { useCart } from '../../context/CartContext';
import { Ionicons } from '@expo/vector-icons';

export default function RestaurantDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addItem, totalItems } = useCart();
  
  const restaurant = RESTAURANTS.find(r => r.id === id);
  const menuItems = MENU_ITEMS.filter(m => m.restaurantId === id);

  if (!restaurant) {
    return <Text>Restaurant not found</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: restaurant.image }} style={styles.coverImage} />
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{restaurant.name}</Text>
          <View style={styles.meta}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.metaText}>{restaurant.rating} • {restaurant.deliveryTime}</Text>
          </View>
          <Text style={styles.description}>{restaurant.description}</Text>
        </View>

        <Text style={styles.sectionTitle}>Menu</Text>
        {menuItems.map(item => (
          <View key={item.id} style={styles.menuItem}>
            <View style={styles.menuItemInfo}>
              <Text style={styles.menuItemName}>{item.name}</Text>
              <Text style={styles.menuItemDescription}>{item.description}</Text>
              <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
            </View>
            <Image source={{ uri: item.image }} style={styles.menuItemImage} />
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => addItem({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: 1,
                restaurantId: restaurant.id
              })}
            >
              <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}
        {/* Spacer for bottom cart button */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {totalItems > 0 && (
        <TouchableOpacity style={styles.viewCartButton} onPress={() => router.push('/cart')}>
          <Text style={styles.viewCartText}>View Cart ({totalItems} items)</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  coverImage: {
    width: '100%',
    height: 250,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 20,
  },
  infoContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaText: {
    marginLeft: 4,
    color: '#666',
    fontWeight: '500',
  },
  description: {
    color: '#666',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginVertical: 16,
  },
  menuItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  menuItemInfo: {
    flex: 1,
    paddingRight: 16,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  menuItemDescription: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF5A5F',
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#FF5A5F',
    borderRadius: 20,
    padding: 4,
  },
  viewCartButton: {
    position: 'absolute',
    bottom: 30,
    left: 16,
    right: 16,
    backgroundColor: '#FF5A5F',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  viewCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
