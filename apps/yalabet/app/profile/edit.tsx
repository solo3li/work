import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/Colors';

export default function EditProfileScreen() {
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
        <Text style={styles.title}>Edit Profile</Text>
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
            <Ionicons name="person-outline" size={54} color={Colors.dark.tint} />
          </View>
          <Text style={styles.placeholderText}>Edit Profile</Text>
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
