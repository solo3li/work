import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { RESTAURANTS } from '../../data/dummy';
import { Ionicons } from '@expo/vector-icons';

const PAST_ORDERS = [
  {
    id: 'o1',
    restaurantId: 'r1',
    date: 'Oct 24, 2023',
    status: 'Delivered',
    total: 25.47,
    items: 3
  },
  {
    id: 'o2',
    restaurantId: 'r2',
    date: 'Oct 20, 2023',
    status: 'Delivered',
    total: 14.99,
    items: 1
  },
  {
    id: 'o3',
    restaurantId: 'r4',
    date: 'Oct 15, 2023',
    status: 'Delivered',
    total: 14.98,
    items: 2
  }
];

export default function Orders() {
  const renderOrder = ({ item }: { item: any }) => {
    const restaurant = RESTAURANTS.find(r => r.id === item.restaurantId);
    
    if (!restaurant) return null;

    return (
      <View style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
          <View style={styles.orderInfo}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <Text style={styles.orderDate}>{item.date} • {item.items} items</Text>
          </View>
          <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.orderFooter}>
          <View style={styles.statusContainer}>
            <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
          <TouchableOpacity style={styles.reorderButton}>
            <Text style={styles.reorderButtonText}>Reorder</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Past Orders</Text>
      <FlatList
        data={PAST_ORDERS}
        keyExtractor={item => item.id}
        renderItem={renderOrder}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: 16,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  restaurantImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  orderInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  orderDate: {
    color: '#666',
    fontSize: 14,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginBottom: 12,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    color: '#4CAF50',
    marginLeft: 4,
    fontWeight: '500',
  },
  reorderButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  reorderButtonText: {
    fontWeight: 'bold',
    color: '#333',
  },
});
