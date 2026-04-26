import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useCart } from '../context/CartContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Cart() {
  const { items, removeItem, addItem, totalAmount, clearCart } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="cart-outline" size={64} color="#ccc" />
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <TouchableOpacity style={styles.browseButton} onPress={() => router.back()}>
          <Text style={styles.browseButtonText}>Browse Restaurants</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity style={styles.quantityBtn} onPress={() => removeItem(item.id)}>
                <Ionicons name="remove" size={20} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity style={styles.quantityBtn} onPress={() => addItem({ ...item, quantity: 1 })}>
                <Ionicons name="add" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
        </View>
        <TouchableOpacity 
          style={styles.checkoutButton}
          onPress={() => {
            Alert.alert('Success', 'Order placed successfully!');
            clearCart();
            router.push('/(tabs)');
          }}
        >
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: '#FF5A5F',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemPrice: {
    color: '#666',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
  },
  quantityBtn: {
    padding: 8,
  },
  quantityText: {
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF5A5F',
  },
  checkoutButton: {
    backgroundColor: '#FF5A5F',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
