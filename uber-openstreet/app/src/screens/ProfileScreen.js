import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { User, Settings, CreditCard, History, Shield, LogOut, ChevronRight, Star } from 'lucide-react-native';

const ProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const MENU_ITEMS = [
    { id: '1', icon: <History size={22} color="#666" />, title: 'Ride History', screen: 'RideHistory' },
    { id: '2', icon: <CreditCard size={22} color="#666" />, title: 'Payment Methods' },
    { id: '3', icon: <Shield size={22} color="#666" />, title: 'Safety' },
    { id: '4', icon: <Settings size={22} color="#666" />, title: 'Settings' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Account</Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <User size={40} color="#fff" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user?.name || 'User'}</Text>
            <View style={styles.ratingRow}>
              <Star size={16} color="#FFD700" fill="#FFD700" />
              <Text style={styles.rating}>4.9 • 128 rides</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem}
              onPress={() => item.screen && navigation.navigate(item.screen)}
            >
              <View style={styles.menuItemLeft}>
                {item.icon}
                <Text style={styles.menuItemTitle}>{item.title}</Text>
              </View>
              <ChevronRight size={20} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={() => dispatch(logout())}
        >
          <LogOut size={22} color="#FF3B30" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
    margin: 20,
    borderRadius: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  rating: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  menuContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
    gap: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
  },
});

export default ProfileScreen;
