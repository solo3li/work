import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MARKETPLACE_ITEMS } from '../../data/dummy';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MarketplaceScreen() {
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.itemInfo}>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.location}>{item.location}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <Text style={styles.pageTitle}>Marketplace</Text>
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="person" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="create-outline" size={20} color="black" />
          <Text style={styles.actionBtnText}>Sell</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="list-outline" size={20} color="black" />
          <Text style={styles.actionBtnText}>Categories</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={MARKETPLACE_ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f2f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EB',
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f1f2f6',
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  actionBtnText: {
    fontWeight: 'bold',
    marginLeft: 5,
  },
  listContent: {
    paddingHorizontal: 5,
    paddingTop: 10,
  },
  itemContainer: {
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 2,
  },
  itemInfo: {
    paddingTop: 5,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 14,
    color: '#050505',
    marginVertical: 2,
  },
  location: {
    fontSize: 12,
    color: '#65676B',
  },
});
