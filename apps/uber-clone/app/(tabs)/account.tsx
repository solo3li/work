import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { Settings, MessageSquare, CreditCard, ChevronRight, Star } from 'lucide-react-native';

export default function Account() {
  const menuItems = [
    { id: 1, title: 'Help', icon: MessageSquare },
    { id: 2, title: 'Wallet', icon: CreditCard },
    { id: 3, title: 'Settings', icon: Settings },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Solo</Text>
            <View style={styles.ratingBadge}>
              <Star size={12} color="#000" fill="#000" />
              <Text style={styles.ratingText}>5.0</Text>
            </View>
          </View>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>S</Text>
          </View>
        </View>

        <View style={styles.promoCards}>
          <TouchableOpacity style={styles.promoCard}>
            <Text style={styles.promoTitle}>Messages</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuList}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity key={item.id} style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <Icon size={24} color="#000" style={styles.menuIcon} />
                  <Text style={styles.menuText}>{item.title}</Text>
                </View>
                <ChevronRight size={20} color="#ccc" />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    padding: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  avatarPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 28,
    color: '#666',
  },
  promoCards: {
    marginBottom: 30,
  },
  promoCard: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  menuList: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
  }
});
