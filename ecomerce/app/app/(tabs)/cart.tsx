import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS, SPACING } from '../../theme';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeItem } from '../store/cartSlice';
import { LuxuryButton } from '../components/LuxuryButton';
import { Trash2 } from 'lucide-react-native';

export default function CartScreen() {
  const { items, total } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemCard}>
      <Image source={{ uri: item.image_url }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price.toLocaleString()} x {item.quantity}</Text>
      </View>
      <TouchableOpacity onPress={() => dispatch(removeItem(item.product_id))}>
        <Trash2 size={20} color={COLORS.gray} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {items.length > 0 ? (
        <>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.product_id.toString()}
            contentContainerStyle={styles.listContent}
          />
          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>TOTAL</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
            <LuxuryButton 
              title="Proceed to Checkout" 
              onPress={() => router.push('/checkout')} 
            />
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your bag is empty</Text>
          <LuxuryButton 
            title="Explore Collection" 
            onPress={() => router.push('/(tabs)')} 
            variant="outline"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  listContent: {
    padding: SPACING.lg,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayLight,
    paddingBottom: SPACING.md,
  },
  itemImage: {
    width: 80,
    height: 100,
    backgroundColor: COLORS.grayLight,
    marginRight: SPACING.md,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontFamily: FONTS.playfair,
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 4,
  },
  itemPrice: {
    fontFamily: FONTS.montserrat,
    fontSize: 12,
    color: COLORS.gray,
  },
  footer: {
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.grayLight,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  totalLabel: {
    fontFamily: FONTS.montserrat,
    fontSize: 12,
    letterSpacing: 2,
    color: COLORS.gray,
    fontWeight: '600',
  },
  totalValue: {
    fontFamily: FONTS.playfair,
    fontSize: 24,
    color: COLORS.black,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyText: {
    fontFamily: FONTS.playfair,
    fontSize: 20,
    color: COLORS.gray,
    marginBottom: SPACING.xl,
  },
});
