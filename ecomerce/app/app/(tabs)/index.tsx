import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS, SPACING } from '../../theme';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setSelectedCategory } from '../store/shopSlice';

export default function CollectionScreen() {
  const { categories, products, selectedCategory } = useSelector((state: RootState) => state.shop);
  const dispatch = useDispatch();
  const router = useRouter();

  const filteredProducts = selectedCategory 
    ? products.filter(p => p.category.slug === selectedCategory)
    : products;

  const renderProduct = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => router.push(`/product/${item.slug}`)}
    >
      <View style={styles.imageWrapper}>
        <Image 
          source={{ uri: item.image_url }} 
          style={styles.image} 
        />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price.toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.categoryNav}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          <TouchableOpacity 
            onPress={() => dispatch(setSelectedCategory(null))}
            style={[styles.categoryItem, !selectedCategory && styles.categoryItemActive]}
          >
            <Text style={[styles.categoryText, !selectedCategory && styles.categoryTextActive]}>ALL</Text>
          </TouchableOpacity>
          {categories.map((cat: any) => (
            <TouchableOpacity 
              key={cat.id}
              onPress={() => dispatch(setSelectedCategory(cat.slug))}
              style={[styles.categoryItem, selectedCategory === cat.slug && styles.categoryItemActive]}
            >
              <Text style={[styles.categoryText, selectedCategory === cat.slug && styles.categoryTextActive]}>
                {cat.name.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  categoryNav: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayLight,
    paddingVertical: SPACING.md,
  },
  categoryScroll: {
    paddingHorizontal: SPACING.md,
  },
  categoryItem: {
    marginRight: SPACING.lg,
    paddingBottom: 4,
  },
  categoryItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.gold,
  },
  categoryText: {
    fontFamily: FONTS.montserrat,
    fontSize: 10,
    letterSpacing: 2,
    color: COLORS.gray,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: COLORS.black,
  },
  listContent: {
    padding: SPACING.md,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    marginBottom: SPACING.xl,
  },
  imageWrapper: {
    aspectRatio: 3/4,
    backgroundColor: COLORS.grayLight,
    marginBottom: SPACING.sm,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  productInfo: {
    alignItems: 'center',
  },
  productName: {
    fontFamily: FONTS.playfair,
    fontSize: 14,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 4,
  },
  productPrice: {
    fontFamily: FONTS.montserrat,
    fontSize: 12,
    color: COLORS.gold,
    fontWeight: '600',
  },
});
