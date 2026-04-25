import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { COLORS, FONTS, SPACING } from '../../theme';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function OrdersScreen() {
  const { orders } = useSelector((state: RootState) => state.shop);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'green';
      case 'shipped': return COLORS.gold;
      default: return COLORS.black;
    }
  };

  const renderOrder = ({ item }: { item: any }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>ORDER #{item.id}</Text>
        <Text style={styles.orderDate}>{new Date(item.created).toLocaleDateString()}</Text>
      </View>
      
      <View style={styles.orderBody}>
        <Text style={styles.itemCount}>{item.items.length} Items</Text>
        <Text style={styles.total}>${item.total_cost}</Text>
      </View>

      <View style={styles.statusBadge}>
        <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
        <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.gold} />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No orders found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: SPACING.lg,
  },
  orderCard: {
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    marginBottom: SPACING.md,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  orderId: {
    fontFamily: FONTS.montserrat,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
  },
  orderDate: {
    fontFamily: FONTS.montserrat,
    fontSize: 10,
    color: COLORS.gray,
  },
  orderBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: SPACING.md,
  },
  itemCount: {
    fontFamily: FONTS.montserrat,
    fontSize: 14,
    color: COLORS.grayDark,
  },
  total: {
    fontFamily: FONTS.playfair,
    fontSize: 20,
    color: COLORS.black,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontFamily: FONTS.montserrat,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
  },
  empty: {
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontFamily: FONTS.playfair,
    fontSize: 16,
    color: COLORS.gray,
  },
});
