const fs = require('fs');
const path = require('path');

const pages = [
  { path: 'app/(auth)/forgot-password.tsx', title: 'Forgot Password', icon: 'lock-open-outline' },
  { path: 'app/(auth)/verify.tsx', title: 'Verify Account', icon: 'checkmark-circle-outline' },
  { path: 'app/(auth)/2fa.tsx', title: 'Two-Factor Auth', icon: 'shield-half-outline' },
  { path: 'app/profile/edit.tsx', title: 'Edit Profile', icon: 'person-outline' },
  { path: 'app/profile/security.tsx', title: 'Security Settings', icon: 'key-outline' },
  { path: 'app/profile/kyc.tsx', title: 'KYC Verification', icon: 'id-card-outline' },
  { path: 'app/profile/responsible-gaming.tsx', title: 'Responsible Gaming', icon: 'leaf-outline' },
  { path: 'app/sports/match/[id].tsx', title: 'Match Details', icon: 'football-outline' },
  { path: 'app/sports/live.tsx', title: 'Live Betting', icon: 'radio-outline' },
  { path: 'app/casino/game/[id].tsx', title: 'Casino Game', icon: 'game-controller-outline' },
  { path: 'app/wallet/deposit.tsx', title: 'Deposit Funds', icon: 'cash-outline' },
  { path: 'app/wallet/withdraw.tsx', title: 'Withdraw Funds', icon: 'card-outline' },
  { path: 'app/promotions/index.tsx', title: 'Promotions & VIP', icon: 'gift-outline' },
  { path: 'app/support/index.tsx', title: 'Help & Support', icon: 'help-buoy-outline' },
  { path: 'app/notifications/index.tsx', title: 'Notifications', icon: 'notifications-outline' },
  { path: 'app/history/bets.tsx', title: 'Bet History', icon: 'time-outline' }
];

const template = (title, icon, relPath) => `import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '${relPath}';

export default function ${title.replace(/[^a-zA-Z]/g, '')}Screen() {
  const router = useRouter();
  
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
        <Text style={styles.title}>${title}</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[Colors.dark.card, Colors.dark.background]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.placeholderCard}
        >
          <View style={styles.iconWrapper}>
            <Ionicons name="${icon}" size={54} color={Colors.dark.tint} />
          </View>
          <Text style={styles.placeholderText}>${title}</Text>
          <Text style={styles.subText}>This section is currently under active development. Stay tuned for an amazing experience.</Text>
          
          <TouchableOpacity style={styles.actionBtn} onPress={() => router.back()}>
            <Text style={styles.actionBtnText}>Go Back</Text>
          </TouchableOpacity>
        </LinearGradient>
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
  content: { padding: 20, alignItems: 'center', justifyContent: 'center', flexGrow: 1, zIndex: 1 },
  placeholderCard: { alignItems: 'center', padding: 40, borderRadius: 24, borderWidth: 1, borderColor: Colors.dark.border, width: '100%', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 5 },
  iconWrapper: { width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(242, 116, 5, 0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: 24, borderWidth: 1, borderColor: 'rgba(242, 116, 5, 0.3)' },
  placeholderText: { color: Colors.dark.text, fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
  subText: { color: Colors.dark.tabIconDefault, fontSize: 15, textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  actionBtn: { backgroundColor: Colors.dark.tint, paddingVertical: 14, paddingHorizontal: 32, borderRadius: 16, width: '100%', alignItems: 'center' },
  actionBtnText: { color: '#000', fontSize: 16, fontWeight: 'bold' }
});
`;

pages.forEach(p => {
  const fullPath = path.join(__dirname, '../', p.path);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const depth = p.path.split('/').length - 1;
  const relPath = '../'.repeat(depth) + 'constants/Colors';
  
  const content = template(p.title, p.icon, relPath);
  fs.writeFileSync(fullPath, content);
});

console.log('Premium Pages generated successfully!');
