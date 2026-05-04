import { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useStore, Order } from './store/useStore';

export default function Orders() {
  const { user, orders, fetchOrders } = useStore();

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (!user) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Please login to view your orders.</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Order }) => {
    const total = item.orderItems.reduce((sum, oi) => sum + (oi.quantity * oi.unitPrice), 0);
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.orderId}>Order #{item.id}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Completed</Text>
          </View>
        </View>
        
        <Text style={styles.date}>{new Date(item.orderDate).toLocaleString()}</Text>
        
        <View style={styles.itemsList}>
          {item.orderItems.map((oi, index) => (
            <View key={index} style={styles.orderItem}>
              <Text style={styles.itemName}>
                {oi.quantity}x {oi.product?.name || `Product #${oi.productId}`}
              </Text>
              <Text style={styles.itemPrice}>${(oi.quantity * oi.unitPrice).toFixed(2)}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {orders.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>You have no orders yet.</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  emptyText: {
    fontSize: 18,
    color: '#868e96',
    fontWeight: '500',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 20,
    fontWeight: '800',
    color: '#212529',
  },
  statusBadge: {
    backgroundColor: '#d3f9d8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#2b8a3e',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  date: {
    fontSize: 14,
    color: '#868e96',
    marginBottom: 16,
    fontWeight: '500',
  },
  itemsList: {
    borderTopWidth: 1,
    borderTopColor: '#f1f3f5',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
    paddingVertical: 16,
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 15,
    color: '#495057',
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: 15,
    color: '#212529',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    color: '#495057',
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#007AFF',
  },
});
