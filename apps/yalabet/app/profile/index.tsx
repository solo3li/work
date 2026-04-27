import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/Colors';
import { USER_PROFILE } from '../../constants/DummyData';

export default function ProfileScreen() {
  const router = useRouter();
  
  const menuItems = [
    { icon: 'person', title: 'Edit Profile', route: '/profile/edit' },
    { icon: 'lock-closed', title: 'Security Settings', route: '/profile/security' },
    { icon: 'shield-checkmark', title: 'KYC Verification', route: '/profile/kyc' },
    { icon: 'document-text', title: 'Responsible Gaming', route: '/profile/responsible-gaming' },
    { icon: 'time', title: 'Bet History', route: '/history/bets' },
    { icon: 'gift', title: 'Promotions & VIP', route: '/promotions' },
    { icon: 'notifications', title: 'Notifications', route: '/notifications' },
    { icon: 'help-circle', title: 'Help & Support', route: '/support' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.dark.header, 'transparent']}
        style={styles.headerBackground}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.dark.text} />
        </TouchableOpacity>
        <Text style={styles.title}>My Profile</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <LinearGradient
          colors={[Colors.dark.card, Colors.dark.background]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.profileCard}
        >
          <Image source={{ uri: USER_PROFILE.avatar }} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{USER_PROFILE.name}</Text>
            <Text style={styles.username}>{USER_PROFILE.username}</Text>
            <View style={styles.badge}>
              <Ionicons name="star" size={12} color="#000" style={{marginRight: 4}} />
              <Text style={styles.badgeText}>VIP {USER_PROFILE.vipLevel}</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.menuItem, index === menuItems.length - 1 && styles.lastMenuItem]} 
              onPress={() => router.push(item.route as any)}
            >
              <View style={styles.menuIcon}>
                <Ionicons name={item.icon as any} size={20} color={Colors.dark.tint} />
              </View>
              <Text style={styles.menuText}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.dark.tabIconDefault} />
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity style={styles.logoutBtn} onPress={() => router.replace('/(auth)/login')}>
          <Ionicons name="log-out-outline" size={22} color={Colors.dark.danger} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        <Text style={styles.appVersion}>7rbit v1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.dark.background },
  headerBackground: { position: 'absolute', top: 0, left: 0, right: 0, height: 150, zIndex: 0 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingTop: 50, zIndex: 1 },
  title: { color: Colors.dark.text, fontSize: 18, fontWeight: 'bold', letterSpacing: 0.5 },
  backBtn: { padding: 8, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12 },
  content: { padding: 20, paddingBottom: 50, zIndex: 1 },
  
  profileCard: { flexDirection: 'row', padding: 20, borderRadius: 24, alignItems: 'center', marginBottom: 25, borderWidth: 1, borderColor: Colors.dark.border, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 5 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginRight: 20, borderWidth: 2, borderColor: Colors.dark.tint },
  profileInfo: { flex: 1 },
  name: { color: Colors.dark.text, fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  username: { color: Colors.dark.tabIconDefault, fontSize: 14, marginBottom: 10 },
  badge: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.dark.tint, alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  badgeText: { color: '#000', fontSize: 12, fontWeight: 'bold' },
  
  menuContainer: { backgroundColor: 'rgba(30, 30, 30, 0.6)', borderRadius: 24, borderWidth: 1, borderColor: Colors.dark.border, overflow: 'hidden', marginBottom: 25 },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 18, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  lastMenuItem: { borderBottomWidth: 0 },
  menuIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(242, 116, 5, 0.1)', alignItems: 'center', justifyContent: 'center', marginRight: 15, borderWidth: 1, borderColor: 'rgba(242, 116, 5, 0.3)' },
  menuText: { flex: 1, color: Colors.dark.text, fontSize: 16, fontWeight: '500' },
  
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(213, 0, 0, 0.1)', padding: 18, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(213, 0, 0, 0.3)' },
  logoutText: { color: Colors.dark.danger, fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  
  appVersion: { textAlign: 'center', color: Colors.dark.tabIconDefault, marginTop: 30, fontSize: 12, opacity: 0.6 }
});