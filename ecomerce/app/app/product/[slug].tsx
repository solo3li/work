import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { COLORS, FONTS, SPACING } from '../../theme';
import { LuxuryButton } from '../components/LuxuryButton';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addItem } from '../store/cartSlice';

export default function ProductDetailScreen() {
  const { slug } = useLocalSearchParams();
  const products = useSelector((state: RootState) => state.shop.products);
  const product = products.find(p => p.slug === slug);
  const dispatch = useDispatch();
  const router = useRouter();

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: product.image_url }} 
          style={styles.image} 
        />
      </View>

      <View style={styles.details}>
        <Text style={styles.category}>{product.category?.name.toUpperCase()}</Text>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toLocaleString()}</Text>

        <View style={styles.divider} />

        <Text style={styles.description}>{product.description}</Text>

        <LuxuryButton 
          title="Add to Bag" 
          onPress={() => {
            dispatch(addItem(product));
            router.push('/(tabs)/cart');
          }}
          style={styles.button}
        />

        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>SHIPPING</Text>
            <Text style={styles.infoValue}>Complimentary</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>RETURNS</Text>
            <Text style={styles.infoValue}>30-Day Policy</Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
    backgroundColor: COLORS.white,
  },
  imageContainer: {
    aspectRatio: 4/5,
    backgroundColor: COLORS.grayLight,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  details: {
    padding: SPACING.lg,
  },
  category: {
    fontFamily: FONTS.montserrat,
    fontSize: 10,
    letterSpacing: 3,
    color: COLORS.gold,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  name: {
    fontFamily: FONTS.playfair,
    fontSize: 32,
    color: COLORS.black,
    marginBottom: SPACING.sm,
    lineHeight: 38,
  },
  price: {
    fontFamily: FONTS.montserrat,
    fontSize: 18,
    color: COLORS.black,
    fontWeight: '300',
    marginBottom: SPACING.lg,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.grayLight,
    marginBottom: SPACING.lg,
  },
  description: {
    fontFamily: FONTS.montserrat,
    fontSize: 14,
    color: COLORS.grayDark,
    lineHeight: 24,
    marginBottom: SPACING.xl,
  },
  button: {
    marginBottom: SPACING.xl,
  },
  infoGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  infoItem: {
    flex: 1,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    alignItems: 'center',
  },
  infoLabel: {
    fontFamily: FONTS.montserrat,
    fontSize: 8,
    letterSpacing: 1,
    color: COLORS.gray,
    marginBottom: 4,
  },
  infoValue: {
    fontFamily: FONTS.montserrat,
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.black,
  },
});
